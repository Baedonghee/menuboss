import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { ColorService, IColor, useColor } from 'react-color-palette';
import classNames from 'classnames';
import styled from 'styled-components';
import { useOnClickOutside } from 'usehooks-ts';

import { useCanvas } from '../../../../providers';
import { theme } from '../../../../styles/theme';
import { formatter } from '../../../../utils';
import { Box, Tooltip, Typography } from '../../..';
import {
  CanvasAngle,
  CanvasShapeBorderColor,
  CanvasShapeBorderWidth,
  CanvasShapeColor,
  CanvasShapeLock,
  CanvasShapeUnlock
} from '../../../SVG/icons';
import MenuCommon from '../Common';
import ColorPalette from '../Text/ColorPalette';

import BorderWidth from './BorderWidth';

interface IMenuShape {
  style?: React.CSSProperties;
}

export interface MenuShapeRef {
  handleShapeResize: () => void;
}

const MenuShapeWrapper = styled.div`
  padding: 0px 24px;
  height: 64px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .font-input {
    width: 80px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.color.black};
    font-weight: ${({ theme }) => theme.fontWeight.normal};
    font-size: ${({ theme }) => theme.fontSize.text12};
    border: 1px solid ${({ theme }) => theme.color.gray200};
    text-align: center;
    border-radius: 4px;
  }
`;

