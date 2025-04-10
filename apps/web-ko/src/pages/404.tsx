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
          404 에러
        </Typography>
        <Typography
          fontSize={theme.fontSize.text18}
          fontWeight={theme.fontWeight.semiBold}
          color={theme.color.gray900}
          mt="16px"
          textAlign="center"
        >
          페이지를 찾을 수 없습니다
        </Typography>
        <Typography
          fontSize={theme.fontSize.text14}
          color={theme.color.gray500}
          mt="12px"
          textAlign="center"
          lineHeight="19px"
        >
          찾으시려는 페이지 주소가 잘못 입력되었거나, 주소 변경 혹은 삭제로 인해 사용할 수 없습니다
          <br />
          입력하신 주소가 올바른 주소인지 한번 더 확인해주세요
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
