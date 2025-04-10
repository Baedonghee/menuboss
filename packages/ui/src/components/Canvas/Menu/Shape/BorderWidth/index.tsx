import React from 'react';

import { theme } from '../../../../../styles/theme';
import { Box, Typography } from '../../../..';

interface IOpacity {
  borderWidth: number;
  handleBorderWidth: (value: number) => void;
  language: 'en' | 'ko';
}

const BorderWidth: React.FC<IOpacity> = ({ borderWidth, handleBorderWidth, language }) => {
  return (
    <Box
      position="absolute"
      top="36px"
      left="0px"
      width="248px"
      height="84px"
      zIndex={3}
      p="16px 24px"
      backgroundColor={theme.color.white}
      borderRadius="8px"
      boxShadow="4px 0px 8px 0px rgba(0, 0, 0, 0.20), 0px 4px 8px 0px rgba(0, 0, 0, 0.20)"
    >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography fontSize={theme.fontSize.text14} color={theme.color.gray900}>
          {language === 'en' ? 'Border width' : '선 굵기'}
        </Typography>
        <input
          type="text"
          className="input-range-text"
          value={borderWidth}
          onChange={(e) => handleBorderWidth(Number(e.target.value))}
        />
      </Box>
      <Box>
        <input
          type="range"
          className="input-range"
          value={borderWidth}
          onChange={(e) => handleBorderWidth(Number(e.target.value))}
          min={0}
          max={100}
          step={1}
          style={{
            background: `linear-gradient(to right, ${theme.color.gray500} 0%, ${
              theme.color.gray500
            } ${(100 / 100) * borderWidth}%, ${theme.color.gray100} ${
              (100 / 100) * borderWidth
            }%, ${theme.color.gray100} 100%)`
          }}
        />
      </Box>
    </Box>
  );
};

export default BorderWidth;
