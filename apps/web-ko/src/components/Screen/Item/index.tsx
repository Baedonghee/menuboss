import React, { useState } from 'react';
import { Box, Image, ModalContainer, MoreMenu, ScreenOnOff, Typography } from '@repo/ui/components';
import { DisplayScreen, More, Rename, Trash } from '@repo/ui/icons';
import { useAlert } from '@repo/ui/providers';
import { theme } from '@repo/ui/theme';
import { IScreenList } from '@repo/ui/types';
import { getCustomErrorMessage } from '@repo/ui/utils';
import styled from 'styled-components';

import { useScreenActions } from '@/actions/screen-action';
import RenameModal from '@/components/PlayLists/Rename';
import { errorToast } from '@/utils/toast';

const ScreenItemWrapper = styled.li``;

interface IScreenItem {
  item: IScreenList;
}

const ScreenItem: React.FC<IScreenItem> = ({ item }) => {
  const { deleteScreen, showScreen } = useScreenActions();
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectScreenId, setSelectScreenId] = useState(-1);
  const { handleShowAlert, handleClose: handleAlertClose } = useAlert();
  const [editName, setEditName] = useState('');

  const handleScreenRename = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.stopPropagation();
    if (item) {
      setEditName(item.name);
      handleRenameOpen(item.screenId);
    }
  };

  const handleScreenDelete = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.stopPropagation();
    if (item) {
      handleShowAlert({
        title: 'TV 삭제',
        description: 'TV를 삭제하시겠습니까?',
        alertType: 'confirm',
        type: 'error',
        confirmText: '삭제',
        onConfirm: async () => {
          try {
            await deleteScreen(item.screenId);
            handleAlertClose();
          } catch (err) {
            errorToast(getCustomErrorMessage(err));
          }
        }
      });
    }
  };

  const handleScreenCall = async () => {
    try {
      await showScreen(item.screenId);
      setMenuOpen(false);
      handleShowAlert({
        description: '성공적으로 TV에 표시되었습니다',
        type: 'success',
        onConfirm: () => {
          handleAlertClose();
        }
      });
    } catch (err) {
      handleAlertClose();
      errorToast(getCustomErrorMessage(err));
    }
  };

  const list = [
    {
      icon: <DisplayScreen width="20" height="20" color={theme.color.gray900} />,
      name: 'TV에 이름 표시',
      color: theme.color.gray900,
      onClick: handleScreenCall
    },
    {
      icon: <Rename width="20" height="20" color={theme.color.gray900} />,
      name: '이름 변경',
      color: theme.color.gray900,
      onClick: handleScreenRename
    },
    {
      icon: <Trash width="20" height="20" color={theme.color.red500} />,
      name: '삭제',
      color: theme.color.red500,
      onClick: handleScreenDelete
    }
  ];

  const handleMenuOpen = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuClose = (e: MouseEvent) => {
    if ((e.target as HTMLElement).tagName === 'svg') {
      return;
    }
    setMenuOpen(false);
  };

  const handleRenameOpen = (screenId: number) => {
    setSelectScreenId(screenId);
    setIsRenameOpen(true);
  };

  const handleRenameClose = () => {
    setIsRenameOpen(false);
    setEditName('');
  };

  return (
    <>
      {isRenameOpen && (
        <ModalContainer onClose={handleRenameClose}>
          <RenameModal
            type="screen"
            id={selectScreenId}
            onClose={handleRenameClose}
            editName={editName}
          />
        </ModalContainer>
      )}
      <ScreenItemWrapper>
        <div>
          <Box display="flex" alignItems="center" height="100%" overflow="hidden">
            <Image
              src={item.content?.imageUrl || '/images/screen/empty.png'}
              alt={item.name}
              width={100}
              height={60}
            />
          </Box>
        </div>
        <div>
          <Box display="flex" alignItems="center" height="100%" overflow="hidden">
            <Box display="flex" alignItems="center">
              <ScreenOnOff on={item.isOnline} />
              <Typography
                ml="8px"
                fontSize={theme.fontSize.text14}
                fontWeight={theme.fontWeight.semiBold}
                color={theme.color.gray900}
              >
                {item.name}
              </Typography>
            </Box>
          </Box>
        </div>
        <div>{item.content?.name || '-'}</div>
        <div>{item.updatedDate}</div>
        <Box display="flex" alignItems="center" position="relative">
          <More
            width="20"
            height="20"
            color={theme.color.gray500}
            style={{ cursor: 'pointer' }}
            onClick={handleMenuOpen}
          />
          {menuOpen && (
            <MoreMenu
              width="180px"
              top="58px"
              right="27px"
              list={list}
              handleClose={handleMenuClose}
            />
          )}
        </Box>
      </ScreenItemWrapper>
    </>
  );
};

export default ScreenItem;
