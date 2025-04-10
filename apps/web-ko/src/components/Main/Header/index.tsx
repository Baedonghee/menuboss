import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Box, Button, Typography } from '@repo/ui/components';
import { Alignment, Avatar, CloseLine, Down, SidebarLogo, Up } from '@repo/ui/icons';
import { theme } from '@repo/ui/theme';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { useLockedBody } from 'usehooks-ts';

import { useAuthActions } from '@/actions/auth-action';
import { authInitLoadingSelector, authUserSelector } from '@/state/auth';
import { ADMIN_PATH, PATH } from '@/utils/path';

const MainHeaderWrapper = styled(Box)`
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
    height: 60px;
    .header {
      width: 100%;
      padding: 0px 24px;
    }
    .mobile-menu {
      background-color: ${({ theme }) => theme.color.white};
      display: flex;
      position: absolute;
      width: 100%;
      left: 0px;
      top: 60px;
      height: calc(100vh - 60px);
    }
  }
  .login-link {
    margin-right: 24px;
    &.menu-link {
      margin-right: 40px;
    }
  }
  .login-btn {
    height: 52px;
    color: ${({ theme }) => theme.color.gray900};
    font-size: ${({ theme }) => theme.fontSize.text16};
    text-align: center;
    line-height: 52px;
    cursor: pointer;
    span {
      &:hover {
        border-bottom: 2px solid ${({ theme }) => theme.color.gray900};
      }
    }
  }
  .profile-image {
    cursor: pointer;
    img {
      border-radius: 50%;
      border: 1px solid ${({ theme }) => theme.color.gray200};
    }
  }
  .menu {
    ul {
      display: flex;
      li {
        font-size: ${({ theme }) => theme.fontSize.text16};
        font-weight: ${({ theme }) => theme.fontWeight.semiBold};
        color: ${({ theme }) => theme.color.gray900};
      }
    }
  }
`;

const MainHeader = () => {
  const { logout } = useAuthActions();
  const me = useRecoilValue(authUserSelector);
  const loading = useRecoilValue(authInitLoadingSelector);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const handleLogOut = async () => {
    await logout();
  };

  useLockedBody(isMenuOpen);

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  return (
    <MainHeaderWrapper
      borderBottom={`1px solid ${theme.color.gray200}`}
      height="80px"
      display="flex"
      position="fixed"
      top="0"
      left="0"
      width="100%"
      backgroundColor={theme.color.white}
      zIndex={1}
    >
      <Box
        className="header"
        width="1320px"
        m="auto"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box display="flex" alignItems="center" cursor="pointer">
          <Link href="/">
            <SidebarLogo width="148" height="24" color={theme.color.primary500} />
          </Link>
        </Box>
        <Box className="pc-hide" display="flex" onClick={handleMenu}>
          {isMenuOpen ? (
            <CloseLine width="20" height="20" color={theme.color.gray700} />
          ) : (
            <Alignment width="24" height="24" color={theme.color.gray700} />
          )}
        </Box>
        <motion.div
          className="pc-hide mobile-menu"
          initial={{ left: '100%' }}
          animate={{ left: !isMenuOpen ? '100%' : 0 }}
        >
          <Box>
            <Link href={PATH.MAIN} style={{ padding: '18px 24px', display: 'block' }}>
              <Typography
                fontSize={theme.fontSize.text18}
                fontWeight={theme.fontWeight.semiBold}
                lineHeight="23px"
                color={theme.color.gray900}
              >
                메뉴보스 소개
              </Typography>
            </Link>
          </Box>
          <Box>
            <Link href={PATH.PRICE} style={{ padding: '18px 24px', display: 'block' }}>
              <Typography
                fontSize={theme.fontSize.text18}
                fontWeight={theme.fontWeight.semiBold}
                lineHeight="23px"
                color={theme.color.gray900}
              >
                요금제
              </Typography>
            </Link>
          </Box>
          <Box
            p="18px 24px"
            display="flex"
            width="100%"
            alignItems="center"
            justifyContent="space-between"
            onClick={handleSubMenu}
          >
            <Typography
              fontSize={theme.fontSize.text18}
              fontWeight={theme.fontWeight.semiBold}
              lineHeight="23px"
              color={theme.color.gray900}
            >
              메뉴보스 사용방법
            </Typography>
            {isSubMenuOpen ? (
              <Up width="18" height="18" color={theme.color.gray500} />
            ) : (
              <Down width="18" height="18" color={theme.color.gray500} />
            )}
          </Box>
          {isSubMenuOpen && (
            <Box backgroundColor={theme.color.gray50}>
              <a
                href="/guides/Quick_Start_Guide_App_KR_ver1.0.pdf"
                style={{ padding: '14px 24px', display: 'block' }}
                rel="noreferrer"
              >
                <Typography
                  fontSize={theme.fontSize.text14}
                  lineHeight="19px"
                  color={theme.color.gray900}
                >
                  모바일 앱 서비스 가이드
                </Typography>
              </a>
              <a
                href="/guides/Quick_Start_Guide_Web_KR_ver1.0.pdf"
                style={{ padding: '14px 24px', display: 'block' }}
                rel="noreferrer"
              >
                <Typography
                  fontSize={theme.fontSize.text14}
                  lineHeight="19px"
                  color={theme.color.gray900}
                >
                  웹 서비스 가이드
                </Typography>
              </a>
            </Box>
          )}
          <Box>
            <a
              href="www.google.com"
              style={{ padding: '18px 24px', display: 'block' }}
              rel="noreferrer"
            >
              <Typography
                fontSize={theme.fontSize.text18}
                fontWeight={theme.fontWeight.semiBold}
                lineHeight="23px"
                color={theme.color.gray900}
              >
                서비스 도입 문의하기
              </Typography>
            </a>
          </Box>
        </motion.div>
        <Box as="nav" display="flex" alignItems="center" className="mobile-hide">
          <Link href={PATH.PRICE} className="login-link menu-link">
            <Typography className="login-btn">
              <Typography as="span">요금제</Typography>
            </Typography>
          </Link>
          {loading ? (
            <>
              <Skeleton width={40} height={30} style={{ marginRight: '24px' }} />
              <Skeleton width={120} height={30} />
            </>
          ) : me ? (
            <>
              <Typography className="login-btn" mr="24px" onClick={handleLogOut}>
                <Typography as="span">로그아웃</Typography>
              </Typography>
              <Link href={ADMIN_PATH.SCREENS}>
                <Box
                  width="48px"
                  height="48px"
                  display="flex"
                  overflow="hidden"
                  borderRadius="50%"
                  className="profile-image"
                >
                  {me.profile.imageUrl ? (
                    <Image src={me.profile.imageUrl} width={48} height={48} alt={me.profile.name} />
                  ) : (
                    <Avatar width="48" height="48" color={theme.color.gray400} />
                  )}
                </Box>
              </Link>
            </>
          ) : (
            <>
              <Link href={PATH.LOGIN} className="login-link">
                <Typography className="login-btn">
                  <Typography as="span">로그인</Typography>
                </Typography>
              </Link>
              <Link href={PATH.LOGIN}>
                <Button size="l" borderRadius="100px" width="140px">
                  무료 시작하기
                </Button>
              </Link>
            </>
          )}
        </Box>
      </Box>
    </MainHeaderWrapper>
  );
};

export default MainHeader;
