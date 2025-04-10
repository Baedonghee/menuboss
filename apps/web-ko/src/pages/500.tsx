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
          <Icon404 width="100" height="100" />
        </Box>
        <Typography
          as="h1"
          mt="40px"
          fontSize="28px"
          fontWeight={theme.fontWeight.semiBold}
          color={theme.color.gray900}
          textAlign="center"
        >
          500 에러
        </Typography>
        <Typography
          fontSize={theme.fontSize.text18}
          fontWeight={theme.fontWeight.semiBold}
          color={theme.color.gray900}
          mt="16px"
          textAlign="center"
        >
          페이지를 표시할 수 없습니다
        </Typography>
        <Typography
          fontSize={theme.fontSize.text14}
          color={theme.color.gray500}
          mt="12px"
          textAlign="center"
          lineHeight="19px"
        >
          죄송합니다. 시스템 에러가 발생하여 페이지를 표시할 수 없습니다
          <br />
          페이지를 새로 고침하거나, 잠시 후 다시 시도해주세요
        </Typography>
        <Box display="flex" justifyContent="center">
          <Button size="l" width="240px" mt="32px" onClick={onBack}>
            홈으로 돌아가기
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Custom404;
