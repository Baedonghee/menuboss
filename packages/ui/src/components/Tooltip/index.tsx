import React from 'react';
import styled from 'styled-components';

import { theme } from '../../styles/theme';
import Box from '../Box';
import TooltipArrow from '../SVG/icons/tooltip-arrow';
import Typography from '../Typography';

const TooltipWrapper = styled(Box)<{ align: 'left' | 'center' | 'right' }>`
  box-shadow:
    4px 0px 8px 0px rgba(0, 0, 0, 0.2),
    0px 4px 8px 0px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  svg {
    position: absolute;
    top: -5px;
    ${({ align }) =>
      align === 'left' &&
      `
      left: 9px;
    `}
    ${({ align }) =>
      align === 'center' &&
      `
      left: 50%;
      transform: translateX(-50%);
    `}
    ${({ align }) =>
      align === 'right' &&
      `
      right: 16px;
    `}
  }
`;

interface ITooltip {
  text: string;
  align?: 'left' | 'center' | 'right';
}

const Tooltip: React.FC<ITooltip> = ({ text, align = 'center' }) => {
  return (
    <TooltipWrapper
      position="relative"
      p="4px 8px"
      backgroundColor={theme.color.black}
      align={align}
    >
      <TooltipArrow width="11" height="5" color={theme.color.black} />
      <Typography
        fontSize={theme.fontSize.text14}
        color={theme.color.white}
        wordBreak="keep-all"
        whiteSpace="nowrap"
      >
        {text}
      </Typography>
    </TooltipWrapper>
  );
};

export default Tooltip;
