/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';
import { Box, Form, Image, Input, ModalContainer, Tooltip, Typography } from '@repo/ui/components';
import {
  Avatar,
  CloseRound,
  Down,
  Help,
  Logout,
  Profile,
  Search,
  Settings,
  Up,
  Upload2,
  UploadCloud
} from '@repo/ui/icons';
import { theme } from '@repo/ui/theme';
import { formatter } from '@repo/ui/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import qs from 'qs';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { useOnClickOutside } from 'usehooks-ts';

import { useAuthActions } from '@/actions/auth-action';
import Tutorial from '@/components/Tutorial';
import UploadItem from '@/components/Upload/Item';
import { useUpload } from '@/providers/upload.provider';
import { authUserSelector } from '@/state/auth';
import {
  uploadCompletedListSelector,
  uploadListSelector,
  uploadModalOpenSelector,
  uploadTempListSelector
} from '@/state/upload';
import { ADMIN_PATH, PATH } from '@/utils/path';

const HeaderWrapper = styled(Box)`
  .help-box {
    & + .tooltip {
      display: none;
    }
    &:hover {
      & + .tooltip {
        display: block;
      }
    }
  }
  .upload-list {
    ul {
      min-height: 100px;
      max-height: 423px;
      overflow-y: auto;
      overflow-x: hidden;
      margin-top: 24px;
      padding: 0px 24px 24px;
      li {
        margin-bottom: 16px;
        &:last-child {
          margin-bottom: 0;
        }
        .progress {
          position: relative;
          width: 100%;
          border-radius: 100px;
          height: 4px;
          margin-top: 12px;
          .progress-bar {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            border-radius: 100px;
          }
        }
      }
    }
  }
  .account-menu {
    position: absolute;
    top: 51px;
    right: 0;
    z-index: 9998;
    ul {
      border-radius: 8px;
      border: 1px solid ${({ theme }) => theme.color.gray300};
      background-color: ${({ theme }) => theme.color.white};
      width: 200px;
      li {
        &.logout {
          display: flex;
        }
        align-items: center;
        height: 52px;
        cursor: pointer;
        a {
          display: block;
          padding-left: 16px;
          height: 52px;
          svg {
            margin-left: 0px;
          }
        }
        svg {
          margin-left: 16px;
        }
        &.header {
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
          border-bottom: 1px solid ${({ theme }) => theme.color.gray200};
        }
        &:hover {
          background-color: ${({ theme }) => theme.color.gray50};
        }
        span {
          margin-left: 8px;
          font-size: ${({ theme }) => theme.fontSize.text14};
          color: ${({ theme }) => theme.color.gray900};
        }
      }
    }
  }
`;

interface IHeader {
  isSearch?: boolean;
}

