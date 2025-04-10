import React from 'react';
import parse from 'html-react-parser';

import { theme } from '../../styles/theme';

import Box from '../Box';
import Typography from '../Typography';

interface IEmpty {
  icon: React.ReactNode;
  text: string;
  minHeight?: string;
  size?: 's' | 'm';
}

const Empty: React.FC<IEmpty> = ({ icon, text, minHeight = '663px', size = 'm' }) => {
  return (
    <Box
      display="flex"
      width="100%"
      minHeight={minHeight}
      justifyContent="center"
      alignItems="center"
    >
      <Box textAlign="center">
        {icon}
        <Typography
          mt={size === 'm' ? '16px' : '12px'}
          fontSize={size === 'm' ? theme.fontSize.text16 : theme.fontSize.text12}
          color={theme.color.gray400}
          lineHeight="21px"
        >
          {parse(text)}
        </Typography>
      </Box>
    </Box>
  );
};

export default Empty;
