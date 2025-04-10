import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { fabric } from 'fabric';
import { useOnClickOutside } from 'usehooks-ts';

import { useCanvas } from '../../../../providers';
import { theme } from '../../../../styles/theme';
import { formatter } from '../../../../utils';
import { Box, Tooltip } from '../../..';
import {
  CanvasDuplicate,
  CanvasLock,
  CanvasOpacity,
  CanvasPosition,
  CanvasUnLock
} from '../../../SVG/icons';
import Opacity from '../Default/Opacity';
import Position from '../Default/Position';

const MenuCommon: React.FC = () => {
  const {
    canvas,
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
    handleHistorySave,
    language
  } = useCanvas();
  const opacityRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef<HTMLDivElement>(null);
  const [positionOpen, setPositionOpen] = useState<boolean>(false);
  const [opacity, setOpacity] = useState<number>(100);
  const [beforeOpacity, setBeforeOpacity] = useState<number>(100);
  const [opacityOpen, setOpacityOpen] = useState<boolean>(false);
  const [lock, setLock] = useState<boolean>(false);

  useEffect(() => {
    if (selectedTextBoxObject) {
      const newOpacity = selectedTextBoxObject.opacity
        ? selectedTextBoxObject.opacity.toFixed(2)
        : 0;
      setLock(!!selectedTextBoxObject.lockMovementX);
      setOpacity(Number(newOpacity) * 100);
      setBeforeOpacity(Number(newOpacity) * 100);
    }
  }, [selectedTextBoxObject]);

  useEffect(() => {
    if (selectedRectObject) {
      const newOpacity = selectedRectObject.opacity ? selectedRectObject.opacity.toFixed(2) : 0;
      setLock(!!selectedRectObject.lockMovementX);
      setOpacity(Number(newOpacity) * 100);
      setBeforeOpacity(Number(newOpacity) * 100);
    }
  }, [selectedRectObject]);

  useEffect(() => {
    if (selectedCircleObject) {
      const newOpacity = selectedCircleObject.opacity ? selectedCircleObject.opacity.toFixed(2) : 0;
      setLock(!!selectedCircleObject.lockMovementX);
      setOpacity(Number(newOpacity) * 100);
      setBeforeOpacity(Number(newOpacity) * 100);
    }
  }, [selectedCircleObject]);

  useEffect(() => {
    if (selectedTriangleObject) {
      const newOpacity = selectedTriangleObject.opacity
        ? selectedTriangleObject.opacity.toFixed(2)
        : 0;
      setLock(!!selectedTriangleObject.lockMovementX);
      setOpacity(Number(newOpacity) * 100);
      setBeforeOpacity(Number(newOpacity) * 100);
    }
  }, [selectedTriangleObject]);

  useEffect(() => {
    if (selectedImageObject) {
      const newOpacity = selectedImageObject.opacity ? selectedImageObject.opacity.toFixed(2) : 0;
      setLock(!!selectedImageObject.lockMovementX);
      setOpacity(Number(newOpacity) * 100);
      setBeforeOpacity(Number(newOpacity) * 100);
    }
  }, [selectedImageObject]);

  const handleOpacityOpen = () => {
    if (canvas) {
      if (selectedTextBoxObject && !selectedTextBoxObject.lockMovementX) {
        setOpacityOpen(!opacityOpen);
      } else if (selectedCircleObject && !selectedCircleObject.lockMovementX) {
        setOpacityOpen(!opacityOpen);
      } else if (selectedRectObject && !selectedRectObject.lockMovementX) {
        setOpacityOpen(!opacityOpen);
      } else if (selectedTriangleObject && !selectedTriangleObject.lockMovementX) {
        setOpacityOpen(!opacityOpen);
      } else if (selectedImageObject && !selectedImageObject.lockMovementX) {
        setOpacityOpen(!opacityOpen);
      }
    }
  };

  const handleOpacityClose = () => {
    if (opacity !== beforeOpacity) {
      handleHistorySave('opacity');
    }
    setOpacityOpen(false);
  };

  const handleOpacity = (value: number) => {
    if (selectedTextBoxObject) {
      const newValue = formatter.onlyNumber(String(value));

      selectedTextBoxObject.set({
        opacity: Number(newValue) / 100
      });
      canvas?.renderAll();
      setOpacity(Number(newValue));
    } else if (selectedRectObject) {
      const newValue = formatter.onlyNumber(String(value));

      selectedRectObject.set({
        opacity: Number(newValue) / 100
      });
      canvas?.renderAll();
      setOpacity(Number(newValue));
    } else if (selectedCircleObject) {
      const newValue = formatter.onlyNumber(String(value));

      selectedCircleObject.set({
        opacity: Number(newValue) / 100
      });
      canvas?.renderAll();
      setOpacity(Number(newValue));
    } else if (selectedTriangleObject) {
      const newValue = formatter.onlyNumber(String(value));

      selectedTriangleObject.set({
        opacity: Number(newValue) / 100
      });
      canvas?.renderAll();
      setOpacity(Number(newValue));
    } else if (selectedImageObject) {
      const newValue = formatter.onlyNumber(String(value));

      selectedImageObject.set({
        opacity: Number(newValue) / 100
      });
      canvas?.renderAll();
      setOpacity(Number(newValue));
    }
  };

  useOnClickOutside(opacityRef, handleOpacityClose);

  const handleDuplicate = () => {
    if (selectedTextBoxObject && !selectedTextBoxObject.lockMovementX) {
      const newTextObject = new fabric.Textbox(selectedTextBoxObject.text!, {
        ...selectedTextBoxObject.toJSON(),
        left: selectedTextBoxObject.left! + 10,
        top: selectedTextBoxObject.top! + 10
      });
      canvas?.add(newTextObject);
      canvas?.setActiveObject(newTextObject);
      canvas?.renderAll();
      setSelectedTextBoxObject(newTextObject);
    } else if (selectedRectObject && !selectedRectObject.lockMovementX) {
      const newRectObject = new fabric.Rect({
        ...selectedRectObject.toJSON(),
        left: selectedRectObject.left! + 10,
        top: selectedRectObject.top! + 10
      });
      canvas?.add(newRectObject);
      canvas?.setActiveObject(newRectObject);
      canvas?.renderAll();
      setSelectedRectObject(newRectObject);
    } else if (selectedCircleObject && !selectedCircleObject.lockMovementX) {
      const newCircleObject = new fabric.Circle({
        ...selectedCircleObject.toJSON(),
        left: selectedCircleObject.left! + 10,
        top: selectedCircleObject.top! + 10
      });
      canvas?.add(newCircleObject);
      canvas?.setActiveObject(newCircleObject);
      canvas?.renderAll();
      setSelectedCircleObject(newCircleObject);
    } else if (selectedTriangleObject && !selectedTriangleObject.lockMovementX) {
      const newTriangleObject = new fabric.Triangle({
        ...selectedTriangleObject.toJSON(),
        left: selectedTriangleObject.left! + 10,
        top: selectedTriangleObject.top! + 10
      });
      canvas?.add(newTriangleObject);
      canvas?.setActiveObject(newTriangleObject);
      canvas?.renderAll();
      setSelectedTriangleObject(newTriangleObject);
    } else if (selectedImageObject && !selectedImageObject.lockMovementX) {
      const newImageObject = new fabric.Image(selectedImageObject.getElement()!, {
        ...selectedImageObject.toJSON(),
        left: selectedImageObject.left! + 10,
        top: selectedImageObject.top! + 10
      });
      canvas?.add(newImageObject);
      canvas?.setActiveObject(newImageObject);
      canvas?.renderAll();
      setSelectedImageObject(newImageObject);
    }
    handleHistorySave('duplicate');
  };

  const handleLock = () => {
    if (selectedTextBoxObject) {
      selectedTextBoxObject.set({
        lockMovementX: !lock,
        lockMovementY: !lock,
        lockRotation: !lock,
        lockScalingFlip: !lock,
        lockScalingX: !lock,
        lockScalingY: !lock,
        lockSkewingX: !lock,
        lockSkewingY: !lock,
        lockUniScaling: !lock,
        editable: lock
      });
      canvas?.renderAll();
      setLock(!lock);
    } else if (selectedRectObject) {
      selectedRectObject.set({
        lockMovementX: !lock,
        lockMovementY: !lock,
        lockRotation: !lock,
        lockScalingFlip: !lock,
        lockScalingX: !lock,
        lockScalingY: !lock,
        lockSkewingX: !lock,
        lockSkewingY: !lock,
        lockUniScaling: !lock
      });
      canvas?.renderAll();
      setLock(!lock);
    } else if (selectedCircleObject) {
      selectedCircleObject.set({
        lockMovementX: !lock,
        lockMovementY: !lock,
        lockRotation: !lock,
        lockScalingFlip: !lock,
        lockScalingX: !lock,
        lockScalingY: !lock,
        lockSkewingX: !lock,
        lockSkewingY: !lock,
        lockUniScaling: !lock
      });
      canvas?.renderAll();
      setLock(!lock);
    } else if (selectedTriangleObject) {
      selectedTriangleObject.set({
        lockMovementX: !lock,
        lockMovementY: !lock,
        lockRotation: !lock,
        lockScalingFlip: !lock,
        lockScalingX: !lock,
        lockScalingY: !lock,
        lockSkewingX: !lock,
        lockSkewingY: !lock,
        lockUniScaling: !lock
      });
      canvas?.renderAll();
      setLock(!lock);
    } else if (selectedImageObject) {
      selectedImageObject.set({
        lockMovementX: !lock,
        lockMovementY: !lock,
        lockRotation: !lock,
        lockScalingFlip: !lock,
        lockScalingX: !lock,
        lockScalingY: !lock,
        lockSkewingX: !lock,
        lockSkewingY: !lock,
        lockUniScaling: !lock
      });
      canvas?.renderAll();
      setLock(!lock);
    }
    handleHistorySave('lock');
  };

  const handlePositionOpen = () => {
    if (canvas) {
      if (selectedTextBoxObject && !selectedTextBoxObject.lockMovementX) {
        setPositionOpen(!positionOpen);
      } else if (selectedCircleObject && !selectedCircleObject.lockMovementX) {
        setPositionOpen(!positionOpen);
      } else if (selectedRectObject && !selectedRectObject.lockMovementX) {
        setPositionOpen(!positionOpen);
      } else if (selectedTriangleObject && !selectedTriangleObject.lockMovementX) {
        setPositionOpen(!positionOpen);
      } else if (selectedImageObject && !selectedImageObject.lockMovementX) {
        setPositionOpen(!positionOpen);
      }
    }
  };

  const handlePosition = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    type: 'forward' | 'backward' | 'front' | 'back' | 'horizontal' | 'vertical'
  ) => {
    e.stopPropagation();
    if (selectedTextBoxObject) {
      if (type === 'forward') {
        selectedTextBoxObject.bringForward();
      } else if (type === 'backward') {
        selectedTextBoxObject.sendBackwards();
      } else if (type === 'front') {
        selectedTextBoxObject.bringToFront();
      } else if (type === 'back') {
        selectedTextBoxObject.sendToBack();
      } else if (type === 'horizontal') {
        selectedTextBoxObject.set({
          flipX: !selectedTextBoxObject.flipX
        });
      } else if (type === 'vertical') {
        selectedTextBoxObject.set({
          flipY: !selectedTextBoxObject.flipY
        });
      }
    } else if (selectedRectObject) {
      if (type === 'forward') {
        selectedRectObject.bringForward();
      } else if (type === 'backward') {
        selectedRectObject.sendBackwards();
      } else if (type === 'front') {
        selectedRectObject.bringToFront();
      } else if (type === 'back') {
        selectedRectObject.sendToBack();
      } else if (type === 'horizontal') {
        selectedRectObject.set({
          flipX: !selectedRectObject.flipX
        });
      } else if (type === 'vertical') {
        selectedRectObject.set({
          flipY: !selectedRectObject.flipY
        });
      }
    } else if (selectedCircleObject) {
      if (type === 'forward') {
        selectedCircleObject.bringForward();
      } else if (type === 'backward') {
        selectedCircleObject.sendBackwards();
      } else if (type === 'front') {
        selectedCircleObject.bringToFront();
      } else if (type === 'back') {
        selectedCircleObject.sendToBack();
      } else if (type === 'horizontal') {
        selectedCircleObject.set({
          flipX: !selectedCircleObject.flipX
        });
      } else if (type === 'vertical') {
        selectedCircleObject.set({
          flipY: !selectedCircleObject.flipY
        });
      }
    } else if (selectedTriangleObject) {
      if (type === 'forward') {
        selectedTriangleObject.bringForward();
      } else if (type === 'backward') {
        selectedTriangleObject.sendBackwards();
      } else if (type === 'front') {
        selectedTriangleObject.bringToFront();
      } else if (type === 'back') {
        selectedTriangleObject.sendToBack();
      } else if (type === 'horizontal') {
        selectedTriangleObject.set({
          flipX: !selectedTriangleObject.flipX
        });
      } else if (type === 'vertical') {
        selectedTriangleObject.set({
          flipY: !selectedTriangleObject.flipY
        });
      }
    } else if (selectedImageObject) {
      if (type === 'forward') {
        selectedImageObject.bringForward();
      } else if (type === 'backward') {
        selectedImageObject.sendBackwards();
      } else if (type === 'front') {
        selectedImageObject.bringToFront();
      } else if (type === 'back') {
        selectedImageObject.sendToBack();
      } else if (type === 'horizontal') {
        selectedImageObject.set({
          flipX: !selectedImageObject.flipX
        });
      } else if (type === 'vertical') {
        selectedImageObject.set({
          flipY: !selectedImageObject.flipY
        });
      }
    }
    if (canvas) {
      const backgroundCanvas = canvas.getObjects().find(function (obj) {
        return obj.name === 'canvas-background';
      });
      if (backgroundCanvas) {
        canvas.sendBackwards(backgroundCanvas);
      }
      const object = canvas.getObjects().find((obj) => obj.name === 'canvas-background-line');

      if (object) {
        canvas.bringToFront(object);
      }
    }
    canvas?.renderAll();
    handleHistorySave('position');
  };

  const handlePositionClose = () => {
    setPositionOpen(false);
  };

  useOnClickOutside(positionRef, handlePositionClose);

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Box display="flex" alignItems="center">
        <Box
          width="28px"
          height="28px"
          cursor="pointer"
          alignItems="center"
          justifyContent="center"
          display="flex"
          position="relative"
          mr="16px"
          ref={positionRef}
        >
          <Box
            display="flex"
            className={classNames('canvas-option', { active: positionOpen })}
            onClick={handlePositionOpen}
          >
            <CanvasPosition width="28" height="28" color={theme.color.black} />
          </Box>

          {positionOpen ? (
            <Position handlePosition={handlePosition} language={language} />
          ) : (
            <Box position="absolute" top="37px" zIndex={1} className="tooltip">
              <Tooltip text={language === 'en' ? 'Position' : '위치'} />
            </Box>
          )}
        </Box>

        <Box
          width="28px"
          height="28px"
          cursor="pointer"
          alignItems="center"
          justifyContent="center"
          display="flex"
          position="relative"
          ref={opacityRef}
        >
          <Box
            display="flex"
            className={classNames('canvas-option', { active: opacityOpen })}
            onClick={handleOpacityOpen}
          >
            <CanvasOpacity
              width="28"
              height="28"
              color={theme.color.black}
              style={{ cursor: 'pointer' }}
            />
          </Box>
          {opacityOpen ? (
            <Opacity opacity={opacity} handleOpacity={handleOpacity} language={language} />
          ) : (
            <Box position="absolute" top="37px" zIndex={1} className="tooltip">
              <Tooltip text={language === 'en' ? 'Opacity' : '투명도'} />
            </Box>
          )}
        </Box>
      </Box>
      <Box width="1px" height="24px" backgroundColor={theme.color.gray200} m="0px 24px" />
      <Box display="flex" alignItems="center">
        <Box
          width="28px"
          height="28x"
          alignItems="center"
          mr="16px"
          justifyContent="center"
          display="flex"
          position="relative"
          onClick={handleDuplicate}
        >
          <Box display="flex" cursor="pointer" className={classNames('canvas-option')}>
            <CanvasDuplicate width="28" height="28" color={theme.color.black} />
          </Box>
          <Box position="absolute" top="37px" zIndex={1} className="tooltip">
            <Tooltip text={language === 'en' ? 'Duplicate' : '복제'} />
          </Box>
        </Box>

        <Box
          width="28px"
          height="28x"
          cursor="pointer"
          alignItems="center"
          justifyContent="center"
          display="flex"
          position="relative"
          onClick={handleLock}
        >
          <Box
            display="flex"
            cursor="pointer"
            className={classNames('canvas-option', { active: lock })}
          >
            {lock ? (
              <CanvasLock width="28" height="28" color={theme.color.black} />
            ) : (
              <CanvasUnLock width="28" height="28" color={theme.color.black} />
            )}
          </Box>
          <Box position="absolute" top="37px" zIndex={1} className="tooltip">
            <Tooltip text={language === 'en' ? 'Lock' : '잠금'} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MenuCommon;