const Header: React.FC<IHeader> = ({ isSearch }) => {
  const router = useRouter();
  const { query, asPath } = router;
  const uploadRef = useRef<HTMLDivElement | null>(null);
  const user = useRecoilValue(authUserSelector);
  const uploadList = useRecoilValue(uploadListSelector);
  const uploadCompleteList = useRecoilValue(uploadCompletedListSelector);
  const uploadTempList = useRecoilValue(uploadTempListSelector);
  const { handleRefreshUpload, handleUploadDelete } = useUpload();
  const [isTutorial, setIsTutorial] = useState(false);
  // const parsingCompleteList = useRef<IUploadList[]>([]);

  const [isFileUploadModal, setIsFileUploadModal] = useRecoilState(uploadModalOpenSelector); // 파일 업로드 모달
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { logout } = useAuthActions();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      q: ''
    }
  });

  useEffect(() => {
    const firstVisit = window.localStorage.getItem('firstVisit');
    if (!firstVisit) {
      setIsTutorial(true);
    }
    window.localStorage.setItem('firstVisit', 'true');
  }, []);

  const handleFileUploadClose = () => {
    setIsFileUploadModal(false);
  };

  useOnClickOutside(uploadRef, handleFileUploadClose);

  const handleClickOutside = () => {
    setIsMenuOpen(false);
  };

  const handleMenuOpen = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useOnClickOutside(menuRef, handleClickOutside);

  const handleLogOut = async () => {
    try {
      await logout();
      router.push(PATH.LOGIN);
    } catch (err) {
      router.push(PATH.LOGIN);
    }
  };

  const handleUploadOpen = () => {
    setIsFileUploadModal((prev) => !prev);
  };

  const onSearch = handleSubmit(({ q }) => {
    const newQuery = {
      ...query
    };
    if (q) {
      newQuery.q = q;
    } else {
      delete newQuery.q;
    }
    delete newQuery.id;
    delete newQuery.mediaId;
    const queryData = qs.stringify(newQuery) ? `?${qs.stringify(newQuery)}` : '';
    const url = formatter.pathNameParser(asPath);
    router.push(`${url}${queryData}`);
  });

  const handleHelpOpen = () => {
    setIsTutorial(true);
  };

  const handleHelpClose = () => {
    setIsTutorial(false);
  };

  return (
    <HeaderWrapper
      className="menu-header"
      display="flex"
      justifyContent={isSearch ? 'space-between' : 'end'}
      alignItems="center"
      width="100%"
      p="0px 32px"
      minHeight="80px"
      borderBottom={`1px solid ${theme.color.gray200}`}
      position="sticky"
      maxWidth="100%"
      top={0}
      backgroundColor={theme.color.white}
      zIndex="2"
    >
      {isTutorial && (
        <ModalContainer onClose={handleHelpClose}>
          <Tutorial onClose={handleHelpClose} />
        </ModalContainer>
      )}
      {isSearch && (
        <Form title="search" onSubmit={onSearch}>
          <Input
            name="q"
            register={register}
            iconAlign="left"
            icon={<Search width="20" height="20" color={theme.color.black} />}
            placeholder="Search"
            width="400px"
          />
        </Form>
      )}
      <Box display="flex" alignItems="center">
        <Box display="flex">
          <Box display="flex" mr="24px" alignItems="center">
            <Box position="relative" ref={uploadRef} pr="24px">
              <Box position="relative" cursor="pointer" onClick={handleUploadOpen}>
                <UploadCloud
                  width="24"
                  height="24"
                  color={isFileUploadModal ? theme.color.primary500 : theme.color.gray500}
                />
                {!!(
                  uploadTempList.length +
                  uploadList.length +
                  uploadCompleteList.filter((item) => item.result === 'error').length
                ) && (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    position="absolute"
                    top="-4px"
                    right="-4px"
                    width="16px"
                    height="16px"
                    borderRadius="50%"
                    color={theme.color.white}
                    backgroundColor={theme.color.primary500}
                    fontSize={theme.fontSize.text10}
                  >
                    {uploadTempList.length +
                      uploadList.length +
                      uploadCompleteList.filter((item) => item.result === 'error').length}
                  </Box>
                )}
              </Box>
              {isFileUploadModal && (
                <Box
                  position="absolute"
                  top="43px"
                  right="0px"
                  pt="24px"
                  border={`1px solid ${theme.color.gray300}`}
                  borderRadius="8px"
                  backgroundColor={theme.color.white}
                  width="368px"
                  minHeight="300px"
                  maxHeight="495px"
                  overflow="hidden"
                  className="upload-list"
                  zIndex="15"
                >
                  <Box display="flex" justifyContent="space-between" p="0px 24px">
                    <Typography fontSize={theme.fontSize.text18} color={theme.color.gray900}>
                      Upload list
                    </Typography>
                    <CloseRound
                      width="20"
                      height="20"
                      color={theme.color.gray500}
                      style={{ cursor: 'pointer' }}
                      onClick={handleFileUploadClose}
                    />
                  </Box>
                  {!!(uploadTempList.length + uploadList.length + uploadCompleteList.length) ? (
                    <ul>
                      {uploadTempList.map((item, index) => (
                        <UploadItem
                          key={`header-temp-upload-${index}`}
                          index={index}
                          item={item}
                          handleRefreshUpload={handleRefreshUpload}
                          handleUploadDelete={handleUploadDelete}
                          type="temp"
                        />
                      ))}
                      {uploadList.map((item, index) => (
                        <UploadItem
                          key={`header-upload-${index}`}
                          index={index}
                          item={item}
                          handleRefreshUpload={handleRefreshUpload}
                          handleUploadDelete={handleUploadDelete}
                          type="progress"
                        />
                      ))}
                      {uploadCompleteList.map((item, index) => (
                        <UploadItem
                          key={`header-complete-upload-${index}`}
                          index={index}
                          item={item}
                          handleRefreshUpload={handleRefreshUpload}
                          handleUploadDelete={handleUploadDelete}
                          type="complete"
                        />
                      ))}
                    </ul>
                  ) : (
                    <Box
                      display="flex"
                      minHeight="329px"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Box textAlign="center">
                        <Upload2 width="40" height="40" color={theme.color.gray400} />
                        <Typography
                          mt="12px"
                          fontSize={theme.fontSize.text16}
                          color={theme.color.gray400}
                        >
                          No files are being uploaded
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </Box>
              )}
            </Box>
            <Box pr="24px" borderRight={`1px solid ${theme.color.gray300}`} position="relative">
              <Box display="flex" className="help-box" onClick={handleHelpOpen}>
                <Help
                  width="24"
                  height="24"
                  color={theme.color.gray500}
                  style={{ cursor: 'pointer' }}
                />
              </Box>
              <Box position="absolute" top="37px" left="-55px" zIndex={1} className="tooltip">
                <Tooltip text="MenuBoss Tutorial" />
              </Box>
            </Box>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            cursor="pointer"
            onClick={handleMenuOpen}
            ref={menuRef}
            position="relative"
          >
            <Box
              width="40px"
              height="40px"
              borderRadius="50%"
              mr="12px"
              display="flex"
              alignItems="center"
              className="image-box"
            >
              {user ? (
                user.profile.imageUrl ? (
                  <Box
                    overflow="hidden"
                    width="40px"
                    height="40px"
                    borderRadius="50%"
                    display="flex"
                  >
                    <Image
                      src={user.profile.imageUrl}
                      alt={user.profile.name}
                      width={40}
                      height={40}
                    />
                  </Box>
                ) : (
                  <Avatar width="40" height="40" color={theme.color.gray400} />
                )
              ) : (
                <Skeleton width={40} height={40} />
              )}
            </Box>
            <Box mr="16px">
              <Typography
                fontSize={theme.fontSize.text16}
                fontWeight={theme.fontWeight.semiBold}
                color={theme.color.gray900}
              >
                {user ? user.profile.name : <Skeleton />}
              </Typography>
              <Typography fontSize={theme.fontSize.text14} color={theme.color.gray500}>
                {user ? user.business.role : <Skeleton />}
              </Typography>
            </Box>
            {isMenuOpen ? (
              <Up width="24" height="24" color={theme.color.gray900} />
            ) : (
              <Down width="24" height="24" color={theme.color.gray900} />
            )}
            {isMenuOpen && (
              <Box className="account-menu">
                <ul>
                  <li className="header">
                    <Link href={ADMIN_PATH.ACCOUNT_PROFILE}>
                      <Box display="flex" alignItems="center" height={52}>
                        <Profile width="24" height="24" color={theme.color.gray900} />
                        <span>My account</span>
                      </Box>
                    </Link>
                  </li>
                  <li>
                    <Link href={ADMIN_PATH.SETTINGS_TEAM}>
                      <Box display="flex" alignItems="center" height={52}>
                        <Settings width="24" height="24" color={theme.color.gray900} />
                        <span>Settings</span>
                      </Box>
                    </Link>
                  </li>
                  <li className="logout" onClick={handleLogOut}>
                    <Logout width="24" height="24" color={theme.color.gray900} />
                    <span>Log out</span>
                  </li>
                </ul>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </HeaderWrapper>
  );
};

export default Header;
