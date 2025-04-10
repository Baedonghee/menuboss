/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { ConnectDropTarget } from 'react-dnd';
import { fabric } from 'fabric';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { useCanvas } from '../../providers';
import { theme } from '../../styles/theme';
import { AlignGuidelines, debounce } from '../../utils';
import { Box } from '..';

import MenuDefault from './Menu/Default';
import MenuShape from './Menu/Shape';
import MenuText from './Menu/Text';
import CanvasFooter from './Footer';

const CanvasEditorWrapper = styled.div`
  .canvas-option {
    & + .tooltip {
      display: none;
    }
    &:hover {
      background-color: ${({ theme }) => theme.color.gray100};
      border-radius: 4px;
      & + .tooltip {
        display: block;
      }
    }
    &.active {
      background-color: ${({ theme }) => theme.color.gray200};
      border-radius: 4px;
    }
  }
`;

interface ICanvasEditor {
  isAlignType: 'Horizontal' | 'Vertical';
  fontList: string[];
  drop?: ConnectDropTarget;
  detail?: boolean;
}

const CanvasEditor: React.FC<ICanvasEditor> = ({ isAlignType, fontList, drop, detail }) => {
  const {
    canvas,
    setCanvasWidth,
    setCanvasHeight,
    setCanvas,
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
    setCanvasBackgroundWhiteLeft,
    setCanvasBackgroundWhiteTop,
    historyNextState,
    handleHistoryNext,
    handleHistorySave,
    zoom,
    handleZoom,
    textBoxRef,
    shapeBoxRef
  } = useCanvas();
  const { query } = useRouter();

  const updateResize = () => {
    if (canvas) {
      setCanvasWidth(
        window.innerWidth < (isAlignType === 'Horizontal' ? 1300 : 830)
          ? isAlignType === 'Horizontal'
            ? 1300
            : 1400
          : window.innerWidth - 360
      );
      setCanvasHeight(window.innerHeight < 1019 ? 734 : window.innerHeight - 104);
      handleZoom(String(zoom), isAlignType);
    }
  };

  const debouncedResizeHandler = debounce(updateResize, 30); // 300ms 딜레이

  useEffect(() => {
    window.addEventListener('resize', debouncedResizeHandler);
    return () => {
      window.removeEventListener('resize', debouncedResizeHandler);
    };
  }, [debouncedResizeHandler]);

  useEffect(() => {
    // fabric.devicePixelRatio = window.devicePixelRatio;
    const newCanvas = new fabric.Canvas('canvas', {
      width: window.innerWidth < 1440 ? 1300 : window.innerWidth - 360,
      height: window.innerHeight < 1019 ? 734 : window.innerHeight - 104,
      backgroundColor: theme.color.gray50,
      selection: true,
      selectionKey: 'shiftKey',
      allowTouchScrolling: true,
      preserveObjectStacking: true,
      enableRetinaScaling: true,
      uniformScaling: false,
      uniScaleKey: 'shiftKey'
    });

    // if (window.devicePixelRatio !== 1) {
    //   newCanvas.getElement().setAttribute('width', String(newCanvas.getWidth() * 3));
    //   newCanvas.getElement().setAttribute('height', String(newCanvas.getHeight() * 3));
    //   console.log(newCanvas.getElement().getContext('2d'));
    //   newCanvas.getElement().getContext('2d').scale(3, 3);
    //   newCanvas
    //     .getElement()
    //     .getContext('2d')
    //     .scale(window.devicePixelRatio, window.devicePixelRatio);
    // }
    const guideline = new AlignGuidelines({
      canvas: newCanvas,
      pickObjTypes: [
        { key: 'type', value: 'textbox' },
        { key: 'type', value: 'rect' },
        { key: 'type', value: 'circle' },
        { key: 'type', value: 'triangle' },
        { key: 'type', value: 'image' }
      ],
      aligningOptions: {
        lineColor: '#32D10A',
        lineMargin: 8
      }
    });
    guideline.init();
    setCanvas(newCanvas);
    setCanvasWidth(window.innerWidth < 1440 ? 1300 : window.innerWidth - 360);
    setCanvasHeight(window.innerHeight < 1019 ? 734 : window.innerHeight - 104);
  }, []);

  useEffect(() => {
    if (canvas) {
      if (!query.id) {
        drawBackground(canvas);
        historyNextState.current = handleHistoryNext();
      }
    }
  }, [canvas, query.id]);

  useEffect(() => {
    if (canvas) {
      canvas.on('object:rotating', (event) => {
        const target = event.target;
        if (target) {
          let angle = target.angle! % 360;
          // Shift 키를 눌렀을 때, 45도 간격으로 회전
          if (event.e.shiftKey) {
            angle = Math.round(angle / 45) * 45;
          }
          target.originX = 'center';
          target.originY = 'center';
          target.angle = angle;

          target.setCoords(); // 이 부분을 수정했습니다.

          canvas.renderAll();
        }
      });

      canvas?.on('mouse:down', (e) => {
        const selectedObject = e.target;
        if (selectedTextBoxObject && selectedTextBoxObject.text?.trim() === '') {
          setSelectedTextBoxObject(null);
          canvas.remove(selectedTextBoxObject);
          canvas.renderAll();
        }
        if (!selectedObject) {
          setSelectedTextBoxObject(null);
          setSelectedRectObject(null);
          setSelectedCircleObject(null);
          setSelectedTriangleObject(null);
          setSelectedImageObject(null);
        }
        if (selectedObject instanceof fabric.Textbox) {
          // 선택된 객체가 텍스트박스인 경우
          setSelectedTextBoxObject(selectedObject);
          setSelectedRectObject(null);
          setSelectedCircleObject(null);
          setSelectedTriangleObject(null);
          setSelectedImageObject(null);
        } else if (selectedObject instanceof fabric.Rect) {
          // 선택된 객체가 사각형인 경우
          setSelectedRectObject(selectedObject);
          setSelectedTextBoxObject(null);
          setSelectedCircleObject(null);
          setSelectedTriangleObject(null);
          setSelectedImageObject(null);
        } else if (selectedObject instanceof fabric.Circle) {
          // 선택된 객체가 원인 경우
          setSelectedCircleObject(selectedObject);
          setSelectedTextBoxObject(null);
          setSelectedRectObject(null);
          setSelectedTriangleObject(null);
          setSelectedImageObject(null);
        } else if (selectedObject instanceof fabric.Triangle) {
          // 선택된 객체가 삼각형인 경우
          setSelectedTriangleObject(selectedObject);
          setSelectedTextBoxObject(null);
          setSelectedRectObject(null);
          setSelectedCircleObject(null);
          setSelectedImageObject(null);
        } else if (selectedObject instanceof fabric.Image) {
          // 선택된 객체가 이미지인 경우
          setSelectedImageObject(selectedObject);
          setSelectedTextBoxObject(null);
          setSelectedRectObject(null);
          setSelectedCircleObject(null);
          setSelectedTriangleObject(null);
        }
      });
    }
    return () => {
      if (canvas) {
        canvas.off('object:rotating');
        canvas.off('mouse:down');
      }
    };
  }, [canvas, selectedTextBoxObject]);

  const drawBackground = (drawCanvas: fabric.Canvas) => {
    const centerX = (drawCanvas.getWidth() - backgroundWidth) / 2;
    const centerY = (drawCanvas.getHeight() - backgroundHeight) / 2;
    setCanvasBackgroundWhiteTop(centerY);
    setCanvasBackgroundWhiteLeft(centerX);
    // 흰색 배경을 나타내는 사각형 생성
    const backgroundRect = new fabric.Rect({
      // left: centerX,
      // top: centerY,
      left: 0,
      top: 0,
      width: backgroundWidth,
      height: backgroundHeight,
      fill: theme.color.white,
      lockMovementX: true,
      lockMovementY: true,
      selectable: false,
      evented: false,
      // stroke: theme.color.

      name: 'canvas-background'
    });
    const backgroundRectLine = new fabric.Rect({
      left: 0,
      top: 0,
      width: backgroundWidth,
      height: backgroundHeight,
      fill: 'transparent',
      lockMovementX: true,
      lockMovementY: true,
      selectable: false,
      evented: false,
      stroke: theme.color.gray300,
      strokeWidth: 1.5,
      name: 'canvas-background-line'
    });

    handleHistorySave('background');
    // 캔버스에 사각형 추가
    drawCanvas.add(backgroundRect, backgroundRectLine);
    drawCanvas.viewportTransform![4] = centerX;
    drawCanvas.viewportTransform![5] = centerY;

    handleZoom('22', isAlignType);
  };

  return (
    <CanvasEditorWrapper>
      <Box borderBottom={`1px solid ${theme.color.gray200}`}>
        <MenuText
          ref={textBoxRef}
          fontList={fontList}
          style={{
            display:
              selectedTextBoxObject &&
              !selectedCircleObject &&
              !selectedRectObject &&
              !selectedTriangleObject &&
              !selectedImageObject
                ? 'flex'
                : 'none'
          }}
        />
        <MenuDefault
          fontList={fontList}
          style={{
            display:
              selectedTextBoxObject ||
              selectedCircleObject ||
              selectedRectObject ||
              selectedTriangleObject ||
              selectedImageObject
                ? 'none'
                : 'flex'
          }}
        />
        <MenuShape
          style={{
            display:
              selectedCircleObject ||
              selectedRectObject ||
              selectedTriangleObject ||
              selectedImageObject
                ? 'flex'
                : 'none'
          }}
          ref={shapeBoxRef}
        />
      </Box>
      <Box
        backgroundColor={theme.color.gray50}
        height="calc(100vh - 204px)"
        overflow="auto"
        position="relative"
        id="canvasContainer"
        ref={drop}
      >
        <canvas id="canvas" />
      </Box>
      <Box position="absolute" top="-9999px" left="-9999px">
        <canvas id="cloneCanvas" />
      </Box>
      <CanvasFooter canvas={canvas} isAlignType={isAlignType} detail={detail} />
    </CanvasEditorWrapper>
  );
};

export default CanvasEditor;
