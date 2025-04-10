import React from 'react';
import { Box, Button, Image, Typography } from '@repo/ui/components';
import { theme } from '@repo/ui/theme';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { authUserSelector } from '@/state/auth';
import { ADMIN_PATH, PATH } from '@/utils/path';

const MainMakeWrapper = styled(Box)`
  @media ${({ theme }) => theme.device.mobile} {
    .container {
      width: 100%;
      padding: 52px 0;
      height: auto;
      justify-content: center;
      .title {
        text-align: center;
        font-size: ${({ theme }) => theme.fontSize.text24};
        line-height: 31px;
      }
    }
  }
`;

const MainMake = () => {
  const me = useRecoilValue(authUserSelector);

  return (
    <MainMakeWrapper backgroundColor={theme.color.primary500} position="relative">
      <Box
        width="1320px"
        margin="0 auto"
        height="439px"
        alignItems="center"
        display="flex"
        className="container"
      >
        <Box>
          <Typography
            fontSize="40px"
            fontWeight={theme.fontWeight.semiBold}
            color={theme.color.white}
            className="title"
          >
            Make your own
            <br />
            Digital signage right now!
          </Typography>
          <Box mt="40px" className="button-wrapper">
            <Link href={me ? ADMIN_PATH.SCREENS : PATH.LOGIN}>
              <Button width="280px" variant="outline" size="l">
                Start the 14-day free trial now
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
      <Box position="absolute" display="flex" top={0} right={0} className="mobile-hide">
        <Image src="/images/main/make.png" width={901} height={439} alt="dashboard" />
      </Box>
    </MainMakeWrapper>
  );
};

export default MainMake;
