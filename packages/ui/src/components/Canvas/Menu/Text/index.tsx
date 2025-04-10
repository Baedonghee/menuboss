import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { ColorService, IColor, useColor } from 'react-color-palette';
import classNames from 'classnames';
import { Shadow } from 'fabric/fabric-impl';
import styled from 'styled-components';
import { useOnClickOutside } from 'usehooks-ts';

import { useCanvas } from '../../../../providers';
import { theme } from '../../../../styles/theme';
import { IOption } from '../../../../types';
import { formatter } from '../../../../utils';
import { Box, Select, Tooltip } from '../../..';
import {
  CanvasTextAlignCenter,
  CanvasTextAlignLeft,
  CanvasTextAlignRight,
  CanvasTextBold,
  CanvasTextColor,
  CanvasTextItalic,
  CanvasTextSpacing,
  CanvasTextStrikethrough,
  CanvasTextUnderline,
  CanvasTextUppercase,
  Minus,
  Plus
} from '../../../SVG/icons';
import CanvasTextStrike from '../../../SVG/icons/canvas-text-stroke';
import MenuCommon from '../Common';

import Align from './Align';
import ColorPalette from './ColorPalette';
import Spacing from './Spacing';
import Stroke from './Stroke';

import 'react-color-palette/css';

const MenuTextWrapper = styled.div<{ fontFamily: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  width: 100%;
  padding: 0px 24px;
  .font-size {
    &:first-of-type {
      border-right: 0;
    }
  }
  .font-list {
    .select {
      span {
        font-family: ${({ fontFamily }) => `${fontFamily} !important`};
      }
    }
    ul {
      li {
        &:nth-of-type(1) {
          font-family: 'Arial' !important;
        }
        &:nth-of-type(2) {
          font-family: 'Calibri' !important;
        }
        &:nth-of-type(3) {
          font-family: 'Cormorant Garamond' !important;
        }
        &:nth-of-type(4) {
          font-family: 'Century Gothic' !important;
        }
        &:nth-of-type(5) {
          font-family: 'Roboto' !important;
        }
        &:nth-of-type(6) {
          font-family: 'Open Sans' !important;
        }
        &:nth-of-type(7) {
          font-family: 'Lato' !important;
        }
        &:nth-of-type(8) {
          font-family: 'Montserrat' !important;
        }
        &:nth-of-type(9) {
          font-family: 'Raleway' !important;
        }
        &:nth-of-type(10) {
          font-family: 'Bodoni Moda' !important;
        }
      }
    }
  }
  .font-btn {
    display: flex;
    width: 40px;
    height: 32px;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.color.white};
    border-left: 1px solid ${({ theme }) => theme.color.gray200};
    border-top: 1px solid ${({ theme }) => theme.color.gray200};
    border-bottom: 1px solid ${({ theme }) => theme.color.gray200};
    border-right: none;
    &.plus {
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      border-right: 1px solid ${({ theme }) => theme.color.gray200};
      border-left: none;
    }
  }
  .font-input {
    width: 40px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.color.black};
    font-weight: ${({ theme }) => theme.fontWeight.normal};
    font-size: ${({ theme }) => theme.fontSize.text12};
    border: 1px solid ${({ theme }) => theme.color.gray200};
    text-align: center;
    border-radius: 0px;
  }
