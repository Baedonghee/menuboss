import React, { useEffect } from 'react';
import styled from 'styled-components';

import { theme } from '../../../styles/theme';
import { Box, Typography } from '../..';
import { CloseLine } from '../../SVG/icons';

const PreviewContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.color.black};
  z-index: 9999;
  overflow-y: auto;
`;

interface IPreview {
  handlePreview: (status: boolean) => void;
  isAlignType: 'Horizontal' | 'Vertical';
  previewImage: string;
  language?: 'en' | 'ko';
}

const Preview: React.FC<IPreview> = ({
  previewImage,
  handlePreview,
  isAlignType,
  language = 'en'
}) => {
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', () => handleResize());
    return () => {
      window.removeEventListener('resize', () => handleResize());
    };
  }, []);

  const handleResize = () => {
    const wireFrame = document.getElementById('wireFrame');
    if (wireFrame) {
      if (isAlignType === 'Horizontal') {
        const newHeight = wireFrame.clientHeight; // 새로운 높이를 가져옴
        const newWidth = newHeight * (16 / 9); // 새로운 가로넓이 계산
        wireFrame.style.width = `${newWidth}px`; // 가로넓이를 설정
      } else {
        const newHeight = wireFrame.clientHeight; // 새로운 높이를 가져옴
        const newWidth = newHeight * (9 / 16); // 새로운 가로넓이 계산
        wireFrame.style.width = `${newWidth}px`; // 가로넓이를 설정
      }
    }
  };

  return (
    <PreviewContainer>
      <Box
        height="80px"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        p="0px 32px"
      >
        <Typography fontSize={theme.fontSize.text24} color={theme.color.white}>
          {language === 'en' ? 'Preview' : '미리보기'}
        </Typography>
        <CloseLine
          width="24"
          height="24"
          color={theme.color.white}
          onClick={() => handlePreview(false)}
          style={{ cursor: 'pointer' }}
        />
      </Box>
      <Box
        width="100%"
        minWidth={isAlignType === 'Horizontal' ? '1300px' : '425px'}
        height="calc(100vh - 80px)"
        display="flex"
        alignItems="center"
        justifyContent="center"
        margin="auto"
        overflow="auto"
      >
        <Box
          height="calc(100vh - 200px)"
          border={`10px solid ${theme.color.gray900}`}
          id="wireFrame"
        >
          <img src={previewImage} style={{ width: '100%', height: '100%' }} alt="preview 이미지" />
        </Box>
      </Box>
    </PreviewContainer>
  );
};

export default Preview;
