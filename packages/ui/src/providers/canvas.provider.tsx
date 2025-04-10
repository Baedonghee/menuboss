import React, { createContext, useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';

import { formatter } from '../utils';

interface MenuTextRef {
  handleFontBoxResize: (editFontSizeValue: string, editWidthRatio: number) => void;
}

interface MenuShapeRef {
  handleShapeResize: () => void;
}

interface ICanvasContext {
  canvas: fabric.Canvas | null;
  setCanvas: React.Dispatch<React.SetStateAction<fabric.Canvas | null>>;
  canvasWidth: number;
  setCanvasWidth: React.Dispatch<React.SetStateAction<number>>;
  canvasHeight: number;
  backgroundWidth: number;
  backgroundHeight: number;
  setCanvasHeight: React.Dispatch<React.SetStateAction<number>>;
  selectedTextBoxObject: fabric.Textbox | null;
  setSelectedTextBoxObject: React.Dispatch<React.SetStateAction<fabric.Textbox | null>>;
  selectedRectObject: fabric.Rect | null;
  setSelectedRectObject: React.Dispatch<React.SetStateAction<fabric.Rect | null>>;
  selectedCircleObject: fabric.Circle | null;
  setSelectedCircleObject: React.Dispatch<React.SetStateAction<fabric.Circle | null>>;
  selectedTriangleObject: fabric.Triangle | null;
  setSelectedTriangleObject: React.Dispatch<React.SetStateAction<fabric.Triangle | null>>;
  selectedImageObject: fabric.Image | null;
  setSelectedImageObject: React.Dispatch<React.SetStateAction<fabric.Image | null>>;
  canvasBackgroundWhiteTop: number;
  setCanvasBackgroundWhiteTop: React.Dispatch<React.SetStateAction<number>>;
  canvasBackgroundWhiteLeft: number;
  setCanvasBackgroundWhiteLeft: React.Dispatch<React.SetStateAction<number>>;
  imageList: string[];
  setImageList: React.Dispatch<React.SetStateAction<string[]>>;
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  handleZoom: (
    value: string,
    type: 'Horizontal' | 'Vertical',
    zoomCenter?: { x: number; y: number }
  ) => void;
  historyUndo: React.MutableRefObject<any[]>;
  historyRedo: React.MutableRefObject<any[]>;
  historyNextState: React.MutableRefObject<any>;
  historyProcessing: React.MutableRefObject<boolean>;
  historyCount: React.MutableRefObject<number>;
  textBoxRef: React.MutableRefObject<MenuTextRef | null>;
  shapeBoxRef: React.MutableRefObject<MenuShapeRef | null>;
  handleHistorySave: (eventName?: string) => void;
  handleHistoryNext: () => string;
  copyObject: fabric.Object | null;
  setCopyObject: React.Dispatch<React.SetStateAction<fabric.Object | null>>;
  canvasReset: () => void;
  language: 'en' | 'ko';
}

const CanvasContext = createContext<ICanvasContext | undefined>(undefined);

export function useCanvas() {
  const context = React.useContext(CanvasContext);
  if (!context) {
    throw new Error('useCanvas must be used within an CanvasProvider');
  }
  return context;
}

export const extraProps = [
  'id',
  'name',
  'crossOrigin',
  'lockMovementX',
  'lockMovementY',
  'selectable',
  'evented',
  'editable',
  'originX',
  'originY'
];

const backgroundWidth = 1920;
const backgroundHeight = 1080;

export function CanvasProvider({
  children,
  language = 'en'
}: React.PropsWithChildren<{ language?: 'en' | 'ko' }>) {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [canvasWidth, setCanvasWidth] = useState<number>(1100);
  const [canvasHeight, setCanvasHeight] = useState<number>(1100);
  const [selectedTextBoxObject, setSelectedTextBoxObject] = useState<fabric.Textbox | null>(null);
  const [selectedRectObject, setSelectedRectObject] = useState<fabric.Rect | null>(null);
  const [selectedCircleObject, setSelectedCircleObject] = useState<fabric.Circle | null>(null);
  const [selectedTriangleObject, setSelectedTriangleObject] = useState<fabric.Triangle | null>(
    null
  );
  const [selectedImageObject, setSelectedImageObject] = useState<fabric.Image | null>(null);
  const [canvasBackgroundWhiteTop, setCanvasBackgroundWhiteTop] = useState(0);
  const [canvasBackgroundWhiteLeft, setCanvasBackgroundWhiteLeft] = useState(0);
  const historyUndo = useRef<any[]>([]);
  const historyRedo = useRef<any[]>([]);
  const historyNextState = useRef<any>(null);
  const historyProcessing = useRef<boolean>(false);
  const historyCount = useRef<number>(0);
  const textBoxRef = useRef<MenuTextRef>(null);
  const shapeBoxRef = useRef<MenuShapeRef>(null);
  const [_, setRender] = useState<boolean>(false);
  const [zoom, setZoom] = useState<number>(22);
  const [imageList, setImageList] = useState<string[]>([]);
  const [copyObject, setCopyObject] = useState<fabric.Object | null>(null);

  const handleHistoryNext = () => {
    return JSON.stringify(canvas?.toDatalessJSON(extraProps));
  };

  const handleHistorySave = (eventName?: string) => {
    if (canvas && !historyProcessing.current && eventName) {
      const json = historyNextState.current;
      historyUndo.current.push(json);
      historyRedo.current = [];
      historyNextState.current = handleHistoryNext();
      canvas.fire('history:append', { json });
      if (eventName === 'object:modified') {
        if (selectedTextBoxObject) {
          const newFontSize = Math.round(
            Number(selectedTextBoxObject.fontSize! * selectedTextBoxObject.scaleX!) || 0
          );
          const widthRatio = Number(newFontSize) / selectedTextBoxObject.fontSize!;
          textBoxRef.current?.handleFontBoxResize(String(newFontSize), widthRatio);
        } else if (
          selectedCircleObject ||
          selectedRectObject ||
          selectedTriangleObject ||
          selectedImageObject
        ) {
          shapeBoxRef.current?.handleShapeResize();
        }
      }
      setRender((prev) => !prev);
    }
  };

  useEffect(() => {
    if (canvas) {
      canvas.on('object:added', () => handleHistorySave('object:added'));
      canvas.on('object:removed', () => handleHistorySave('object:removed'));
      canvas.on('object:modified', () => handleHistorySave('object:modified'));
    }
    return () => {
      if (canvas) {
        canvas.off('object:added');
        canvas.off('object:removed');
        canvas.off('object:modified');
      }
    };
  }, [canvas, selectedTextBoxObject, historyNextState, historyUndo, handleHistorySave]);

  const handleZoom = (value: string, type: 'Horizontal' | 'Vertical' = 'Horizontal') => {
    if (canvas) {
      const zoomWidthRatio = type === 'Horizontal' ? 1.5 : 1;
      const zoomHeightRatio = type === 'Horizontal' ? 1.8 : 3;
      const newValue = formatter.onlyNumber(value);
      let newZoom = Number(value || 1) / 50;
      const beforeZoom = zoom / 50;
      // if (newZoom === 0.02) {
      //   return;
      // }
      const plusWidthZoom = newZoom * zoomWidthRatio;
      const plusHeightZoom = newZoom * zoomHeightRatio;
      if (newZoom < 0.02) {
        newZoom = 0.02;
      }
      if (newZoom > 0.94) {
        canvas.enableRetinaScaling = false;
      } else {
        canvas.enableRetinaScaling = true;
      }
      const newWidth = canvasWidth! * plusWidthZoom;
      const newHeight = canvasHeight! * plusHeightZoom;
      if (document.getElementById('canvasContainer')?.clientWidth) {
        const containerWidth = document.getElementById('canvasContainer')!.clientWidth;
        const containerHeight = document.getElementById('canvasContainer')!.clientHeight;
        let newCanvasWidth = newWidth > containerWidth ? newWidth : containerWidth;
        let newCanvasHeight = newHeight > containerHeight ? newHeight : containerHeight;
        newCanvasWidth = newCanvasWidth < containerWidth ? 1100 : newCanvasWidth;
        newCanvasHeight =
          newCanvasHeight < containerHeight + (type === 'Horizontal' ? 0 : 100 * plusHeightZoom)
            ? type === 'Horizontal'
              ? 734
              : newCanvasHeight
            : newCanvasHeight;

        canvas.setDimensions({
          width: newCanvasWidth - 30,
          height: newCanvasHeight
        });
        const backgroundCanvas = canvas.getObjects()[0];
        if (backgroundCanvas) {
          // if (newZoom < 0.45) {
          if (newZoom < 0.38) {
            // 배경 캔버스를 가운데로 이동시키기 위한 계산
            const deltaX = (newCanvasWidth - backgroundCanvas.width! * newZoom) / 2;
            const deltaY = (newCanvasHeight - backgroundCanvas.height! * newZoom) / 2;
            canvas.zoomToPoint({ x: deltaX / 2, y: deltaY / 2 }, newZoom);
            canvas.viewportTransform![4] = deltaX;
            canvas.viewportTransform![5] = deltaY;
          } else {
            const deltaX = (newCanvasWidth - backgroundCanvas.width! * newZoom) / 2;
            const deltaY = (newCanvasHeight - backgroundCanvas.height! * newZoom) / 2;
            canvas.zoomToPoint({ x: newCanvasWidth / 2, y: newCanvasHeight / 2 }, newZoom);
            canvas.viewportTransform![4] = deltaX;
            canvas.viewportTransform![5] = deltaY;

            const canvasContainer = document.getElementById('canvasContainer')!;
            const containerWidth = canvasContainer.clientWidth;
            const containerHeight = canvasContainer.clientHeight;

            let newScrollLeft = canvasContainer.scrollLeft;
            let newScrollTop = canvasContainer.scrollTop;

            if (beforeZoom < newZoom) {
              newScrollLeft +=
                ((newZoom * zoomWidthRatio - beforeZoom * zoomWidthRatio) * containerWidth) / 2;
              newScrollTop +=
                ((newZoom * zoomHeightRatio - beforeZoom * zoomHeightRatio) * containerHeight) / 2;
            } else {
              newScrollLeft -=
                ((beforeZoom * zoomWidthRatio - newZoom * zoomWidthRatio) * containerWidth) / 2;
              newScrollTop -=
                ((beforeZoom * zoomHeightRatio - newZoom * zoomHeightRatio) * containerHeight) / 2;
            }

            canvasContainer.scrollLeft = newScrollLeft;
            canvasContainer.scrollTop = newScrollTop;
          }

          canvas.setZoom(newZoom);
          canvas.renderAll();
          setZoom(Number(newValue));
        }
      }
    }
  };

  const canvasReset = () => {
    setCanvasWidth(1100);
    setCanvasHeight(1100);
    setZoom(22);
    setCanvasBackgroundWhiteTop(0);
    setCanvasBackgroundWhiteLeft(0);
    setSelectedTextBoxObject(null);
    setSelectedRectObject(null);
    setSelectedCircleObject(null);
    setSelectedTriangleObject(null);
    setSelectedImageObject(null);
    setImageList([]);
    historyUndo.current = [];
    historyRedo.current = [];
    historyNextState.current = null;
    historyProcessing.current = false;
    historyCount.current = 0;
    textBoxRef.current?.handleFontBoxResize('12', 1);
    shapeBoxRef.current?.handleShapeResize();
  };

  const contextValue: ICanvasContext = {
    canvas,
    setCanvas,
    canvasWidth,
    setCanvasWidth,
    canvasHeight,
    setCanvasHeight,
    backgroundWidth,
    backgroundHeight,
    selectedTextBoxObject,
    setSelectedTextBoxObject,
    selectedRectObject,
    setSelectedRectObject,
    selectedCircleObject,
    setSelectedCircleObject,
    selectedTriangleObject,
    setSelectedTriangleObject,
    selectedImageObject,
    setSelectedImageObject,
    canvasBackgroundWhiteTop,
    setCanvasBackgroundWhiteTop,
    canvasBackgroundWhiteLeft,
    setCanvasBackgroundWhiteLeft,
    imageList,
    setImageList,
    zoom,
    setZoom,
    handleZoom,
    historyUndo,
    historyRedo,
    historyNextState,
    historyProcessing,
    textBoxRef,
    shapeBoxRef,
    handleHistorySave,
    handleHistoryNext,
    historyCount,
    copyObject,
    setCopyObject,
    canvasReset,
    language
  };

  return <CanvasContext.Provider value={contextValue}>{children}</CanvasContext.Provider>;
}
