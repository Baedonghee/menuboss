import React, { useCallback, useEffect, useState } from 'react';
import { Box } from '@repo/ui/components';
import { CanvasAfter, CanvasBefore } from '@repo/ui/icons';
import { extraProps, useCanvas } from '@repo/ui/providers';
import { theme } from '@repo/ui/theme';
import { formatter } from '@repo/ui/utils';
import { fabric } from 'fabric';

interface ICanvasFooter {
  canvas: fabric.Canvas | null;
  isAlignType: 'Horizontal' | 'Vertical';
  detail?: boolean;
}

const CanvasFooter: React.FC<ICanvasFooter> = ({ canvas, isAlignType, detail }) => {
  const {
    historyUndo,
    historyRedo,
    historyProcessing,
    historyNextState,
    setSelectedTextBoxObject,
    setSelectedCircleObject,
    setSelectedRectObject,
    setSelectedTriangleObject,
    setSelectedImageObject,
    imageList,
    setImageList,
    historyCount,
    zoom,
    handleZoom: handleZoomControl,
    copyObject,
    setCopyObject
  } = useCanvas();
  const [_, setRender] = useState<boolean>(false);
  const [zoomValue, setZoomValue] = useState<number>(28);

  const handleZoom = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (canvas) {
      setZoomValue(Number(formatter.onlyNumber(e.target.value)));
      handleZoomControl(String(Number(formatter.onlyNumber(e.target.value)) - 28), isAlignType);
    }
  };

  const handleHistoryNext = useCallback(() => {
    return JSON.stringify(canvas?.toDatalessJSON(extraProps));
  }, [canvas]);

  const handleLoadHistory = useCallback(
    (history: any[], event: string) => {
      if (canvas) {
        setSelectedTextBoxObject(null);
        setSelectedCircleObject(null);
        setSelectedRectObject(null);
        setSelectedTriangleObject(null);
        setSelectedImageObject(null);
        canvas.loadFromJSON(history, () => {
          canvas.renderAll();
          canvas.fire(event);
          historyProcessing.current = false;
        });
        canvas.renderAll();
      }
    },
    [
      canvas,
      historyProcessing,
      setSelectedCircleObject,
      setSelectedImageObject,
      setSelectedRectObject,
      setSelectedTextBoxObject,
      setSelectedTriangleObject
    ]
  );

  const handleUndo = useCallback(() => {
    if (!detail && historyUndo.current.length <= 1) {
      return;
    }
    historyProcessing.current = true;
    const history = historyUndo.current.pop();
    if (history) {
      historyRedo.current.push(handleHistoryNext());
      historyCount.current -= 1;
      historyNextState.current = history;
      handleLoadHistory(history, 'history:undo');
    } else {
      historyProcessing.current = false;
    }

    setRender((prev) => !prev);
  }, [
    detail,
    handleHistoryNext,
    handleLoadHistory,
    historyCount,
    historyNextState,
    historyProcessing,
    historyRedo,
    historyUndo
  ]);

  const handleRedo = useCallback(() => {
    if (!historyRedo.current.length) {
      return;
    }
    historyProcessing.current = true;
    const history = historyRedo.current.pop();
    if (history) {
      historyUndo.current.push(handleHistoryNext());
      historyNextState.current = history;
      historyCount.current += 1;
      handleLoadHistory(history, 'history:redo');
    } else {
      historyProcessing.current = false;
    }
    setRender((prev) => !prev);
  }, [
    handleHistoryNext,
    handleLoadHistory,
    historyCount,
    historyNextState,
    historyProcessing,
    historyRedo,
    historyUndo
  ]);

  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.keyCode === 90) {
        handleRedo();
      } else if ((event.ctrlKey || event.metaKey) && event.keyCode === 90) {
        handleUndo();
      } else if (event.code === 'Backspace' || event.code === 'Delete') {
        const activeObjects = canvas?.getActiveObjects() as any[];
        const isInInputBox =
          document.activeElement instanceof HTMLInputElement ||
          document.activeElement instanceof HTMLTextAreaElement;
        if (activeObjects && activeObjects.length > 0) {
          for (let i = 0; i < activeObjects.length; i++) {
            if (!activeObjects[i].isEditing && !isInInputBox) {
              if (activeObjects[i].type === 'textbox') {
                setSelectedTextBoxObject(null);
              } else if (activeObjects[i].type === 'circle') {
                setSelectedCircleObject(null);
              } else if (activeObjects[i].type === 'rect') {
                setSelectedRectObject(null);
              } else if (activeObjects[i].type === 'triangle') {
                setSelectedTriangleObject(null);
              } else if (activeObjects[i].type === 'image') {
                setImageList(imageList.filter((image) => image !== activeObjects[i].id));
                setSelectedImageObject(null);
              }
              canvas?.discardActiveObject(); // 선택 해제
              canvas?.requestRenderAll(); // 렌더링 갱신
              canvas?.remove(activeObjects[i]);
            }
          }
        }
      } else if ((event.metaKey || event.ctrlKey) && event.code === 'KeyC') {
        const activeObject = canvas?.getActiveObjects();
        if (activeObject?.length === 1) {
          const objectToCopy = activeObject[0];
          if (objectToCopy instanceof fabric.Textbox) {
            setCopyObject(!objectToCopy.isEditing ? objectToCopy : null);
            return;
          }
          setCopyObject(activeObject[0]);
        }
      } else if ((event.metaKey || event.ctrlKey) && event.code === 'KeyV') {
        if (copyObject) {
          if (copyObject instanceof fabric.Textbox) {
            const newTextObject = new fabric.Textbox(copyObject.text!, {
              ...copyObject.toJSON(),
              left: copyObject.left! + 10,
              top: copyObject.top! + 10
            });
            canvas?.add(newTextObject);
            canvas?.setActiveObject(newTextObject);
            canvas?.renderAll();
          } else if (copyObject instanceof fabric.Rect) {
            const newRectObject = new fabric.Rect({
              ...copyObject.toJSON(),
              left: copyObject.left! + 10,
              top: copyObject.top! + 10
            });
            canvas?.add(newRectObject);
            canvas?.setActiveObject(newRectObject);
            canvas?.renderAll();
          } else if (copyObject instanceof fabric.Circle) {
            const newCircleObject = new fabric.Circle({
              ...copyObject.toJSON(),
              left: copyObject.left! + 10,
              top: copyObject.top! + 10
            });
            canvas?.add(newCircleObject);
            canvas?.setActiveObject(newCircleObject);
            canvas?.renderAll();
          } else if (copyObject instanceof fabric.Triangle) {
            const newTriangleObject = new fabric.Triangle({
              ...copyObject.toJSON(),
              left: copyObject.left! + 10,
              top: copyObject.top! + 10
            });
            canvas?.add(newTriangleObject);
            canvas?.setActiveObject(newTriangleObject);
            canvas?.renderAll();
          } else if (copyObject instanceof fabric.Image) {
            const newImageObject = new fabric.Image(copyObject.getElement()!, {
              ...copyObject.toJSON(),
              left: copyObject.left! + 10,
              top: copyObject.top! + 10
            });
            canvas?.add(newImageObject);
            canvas?.setActiveObject(newImageObject);
            canvas?.renderAll();
          }
        }
      }
    };

    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey) {
        event.preventDefault();
        const value = zoomValue < 28 ? zoomValue : zoom + 28;
        const newValue = event.deltaY > 0 ? value - 1 : value + 1;
        setZoomValue(newValue);
        handleZoomControl(String(newValue - 28), isAlignType);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    canvas,
    copyObject,
    handleRedo,
    handleUndo,
    handleZoomControl,
    historyProcessing,
    imageList,
    isAlignType,
    setCopyObject,
    setImageList,
    setSelectedCircleObject,
    setSelectedImageObject,
    setSelectedRectObject,
    setSelectedTextBoxObject,
    setSelectedTriangleObject,
    zoom,
    zoomValue
  ]);

  const clearCopyObject = () => {
    setCopyObject(null);
  };

  useEffect(() => {
    window.addEventListener('blur', clearCopyObject);
    return () => {
      window.removeEventListener('blur', clearCopyObject);
    };
  }, []);

  return (
    <Box
      borderTop={`1px solid ${theme.color.gray200}`}
      p="12px 32px"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      height="60px"
    >
      <Box display="flex" alignItems="center">
        <Box
          width="24px"
          height="24px"
          cursor="pointer"
          mr="24px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={handleUndo}
        >
          <CanvasBefore
            width="24"
            height="24"
            color={
              !detail
                ? historyUndo.current.length > 1
                  ? theme.color.gray500
                  : theme.color.gray200
                : historyUndo.current.length > 0
                  ? theme.color.gray500
                  : theme.color.gray200
            }
          />
        </Box>
        <Box
          width="24px"
          height="24px"
          cursor="pointer"
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={handleRedo}
        >
          <CanvasAfter
            width="24"
            height="24"
            color={historyRedo.current.length ? theme.color.gray500 : theme.color.gray200}
          />
        </Box>
      </Box>
      <Box display="flex" alignItems="center">
        <Box display="flex" alignItems="center" mr="24px">
          <input
            type="range"
            className="input-range"
            min={1}
            max={100}
            step={1}
            style={{
              width: '200px',
              background: `linear-gradient(to right, ${theme.color.gray500} 0%, ${
                theme.color.gray500
              } ${(100 / 100) * (zoomValue < 28 ? zoomValue : zoom + 28)}%, ${
                theme.color.gray100
              } ${(100 / 100) * (zoomValue < 28 ? zoomValue : zoom + 28)}%, ${
                theme.color.gray100
              } 100%)`
            }}
            value={zoomValue < 28 ? zoomValue : zoom + 28}
            onChange={(e) => handleZoom(e)}
          />
        </Box>
        <Box>
          <input
            type="text"
            className="input-range-text"
            style={{ width: '60px' }}
            value={`${zoomValue < 28 ? zoomValue : zoom + 28}%`}
            onChange={(e) => handleZoom(e)}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CanvasFooter;
