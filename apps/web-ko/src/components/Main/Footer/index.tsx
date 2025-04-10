import React from 'react';
import { Box, Typography } from '@repo/ui/components';
import { SidebarLogo } from '@repo/ui/icons';
import { theme } from '@repo/ui/theme';
import Link from 'next/link';
import styled from 'styled-components';

import { PATH } from '@/utils/path';

const MainFooterWrapper = styled(Box)`
  @media ${({ theme }) => theme.device.mobile} {
    padding: 60px 20px;
    justify-content: start;
    .container {
      width: 100%;
      display: block;
      padding-bottom: 24px;
      margin-bottom: 0;
      &.pb-0 {
        padding-bottom: 0;
      }
      .footer-wrapper {
        margin-top: 48px;
        display: block;
        .footer-menu {
          display: flex;
          margin-right: 0;
          & > div {
            font-size: ${({ theme }) => theme.fontSize.text12};
            &:nth-of-type(1) {
              width: 90px;
              margin-right: 24px;
            }
            & > div {
              font-size: ${({ theme }) => theme.fontSize.text12};
            }
          }
        }
      }
      .copy-right {
        font-size: ${({ theme }) => theme.fontSize.text12};
      }
      .policy {
        margin-top: 8px;
        font-size: ${({ theme }) => theme.fontSize.text12};
      }
    }
    .info-wrapper {
      margin-top: 24px;
      .info {
        display: block;
        & > div {
          font-size: ${({ theme }) => theme.fontSize.text12};
          margin-bottom: 12px;
          &:last-of-type {
            margin-bottom: 0;
          }
        }
      }
    }
    .copyright-container {
      margin-top: 32px;
    }
  }
`;

const MainFooter = () => {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <MainFooterWrapper
      margin="auto"
      display="flex"
      justifyContent="center"
      alignItems="center"
      p="60px 0px"
    >
      <Box>
        <Box
          className="container"
          width="1320px"
          margin="auto"
          display="flex"
          justifyContent="space-between"
          mb="60px"
          flexDirection="row-reverse"
          borderBottom={`1px solid ${theme.color.gray300}`}
          pb="40px"
        >
          <Box>
            <SidebarLogo
              width="148"
              height="24"
              color={theme.color.gray500}
              onClick={handleScrollTop}
              style={{ cursor: 'pointer' }}
            />
          </Box>
          <Box display="flex" className="footer-wrapper">
            <Box mr="120px" className="footer-menu">
              <Typography
                fontSize={theme.fontSize.text16}
                fontWeight={theme.fontWeight.semiBold}
                color={theme.color.gray600}
                mb="16px"
              >
                제품
              </Typography>
              <Typography fontSize={theme.fontSize.text14} color={theme.color.gray500}>
                <Link href={PATH.PRICE} className="underline">
                  요금제
                </Link>
              </Typography>
            </Box>
            <Box mr="120px" className="footer-menu">
              <Typography
                fontSize={theme.fontSize.text16}
                fontWeight={theme.fontWeight.semiBold}
                color={theme.color.gray600}
                mb="16px"
              >
                메뉴보스 사용방법
              </Typography>
              <Box>
                <Typography fontSize={theme.fontSize.text14} color={theme.color.gray500}>
                  <a
                    href="/guides/Quick_Start_Guide_App_KR_ver1.0.pdf"
                    className="underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    모바일 앱 가이드
                  </a>
                </Typography>
                <Typography fontSize={theme.fontSize.text14} color={theme.color.gray500} mt="8px">
                  <a
                    href="/guides/Quick_Start_Guide_Web_KR_ver1.0.pdf"
                    className="underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    웹 가이드
                  </a>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box mt="40px" className="info-wrapper">
          <Box display="flex" className="info">
            <Typography
              fontSize={theme.fontSize.text14}
              lineHeight="19px"
              color={theme.color.gray500}
              mr="24px"
            >
              대표이사 : 최광명
            </Typography>
            <Typography
              fontSize={theme.fontSize.text14}
              lineHeight="19px"
              color={theme.color.gray500}
              mr="24px"
            >
              사업자등록번호 : 370-81-02809
            </Typography>
            <Typography
              fontSize={theme.fontSize.text14}
              lineHeight="19px"
              color={theme.color.gray500}
            >
              주소 : 서울특별시 월드컵북로 5가길 22, 3층 오롯코드
            </Typography>
          </Box>
          <Box display="flex" mt="12px">
            <Typography
              fontSize={theme.fontSize.text14}
              lineHeight="19px"
              color={theme.color.gray500}
            >
              대표전화 : 070-4177-9333
            </Typography>
          </Box>
        </Box>
        <Box
          width="1320px"
          className="container pb-0 copyright-container"
          margin="auto"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mt="24px"
        >
          <Typography
            fontSize={theme.fontSize.text14}
            fontWeight={theme.fontWeight.semiBold}
            color={theme.color.gray500}
            className="copy-right"
          >
            COPYRIGHT © 2023 MENUBOSS | ALL RIGHTS RESERVED.
          </Typography>
          <Box className="policy">
            <a href={PATH.POLICY_PRIVACY} target="_blank" rel="noreferrer">
              <Typography
                fontSize={theme.fontSize.text14}
                fontWeight={theme.fontWeight.semiBold}
                color={theme.color.gray500}
                mr="24px"
                as="span"
                className="underline"
              >
                개인정보처리방침
              </Typography>
            </a>
            <a href={PATH.POLICY_SERVICE} target="_blank" rel="noreferrer">
              <Typography
                fontSize={theme.fontSize.text14}
                fontWeight={theme.fontWeight.semiBold}
                color={theme.color.gray500}
                as="span"
                className="underline"
              >
                이용약관
              </Typography>
            </a>
          </Box>
        </Box>
      </Box>
    </MainFooterWrapper>
  );
};

export default MainFooter;