const MenuShape: React.ForwardRefRenderFunction<MenuShapeRef, IMenuShape> = ({ style }, ref) => {
  const {
    canvas,
    selectedCircleObject,
    selectedRectObject,
    selectedTriangleObject,
    selectedImageObject,
    handleHistorySave,
    language
  } = useCanvas();
  const [widthValue, setWidthValue] = useState<string>('0');
  const [heightValue, setHeightValue] = useState<string>('0');
  const [angleValue, setAngleValue] = useState<string>('0°');
  const backgroundColorRef = useRef<HTMLDivElement | null>(null);
  const [backgroundColor, setBackgroundColor] = useColor(theme.color.white);
  const [beforeBackgroundColor, setBeforeBackgroundColor] = useState<string>(theme.color.white);
  const [backgroundColorPaletteOpen, setBackgroundColorPaletteOpen] = useState<boolean>(false);
  const borderColorRef = useRef<HTMLDivElement | null>(null);
  const [borderColor, setBorderColor] = useColor(theme.color.black);
  const [beforeBorderColor, setBeforeBorderColor] = useState<string>(theme.color.black);
  const [borderColorPaletteOpen, setBorderColorPaletteOpen] = useState<boolean>(false);
  const borderWidthRef = useRef<HTMLDivElement | null>(null);
  const [borderWidth, setBorderWidth] = useState<number>(0);
  const [beforeBorderWidth, setBeforeBorderWidth] = useState<number>(0);
  const [borderWidthOpen, setBorderWidthOpen] = useState<boolean>(false);
  const [isRadio, setIsRadio] = useState<boolean>(false);

  useImperativeHandle(ref, () => ({
    handleShapeResize
  }));

  useEffect(() => {
    if (selectedCircleObject) {
      setBackgroundColor(
        selectedCircleObject.fill
          ? {
              hex: ColorService.toHex(selectedCircleObject.fill as string),
              rgb: ColorService.hex2rgb(selectedCircleObject.fill as string),
              hsv: ColorService.rgb2hsv(ColorService.hex2rgb(selectedCircleObject.fill as string))
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
      setBeforeBackgroundColor(
        (selectedCircleObject.fill as string)
          ? ColorService.toHex(selectedCircleObject.fill as string)
          : theme.color.white
      );
      setBorderColor(
        selectedCircleObject.stroke
          ? {
              hex: ColorService.toHex(selectedCircleObject.stroke as string),
              rgb: ColorService.hex2rgb(selectedCircleObject.stroke as string),
              hsv: ColorService.rgb2hsv(ColorService.hex2rgb(selectedCircleObject.stroke as string))
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
      setBeforeBorderColor((selectedCircleObject.stroke as string) || theme.color.black);
      setWidthValue(String(Math.round(selectedCircleObject.width! * selectedCircleObject.scaleX!)));
      setHeightValue(
        String(Math.round(selectedCircleObject.height! * selectedCircleObject.scaleY!))
      );
      setAngleValue(`${String(selectedCircleObject.angle)}°`);
      setBorderWidth(selectedCircleObject.strokeWidth || 0);
    }
  }, [selectedCircleObject]);

  useEffect(() => {
    if (selectedRectObject) {
      setBackgroundColor(
        selectedRectObject.fill
          ? {
              hex: ColorService.toHex(selectedRectObject.fill as string),
              rgb: ColorService.hex2rgb(selectedRectObject.fill as string),
              hsv: ColorService.rgb2hsv(ColorService.hex2rgb(selectedRectObject.fill as string))
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
      setBeforeBackgroundColor(
        (selectedRectObject.fill as string)
          ? ColorService.toHex(selectedRectObject.fill as string)
          : theme.color.white
      );
      setBorderColor(
        selectedRectObject.stroke
          ? {
              hex: ColorService.toHex(selectedRectObject.stroke as string),
              rgb: ColorService.hex2rgb(selectedRectObject.stroke as string),
              hsv: ColorService.rgb2hsv(ColorService.hex2rgb(selectedRectObject.stroke as string))
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
      setBeforeBorderColor((selectedRectObject.stroke as string) || theme.color.black);
      setWidthValue(String(Math.round(selectedRectObject.width! * selectedRectObject.scaleX!)));
      setHeightValue(String(Math.round(selectedRectObject.height! * selectedRectObject.scaleY!)));
      setAngleValue(`${String(selectedRectObject.angle)}°`);
      setBorderWidth(selectedRectObject.strokeWidth || 0);
    }
  }, [selectedRectObject]);

  useEffect(() => {
    if (selectedTriangleObject) {
      setBackgroundColor(
        selectedTriangleObject.fill
          ? {
              hex: ColorService.toHex(selectedTriangleObject.fill as string),
              rgb: ColorService.hex2rgb(selectedTriangleObject.fill as string),
              hsv: ColorService.rgb2hsv(ColorService.hex2rgb(selectedTriangleObject.fill as string))
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
      setBeforeBackgroundColor(
        (selectedTriangleObject.fill as string)
          ? ColorService.toHex(selectedTriangleObject.fill as string)
          : theme.color.white
      );
      setBorderColor(
        selectedTriangleObject.stroke
          ? {
              hex: ColorService.toHex(selectedTriangleObject.stroke as string),
              rgb: ColorService.hex2rgb(selectedTriangleObject.stroke as string),
              hsv: ColorService.rgb2hsv(
                ColorService.hex2rgb(selectedTriangleObject.stroke as string)
              )
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
      setBeforeBorderColor((selectedTriangleObject.stroke as string) || theme.color.black);
      setWidthValue(
        String(Math.round(selectedTriangleObject.width! * selectedTriangleObject.scaleX!))
      );
      setHeightValue(
        String(Math.round(selectedTriangleObject.height! * selectedTriangleObject.scaleY!))
      );
      setAngleValue(`${String(selectedTriangleObject.angle)}°`);
      setBorderWidth(selectedTriangleObject.strokeWidth || 0);
    }
  }, [selectedTriangleObject]);

  useEffect(() => {
    if (selectedImageObject) {
      setBackgroundColor(
        selectedImageObject.fill
          ? {
              hex: ColorService.toHex(selectedImageObject.fill as string),
              rgb: ColorService.hex2rgb(selectedImageObject.fill as string),
              hsv: ColorService.rgb2hsv(ColorService.hex2rgb(selectedImageObject.fill as string))
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
      setBeforeBackgroundColor(
        (selectedImageObject.fill as string)
          ? ColorService.toHex(selectedImageObject.fill as string)
          : theme.color.white
      );
      setBorderColor(
        selectedImageObject.stroke
          ? {
              hex: ColorService.toHex(selectedImageObject.stroke as string),
              rgb: ColorService.hex2rgb(selectedImageObject.stroke as string),
              hsv: ColorService.rgb2hsv(ColorService.hex2rgb(selectedImageObject.stroke as string))
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
      setBeforeBorderColor((selectedImageObject.stroke as string) || theme.color.black);
      setWidthValue(String(Math.round(selectedImageObject.width! * selectedImageObject.scaleX!)));
      setHeightValue(String(Math.round(selectedImageObject.height! * selectedImageObject.scaleY!)));
      setAngleValue(`${String(selectedImageObject.angle)}°`);
      setBorderWidth(selectedImageObject.strokeWidth || 0);
    }
  }, [selectedImageObject]);

  const handleShapeResize = () => {
    if (selectedCircleObject) {
      const currentWidth = selectedCircleObject.width! * selectedCircleObject.scaleX!;
      const currentHeight = selectedCircleObject.height! * selectedCircleObject.scaleY!;
      const newWidth = Math.round(currentWidth);
      const newHeight = Math.round(currentHeight);
      setWidthValue(String(newWidth));
      setHeightValue(String(newHeight));
    } else if (selectedRectObject) {
      const currentWidth = selectedRectObject.width! * selectedRectObject.scaleX!;
      const currentHeight = selectedRectObject.height! * selectedRectObject.scaleY!;
      const newWidth = Math.round(currentWidth);
      const newHeight = Math.round(currentHeight);
      setWidthValue(String(newWidth));
      setHeightValue(String(newHeight));
    } else if (selectedTriangleObject) {
      const currentWidth = selectedTriangleObject.width! * selectedTriangleObject.scaleX!;
      const currentHeight = selectedTriangleObject.height! * selectedTriangleObject.scaleY!;
      const newWidth = Math.round(currentWidth);
      const newHeight = Math.round(currentHeight);
      setWidthValue(String(newWidth));
      setHeightValue(String(newHeight));
    } else if (selectedImageObject) {
      const currentWidth = selectedImageObject.width! * selectedImageObject.scaleX!;
      const currentHeight = selectedImageObject.height! * selectedImageObject.scaleY!;
      const newWidth = Math.round(currentWidth);
      const newHeight = Math.round(currentHeight);
      setWidthValue(String(newWidth));
      setHeightValue(String(newHeight));
    }
  };

  const handleWidthValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (canvas) {
      const newValue = formatter.onlyNumber(e.target.value);
      if (selectedCircleObject && !selectedCircleObject.lockMovementX) {
        setWidthValue(String(newValue));
      } else if (selectedRectObject && !selectedRectObject.lockMovementX) {
        setWidthValue(String(newValue));
      } else if (selectedTriangleObject && !selectedTriangleObject.lockMovementX) {
        setWidthValue(String(newValue));
      } else if (selectedImageObject && !selectedImageObject.lockMovementX) {
        setWidthValue(String(newValue));
      }
    }
  };

  const handleWidthUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (canvas) {
      if (selectedCircleObject && !selectedCircleObject.lockMovementX) {
        if (isRadio) {
          const newWidth = Number(widthValue);
          const ratio = newWidth / (selectedCircleObject.width! * selectedCircleObject.scaleX!);
          const newScaleX = selectedCircleObject.scaleX! * ratio;
          const newScaleY = selectedCircleObject.scaleY! * ratio;
          setHeightValue(
            String(selectedCircleObject.height! * selectedCircleObject.scaleY! * ratio)
          );
          selectedCircleObject.set({ scaleX: newScaleX, scaleY: newScaleY });
        } else {
          const newWidth = Number(widthValue);
          selectedCircleObject.set({
            scaleX: newWidth / (selectedCircleObject.width! * selectedCircleObject.scaleX!)
          });
        }
        canvas.renderAll();
      } else if (selectedRectObject && !selectedRectObject.lockMovementX) {
        if (isRadio) {
          const newWidth = Number(widthValue);
          const ratio = newWidth / (selectedRectObject.width! * selectedRectObject.scaleX!);
          const newScaleX = selectedRectObject.scaleX! * ratio;
          const newScaleY = selectedRectObject.scaleY! * ratio;
          setHeightValue(String(selectedRectObject.height! * selectedRectObject.scaleY! * ratio));
          selectedRectObject.set({ scaleX: newScaleX, scaleY: newScaleY });
        } else {
          const newWidth = Number(widthValue);
          selectedRectObject.set({
            scaleX: newWidth / (selectedRectObject.width! * selectedRectObject.scaleX!)
          });
        }
        canvas.renderAll();
      } else if (selectedTriangleObject && !selectedTriangleObject.lockMovementX) {
        if (isRadio) {
          const newWidth = Number(widthValue);
          const ratio = newWidth / (selectedTriangleObject.width! * selectedTriangleObject.scaleX!);
          const newScaleX = selectedTriangleObject.scaleX! * ratio;
          const newScaleY = selectedTriangleObject.scaleY! * ratio;
          setHeightValue(
            String(selectedTriangleObject.height! * selectedTriangleObject.scaleY! * ratio)
          );
          selectedTriangleObject.set({ scaleX: newScaleX, scaleY: newScaleY });
        } else {
          const newWidth = Number(widthValue);
          selectedTriangleObject.set({
            scaleX: newWidth / (selectedTriangleObject.width! * selectedTriangleObject.scaleX!)
          });
        }
        canvas.renderAll();
      } else if (selectedImageObject && !selectedImageObject.lockMovementX) {
        if (isRadio) {
          const newWidth = Number(widthValue);
          const ratio = newWidth / (selectedImageObject.width! * selectedImageObject.scaleX!);
          const newScaleX = selectedImageObject.scaleX! * ratio;
          const newScaleY = selectedImageObject.scaleY! * ratio;
          setHeightValue(String(selectedImageObject.height! * selectedImageObject.scaleY! * ratio));
          selectedImageObject.set({ scaleX: newScaleX, scaleY: newScaleY });
        } else {
          const newWidth = Number(widthValue);
          selectedImageObject.set({
            scaleX: newWidth / (selectedImageObject.width! * selectedImageObject.scaleX!)
          });
        }
        canvas.renderAll();
      }
      handleHistorySave('width');
    }
  };

  const handleHeightValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (canvas) {
      if (selectedCircleObject && !selectedCircleObject.lockMovementX) {
        const newValue = formatter.onlyNumber(e.target.value);
        setHeightValue(String(newValue));
      } else if (selectedRectObject && !selectedRectObject.lockMovementX) {
        const newValue = formatter.onlyNumber(e.target.value);
        setHeightValue(String(newValue));
      } else if (selectedTriangleObject && !selectedTriangleObject.lockMovementX) {
        const newValue = formatter.onlyNumber(e.target.value);
        setHeightValue(String(newValue));
      } else if (selectedImageObject && !selectedImageObject.lockMovementX) {
        const newValue = formatter.onlyNumber(e.target.value);
        setHeightValue(String(newValue));
      }
    }
  };

  const handleAngleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (canvas) {
      const newValue = formatter.onlyNumber(e.target.value);
      if (Number(newValue) > 360 || Number(newValue) < 0) {
        return;
      }
      if (selectedCircleObject && !selectedCircleObject.lockMovementX) {
        setAngleValue(`${String(newValue)}°`);
      } else if (selectedRectObject && !selectedRectObject.lockMovementX) {
        setAngleValue(`${String(newValue)}°`);
      } else if (selectedTriangleObject && !selectedTriangleObject.lockMovementX) {
        setAngleValue(`${String(newValue)}°`);
      } else if (selectedImageObject && !selectedImageObject.lockMovementX) {
        setAngleValue(`${String(newValue)}°`);
      }
    }
  };

  const handleHeightUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (canvas) {
      if (selectedCircleObject && !selectedCircleObject.lockMovementY) {
        if (isRadio) {
          const newHeight = Number(heightValue);
          const ratio = newHeight / (selectedCircleObject.height! * selectedCircleObject.scaleY!);
          const newScaleX = selectedCircleObject.scaleX! * ratio;
          const newScaleY = selectedCircleObject.scaleY! * ratio;
          setWidthValue(String(selectedCircleObject.width! * selectedCircleObject.scaleX! * ratio));
          selectedCircleObject.set({ scaleX: newScaleX, scaleY: newScaleY });
        } else {
          const newHeight = Number(heightValue);
          selectedCircleObject.set({
            scaleY: newHeight / (selectedCircleObject.height! * selectedCircleObject.scaleY!)
          });
        }
        canvas.renderAll();
      } else if (selectedRectObject && !selectedRectObject.lockMovementY) {
        if (isRadio) {
          const newHeight = Number(heightValue);
          const ratio = newHeight / (selectedRectObject.height! * selectedRectObject.scaleY!);
          const newScaleX = selectedRectObject.scaleX! * ratio;
          const newScaleY = selectedRectObject.scaleY! * ratio;
          setWidthValue(String(selectedRectObject.width! * selectedRectObject.scaleX! * ratio));
          selectedRectObject.set({ scaleX: newScaleX, scaleY: newScaleY });
        } else {
          const newHeight = Number(heightValue);
          selectedRectObject.set({
            scaleY: newHeight / (selectedRectObject.height! * selectedRectObject.scaleY!)
          });
        }
        canvas.renderAll();
      } else if (selectedTriangleObject && !selectedTriangleObject.lockMovementY) {
        if (isRadio) {
          const newHeight = Number(heightValue);
          const ratio =
            newHeight / (selectedTriangleObject.height! * selectedTriangleObject.scaleY!);
          const newScaleX = selectedTriangleObject.scaleX! * ratio;
          const newScaleY = selectedTriangleObject.scaleY! * ratio;
          setWidthValue(
            String(selectedTriangleObject.width! * selectedTriangleObject.scaleX! * ratio)
          );
          selectedTriangleObject.set({ scaleX: newScaleX, scaleY: newScaleY });
        } else {
          const newHeight = Number(heightValue);
          selectedTriangleObject.set({
            scaleY: newHeight / (selectedTriangleObject.height! * selectedTriangleObject.scaleY!)
          });
        }
        canvas.renderAll();
      } else if (selectedImageObject && !selectedImageObject.lockMovementY) {
        if (isRadio) {
          const newHeight = Number(heightValue);
          const ratio = newHeight / (selectedImageObject.height! * selectedImageObject.scaleY!);
          const newScaleX = selectedImageObject.scaleX! * ratio;
          const newScaleY = selectedImageObject.scaleY! * ratio;
          setWidthValue(String(selectedImageObject.width! * selectedImageObject.scaleX! * ratio));
          selectedImageObject.set({ scaleX: newScaleX, scaleY: newScaleY });
        } else {
          const newHeight = Number(heightValue);
          selectedImageObject.set({
            scaleY: newHeight / (selectedImageObject.height! * selectedImageObject.scaleY!)
          });
        }
        canvas.renderAll();
      }
      handleHistorySave('height');
    }
  };

  const handleAngleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (canvas) {
      if (selectedCircleObject && !selectedCircleObject.lockMovementY) {
        selectedCircleObject.set({ angle: Number(formatter.onlyNumber(angleValue)) });
        canvas.renderAll();
      } else if (selectedRectObject && !selectedRectObject.lockMovementY) {
        selectedRectObject.set({ angle: Number(formatter.onlyNumber(angleValue)) });
        canvas.renderAll();
      } else if (selectedTriangleObject && !selectedTriangleObject.lockMovementY) {
        selectedTriangleObject.set({ angle: Number(formatter.onlyNumber(angleValue)) });
        canvas.renderAll();
      } else if (selectedImageObject && !selectedImageObject.lockMovementY) {
        selectedImageObject.set({ angle: Number(formatter.onlyNumber(angleValue)) });
        canvas.renderAll();
      }
      handleHistorySave('angle');
    }
  };

  const handleBackgroundColor = (selectColor: IColor) => {
    if (canvas) {
      if (selectedCircleObject) {
        selectedCircleObject.set({ fill: selectColor.hex });
      } else if (selectedRectObject) {
        selectedRectObject.set({ fill: selectColor.hex });
      } else if (selectedTriangleObject) {
        selectedTriangleObject.set({ fill: selectColor.hex });
      } else if (selectedImageObject) {
        selectedImageObject.set({ fill: selectColor.hex });
      }
      canvas.renderAll();
      setBackgroundColor(selectColor);
    }
  };

  const handleBackgroundColorPaletteOpen = () => {
    if (canvas) {
      if (selectedCircleObject && !selectedCircleObject.lockMovementX) {
        setBackgroundColorPaletteOpen(!backgroundColorPaletteOpen);
      } else if (selectedRectObject && !selectedRectObject.lockMovementX) {
        setBackgroundColorPaletteOpen(!backgroundColorPaletteOpen);
      } else if (selectedTriangleObject && !selectedTriangleObject.lockMovementX) {
        setBackgroundColorPaletteOpen(!backgroundColorPaletteOpen);
      } else if (selectedImageObject && !selectedImageObject.lockMovementX) {
        setBackgroundColorPaletteOpen(!backgroundColorPaletteOpen);
      }
    }
  };

  const handleBackgroundColorPaletteClose = () => {
    if (backgroundColor.hex !== beforeBackgroundColor) {
      setBeforeBackgroundColor(backgroundColor.hex);
      handleHistorySave('backgroundColor');
    }
    setBackgroundColorPaletteOpen(false);
  };

  useOnClickOutside(backgroundColorRef, handleBackgroundColorPaletteClose);

  const handleBorderColor = (selectColor: IColor) => {
    if (canvas) {
      if (selectedCircleObject) {
        selectedCircleObject.set({ stroke: selectColor.hex });
      } else if (selectedRectObject) {
        selectedRectObject.set({ stroke: selectColor.hex });
      } else if (selectedTriangleObject) {
        selectedTriangleObject.set({ stroke: selectColor.hex });
      } else if (selectedImageObject) {
        selectedImageObject.set({ stroke: selectColor.hex });
      }
      canvas.renderAll();
      setBorderColor(selectColor);
    }
  };

  const handleBorderColorPaletteOpen = () => {
    if (canvas) {
      if (selectedCircleObject && !selectedCircleObject.lockMovementX) {
        setBorderColorPaletteOpen(!borderColorPaletteOpen);
      } else if (selectedRectObject && !selectedRectObject.lockMovementX) {
        setBorderColorPaletteOpen(!borderColorPaletteOpen);
      } else if (selectedTriangleObject && !selectedTriangleObject.lockMovementX) {
        setBorderColorPaletteOpen(!borderColorPaletteOpen);
      } else if (selectedImageObject && !selectedImageObject.lockMovementX) {
        setBorderColorPaletteOpen(!borderColorPaletteOpen);
      }
    }
  };

  const handleBorderColorPaletteClose = () => {
    if (borderColor.hex !== beforeBorderColor) {
      setBeforeBorderColor(borderColor.hex);
      handleHistorySave('borderColor');
    }
    setBorderColorPaletteOpen(false);
  };

  useOnClickOutside(borderColorRef, handleBorderColorPaletteClose);

  const handleBorderWidth = (value: number) => {
    const newValue = formatter.onlyNumber(String(value));
    if (canvas) {
      if (selectedCircleObject) {
        selectedCircleObject.set({ strokeWidth: Number(newValue) });
      } else if (selectedRectObject) {
        selectedRectObject.set({ strokeWidth: Number(newValue) });
      } else if (selectedTriangleObject) {
        selectedTriangleObject.set({ strokeWidth: Number(newValue) });
      } else if (selectedImageObject) {
        selectedImageObject.set({ strokeWidth: Number(newValue) });
      }
      canvas.renderAll();
      setBorderWidth(Number(newValue));
    }
  };

  const handleBorderWidthOpen = () => {
    if (canvas) {
      if (selectedCircleObject && !selectedCircleObject.lockMovementX) {
        setBorderWidthOpen(!borderWidthOpen);
      } else if (selectedRectObject && !selectedRectObject.lockMovementX) {
        setBorderWidthOpen(!borderWidthOpen);
      } else if (selectedTriangleObject && !selectedTriangleObject.lockMovementX) {
        setBorderWidthOpen(!borderWidthOpen);
      } else if (selectedImageObject && !selectedImageObject.lockMovementX) {
        setBorderWidthOpen(!borderWidthOpen);
      }
    }
  };

  const handleBorderWidthClose = () => {
    if (borderWidth !== beforeBorderWidth) {
      setBeforeBorderWidth(borderWidth);
      handleHistorySave('borderWidth');
    }
    setBorderWidthOpen(false);
  };

  useOnClickOutside(borderWidthRef, handleBorderWidthClose);

  const handleIsRadio = () => {
    if (canvas) {
      if (selectedCircleObject && !selectedCircleObject.lockMovementX) {
        setIsRadio((prev) => !prev);
      } else if (selectedRectObject && !selectedRectObject.lockMovementX) {
        setIsRadio((prev) => !prev);
      } else if (selectedTriangleObject && !selectedTriangleObject.lockMovementX) {
        setIsRadio((prev) => !prev);
      } else if (selectedImageObject && !selectedImageObject.lockMovementX) {
        setIsRadio((prev) => !prev);
      }
    }
  };

  return (
    <MenuShapeWrapper style={style}>
      <Box display="flex" alignItems="center">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="28px"
          height="28px"
          mr="16px"
          position="relative"
          cursor="pointer"
          ref={backgroundColorRef}
        >
          <Box
            display="flex"
            className={classNames('canvas-option', { active: false })}
            onClick={handleBackgroundColorPaletteOpen}
          >
            <CanvasShapeColor width="28" height="28" />
          </Box>
          {backgroundColorPaletteOpen ? (
            <ColorPalette color={backgroundColor} handleColor={handleBackgroundColor} />
          ) : (
            <Box
              position="absolute"
              top="37px"
              zIndex={1}
              className="tooltip"
              left={language === 'en' ? '0px' : 'none'}
            >
              <Tooltip
                text={language === 'en' ? 'BackgroundColor' : '색상'}
                align={language === 'en' ? 'left' : 'center'}
              />
            </Box>
          )}
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="28px"
          height="28px"
          mr="16px"
          position="relative"
          cursor="pointer"
          ref={borderColorRef}
        >
          <Box
            display="flex"
            className={classNames('canvas-option', { active: false })}
            onClick={handleBorderColorPaletteOpen}
          >
            <CanvasShapeBorderColor width="28" height="28" />
          </Box>
          {borderColorPaletteOpen ? (
            <ColorPalette color={borderColor} handleColor={handleBorderColor} />
          ) : (
            <Box position="absolute" top="37px" zIndex={1} className="tooltip">
              <Tooltip text={language === 'en' ? 'BorderColor' : '선 색상'} />
            </Box>
          )}
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="28px"
          height="28px"
          mr="16px"
          position="relative"
          cursor="pointer"
          ref={borderWidthRef}
        >
          <Box
            display="flex"
            className={classNames('canvas-option', { active: false })}
            onClick={handleBorderWidthOpen}
          >
            <CanvasShapeBorderWidth width="28" height="28" />
          </Box>
          {borderWidthOpen ? (
            <BorderWidth
              borderWidth={borderWidth}
              handleBorderWidth={handleBorderWidth}
              language={language}
            />
          ) : (
            <Box position="absolute" top="37px" zIndex={1} className="tooltip">
              <Tooltip text={language === 'en' ? 'BorderWidth' : '선 굵기'} />
            </Box>
          )}
        </Box>
      </Box>
      <Box display="flex" alignItems="center">
        <Box display="flex" alignItems="center">
          <Typography
            fontSize={theme.fontSize.text14}
            fontWeight={theme.fontWeight.semiBold}
            color={theme.color.gray900}
            mr="8px"
          >
            {language === 'en' ? 'W' : '가로'}
          </Typography>
          <form onSubmit={handleWidthUpdate}>
            <input
              type="text"
              className="font-input"
              value={widthValue}
              onChange={handleWidthValue}
            />
          </form>
        </Box>
        <Box
          width="20px"
          height="20px"
          display="flex"
          alignItems="center"
          m="0px 12px"
          cursor="pointer"
          className="canvas-option"
          onClick={handleIsRadio}
        >
          {isRadio ? (
            <CanvasShapeLock width="20" height="20" />
          ) : (
            <CanvasShapeUnlock width="20" height="20" />
          )}
        </Box>
        <Box display="flex" alignItems="center">
          <Typography
            fontSize={theme.fontSize.text14}
            fontWeight={theme.fontWeight.semiBold}
            color={theme.color.gray900}
            mr="8px"
          >
            {language === 'en' ? 'H' : '세로'}
          </Typography>
          <form onSubmit={handleHeightUpdate}>
            <input
              type="text"
              className="font-input"
              value={heightValue}
              onChange={handleHeightValue}
            />
          </form>
        </Box>
        <Box display="flex" alignItems="center" ml="24px">
          <CanvasAngle
            width="24"
            height="24"
            color={theme.color.gray900}
            style={{ marginRight: '8px' }}
          />
          <form onSubmit={handleAngleUpdate}>
            <input
              type="text"
              className="font-input"
              value={angleValue}
              onChange={handleAngleValue}
            />
          </form>
        </Box>
      </Box>
      <MenuCommon />
    </MenuShapeWrapper>
  );
};

export default forwardRef<MenuShapeRef, IMenuShape>(MenuShape);
