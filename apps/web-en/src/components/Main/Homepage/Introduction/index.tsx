import React from 'react';
import { Box, Button, Image, Typography } from '@repo/ui/components';
import { HighlightLeft, HighlightRight, MainHighlight } from '@repo/ui/icons';
import { theme } from '@repo/ui/theme';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { authUserSelector } from '@/state/auth';
import { ADMIN_PATH, PATH } from '@/utils/path';

const HomepageIntroductionWrapper = styled(Box)`
  @media ${({ theme }) => theme.device.mobile} {
    padding: 80px 24px 0px;
    margin-top: 60px;
    .container {
      width: 100%;
      display: block;
      margin: 0;
      .title {
        font-size: ${({ theme }) => theme.fontSize.text28};
      }
      .description {
        margin-top: 16px;
        font-size: ${({ theme }) => theme.fontSize.text16};
      }
      .btn-wrapper {
        margin-top: 32px;
        button {
          width: 140px;
          font-size: ${({ theme }) => theme.fontSize.text14};
          height: 48px;
        }
      }
      .circle {
        width: 112%;
        top: -27px;
        left: -11px;
      }
      .main-image {
        width: 100%;
      }
      .highlight-left {
        position: absolute;
        top: -18px;
        left: -16px;
        width: 20px;
        height: 20px;
      }
      .highlight-right {
        position: absolute;
        top: -18px;
        right: -16px;
        width: 20px;
        height: 20px;
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
      <Box width="1320px" m="80px auto 0" className="container">
        <Box as="h1" textAlign="center" className="introduce">
          <Typography
            as="p"
            fontSize="60px"
            fontWeight={theme.fontWeight.bold}
            color={theme.color.gray900}
            className="title"
          >
            Supreme Quality
          </Typography>
          <Typography
            as="span"
            fontSize="60px"
            fontWeight={theme.fontWeight.bold}
            color={theme.color.gray900}
            className="title"
          >
            Business{' '}
            <Typography as="span" color={theme.color.secondary500} style={{ position: 'relative' }}>
              Digital Signage
              <Box display="flex" position="absolute" top="-6px" left="-15px" className="circle">
                <MainHighlight width="450" height="91" />
              </Box>
            </Typography>{' '}
            Solutions
          </Typography>
        </Box>
        <Box
          as="h2"
          fontSize={theme.fontSize.text20}
          fontWeight={theme.fontWeight.normal}
          color={theme.color.gray500}
          mt="12px"
          textAlign="center"
          className="description"
        >
          Through the MenuBoss, it{"'"}s easy and convenient Make your own special “Digital Signage”
        </Box>
        <Box mt="40px" display="flex" justifyContent="center" className="btn-wrapper">
          <Link href={me ? ADMIN_PATH.SCREENS : PATH.LOGIN}>
            <Button width="160px" size="l" borderRadius="100px">
              Get started
            </Button>
          </Link>
        </Box>
        <Box position="relative" mt="60px" display="flex" justifyContent="center">
          <HighlightLeft width="68" height="74" className="highlight-left" />
          <Image
            src="/images/main/cover1.png"
            alt="main intro"
            width={1288}
            height={565}
            className="main-image"
          />
          <HighlightRight width="68" height="74" className="highlight-right" />
        </Box>
      </Box>
    </HomepageIntroductionWrapper>
  );
};

export default HomepageIntroduction;
