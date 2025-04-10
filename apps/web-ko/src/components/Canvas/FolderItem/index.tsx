import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import Skeleton from 'react-loading-skeleton';
import { Box, Image, ModalContainer, MoreMenu, Typography } from '@repo/ui/components';
import { Folder, More, Rename, Trash } from '@repo/ui/icons';
import { useAlert, useCanvas } from '@repo/ui/providers';
import { theme } from '@repo/ui/theme';
import { IMediaList } from '@repo/ui/types';
import { conversion, getCustomErrorMessage } from '@repo/ui/utils';

import { useMediaActions } from '@/actions/media-action';
import RenameModal from '@/components/PlayLists/Rename';
import { errorToast } from '@/utils/toast';

interface IFolderItem {
  id: string;
  item?: IMediaList;
  type?: 'folder' | 'file';
  checked?: boolean;
  handleFolderMove?: (item: IMediaList) => void;
  handleImageClick?: (item: IMediaList) => void;
  findCard: (id: string) => { item: IMediaList; index: number };
}

const FolderItem: React.FC<IFolderItem> = ({
  id,
  item,
  type,
  handleFolderMove,
  handleImageClick,
  findCard
}) => {
  const { canvas, historyProcessing, historyUndo, historyNextState } = useCanvas();
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
      isDragging: (monitor) => monitor.getItem().id === id,
      end: (item, monitor) => {
        const { id: droppedId } = item;
        const didDrop = monitor.didDrop();
        if (didDrop) {
          const { item } = findCard(droppedId);
          if (handleImageClick) {
            handleImageClick(item);
          }
        }
      }
    }),
    [id, originalIndex]
  );

  const handleMenuOpen = (e: React.MouseEvent<HTMLOrSVGElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    setMenuOpen(!menuOpen);
  };

  const handleMenuClose = (e: MouseEvent) => {
    if ((e.target as HTMLElement).tagName === 'svg') {
      return;
    }
    setMenuOpen(false);
  };

  const handleFolderClick = () => {
    if (item && item.type.code === 'Folder' && handleFolderMove) {
      handleFolderMove(item);
    } else if (item && handleImageClick) {
      handleImageClick(item);
    }
  };

  const handleFileRename = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    if (item) {
      setEditName(item.name);
      handleRenameOpen(item.mediaId);
    }
  };

  const handleFileDelete = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    if (item) {
      handleShowAlert({
        title: '파일 삭제',
        description: '해당 파일을 삭제하시겠습니까?',
        alertType: 'confirm',
        type: 'error',
        confirmText: '삭제',
        onConfirm: async () => {
          try {
            await deleteFile([item.mediaId], type === 'folder');
            historyProcessing.current = true;
            const history = historyUndo.current.pop();
            if (history) {
              historyNextState.current = history;
            }
            const newHistoryUndo = historyUndo.current.map((item) => {
              if (item) {
                const objects = JSON.parse(item);
                const newObjects = objects.objects.filter((obj: any) => obj.id === item?.mediaId);
                objects.objects = newObjects;
                return objects;
              }
              return item;
            });
            historyUndo.current = newHistoryUndo;
            canvas?.getObjects().forEach((obj: any) => {
              if (obj.id === item?.mediaId) {
                canvas.remove(obj);
              }
            });
            historyProcessing.current = false;
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
      name: '이름 변경',
      color: theme.color.gray900,
      onClick: handleFileRename
    },
    {
      icon: <Trash width="20" height="20" color={theme.color.red500} />,
      name: '삭제',
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
    <li ref={drag} onClick={handleFolderClick}>
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
        <Box display="flex" width="80px" height="48px" mr="12px" justifyContent="center">
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
                className="name"
                style={{
                  cursor:
                    item.type.code === 'Folder' || item.type.code === 'Image' ? 'pointer' : 'text'
                }}
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                width="180px"
              >
                {item.name}
              </Box>
              <Typography fontSize={theme.fontSize.text12} color={theme.color.gray500}>
                {item.type.code === 'Folder'
                  ? `${item.property.count}개 파일 (${conversion.kilobytesToMegabytes(
                      item.property.size
                    )})`
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
