import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { Box, Image, MoreMenu, Typography } from '@repo/ui/components';
import { More, Trash } from '@repo/ui/icons';
import { useAlert } from '@repo/ui/providers';
import { theme } from '@repo/ui/theme';
import { ICanvasList } from '@repo/ui/types';
import { getCustomErrorMessage } from '@repo/ui/utils';
import styled from 'styled-components';

import { useCanvasActions } from '@/actions/canvas-actions';
import { errorToast } from '@/utils/toast';

const CanvasItemWrapper = styled(Box)`
  .image-wrapper {
    border-radius: 8px;
    overflow: hidden;
  }
`;

interface ICanvasItem {
  selectedCanvasId: string;
  handleSelectedCanvas: (id: string) => void;
  item?: ICanvasList;
}

const CanvasItem: React.FC<ICanvasItem> = ({ item, selectedCanvasId, handleSelectedCanvas }) => {
  const { handleShowAlert, handleClose: handleAlertClose } = useAlert();
  const { canvasDelete } = useCanvasActions();
  const handleCanvasDelete = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    if (item) {
      handleShowAlert({
        title: 'Delete canvas',
        description: 'Are you sure you want to remove this canvas from your account?',
        alertType: 'confirm',
        type: 'error',
        confirmText: 'Delete',
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
      icon: <Trash width="20" height="20" color={theme.color.red500} />,
      name: 'Delete',
      color: theme.color.red500,
      onClick: handleCanvasDelete
    }
  ];

  const handleClose = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    handleSelectedCanvas('');
  };

  const handleOpen = (e: React.MouseEvent<HTMLOrSVGElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    if (item) {
      if (selectedCanvasId === item.canvasId) {
        handleSelectedCanvas('');
        return;
      }
      handleSelectedCanvas(item.canvasId);
    }
  };

  return (
    <CanvasItemWrapper>
      <Box
        className="image-wrapper"
        position="relative"
        width="356px"
        height="214px"
        overflow="hidden"
        border={`1px solid ${theme.color.gray200}`}
        backgroundColor={item ? theme.color.black : 'transparent'}
      >
        {item ? (
          <Image width={358} height={214} src={item.imageUrl} alt={item.name} className="image" />
        ) : (
          <Skeleton width={356} height={214} />
        )}
      </Box>
      <Box position="relative" mt="16px">
        {item ? (
          <>
            <Typography
              fontSize={theme.fontSize.text16}
              fontWeight={theme.fontWeight.semiBold}
              color={theme.color.gray900}
            >
              {item.name}
            </Typography>
            <Typography mt="4px" fontSize={theme.fontSize.text12} color={theme.color.gray500}>
              Latest update: {item.createdDate}
            </Typography>
            <Box position="absolute" right="0" top="0">
              <More
                width="24"
                height="24"
                color={theme.color.gray900}
                style={{ cursor: 'pointer' }}
                onClick={handleOpen}
              />
              {selectedCanvasId === item.canvasId && (
                <MoreMenu top={28} right={0} list={list} handleClose={handleClose} />
              )}
            </Box>
          </>
        ) : (
          <Box mt="16px">
            <Skeleton width={356} height={15} />
            <Skeleton width={356} height={10} />
          </Box>
        )}
      </Box>
    </CanvasItemWrapper>
  );
};

export default CanvasItem;
