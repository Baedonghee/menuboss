import React, { useEffect, useRef, useState } from 'react';
import { ColorService, IColor, useColor } from 'react-color-palette';
import classNames from 'classnames';
import { fabric } from 'fabric';
import { nanoid } from 'nanoid';
import { useOnClickOutside } from 'usehooks-ts';

import { useCanvas } from '../../../../providers';
import { theme } from '../../../../styles/theme';
import { Box, Button, Tooltip } from '../../..';
import {
  CanvasCircle,
  CanvasRectangle,
  CanvasText,
  CanvasTriangle,
  Image
} from '../../../SVG/icons';
import CanvasLine from '../../../SVG/icons/canvas-line';
import ColorPalette from '../Text/ColorPalette';

interface IMenuDefault {
  style?: React.CSSProperties;
  fontList: string[];
}

const MenuDefault: React.FC<IMenuDefault> = ({ style, fontList }) => {
  const colorRef = useRef<HTMLDivElement | null>(null);
  const {
    canvas,
    handleHistorySave,
    historyCount,
    setSelectedRectObject,
    setSelectedCircleObject,
    setSelectedTriangleObject,
    setSelectedTextBoxObject,
    language
  } = useCanvas();
  const [color, setColor] = useColor(theme.color.white);
  const [beforeColor, setBeforeColor] = useState<string>(theme.color.white);
  const [colorPaletteOpen, setColorPaletteOpen] = useState<boolean>(false);

  useEffect(() => {
    if (canvas) {
      if (canvas.getObjects()[0]) {
        setColor(
          canvas.getObjects()[0].fill
            ? {
                hex: ColorService.toHex(canvas.getObjects()[0].fill as string),
                rgb: ColorService.hex2rgb(canvas.getObjects()[0].fill as string),
                hsv: ColorService.rgb2hsv(
                  ColorService.hex2rgb(canvas.getObjects()[0].fill as string)
                )
              }
            : {
                hex: theme.color.white,
                rgb: {
                  r: 255,
                  g: 255,
                  b: 255,
                  a: 1
                },
                hsv: {
                  h: 255,
                  s: 255,
                  v: 255,
                  a: 1
                }
              }
        );
        setBeforeColor((canvas.getObjects()[0].fill as string) || theme.color.white);
      }
    }
  }, [canvas, setColor, historyCount.current]);

  const handleAddText = () => {
    if (canvas) {
      const text = new fabric.Textbox(
        language === 'en' ? 'Double click for edit' : '텍스트를 입력해주세요',
        {
          fontFamily: fontList[0],
          selectable: true,
          width: 500,
          fontSize: 48,
          name: nanoid(),
          originX: 'center',
          originY: 'center',
          top: 24,
          left: 250,
          fill: theme.color.black
          // 글씨 윤곽선 기능
          // stroke: 'blue', // Outline color
          // strokeWidth: 2, // Outline width
          // 배경 기능
          // backgroundColor: 'red'
          // shadow 기능
          // shadow: {
          //   color: 'rgba(0, 0, 0, 0.5)', // Shadow color (black with 50% opacity)
          //   blur: 10, // Blur level
          //   offsetX: 5, // X offset
          //   offsetY: 5 // Y offset
          // }
        }
      );
      canvas?.add(text);
      canvas.setActiveObject(text);
      setSelectedTextBoxObject(text);
      // backgroundLine 뒤로 보내기
      const object = canvas.getObjects().find((obj) => obj.name === 'canvas-background-line');

      if (object) {
        canvas.bringToFront(object);
      }
    }
  };

  const handleColorPaletteOpen = () => {
    setColorPaletteOpen((prev) => !prev);
  };

  const handleColorPaletteClose = () => {
    if (color.hex !== beforeColor) {
      setBeforeColor(color.hex);
      handleHistorySave('color');
    }
    setColorPaletteOpen(false);
  };

  useOnClickOutside(colorRef, handleColorPaletteClose);

  const handleColor = (selectColor: IColor) => {
    if (canvas) {
      if (canvas.getObjects()[0]) {
        canvas.getObjects()[0].set({ fill: selectColor.hex });
        canvas.renderAll();
        setColor(selectColor);
      }
    }
  };

  const handleAddShapes = (type: 'rectangle' | 'circle' | 'triangle' | 'line') => {
    if (canvas) {
      let shape;
      switch (type) {
        case 'rectangle':
          shape = new fabric.Rect({
            width: 200,
            height: 200,
            fill: theme.color.white,
            selectable: true,
            stroke: theme.color.black,
            strokeWidth: 1.5,
            originX: 'center',
            originY: 'center',
            name: nanoid(),
            top: 100,
            left: 100,
            strokeUniform: true
          });
          break;
        case 'circle':
          shape = new fabric.Circle({
            width: 100,
            height: 100,
            scaleX: 2,
            scaleY: 2,
            radius: 50,
            fill: theme.color.white,
            selectable: true,
            stroke: theme.color.black,
            strokeWidth: 1.5,
            originX: 'center',
            originY: 'center',
            name: nanoid(),
            top: 100,
            left: 100,
            strokeUniform: true
          });
          break;
        case 'triangle':
          shape = new fabric.Triangle({
            width: 200,
            height: 200,
            fill: theme.color.white,
            selectable: true,
            stroke: theme.color.black,
            strokeWidth: 1.5,
            originX: 'center',
            originY: 'center',
            name: nanoid(),
            top: 100,
            left: 100,
            strokeUniform: true
          });
          break;
        case 'line':
          shape = new fabric.Path('M 65 0 L 65 200', {
            left: 100,
            top: 100,
            stroke: 'black',
            fill: 'red',
            strokeWidth: 5,
            selectable: true,
            hasBorders: false,
            hasControls: true
          });
          shape.setControlVisible('mtr', false);
          shape.setControlVisible('bl', false);
          shape.setControlVisible('br', false);
          shape.setControlVisible('tl', false);
          shape.setControlVisible('tr', false);
          shape.setControlVisible('ml', false);
          shape.setControlVisible('mt', true);
          shape.setControlVisible('mr', false);
          shape.setControlVisible('mb', false);
          break;
        default:
          break;
      }
      if (shape) {
        canvas.add(shape);
        canvas.setActiveObject(shape);
        if (shape instanceof fabric.Rect) {
          setSelectedRectObject(shape);
        } else if (shape instanceof fabric.Circle) {
          setSelectedCircleObject(shape);
        } else if (shape instanceof fabric.Triangle) {
          setSelectedTriangleObject(shape);
        }

        // backgroundLine 뒤로 보내기
        const object = canvas.getObjects().find((obj) => obj.name === 'canvas-background-line');

        if (object) {
          canvas.bringToFront(object);
        }
      }
    }
  };

  return (
    <Box p="0px 24px" height="64px" width="100%" display="flex" alignItems="center" style={style}>
      <Box display="flex" alignItems="center">
        <Button
          icon="left"
          color="neutral"
          size="s"
          width="120px"
          mr="16px"
          onClick={handleAddText}
        >
          <CanvasText width="20" height="20" color={theme.color.black} />
          {language === 'en' ? 'Add text' : '글자 추가'}
        </Button>
        <Box
          width={language === 'en' ? '180px' : '120px'}
          height="40px"
          cursor="pointer"
          alignItems="center"
          justifyContent="center"
          display="flex"
          position="relative"
          ref={colorRef}
        >
          <Button
            icon="left"
            color="neutral"
            size="s"
            width={language === 'en' ? '180px' : '120px'}
            onClick={handleColorPaletteOpen}
          >
            <Image width="20" height="20" color={theme.color.black} />
            {language === 'en' ? 'Background color' : '배경 색상'}
          </Button>
          {colorPaletteOpen && <ColorPalette top="46px" color={color} handleColor={handleColor} />}
        </Box>
      </Box>
      <Box width="1px" height="24px" backgroundColor={theme.color.gray200} m="0px 24px" />
      <Box display="flex" alignItems="center">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="28px"
          height="28px"
          mr="16px"
          cursor="pointer"
          onClick={() => handleAddShapes('rectangle')}
          position="relative"
        >
          <Box
            display="flex"
            cursor="pointer"
            className={classNames('canvas-option')}
            width="28px"
            height="28px"
            justifyContent="center"
            alignItems="center"
          >
            <CanvasRectangle width="24" height="24" />
          </Box>
          <Box position="absolute" top="37px" zIndex={1} className="tooltip">
            <Tooltip text={language === 'en' ? 'Rectangle' : '사각형'} />
          </Box>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="28px"
          height="28px"
          mr="16px"
          cursor="pointer"
          onClick={() => handleAddShapes('circle')}
          position="relative"
        >
          <Box
            display="flex"
            cursor="pointer"
            className={classNames('canvas-option')}
            width="28px"
            height="28px"
            justifyContent="center"
            alignItems="center"
          >
            <CanvasCircle width="24" height="24" />
          </Box>
          <Box position="absolute" top="37px" zIndex={1} className="tooltip">
            <Tooltip text={language === 'en' ? 'Circle' : '원형'} />
          </Box>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="28px"
          height="28px"
          mr="16px"
          cursor="pointer"
          onClick={() => handleAddShapes('triangle')}
          position="relative"
        >
          <Box
            display="flex"
            cursor="pointer"
            className={classNames('canvas-option')}
            width="28px"
            height="28px"
            justifyContent="center"
            alignItems="center"
          >
            <CanvasTriangle width="24" height="24" />
          </Box>
          <Box position="absolute" top="37px" zIndex={1} className="tooltip">
            <Tooltip text={language === 'en' ? 'Triangle' : '삼각형'} />
          </Box>
        </Box>
        {/* <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="28px"
          height="28px"
          cursor="pointer"
          onClick={() => handleAddShapes('line')}
          position="relative"
        >
          <Box
            display="flex"
            cursor="pointer"
            className={classNames('canvas-option')}
            width="28px"
            height="28px"
            justifyContent="center"
            alignItems="center"
          >
            <CanvasLine width="24" height="24" />
          </Box>
          <Box position="absolute" top="37px" zIndex={1} className="tooltip">
            <Tooltip text={language === 'en' ? 'Line' : '선'} />
          </Box>
        </Box> */}
      </Box>
    </Box>
  );
};

export default MenuDefault;
