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
    height: auto;
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
      .footer-into-wrapper {
        display: flex;
        margin-top: 16px;
        & > div {
          &:nth-of-type(1) {
            width: 90px;
            font-size: ${({ theme }) => theme.fontSize.text12};
            margin-right: 24px;
          }
          & > div {
            .mobile-text {
              display: inline-block !important;
            }
            font-size: ${({ theme }) => theme.fontSize.text12};
          }
        }
      }
      .copy-right {
        margin-top: 12px;
        font-size: ${({ theme }) => theme.fontSize.text12};
      }
      .policy {
        margin-top: 12px;
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
  }
`;

const MainFooter = () => {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <MainFooterWrapper
      height="309px"
      margin="auto"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box>
        <Box
          width="1320px"
          margin="auto"
          display="flex"
          justifyContent="space-between"
          mb="60px"
          flexDirection="row-reverse"
          className="container"
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
                Product
              </Typography>
              <Typography fontSize={theme.fontSize.text14} color={theme.color.gray500}>
                <Link href={PATH.PRICE} className="underline">
                  Pricing
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
                How to use it
              </Typography>
              <Box>
                <Typography fontSize={theme.fontSize.text14} color={theme.color.gray500}>
                  <a
                    href="/guides/Quick_Start_Guide_App_EN_ver1.0.pdf"
                    className="underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Mobile app guide
                  </a>
                </Typography>
                <Typography fontSize={theme.fontSize.text14} color={theme.color.gray500} mt="8px">
                  <a
                    href="/guides/Quick_Start_Guide_Web_EN_ver1.0.pdf"
                    className="underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Web service guide
                  </a>
                </Typography>
              </Box>
            </Box>
            <Box className="footer-into-wrapper">
              <Typography
                fontSize={theme.fontSize.text16}
                fontWeight={theme.fontWeight.semiBold}
                color={theme.color.gray600}
                mb="16px"
              >
                Contact
              </Typography>
              <Box>
                <Typography fontSize={theme.fontSize.text14} color={theme.color.gray500} mb="8px">
                  Sales team :
                  <a href="mailto:sales@themenuboss.com" className="underline">
                    sales@themenuboss.com
                  </a>
                </Typography>
                <Typography fontSize={theme.fontSize.text14} color={theme.color.gray500} mb="8px">
                  <Typography as="span" className="mobile-hide">
                    Customer support :
                  </Typography>
                  <Typography as="span" className="pc-hide mobile-text">
                    Support :
                  </Typography>
                  <a href="mailto:support@themenuboss.com" className="underline">
                    support@themenuboss.com
                  </a>
                </Typography>
                <Typography fontSize={theme.fontSize.text14} color={theme.color.gray500} mb="8px">
                  <a href="mailto:info@themenuboss.com" className="underline">
                    info@themenuboss.com
                  </a>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          width="1320px"
          margin="auto"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          className="container pb-0"
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
            <a href="/policy/privacy" target="_blank">
              <Typography
                fontSize={theme.fontSize.text14}
                fontWeight={theme.fontWeight.semiBold}
                color={theme.color.gray500}
                mr="24px"
                as="span"
                className="underline"
              >
                Privacy Policy
              </Typography>
            </a>
            <a href="/policy/service" target="_blank">
              <Typography
                fontSize={theme.fontSize.text14}
                fontWeight={theme.fontWeight.semiBold}
                color={theme.color.gray500}
                as="span"
                className="underline"
              >
                Terms of Use
              </Typography>
            </a>
          </Box>
        </Box>
      </Box>
    </MainFooterWrapper>
  );
};

export default MainFooter;
