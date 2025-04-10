import React from 'react';

import { theme } from '../../styles/theme';

import Box from '../Box';

interface IScreenOnOff {
  on: boolean;
}

const ScreenOnOff: React.FC<IScreenOnOff> = ({ on }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="36px"
      height="24px"
      borderRadius="100px"
      color={on ? theme.color.white : theme.color.gray400}
      backgroundColor={on ? theme.color.green400 : theme.color.gray200}
      fontSize={theme.fontSize.text12}
      fontWeight={theme.fontWeight.semiBold}
    >
      {on ? 'On' : 'Off'}
    </Box>
  );
};

export default ScreenOnOff;
