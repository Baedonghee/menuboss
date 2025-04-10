/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Box, CheckBox, Image, MoreMenu, Typography } from '@repo/ui/components';
import { Folder, More, Move, Trash } from '@repo/ui/icons';
import { useAlert } from '@repo/ui/providers';
import { theme } from '@repo/ui/theme';
import { IMediaList, IMoreMenuList } from '@repo/ui/types';
import { conversion, getCustomErrorMessage } from '@repo/ui/utils';
import { useRouter } from 'next/router';

import { useMediaActions } from '@/actions/media-action';
import { ADMIN_PATH } from '@/utils/path';
import { errorToast } from '@/utils/toast';

interface IMediaTableItem {
  item?: IMediaList;
  menuSelectMedia: string;
  handleMenuSelectMedia: (mediaId: string) => void;
  checked: boolean;
  handleMenuCheckList: (mediaId: string) => void;
  handleFileToFolderMove: (mediaId: string) => void;
}

const MediaTableItem: React.FC<IMediaTableItem> = ({
  item,
  menuSelectMedia,
  handleMenuSelectMedia,
  checked,
  handleMenuCheckList,
  handleFileToFolderMove
}) => {
  const router = useRouter();
  const { query } = router;
  const { deleteFile } = useMediaActions();
  const { handleShowAlert, handleClose: handleAlertClose } = useAlert();
  const [list, setList] = useState<IMoreMenuList[]>([]);

  useEffect(() => {
    if (item) {
      const newList = [
        {
          icon: <Trash width="20" height="20" color={theme.color.red500} />,
          name: '삭제',
          color: theme.color.red500,
          onClick: handleFileDelete
        }
      ];
      if (item.type.code !== 'Folder') {
        newList.unshift({
          icon: <Move width="20" height="20" color={theme.color.black} />,
          name: '파일 이동',
          color: theme.color.gray900,
          onClick: handleFileMove
        });
      }
      setList(newList);
    }
  }, [item]);

  const handleClose = (e: MouseEvent) => {
    if ((e.target as HTMLElement).tagName === 'svg') {
      return;
    }
    handleMenuSelectMedia('');
  };

  const handleMenuCheckListEvent = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (item) {
      handleMenuCheckList(item.mediaId);
    }
  };

  const handleMove = () => {
    if (item) {
      if (item.type.code === 'Folder') {
        router.push(ADMIN_PATH.MEDIA_FOLDER.replace(':id', item.mediaId));
      } else {
        if (query.id) {
          router.push(
            ADMIN_PATH.MEDIA_FOLDER_FILE.replace(':folderId', query.id as string).replace(
              ':id',
              item.mediaId
            )
          );
        } else {
          router.push(ADMIN_PATH.MEDIA_FILE.replace(':id', item.mediaId));
        }
      }
    }
  };

  const handleMoreOpen = (e: React.MouseEvent<HTMLOrSVGElement, MouseEvent>) => {
    e.stopPropagation();
    if (item) {
      handleMenuSelectMedia(menuSelectMedia === item.mediaId ? '' : item.mediaId);
    }
  };

  const handleFileMove = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.stopPropagation();
    if (item) {
      handleFileToFolderMove(item.mediaId);
    }
  };

  const handleFileDelete = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.stopPropagation();
    if (item) {
      handleMenuSelectMedia('');
      handleShowAlert({
        title: '파일 삭제',
        description: '해당 파일을 삭제하시겠습니까?',
        alertType: 'confirm',
        type: 'error',
        confirmText: '삭제',
        onConfirm: async () => {
          try {
            await deleteFile([item.mediaId], false);
            handleAlertClose();
          } catch (err) {
            errorToast(getCustomErrorMessage(err));
          }
        }
      });
    }
  };

  return (
    <li onClick={handleMove}>
      <div>
        <Box
          display="flex"
          width="40px"
          height="40px"
          alignItems="center"
          justifyContent="center"
          onClick={handleMenuCheckListEvent}
        >
          {item ? (
            <CheckBox
              name={item.mediaId}
              checked={checked}
              disabled={
                !!(item.type.code === 'Folder' && item.property.count && item.property.count > 0)
              }
            />
          ) : (
            <Skeleton width={24} height={24} />
          )}
        </Box>
      </div>
      <Box display="flex" alignItems="center">
        <Box
          width="100px"
          height="60px"
          mr="32px"
          display="flex"
          alignItems="center"
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
            item.type.code !== 'Folder' ? (
              <Image src={item.property.imageUrl} alt={item.name} width={100} height={60} />
            ) : (
              <Folder width="60" height="60" color={theme.color.gray400} />
            )
          ) : (
            <Skeleton width={100} height={60} />
          )}
        </Box>
      </Box>
      <Box display="flex" alignItems="center">
        <Box width="calc(100% - 132px)">
          {item ? (
            <>
              <Box
                fontSize={theme.fontSize.text14}
                fontWeight={theme.fontWeight.semiBold}
                color={theme.color.gray900}
                mb="4px"
                className="file-name"
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
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
              <Skeleton count={1} />
              <Skeleton count={1} />
            </>
          )}
        </Box>
      </Box>
      <div>{item ? item.updatedDate : <Skeleton count={1} width={100} />}</div>
      <div>
        {item && (
          <Box position="relative">
            <More
              width="24"
              height="24"
              color={theme.color.gray600}
              style={{ cursor: 'pointer' }}
              onClick={handleMoreOpen}
            />
            {menuSelectMedia === item.mediaId && (
              <MoreMenu width="140px" top={28} right={0} list={list} handleClose={handleClose} />
            )}
          </Box>
        )}
      </div>
    </li>
  );
};

export default MediaTableItem;
