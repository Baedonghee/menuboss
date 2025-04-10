import React from 'react';
import styled from 'styled-components';

import { theme } from '../../../../../styles/theme';
import Box from '../../../../Box';
import Typography from '../../../../Typography';

const StrokeWrapper = styled.div`
  position: absolute;
  top: 36px;
  left: 0px;
  width: 328px;
  height: 279px;
  z-index: 3;
  padding: 16px 24px;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 8px;
  box-shadow:
    4px 0px 8px 0px rgba(0, 0, 0, 0.2),
    0px 4px 8px 0px rgba(0, 0, 0, 0.2);
`;

interface IStroke {
  strokeWidth: number;
  handleStrokeWidth: (value: number) => void;
  shadowDistance: number;
  handleShadowDistance: (value: number) => void;
  shadowOpacity: number;
  handleShadowOpacity: (value: number) => void;
  shadowDirection: number;
  handleShadowDirection: (value: number) => void;
  shadowBlur: number;
  handleShadowBlur: (value: number) => void;
  language: 'en' | 'ko';
}

const Stroke: React.FC<IStroke> = ({
  strokeWidth,
  handleStrokeWidth,
  shadowDistance,
  handleShadowDistance,
  shadowOpacity,
  handleShadowOpacity,
  shadowDirection,
  handleShadowDirection,
  shadowBlur,
  handleShadowBlur,
  language
}) => {
  return (
    <StrokeWrapper>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography fontSize={theme.fontSize.text14} color={theme.color.gray900}>
          {language === 'en' ? 'Stroke width' : '선 굵기'}
        </Typography>
        <input
          type="text"
          className="input-range-text"
          value={strokeWidth}
          onChange={(e) => handleStrokeWidth(Number(e.target.value))}
        />
      </Box>
      <Box>
        <input
          type="range"
          className="input-range"
          value={strokeWidth}
          min={0}
          max={100}
          step={1}
          style={{
            background: `linear-gradient(to right, ${theme.color.gray500} 0%, ${
              theme.color.gray500
            } ${(100 / 100) * strokeWidth}%, ${theme.color.gray100} ${
              (100 / 100) * strokeWidth
            }%, ${theme.color.gray100} 100%)`
          }}
          onChange={(e) => handleStrokeWidth(Number(e.target.value))}
        />
      </Box>
      <Box display="flex" alignItems="center" justifyContent="space-between" mt="24px">
        <Typography fontSize={theme.fontSize.text14} color={theme.color.gray900}>
          {language === 'en' ? 'Drop Shadow' : '그림자'}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="space-between" mt="16px">
        <Box width="128px">
          <Box display="flex" alignItems="center" justifyContent="space-between" mb="8px">
            <Typography fontSize={theme.fontSize.text12} color={theme.color.gray700}>
              {language === 'en' ? 'Distance' : '거리'}
            </Typography>
            <input
              type="text"
              className="input-range-text"
              value={shadowDistance}
              onChange={(e) => handleShadowDistance(Number(e.target.value))}
            />
          </Box>
          <input
            type="range"
            className="input-range"
            value={shadowDistance}
            onChange={(e) => handleShadowDistance(Number(e.target.value))}
            min={0}
            max={100}
            step={1}
            style={{
              background: `linear-gradient(to right, ${theme.color.gray500} 0%, ${
                theme.color.gray500
              } ${(100 / 100) * shadowDistance}%, ${theme.color.gray100} ${
                (100 / 100) * shadowDistance
              }%, ${theme.color.gray100} 100%)`
            }}
          />
        </Box>
        <Box width="128px">
          <Box display="flex" alignItems="center" justifyContent="space-between" mb="8px">
            <Typography fontSize={theme.fontSize.text12} color={theme.color.gray700}>
              {language === 'en' ? 'Opacity' : '투명도'}
            </Typography>
            <input
              type="text"
              className="input-range-text"
              value={shadowOpacity}
              onChange={(e) => handleShadowOpacity(Number(e.target.value))}
            />
          </Box>
          <input
            type="range"
            className="input-range"
            value={shadowOpacity}
            onChange={(e) => handleShadowOpacity(Number(e.target.value))}
            min={0}
            max={100}
            step={1}
            style={{
              background: `linear-gradient(to right, ${theme.color.gray500} 0%, ${
                theme.color.gray500
              } ${(100 / 100) * shadowOpacity}%, ${theme.color.gray100} ${
                (100 / 100) * shadowOpacity
              }%, ${theme.color.gray100} 100%)`
            }}
          />
        </Box>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="space-between" mt="16px">
        <Box width="128px">
          <Box display="flex" alignItems="center" justifyContent="space-between" mb="8px">
            <Typography fontSize={theme.fontSize.text12} color={theme.color.gray700}>
              {language === 'en' ? 'Direction' : '방향'}
            </Typography>
            <input
              type="text"
              className="input-range-text"
              value={shadowDirection}
              onChange={(e) => handleShadowDirection(Number(e.target.value))}
            />
          </Box>
          <input
            type="range"
            className="input-range"
            value={shadowDirection}
            onChange={(e) => handleShadowDirection(Number(e.target.value))}
            min={0}
            max={360}
            step={1}
            style={{
              background: `linear-gradient(to right, ${theme.color.gray500} 0%, ${
                theme.color.gray500
              } ${(shadowDirection / 360) * 100}%, ${theme.color.gray100} ${
                (shadowDirection / 360) * 100
              }%, ${theme.color.gray100} 100%)`
            }}
          />
        </Box>
        <Box width="128px">
          <Box display="flex" alignItems="center" justifyContent="space-between" mb="8px">
            <Typography fontSize={theme.fontSize.text12} color={theme.color.gray700}>
              {language === 'en' ? 'Blur' : '흐림'}
            </Typography>
            <input
              type="text"
              className="input-range-text"
              value={shadowBlur}
              onChange={(e) => handleShadowBlur(Number(e.target.value))}
            />
          </Box>
          <input
            type="range"
            className="input-range"
            value={shadowBlur}
            onChange={(e) => handleShadowBlur(Number(e.target.value))}
            min={0}
            max={100}
            step={1}
            style={{
              background: `linear-gradient(to right, ${theme.color.gray500} 0%, ${
                theme.color.gray500
              } ${(100 / 100) * shadowBlur}%, ${theme.color.gray100} ${
                (100 / 100) * shadowBlur
              }%, ${theme.color.gray100} 100%)`
            }}
          />
        </Box>
      </Box>
    </StrokeWrapper>
  );
};

export default Stroke;
