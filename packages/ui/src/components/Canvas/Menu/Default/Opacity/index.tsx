import React from 'react';

import { theme } from '../../../../../styles/theme';
import { Box, Typography } from '../../../..';

interface IOpacity {
  opacity: number;
  handleOpacity: (value: number) => void;
  language: 'en' | 'ko';
}

const Opacity: React.FC<IOpacity> = ({ opacity, handleOpacity, language }) => {
  return (
    <Box
      position="absolute"
      top="36px"
      right="0px"
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
          {language === 'en' ? 'Opacity' : '투명도'}
        </Typography>
        <input
          type="text"
          className="input-range-text"
          value={opacity}
          onChange={(e) => handleOpacity(Number(e.target.value))}
        />
      </Box>
      <Box>
        <input
          type="range"
          className="input-range"
          value={opacity}
          onChange={(e) => handleOpacity(Number(e.target.value))}
          min={0}
          max={100}
          step={1}
          style={{
            background: `linear-gradient(to right, ${theme.color.gray500} 0%, ${
              theme.color.gray500
            } ${(100 / 100) * opacity}%, ${theme.color.gray100} ${(100 / 100) * opacity}%, ${
              theme.color.gray100
            } 100%)`
          }}
        />
      </Box>
    </Box>
  );
};

export default Opacity;
