import React from 'react';
import { Box, Button, Image, Typography } from '@repo/ui/components';
import { theme } from '@repo/ui/theme';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { authUserSelector } from '@/state/auth';
import { ADMIN_PATH, PATH } from '@/utils/path';

const HomepageIntroductionWrapper = styled(Box)`
  @media ${({ theme }) => theme.device.mobile} {
    padding: 80px 24px;
    margin-top: 60px;
    .container {
      width: 100%;
      display: block;
      margin: 0;
      .introduce {
        margin-top: 60px;
        .title {
          text-align: center;
          font-size: ${({ theme }) => theme.fontSize.text28};
          line-height: 36px;
        }
        .description {
          margin-top: 12px;
          text-align: center;
          font-size: ${({ theme }) => theme.fontSize.text16};
          line-height: 21px;
        }
        .button-wrapper {
          margin-top: 32px;
          justify-content: center;
          button {
            width: 140px;
            font-size: ${({ theme }) => theme.fontSize.text14};
            height: 48px;
          }
        }
      }
    }
  }
  .highlight-left {
    position: absolute;
    top: -73px;
    left: -49px;
  }
  .highlight-right {
    position: absolute;
    top: -73px;
    right: -49px;
  }
`;

const HomepageIntroduction = () => {
  const me = useRecoilValue(authUserSelector);

  return (
    <HomepageIntroductionWrapper pt="80px">
      <Box
        className="container"
        width="1320px"
        m="120px auto"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexDirection="row-reverse"
      >
        <Box display="flex">
          <Image src="/images/main/cover.png" alt="main intro" width={660} height={400} />
        </Box>
        <Box className="introduce">
          <Box
            as="h1"
            color={theme.color.gray900}
            fontSize="52px"
            fontWeight={theme.fontWeight.bold}
            lineHeight="64px"
            className="title"
          >
            디지털 메뉴판 제작부터
            <br />
            TV 연동까지 메뉴보스
          </Box>
          <Typography
            as="h2"
            mt="16px"
            fontSize={theme.fontSize.text18}
            color={theme.color.gray900}
            className="description"
          >
            메뉴보스를 통해 쉽고 편리한 나만의 특별한
            <br className="pc-hide" /> [디지털 메뉴판]을 제작해보세요
          </Typography>
          <Box mt="32px" display="flex" className="button-wrapper">
            <Link href={me ? ADMIN_PATH.SCREENS : PATH.LOGIN}>
              <Button size="l" borderRadius="100px" width="180px" mr="16px">
                지금 바로 시작하기
              </Button>
            </Link>
            <a href="https://forms.gle/EEknaFE1xq9qRBk36" target="_blank" rel="noreferrer">
              <Button size="l" borderRadius="100px" width="180px" variant="outline">
                서비스 도입 문의하기
              </Button>
            </a>
          </Box>
        </Box>
      </Box>
    </HomepageIntroductionWrapper>
  );
};

export default HomepageIntroduction;
