import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import Skeleton from 'react-loading-skeleton';
import { Box, CheckBox, Image, ModalContainer, MoreMenu } from '@repo/ui/components';
import { More, Rename, Trash } from '@repo/ui/icons';
import { useAlert } from '@repo/ui/providers';
import { theme } from '@repo/ui/theme';
import { ICanvasList } from '@repo/ui/types';
import { getCustomErrorMessage } from '@repo/ui/utils';

import { useCanvasActions } from '@/actions/canvas-actions';
import RenameModal from '@/components/PlayLists/Rename';
import { errorToast } from '@/utils/toast';

interface ICanvasItem {
  id: string;
  item?: ICanvasList;
  checked?: boolean;
  handleCheck?: (item: ICanvasList) => void;
  handleCanvasClick?: (item: ICanvasList) => void;
  findCard: (id: string) => { item: ICanvasList; index: number };
}

const CanvasItem: React.FC<ICanvasItem> = ({
  id,
  item,
  checked,
  handleCheck,
  handleCanvasClick,
  findCard
}) => {
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [editName, setEditName] = useState('');
  const { canvasDelete } = useCanvasActions();
  const { handleShowAlert, handleClose: handleAlertClose } = useAlert();
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectCanvasId, setSelectCanvasId] = useState('');

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
          if (handleCanvasClick) {
            handleCanvasClick(item);
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

  const handleFileRename = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.stopPropagation();
    if (item) {
      setEditName(item.name);
      handleRenameOpen(item.canvasId);
    }
  };

  const handleFileDelete = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.stopPropagation();
    if (item) {
      handleShowAlert({
        title: '캔버스 삭제',
        description: '캔버스를 삭제하시겠습니까?',
        alertType: 'confirm',
        type: 'error',
        confirmText: '삭제',
        onConfirm: async () => {
          try {
            await canvasDelete(item.canvasId);
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

  const handleRenameOpen = (canvasId: string) => {
    setSelectCanvasId(canvasId);
    setIsRenameOpen(true);
  };

  const handleRenameClose = () => {
    setIsRenameOpen(false);
    setEditName('');
  };

  const handleFileAndFolderCheck = () => {
    if (item && handleCheck) {
      handleCheck(item);
    }
  };

  return (
    <li ref={drag}>
      {isRenameOpen && (
        <ModalContainer onClose={handleRenameClose}>
          <RenameModal
            type="canvas"
            id={selectCanvasId}
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
            />
          ) : (
            <Skeleton width="20px" height="20px" />
          )}
        </Box>
        <Box display="flex" width="80px" height="48px" mr="12px" justifyContent="center">
          {item ? (
            <Image width={80} height={48} src={item.imageUrl} alt={item.name} />
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
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                width="140px"
              >
                {item.name}
              </Box>
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

export default CanvasItem;
