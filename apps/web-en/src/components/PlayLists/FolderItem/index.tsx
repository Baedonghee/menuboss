import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import Skeleton from 'react-loading-skeleton';
import { Box, CheckBox, Image, ModalContainer, MoreMenu, Typography } from '@repo/ui/components';
import { Folder, More, Rename, Trash } from '@repo/ui/icons';
import { useAlert } from '@repo/ui/providers';
import { theme } from '@repo/ui/theme';
import { IMediaList } from '@repo/ui/types';
import { conversion, getCustomErrorMessage } from '@repo/ui/utils';
import classNames from 'classnames';

import { useMediaActions } from '@/actions/media-action';
import { errorToast } from '@/utils/toast';

import RenameModal from '../Rename';

interface IFolderItem {
  id: string;
  item?: IMediaList;
  checked?: boolean;
  handleCheck?: (item: IMediaList) => void;
  handleMediaClick?: (item: IMediaList) => void;
  handleFolderMove?: (item: IMediaList) => void;
  findCard: (id: string) => { item: IMediaList; index: number };
}

const FolderItem: React.FC<IFolderItem> = ({
  id,
  item,
  checked = false,
  handleCheck,
  handleMediaClick,
  handleFolderMove,
  findCard
}) => {
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [editName, setEditName] = useState('');
  const { deleteFile } = useMediaActions();
  const { handleShowAlert, handleClose: handleAlertClose } = useAlert();
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectFileId, setSelectFileId] = useState('');

  const originalIndex = findCard(id).index;

  const [_, drag] = useDrag(
    () => ({
      type: 'ITEM',
      item: { id, originalIndex, type: 'ITEM' },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 0.4,
        isDragging: monitor.isDragging()
      }),
      isDragging: (monitor) => {
        return monitor.getItem().id === id;
      },
      end: (item, monitor) => {
        const { id: droppedId } = item;
        const didDrop = monitor.didDrop();
        if (didDrop) {
          const { item } = findCard(droppedId);
          if (handleMediaClick) {
            handleMediaClick(item);
          }
        }
      }
    }),
    [id, originalIndex]
  );

  const handleMenuOpen = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuClose = (e: MouseEvent) => {
    if ((e.target as HTMLElement).tagName === 'svg') {
      return;
    }
    setMenuOpen(false);
  };

  const handleFileAndFolderCheck = () => {
    if (item && handleCheck) {
      handleCheck(item);
    }
  };

  const handleFolderClick = () => {
    if (item && item.type.code === 'Folder' && handleFolderMove) {
      handleFolderMove(item);
    }
  };

  const handleFileRename = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.stopPropagation();
    if (item) {
      setEditName(item.name);
      handleRenameOpen(item.mediaId);
    }
  };

  const handleFileDelete = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.stopPropagation();
    if (item) {
      handleShowAlert({
        title: 'Delete media',
        description: 'Are you sure you want to remove this media from your account?',
        alertType: 'confirm',
        type: 'error',
        confirmText: 'Delete',
        onConfirm: async () => {
          try {
            await deleteFile([item.mediaId], false);
            if (checked && handleCheck) {
              handleCheck(item);
            }
            handleAlertClose();
          } catch (err) {
            errorToast(getCustomErrorMessage(err));
          }
        }
      });
    }
  };

  const list = [
    {
      icon: <Rename width="20" height="20" color={theme.color.black} />,
      name: 'Rename',
      color: theme.color.gray900,
      onClick: handleFileRename
    },
    {
      icon: <Trash width="20" height="20" color={theme.color.red500} />,
      name: 'Delete',
      color: theme.color.red500,
      onClick: handleFileDelete
    }
  ];

  const handleRenameOpen = (fileId: string) => {
    setSelectFileId(fileId);
    setIsRenameOpen(true);
  };

  const handleRenameClose = () => {
    setIsRenameOpen(false);
    setEditName('');
  };

  return (
    <li ref={item?.type.code === 'Folder' ? null : drag}>
      {isRenameOpen && (
        <ModalContainer onClose={handleRenameClose}>
          <RenameModal
            type="folder"
            id={selectFileId}
            onClose={handleRenameClose}
            editName={editName}
          />
        </ModalContainer>
      )}
      <Box display="flex" alignItems="center">
        <Box display="flex" width="20px" height="20px" mr="12px">
          {item ? (
            <CheckBox
              name="folder"
              checked={checked}
              onClick={handleFileAndFolderCheck}
              width="20"
              height="20"
              disabled={item.type.code === 'Folder' && item.property.count === 0}
            />
          ) : (
            <Skeleton width="20px" height="20px" />
          )}
        </Box>
        <Box
          display="flex"
          width="80px"
          height="48px"
          mr="12px"
          justifyContent="center"
          overflow="hidden"
          backgroundColor={
            item
              ? item?.type.code !== 'Folder'
                ? theme.color.black
                : 'transparent'
              : 'transparent'
          }
        >
          {item ? (
            item.type.code === 'Folder' ? (
              <Folder width="48" height="48" color={theme.color.gray400} />
            ) : (
              <Image width={80} height={48} src={item.property.imageUrl} alt={item.name} />
            )
          ) : (
            <Skeleton width="80px" height="48px" />
          )}
        </Box>
        <Box>
          {item ? (
            <>
              <Box
                fontSize={theme.fontSize.text14}
                color={theme.color.gray900}
                className={classNames({
                  underline: item.type.code === 'Folder'
                })}
                style={{ cursor: item.type.code === 'Folder' ? 'pointer' : 'text' }}
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                width="143px"
                onClick={handleFolderClick}
              >
                {item.name}
              </Box>
              <Typography fontSize={theme.fontSize.text12} color={theme.color.gray500}>
                {item.type.code === 'Folder'
                  ? `${item.property.count}${
                      item.property.count && item.property.count > 1 ? 'files' : 'file'
                    } (${conversion.kilobytesToMegabytes(item.property.size)})`
                  : `${item.type.name} - ${conversion.kilobytesToMegabytes(item.property.size)}`}
              </Typography>
            </>
          ) : (
            <>
              <Skeleton />
              <Skeleton />
            </>
          )}
        </Box>
      </Box>
      <Box display="flex" alignItems="center" position="relative">
        <More
          width="20"
          height="20"
          color={theme.color.gray500}
          style={{ cursor: 'pointer' }}
          onClick={handleMenuOpen}
        />
        {menuOpen && <MoreMenu top="28px" right="0px" list={list} handleClose={handleMenuClose} />}
      </Box>
    </li>
  );
};

export default FolderItem;
