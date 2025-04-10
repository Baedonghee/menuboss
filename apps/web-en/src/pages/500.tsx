import React from 'react';
import { Box, Button, Typography } from '@repo/ui/components';
import { useHistory } from '@repo/ui/hooks';
import { Icon404 } from '@repo/ui/icons';
import { theme } from '@repo/ui/theme';

import { PATH } from '@/utils/path';

const Custom404 = () => {
  const { back } = useHistory();

  const onBack = () => {
    back(PATH.MAIN);
  };

  return (
    <Box p="277px 0px 100px">
      <Box width="1320px" m="0px auto">
        <Box display="flex" justifyContent="center">
          <Icon404 width="160" height="160" />
        </Box>
        <Typography
          as="h1"
          mt="40px"
          fontSize="48px"
          fontWeight={theme.fontWeight.semiBold}
          color={theme.color.gray900}
          textAlign="center"
        >
          500 Error
        </Typography>
        <Typography
          fontSize={theme.fontSize.text24}
          fontWeight={theme.fontWeight.bold}
          color={theme.color.gray900}
          mt="16px"
          textAlign="center"
        >
          Internal Server Error
        </Typography>
        <Typography
          fontSize={theme.fontSize.text18}
          color={theme.color.gray500}
          mt="12px"
          textAlign="center"
          lineHeight="23px"
        >
          Sorry, a system error has occurred and the page cannot be displayed
          <br />
          Please refresh the page or try again in a moment
        </Typography>
        <Box display="flex" justifyContent="center">
          <Button size="l" width="360px" mt="32px" onClick={onBack}>
            Back to home
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Custom404;
