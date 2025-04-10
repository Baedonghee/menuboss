import React from 'react';
import styled from 'styled-components';

import { theme } from '../../../../../styles/theme';
import { Box, Typography } from '../../../..';

const SpacingWrapper = styled.div`
  position: absolute;
  top: 36px;
  left: 0px;
  width: 248px;
  height: 160px;
  z-index: 3;
  padding: 16px 24px;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 8px;
  box-shadow:
    4px 0px 8px 0px rgba(0, 0, 0, 0.2),
    0px 4px 8px 0px rgba(0, 0, 0, 0.2);
`;

interface ISpacing {
  letterSpacing: number;
  lineHeight: number;
  handleLetterSpacing: (value: number) => void;
  handleLineHeight: (value: number) => void;
  language: 'en' | 'ko';
}

const Spacing: React.FC<ISpacing> = ({
  letterSpacing,
  lineHeight,
  handleLetterSpacing,
  handleLineHeight,
  language
}) => {
  return (
    <SpacingWrapper>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography fontSize={theme.fontSize.text14} color={theme.color.gray900}>
          {language === 'en' ? 'Letter spacing' : '글자 간격'}
        </Typography>
        <input
          type="text"
          className="input-range-text"
          value={letterSpacing}
          onChange={(e) => handleLetterSpacing(Number(e.target.value))}
        />
      </Box>
      <Box>
        <input
          type="range"
          className="input-range"
          value={letterSpacing}
          onChange={(e) => handleLetterSpacing(Number(e.target.value))}
          min={-100}
          max={100}
          step={1}
          style={{
            background: `linear-gradient(to right, ${theme.color.gray500} 0%, ${
              theme.color.gray500
            } ${((letterSpacing + 100) / 200) * 100}%, ${theme.color.gray100} ${
              ((letterSpacing + 100) / 200) * 100
            }%, ${theme.color.gray100} 100%)`
          }}
        />
      </Box>
      <Box display="flex" alignItems="center" justifyContent="space-between" mt="24px">
        <Typography fontSize={theme.fontSize.text14} color={theme.color.gray900}>
          {language === 'en' ? 'Line height' : '줄 간격'}
        </Typography>
        <input
          type="text"
          className="input-range-text"
          value={lineHeight}
          onChange={(e) => handleLineHeight(Number(e.target.value))}
        />
      </Box>
      <Box>
        <input
          type="range"
          className="input-range"
          value={lineHeight}
          onChange={(e) => handleLineHeight(Number(e.target.value))}
          min={0.5}
          max={2.5}
          step={0.1}
          style={{
            background: `linear-gradient(to right, ${theme.color.gray500} 0%, ${
              theme.color.gray500
            } ${(100 / (2.5 - 0.5)) * (lineHeight - 0.5)}%, ${theme.color.gray100} ${
              (100 / (2.5 - 0.5)) * (lineHeight - 0.5)
            }%, ${theme.color.gray100} 100%)`
          }}
        />
      </Box>
    </SpacingWrapper>
  );
};

export default Spacing;
