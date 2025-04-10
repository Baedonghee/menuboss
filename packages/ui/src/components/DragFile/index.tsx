import React from 'react';

import { useAlert } from '../../providers';
import { theme } from '../../styles/theme';
import Box from '../Box';
import Upload2 from '../SVG/icons/upload2';
import Typography from '../Typography';

const DragFile = () => {
  const { language } = useAlert();
  return (
    <Box
      position="absolute"
      top="0"
      left="0"
      width="100%"
      height="100%"
      display="flex"
      minHeight="548px"
      justifyContent="center"
      alignItems="center"
      borderRadius="8px"
      backgroundColor="rgba(0, 0, 0, 0.25)"
    >
      <Box textAlign="center">
        <Upload2 width="28" height="28" color={theme.color.white} />
        <Typography mt="8px" fontSize={theme.fontSize.text18} color={theme.color.white}>
          {language === 'en' ? (
            <>
              Drop files
              <br />
              here to upload content
            </>
          ) : (
            <>
              파일을 여기에 끌어다 놓아서
              <br />
              업로드해주세요
            </>
          )}
        </Typography>
      </Box>
    </Box>
  );
};

export default DragFile;
