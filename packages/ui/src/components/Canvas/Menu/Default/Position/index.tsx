import React from 'react';

import { theme } from '../../../../../styles/theme';
import { Box, Typography } from '../../../..';
import {
  CanvasBack,
  CanvasBackward,
  CanvasForward,
  CanvasFront,
  CanvasHorizontal,
  CanvasVertical
} from '../../../../SVG/icons';

interface IPosition {
  handlePosition: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    type: 'forward' | 'backward' | 'front' | 'back' | 'horizontal' | 'vertical'
  ) => void;
  language: 'en' | 'ko';
}

const Position: React.FC<IPosition> = ({ handlePosition, language }) => {
  return (
    <Box
      position="absolute"
      top="36px"
      right="0px"
      width={language === 'en' ? '284px' : '352px'}
      height="234px"
      zIndex={3}
      p="16px 24px"
      backgroundColor={theme.color.white}
      borderRadius="8px"
      boxShadow="4px 0px 8px 0px rgba(0, 0, 0, 0.20), 0px 4px 8px 0px rgba(0, 0, 0, 0.20)"
      cursor="text"
    >
      <Box>
        <Typography fontSize={theme.fontSize.text14} color={theme.color.gray900}>
          {language === 'en' ? 'Layers' : '순서'}
        </Typography>
        <Box mt="16px">
          <Box display="flex" alignItems="center">
            <Box
              display="flex"
              alignItems="center"
              width={language === 'en' ? '108px' : '140px'}
              height="32px"
              className="canvas-option"
              p="4px 8px"
              mr="24px"
              onClick={(e) => handlePosition(e, 'forward')}
              cursor="pointer"
            >
              <CanvasForward width="24" height="24" />
              <Box
                fontSize={theme.fontSize.text12}
                color={theme.color.gray900}
                ml="8px"
                userSelect="none"
              >
                {language === 'en' ? 'Forward' : '맨 앞으로 가져오기'}
              </Box>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              width={language === 'en' ? '108px' : '140px'}
              height="32px"
              p="4px 8px"
              className="canvas-option"
              onClick={(e) => handlePosition(e, 'backward')}
              cursor="pointer"
            >
              <CanvasBackward width="24" height="24" />
              <Box
                fontSize={theme.fontSize.text12}
                color={theme.color.gray900}
                ml="8px"
                userSelect="none"
              >
                {language === 'en' ? 'Backward' : '뒤로 보내기'}
              </Box>
            </Box>
          </Box>
          <Box display="flex" alignItems="center" mt="12px">
            <Box
              display="flex"
              alignItems="center"
              width={language === 'en' ? '108px' : '140px'}
              height="32px"
              p="4px 8px"
              className="canvas-option"
              mr="24px"
              onClick={(e) => handlePosition(e, 'front')}
              cursor="pointer"
            >
              <CanvasFront width="24" height="24" />
              <Box
                fontSize={theme.fontSize.text12}
                color={theme.color.gray900}
                ml="8px"
                userSelect="none"
              >
                {language === 'en' ? 'Front' : '앞으로 가져오기'}
              </Box>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              width={language === 'en' ? '108px' : '140px'}
              height="32px"
              p="4px 8px"
              className="canvas-option"
              onClick={(e) => handlePosition(e, 'back')}
              cursor="pointer"
            >
              <CanvasBack width="24" height="24" />
              <Box
                fontSize={theme.fontSize.text12}
                color={theme.color.gray900}
                ml="8px"
                userSelect="none"
              >
                {language === 'en' ? 'Back' : '맨 뒤로 보내기'}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box mt="24px">
        <Typography fontSize={theme.fontSize.text14} color={theme.color.gray900}>
          {language === 'en' ? 'Flip' : '반전'}
        </Typography>
        <Box mt="16px">
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box
              display="flex"
              alignItems="center"
              width={language === 'en' ? '108px' : '140px'}
              height="32px"
              p="4px 8px"
              className="canvas-option"
              mr="24px"
              onClick={(e) => handlePosition(e, 'horizontal')}
              cursor="pointer"
            >
              <CanvasHorizontal width="24" height="24" />
              <Box
                fontSize={theme.fontSize.text12}
                color={theme.color.gray900}
                ml="8px"
                userSelect="none"
              >
                {language === 'en' ? 'Horizontal' : '좌우 반전'}
              </Box>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              width={language === 'en' ? '108px' : '140px'}
              height="32px"
              p="4px 8px"
              className="canvas-option"
              onClick={(e) => handlePosition(e, 'vertical')}
              cursor="pointer"
            >
              <CanvasVertical width="24" height="24" />
              <Box
                fontSize={theme.fontSize.text12}
                color={theme.color.gray900}
                ml="8px"
                userSelect="none"
              >
                {language === 'en' ? 'Vertical' : '상하 반전'}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Position;
