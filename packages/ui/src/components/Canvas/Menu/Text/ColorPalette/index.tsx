import React, { useCallback, useEffect, useState } from 'react';
import { Alpha, ColorService, Hue, IColor, Saturation } from 'react-color-palette';
import styled from 'styled-components';
import useEyeDropper from 'use-eye-dropper';

import { theme } from '../../../../../styles/theme';
import { formatter } from '../../../../../utils';
import { Box, Input } from '../../../..';
import { CanvasTextColorPicker } from '../../../../SVG/icons';

const ColorPaletteWrapper = styled.div<{ top: string }>`
  position: absolute;
  top: ${({ top }) => top};
  left: 0px;
  width: 320px;
  z-index: 3;
  padding: 16px 24px;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 8px;
  box-shadow:
    4px 0px 8px 0px rgba(0, 0, 0, 0.2),
    0px 4px 8px 0px rgba(0, 0, 0, 0.2);
  .color-control {
    .color-input {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-right: 0;
      text-align: center;
    }
    .opacity-input {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      text-align: center;
      padding: 0;
    }
  }
  .all-color {
    .rcp-interactive {
      height: 160px;
      .rcp-saturation {
        border-radius: 4px;
      }
    }
  }
  .hue,
  .alpha {
    .rcp-interactive {
      width: 224px;
      height: 12px;
    }
  }
`;

interface IColorPalette {
  color: IColor;
  handleColor: (color: IColor) => void;
  top?: string;
}

const ColorPalette: React.FC<IColorPalette> = ({ top = '36px', color, handleColor }) => {
  const [colorValue, setColorValue] = useState(color.hex);
  const [opacityValue, setOpacityValue] = useState(`${String(Math.round(color.rgb.a * 100))}%`);
  const [isEyedropper, setIsEyedropper] = useState(false);

  const { open } = useEyeDropper();

  useEffect(() => {
    setColorValue(color.hex);
    setOpacityValue(`${String(Math.round(color.rgb.a * 100))}%`);
  }, [color.hex]);

  const handleColorValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setColorValue('#');
      return;
    }
    if (e.target.value.length > 7) {
      return;
    }
    if (e.target.value.length === 7) {
      const colors = {
        hex: e.target.value,
        rgb: ColorService.hex2rgb(e.target.value),
        hsv: ColorService.rgb2hsv(ColorService.hex2rgb(e.target.value))
      };
      handleColor(colors);
    }
    setColorValue(e.target.value);
  };

  const handleEyedropperClick = useCallback(() => {
    // Using async/await (can be used as a promise as-well)
    const openPicker = async () => {
      try {
        setIsEyedropper(true);
        const color = await open();
        const colors = {
          hex: ColorService.toHex(color.sRGBHex),
          rgb: ColorService.hex2rgb(color.sRGBHex),
          hsv: ColorService.rgb2hsv(ColorService.hex2rgb(color.sRGBHex))
        };
        handleColor(colors);
        setIsEyedropper(false);
      } catch (e) {
        setIsEyedropper(false);
        console.log(e);
      }
    };
    openPicker();
  }, [handleColor, open, setIsEyedropper]);

  const handleOpacityValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = formatter.onlyNumber(e.target.value);
    if (!newValue) {
      setOpacityValue('#');
      return;
    }
    if (newValue.length > 3 || Number(newValue) > 100) {
      setOpacityValue('100%');
      return;
    }
    const newRgb = {
      r: color.rgb.r,
      g: color.rgb.g,
      b: color.rgb.b,
      a: Number(newValue) / 100
    };
    const colors = {
      hex: ColorService.rgb2hex(newRgb),
      rgb: newRgb,
      hsv: ColorService.rgb2hsv(newRgb)
    };
    handleColor(colors);
    setOpacityValue(`${String(Math.round(Number(newValue)))}%`);
  };

  return (
    <ColorPaletteWrapper top={top}>
      <Box>
        <Box className="all-color">
          <Saturation height={160} color={color} onChange={handleColor} />
        </Box>
        <Box display="flex" alignItems="center" mt="20px">
          <Box
            display="flex"
            alignItems="center"
            width="24px"
            height="24px"
            mr="24px"
            backgroundColor={isEyedropper ? theme.color.gray200 : theme.color.white}
            borderRadius="4px"
            className="canvas-option"
          >
            <CanvasTextColorPicker width="24" height="24" onClick={handleEyedropperClick} />
          </Box>
          <Box>
            <Box display="flex" className="hue">
              <Hue color={color} onChange={handleColor} />
            </Box>
            <Box display="flex" className="alpha" mt="12px">
              <Alpha color={color} onChange={handleColor} />
            </Box>
          </Box>
        </Box>
        <Box
          display="flex"
          mt="20px"
          alignItems="center"
          justifyContent="space-between"
          cursor="default"
        >
          <Box
            width="28px"
            height="28px"
            borderRadius="4px"
            backgroundColor={color.hex}
            cursor="default"
          ></Box>
          <Box display="flex" className="color-control">
            <Input
              width="100px"
              size="xs"
              value={colorValue.substring(0, 7)}
              name="color"
              className="color-input"
              onChange={handleColorValue}
            />
            <Input
              width="55px"
              size="xs"
              value={opacityValue}
              className="opacity-input"
              name="opacity"
              onChange={handleOpacityValue}
            />
          </Box>
          {/* <Box
            width="120px"
            height="32px"
            borderRadius="4px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            border={`1px solid ${theme.color.gray300}`}
            textAlign="center"
            color={theme.color.gray900}
            backgroundColor={theme.color.white}
            fontSize={theme.fontSize.text12}
            cursor="text"
          >
            {color.hex}
          </Box> */}
        </Box>
      </Box>
    </ColorPaletteWrapper>
  );
};

export default ColorPalette;