`;

interface IMenuText {
  style?: React.CSSProperties;
  fontList: string[];
}

export interface MenuTextRef {
  handleFontBoxResize: (editFontSizeValue: string, editWidthRatio: number) => void;
}

const MenuText: React.ForwardRefRenderFunction<MenuTextRef, IMenuText> = (
  { style, fontList },
  ref
) => {
  const { canvas, handleHistorySave, selectedTextBoxObject, language } = useCanvas();
  const [fontSizeValue, setFontSizeValue] = useState<string>(
    selectedTextBoxObject?.fontSize ? String(selectedTextBoxObject.fontSize) : '22'
  );
  const [selectFont, setSelectFont] = useState<IOption>({
    value: fontList[0],
    name: fontList[0]
  });
  const [color, setColor] = useColor(theme.color.black);
  const [beforeColor, setBeforeColor] = useState<string>(theme.color.black);
  const [colorPaletteOpen, setColorPaletteOpen] = useState<boolean>(false);
  const [alignOpen, setAlignOpen] = useState<boolean>(false);
  const colorRef = useRef<HTMLDivElement | null>(null);
  const alignRef = useRef<HTMLDivElement | null>(null);
  const [bold, setBold] = useState<boolean>(false);
  const [italic, setItalic] = useState<boolean>(false);
  const [underline, setUnderline] = useState<boolean>(false);
  const [strikethrough, setStrikethrough] = useState<boolean>(false);
  const [uppercase, setUppercase] = useState<boolean>(false);
  const [align, setAlign] = useState<'left' | 'center' | 'right'>('left');
  const spacingRef = useRef<HTMLDivElement | null>(null);
  const [spacingOpen, setSpacingOpen] = useState<boolean>(false);
  const [spacing, setSpacing] = useState<number>(0);
  const [beforeSpacing, setBeforeSpacing] = useState<number>(0);
  const [lineHeight, setLineHeight] = useState<number>(1.16);
  const [beforeLineHeight, setBeforeLineHeight] = useState<number>(1.16);
  const shadowRef = useRef<HTMLDivElement | null>(null);
  const [strokeWidth, setStrokeWidth] = useState<number>(0);
  const [shadowDistance, setShadowDistance] = useState<number>(0);
  const [shadowOpacity, setShadowOpacity] = useState<number>(0);
  const [shadowDirection, setShadowDirection] = useState<number>(0);
  const [shadowDirectionX, setShadowDirectionX] = useState<number>(0);
  const [shadowDirectionY, setShadowDirectionY] = useState<number>(0);
  const [shadowBlur, setShadowBlur] = useState<number>(0);
  const [shadowOpen, setShadowOpen] = useState<boolean>(false);

  useImperativeHandle(ref, () => ({
    handleFontBoxResize
  }));

  useEffect(() => {
    if (fontList.length) {
      setSelectFont({
        value: fontList[0],
        name: fontList[0]
      });
    }
  }, [fontList]);

  useEffect(() => {
    setSelectFont(
      selectedTextBoxObject?.fontFamily
        ? {
            value: selectedTextBoxObject?.fontFamily,
            name: selectedTextBoxObject?.fontFamily
          }
        : {
            value: fontList[0],
            name: fontList[0]
          }
    );
    setFontSizeValue(String(selectedTextBoxObject?.fontSize));
    setBold(selectedTextBoxObject?.fontWeight === 'bold');
    setItalic(selectedTextBoxObject?.fontStyle === 'italic');
    setUnderline(selectedTextBoxObject?.underline ?? false);
    setStrikethrough(selectedTextBoxObject?.linethrough ?? false);
    if (selectedTextBoxObject?.text && /[a-zA-Z]/.test(selectedTextBoxObject.text)) {
      setUppercase(selectedTextBoxObject?.text === selectedTextBoxObject?.text?.toUpperCase());
    } else {
      setUppercase(false);
    }
    setAlign(selectedTextBoxObject?.textAlign as 'left' | 'center' | 'right');
    setSpacing(selectedTextBoxObject?.charSpacing ?? 0);
    setLineHeight(selectedTextBoxObject?.lineHeight ?? 1.16);
    setBeforeSpacing(selectedTextBoxObject?.charSpacing ?? 0);
    setBeforeLineHeight(selectedTextBoxObject?.lineHeight ?? 1.16);
    setColor(
      selectedTextBoxObject?.fill
        ? {
            hex: ColorService.toHex(selectedTextBoxObject.fill as string),
            rgb: ColorService.hex2rgb(selectedTextBoxObject.fill as string),
            hsv: ColorService.rgb2hsv(ColorService.hex2rgb(selectedTextBoxObject.fill as string))
          }
        : {
            hex: theme.color.black,
            rgb: {
              r: 0,
              g: 0,
              b: 0,
              a: 1
            },
            hsv: {
              h: 0,
              s: 0,
              v: 0,
              a: 1
            }
          }
    );
    setBeforeColor((selectedTextBoxObject?.fill as string) || theme.color.black);
    setStrokeWidth(selectedTextBoxObject?.strokeWidth ?? 0);
    if (selectedTextBoxObject?.shadow) {
      const shadow = selectedTextBoxObject.shadow as Shadow;
      const offsetX = Number(shadow.offsetX);
      const offsetY = Number(shadow.offsetY);
      const blur = Number(shadow.blur);
      const opacity = Number(shadow.color!.split(' ')[3].replace(')', '')) * 100;
      const adjustedOffsetY = Number(Math.sqrt(offsetX * offsetX + offsetY * offsetY).toFixed(0));
      const angleInRadians = Math.acos(offsetY / adjustedOffsetY);
      let angleInDegrees = (angleInRadians * 180) / Math.PI;
      if (offsetX > 0) {
        angleInDegrees = 360 - angleInDegrees;
      }

      setShadowDirection(Number(Math.round(angleInDegrees).toFixed(0)));
      setShadowDirectionX(offsetX);
      setShadowDirectionY(offsetY);
      setShadowBlur(Number(blur.toFixed(0)));
      setShadowOpacity(Number(opacity.toFixed(0)));
      setShadowDistance(adjustedOffsetY);
    } else {
      setShadowDirection(0);
      setShadowDirectionX(0);
      setShadowDirectionY(0);
      setShadowBlur(0);
      setShadowOpacity(0);
      setShadowDistance(0);
    }
  }, [selectedTextBoxObject]);

  const handleFontFamily = (item: IOption) => {
    if (item.value === selectFont.value) {
      return;
    }
    setSelectFont(item);
    selectedTextBoxObject?.set({
      fontFamily: String(item.value)
    });
    selectedTextBoxObject?._clearCache();
    canvas?.renderAll();
    handleHistorySave('fontFamily');
  };

  const handleFontSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = formatter.onlyNumber(e.target.value);
    setFontSizeValue(value);
  };

  const handleFontSizeUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (fontSizeValue) {
      // text box 리사이징
      handleFontBoxResize(fontSizeValue, Number(fontSizeValue) / selectedTextBoxObject!.fontSize!);
    }
  };

  const handleFontBoxResize = (editFontSizeValue: string, editWidthRatio: number) => {
    const currentWidth = selectedTextBoxObject?.get('width') as number;
    const currentHeight = selectedTextBoxObject?.get('height') as number;
    setFontSizeValue(String(editFontSizeValue));
    selectedTextBoxObject?.set({
      fontSize: Number(editFontSizeValue),
      scaleX: 1,
      scaleY: 1,
      width: currentWidth * editWidthRatio,
      height: currentHeight * editWidthRatio
    });
    selectedTextBoxObject?._clearCache();
    canvas?.renderAll();
  };

  const handlePlusFontSize = () => {
    if (fontSizeValue === '999') {
      return;
    }
    setFontSizeValue(String(Number(fontSizeValue) + 1));
    handleFontBoxResize(
      String(Number(fontSizeValue) + 1),
      (Number(fontSizeValue) + 1) / selectedTextBoxObject!.fontSize!
    );
    handleHistorySave('fontSize');
  };

  const handleMinusFontSize = () => {
    if (fontSizeValue === '1') {
      return;
    }
    setFontSizeValue(String(Number(fontSizeValue) - 1));
    handleFontBoxResize(
      String(Number(fontSizeValue) - 1),
      (Number(fontSizeValue) - 1) / selectedTextBoxObject!.fontSize!
    );
    handleHistorySave('fontSize');
  };

  const handleColorPaletteOpen = () => {
    setColorPaletteOpen((prev) => !prev);
  };

  const handleColorPaletteClose = () => {
    if (color.hex !== beforeColor) {
      setBeforeColor(color.hex);
      handleHistorySave('fontColor');
    }
    setColorPaletteOpen(false);
  };

  useOnClickOutside(colorRef, handleColorPaletteClose);

  const handleColor = (selectColor: IColor) => {
    selectedTextBoxObject?.set({ fill: selectColor.hex });
    selectedTextBoxObject?._clearCache();
    canvas?.renderAll();
    setColor(selectColor);
  };

  const handleTextBold = () => {
    selectedTextBoxObject?.set({
      fontFamily: selectedTextBoxObject?.fontFamily,
      fontWeight: bold ? 'normal' : 'bold'
    });
    selectedTextBoxObject?._clearCache();
    canvas?.renderAll();
    setBold((prev) => !prev);
    handleHistorySave('fontWeight');
  };

  const handleTextItalic = () => {
    selectedTextBoxObject?.set({
      fontStyle: italic ? 'normal' : 'italic'
    });
    selectedTextBoxObject?._clearCache();
    canvas?.renderAll();
    setItalic((prev) => !prev);
    handleHistorySave('fontStyle');
  };

  const handleTextUnderline = () => {
    selectedTextBoxObject?.set({
      underline: underline ? false : true
    });
    selectedTextBoxObject?._clearCache();
    canvas?.renderAll();
    setUnderline((prev) => !prev);
    handleHistorySave('underline');
  };

  const handleTextStrikethrough = () => {
    selectedTextBoxObject?.set({
      linethrough: strikethrough ? false : true
    });
    selectedTextBoxObject?._clearCache();
    canvas?.renderAll();
    setStrikethrough((prev) => !prev);
    handleHistorySave('linethrough');
  };

  const handleTextUppercase = () => {
    selectedTextBoxObject?.set({
      text: uppercase
        ? selectedTextBoxObject?.text?.toLowerCase()
        : selectedTextBoxObject.text?.toUpperCase()
    });
    selectedTextBoxObject?._clearCache();
    canvas?.renderAll();
    setUppercase((prev) => !prev);
    handleHistorySave('text');
  };

  const handleTextAlignOpen = () => {
    setAlignOpen((prev) => !prev);
  };

  const handleTextShadowOpen = () => {
    setShadowOpen((prev) => !prev);
  };

  const handleTextAlignClose = () => {
    setAlignOpen(false);
  };

  useOnClickOutside(alignRef, handleTextAlignClose);

  const handleAlign = (selectedAlign: 'left' | 'center' | 'right') => {
    selectedTextBoxObject?.set({
      textAlign: selectedAlign
    });
    selectedTextBoxObject?._clearCache();
    canvas?.renderAll();
    setAlign(selectedAlign);
    setAlignOpen(false);
    handleHistorySave('textAlign');
  };

  const handleLetterSpacing = (value: number) => {
    const newValue = formatter.onlyNumberAndMinus(String(value));
    selectedTextBoxObject?.set({
      charSpacing: Number(newValue)
    });
    selectedTextBoxObject?._clearCache();
    canvas?.renderAll();
    setSpacing(Number(newValue));
  };

  const handleLineHeight = (value: number) => {
    const newValue = formatter.onlyNumberAndDot(String(value));
    selectedTextBoxObject?.set({
      lineHeight: Number(newValue)
    });
    selectedTextBoxObject?._clearCache();
    canvas?.renderAll();
    setLineHeight(Number(newValue));
  };

  const handleStrokeWidth = (value: number) => {
    const newValue = formatter.onlyNumber(String(value));
    selectedTextBoxObject?.set({
      stroke: theme.color.black,
      strokeWidth: Number(newValue)
    });
    selectedTextBoxObject?._clearCache();
    canvas?.renderAll();
    setStrokeWidth(Number(newValue));
  };

  const handleTextSpacingOpen = () => {
    setSpacingOpen((prev) => !prev);
  };

  const handleTextSpacingClose = async () => {
    if (spacing !== beforeSpacing || lineHeight !== beforeLineHeight) {
      setBeforeSpacing(spacing);
      setBeforeLineHeight(lineHeight);
      handleHistorySave('spacing');
    }
    setSpacingOpen(false);
  };

  const handleShadowDirection = (value: number) => {
    const newValue = formatter.onlyNumber(String(value));

    const angleInRadians = (value * Math.PI) / 180;
    const offsetX = shadowDistance * Math.cos(angleInRadians);
    const offsetY = shadowDistance * Math.sin(angleInRadians);

    // Negate the values to go clockwise
    const adjustedOffsetX = Math.abs(offsetX) < 1e-10 ? 0 : offsetX;
    const adjustedOffsetY = Math.abs(offsetY) < 1e-10 ? 0 : -offsetY;
    selectedTextBoxObject?.set({
      shadow: `rgba(0, 0, 0, ${
        shadowOpacity / 100
      }) ${adjustedOffsetY}px ${adjustedOffsetX}px ${shadowBlur}px`
    });
    selectedTextBoxObject?._clearCache();
    canvas?.renderAll();
    setShadowDirection(Number(newValue));
    setShadowDirectionX(adjustedOffsetX);
    setShadowDirectionY(adjustedOffsetY);
  };

  const handleShadowDistance = (value: number) => {
    const newValue = formatter.onlyNumber(String(value));

    const angleInRadians = (shadowDirection * Math.PI) / 180;

    const offsetX = Number(newValue) * Math.cos(angleInRadians);
    const offsetY = Number(newValue) * Math.sin(angleInRadians);

    const adjustedOffsetX = Math.abs(offsetX) < 1e-10 ? 0 : offsetX;
    const adjustedOffsetY = Math.abs(offsetY) < 1e-10 ? 0 : -offsetY;
    selectedTextBoxObject?.set({
      shadow: `rgba(0, 0, 0, ${
        shadowOpacity / 100
      }) ${adjustedOffsetY}px ${adjustedOffsetX}px ${shadowBlur}px`
    });
    selectedTextBoxObject?._clearCache();
    canvas?.renderAll();
    setShadowDistance(Number(newValue));
    setShadowDirectionX(adjustedOffsetX);
    setShadowDirectionY(adjustedOffsetY);
  };

  const handleShadowOpacity = (value: number) => {
    const newValue = formatter.onlyNumber(String(value));
    selectedTextBoxObject?.set({
      shadow: `rgba(0, 0, 0, ${
        Number(newValue) / 100
      }) ${shadowDirectionY}px ${shadowDirectionX}px ${shadowBlur}px`
    });
    selectedTextBoxObject?._clearCache();
    canvas?.renderAll();
    setShadowOpacity(Number(newValue));
  };

  const handleShadowBlur = (value: number) => {
    const newValue = formatter.onlyNumber(String(value));
    selectedTextBoxObject?.set({
      shadow: `rgba(0, 0, 0, ${
        shadowOpacity / 100
      }) ${shadowDirectionY}px ${shadowDirectionX}px ${newValue}px`
    });
    selectedTextBoxObject?._clearCache();
    canvas?.renderAll();
    setShadowBlur(Number(newValue));
  };

  const handleShadowClose = () => {
    setShadowOpen(false);
  };

  useOnClickOutside(spacingRef, handleTextSpacingClose);

  useOnClickOutside(shadowRef, handleShadowClose);

  return (
    <MenuTextWrapper style={style} fontFamily={String(selectFont.value)}>
      <Box display="flex" alignItems="center">
        <Select
          selectOption={selectFont}
          list={fontList.map((item) => ({
            value: item,
            name: item
          }))}
          size="xs"
          width="200px"
          onClick={handleFontFamily}
          className="font-list"
        />
        <Box display="flex" alignItems="center" ml="12px" className="font-size">
          <button className="font-btn" onClick={handleMinusFontSize}>
            <Minus width="18" height="28" color={theme.color.black} />
          </button>
          <form onSubmit={handleFontSizeUpdate}>
            <input
              type="text"
              className="font-input"
              value={fontSizeValue}
              onChange={handleFontSize}
            />
          </form>
          <button className="font-btn plus" onClick={handlePlusFontSize}>
            <Plus width="18" height="28" color={theme.color.black} />
          </button>
        </Box>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Box
            width="28px"
            height="28px"
            cursor="pointer"
            mr="12px"
            alignItems="center"
            justifyContent="center"
            display="flex"
            position="relative"
            ref={colorRef}
          >
            <Box
              display="flex"
              className={classNames('canvas-option', { active: colorPaletteOpen })}
            >
              <CanvasTextColor width="28" height="28" onClick={handleColorPaletteOpen} />
            </Box>
            {colorPaletteOpen ? (
              <ColorPalette color={color} handleColor={handleColor} />
            ) : (
              <Box position="absolute" top="37px" zIndex={1} className="tooltip">
                <Tooltip text={language === 'en' ? 'Color' : '글자 색상'} />
              </Box>
            )}
          </Box>
          <Box
            width="28px"
            height="28x"
            cursor="pointer"
            mr="12px"
            alignItems="center"
            justifyContent="center"
            display="flex"
            onClick={handleTextBold}
            position="relative"
          >
            <Box display="flex" className={classNames('canvas-option', { active: bold })}>
              <CanvasTextBold width="28" height="28" />
            </Box>
            <Box position="absolute" top="37px" zIndex={1} className="tooltip">
              <Tooltip text={language === 'en' ? 'Bold' : '진하게'} />
            </Box>
          </Box>
          <Box
            width="28px"
            height="28x"
            cursor="pointer"
            mr="12px"
            alignItems="center"
            justifyContent="center"
            display="flex"
            onClick={handleTextItalic}
            position="relative"
          >
            <Box display="flex" className={classNames('canvas-option', { active: italic })}>
              <CanvasTextItalic width="28" height="28" />
            </Box>
            <Box position="absolute" top="37px" zIndex={1} className="tooltip">
              <Tooltip text={language === 'en' ? 'Italic' : '기울임'} />
            </Box>
          </Box>
          <Box
            width="28px"
            height="28x"
            cursor="pointer"
            mr="12px"
            alignItems="center"
            justifyContent="center"
            display="flex"
            position="relative"
            onClick={handleTextUnderline}
          >
            <Box display="flex" className={classNames('canvas-option', { active: underline })}>
              <CanvasTextUnderline width="28" height="28" />
            </Box>
            <Box position="absolute" top="37px" zIndex={1} className="tooltip">
              <Tooltip text={language === 'en' ? 'Underline' : '밑줄'} />
            </Box>
          </Box>
          <Box
            width="28px"
            height="28x"
            cursor="pointer"
            mr="12px"
            alignItems="center"
            justifyContent="center"
            display="flex"
            position="relative"
            onClick={handleTextStrikethrough}
          >
            <Box display="flex" className={classNames('canvas-option', { active: strikethrough })}>
              <CanvasTextStrikethrough width="28" height="28" />
            </Box>
            <Box position="absolute" top="37px" zIndex={1} className="tooltip">
              <Tooltip text={language === 'en' ? 'Strikethrough' : '취소선'} />
            </Box>
          </Box>
          <Box
            width="28px"
            height="28x"
            cursor="pointer"
            mr="12px"
            alignItems="center"
            justifyContent="center"
            display="flex"
            onClick={handleTextUppercase}
            position="relative"
          >
            <Box display="flex" className={classNames('canvas-option', { active: uppercase })}>
              <CanvasTextUppercase width="28" height="28" />
            </Box>
            <Box position="absolute" top="37px" zIndex={1} className="tooltip">
              <Tooltip text={language === 'en' ? 'Uppercase' : '대문자'} />
            </Box>
          </Box>
          <Box
            width="28px"
            height="28px"
            cursor="pointer"
            mr="12px"
            alignItems="center"
            justifyContent="center"
            display="flex"
            position="relative"
            ref={shadowRef}
          >
            <Box
              display="flex"
              className={classNames('canvas-option', { active: shadowOpen })}
              onClick={handleTextShadowOpen}
            >
              <CanvasTextStrike width="28" height="28" />
            </Box>

            {shadowOpen ? (
              <Stroke
                strokeWidth={strokeWidth}
                handleStrokeWidth={handleStrokeWidth}
                shadowDistance={shadowDistance}
                handleShadowDistance={handleShadowDistance}
                shadowOpacity={shadowOpacity}
                handleShadowOpacity={handleShadowOpacity}
                shadowDirection={shadowDirection}
                handleShadowDirection={handleShadowDirection}
                shadowBlur={shadowBlur}
                handleShadowBlur={handleShadowBlur}
                language={language}
              />
            ) : (
              <Box position="absolute" top="37px" zIndex={1} className="tooltip">
                <Tooltip text={language === 'en' ? 'Effect' : '글자 효과'} />
              </Box>
            )}
          </Box>
          <Box width="1px" height="24px" backgroundColor={theme.color.gray200} m="0px 24px" />
          <Box
            width="28px"
            height="28px"
            cursor="pointer"
            mr="12px"
            alignItems="center"
            justifyContent="center"
            display="flex"
            position="relative"
            ref={alignRef}
          >
            <Box
              display="flex"
              className={classNames('canvas-option', { active: alignOpen })}
              onClick={handleTextAlignOpen}
            >
              {align === 'left' && <CanvasTextAlignLeft width="28" height="28" />}
              {align === 'center' && <CanvasTextAlignCenter width="28" height="28" />}
              {align === 'right' && <CanvasTextAlignRight width="28" height="28" />}
            </Box>
            {alignOpen ? (
              <Align align={align} handleAlign={handleAlign} />
            ) : (
              <Box position="absolute" top="37px" zIndex={1} className="tooltip">
                <Tooltip text={language === 'en' ? 'Align' : '정렬'} />
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
            ref={spacingRef}
          >
            <Box
              display="flex"
              className={classNames('canvas-option', { active: spacingOpen })}
              onClick={handleTextSpacingOpen}
            >
              <CanvasTextSpacing width="28" height="28" />
            </Box>

            {spacingOpen ? (
              <Spacing
                letterSpacing={spacing}
                lineHeight={lineHeight}
                handleLetterSpacing={handleLetterSpacing}
                handleLineHeight={handleLineHeight}
                language={language}
              />
            ) : (
              <Box position="absolute" top="37px" zIndex={1} className="tooltip">
                <Tooltip text={language === 'en' ? 'Spacing' : '간격'} />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      <MenuCommon />
    </MenuTextWrapper>
  );
};

export default forwardRef<MenuTextRef, IMenuText>(MenuText);
