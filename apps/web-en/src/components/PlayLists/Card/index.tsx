import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { Box, Button, Image, MoreMenu, Typography } from '@repo/ui/components';
import { Canvas, Edit, Image as ImageIcon, More, Trash, Video } from '@repo/ui/icons';
import { useAlert } from '@repo/ui/providers';
import { theme } from '@repo/ui/theme';
import { IPlayList } from '@repo/ui/types';
import { formatter, getCustomErrorMessage } from '@repo/ui/utils';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { usePlaylistsActions } from '@/actions/playlists-action';
import { ADMIN_PATH } from '@/utils/path';
import { errorToast } from '@/utils/toast';

const PayListsWrapper = styled(Box)`
  width: 100%;
  border: 1px solid ${theme.color.gray300};
  border-radius: 8px;
  .image-wrapper {
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    overflow: hidden;
    .more-wrapper {
      position: absolute;
      top: 12px;
      right: 7px;
      z-index: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .img-skeleton {
      display: flex;
      border-radius: 0;
    }
  }
  .icon-wrapper {
    & > ul {
      display: flex;
      align-items: center;
      margin-right: 12px;
      li {
        display: flex;
        margin-right: 8px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
`;

interface IPlayListsCard {
  item?: IPlayList;
  menuSelectPlaylist: number;
  handleMenuSelectPlaylist: (playlistId: number) => void;
}

const PlayListsCard: React.FC<IPlayListsCard> = ({
  item,
  menuSelectPlaylist,
  handleMenuSelectPlaylist
}) => {
  const router = useRouter();
  const { deletePlaylist } = usePlaylistsActions();
  const { handleShowAlert, handleClose: handleAlertClose } = useAlert();

  const handleEditMove = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.preventDefault();
    if (item) {
      router.push(ADMIN_PATH.EDIT_PLAYLISTS.replace(':id', item.playlistId.toString()));
    }
  };

  const handlePlaylistDelete = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    if (item) {
      handleMenuSelectPlaylist(-1);
      handleShowAlert({
        title: 'Delete playlists',
        description: 'Are you sure you want to remove this playlists from your account?',
        alertType: 'confirm',
        type: 'error',
        confirmText: 'Delete',
        onConfirm: async () => {
          try {
            await deletePlaylist(item.playlistId);
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
      icon: <Edit width="20" height="20" color={theme.color.gray900} />,
      name: 'Edit',
      color: theme.color.gray900,
      onClick: handleEditMove
    },
    {
      icon: <Trash width="20" height="20" color={theme.color.red500} />,
      name: 'Delete',
      color: theme.color.red500,
      onClick: handlePlaylistDelete
    }
  ];

  const handleMoreOpen = (e: React.MouseEvent<HTMLOrSVGElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    if (item) {
      handleMenuSelectPlaylist(menuSelectPlaylist === item.playlistId ? -1 : item.playlistId);
    }
  };

  const handleClose = (e: MouseEvent) => {
    if ((e.target as HTMLElement).tagName === 'svg') {
      return;
    }
    handleMenuSelectPlaylist(-1);
  };

  const handleApplyScreen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (item) {
      router.push(ADMIN_PATH.SCREENS_PLAYLISTS.replace(':id', item.playlistId.toString()));
    }
  };

  return (
    <PayListsWrapper>
      <Box
        className="image-wrapper"
        position="relative"
        width="281px"
        height="168px"
        backgroundColor={theme.color.black}
      >
        {item ? (
          <>
            <Image
              width={281}
              height={168}
              src={item.property.imageUrl}
              alt={item.name}
              className="image"
            />
            <Box
              width="32px"
              height="32px"
              borderRadius="50%"
              backgroundColor="rgba(0, 0, 0, 0.30)"
              className="more-wrapper"
              onClick={handleMoreOpen}
            >
              <More
                width="20"
                height="20"
                color={theme.color.white}
                style={{ cursor: 'pointer' }}
              />
            </Box>
            {menuSelectPlaylist === item.playlistId && (
              <MoreMenu top="44px" right="6px" list={list} handleClose={handleClose} />
            )}
          </>
        ) : (
          <Skeleton width={281} height={169} className="img-skeleton" />
        )}
      </Box>
      <Box p="24px 20px 20px">
        {item ? (
          <>
            <Box
              fontSize={theme.fontSize.text20}
              fontWeight={theme.fontWeight.semiBold}
              mb="4px"
              color={theme.color.gray900}
              width="241px"
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
            >
              {item.name}
            </Box>
            <Box display="flex" alignItems="center" className="icon-wrapper" mt="16px">
              <ul>
                {formatter.sortContent(item.property.contentTypes).map((type, index) => {
                  if (type.code === 'Image') {
                    return (
                      <li key={`${type.code}-${index}`}>
                        <ImageIcon width="20" height="20" color={theme.color.gray900} />
                      </li>
                    );
                  } else if (type.code === 'Video') {
                    return (
                      <li key={`${type.code}-${index}`}>
                        <Video width="20" height="20" color={theme.color.gray900} />
                      </li>
                    );
                  } else if (type.code === 'Canvas') {
                    return (
                      <li key={`${type.code}-${index}`}>
                        <Canvas width="20" height="20" color={theme.color.gray900} />
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
              <Typography fontSize={theme.fontSize.text14} color={theme.color.gray900}>
                {`${item.property.count} page${item.property.count > 1 ? 's' : ''}`}
              </Typography>
            </Box>
            <Typography fontSize={theme.fontSize.text12} color={theme.color.gray600} mt="16px">
              Latest update : {item.updatedDate}
            </Typography>
          </>
        ) : (
          <>
            <Skeleton style={{ marginBottom: '6px' }} />
            <Skeleton style={{ marginBottom: '16px' }} />
            <Skeleton style={{ marginBottom: '8px' }} />
            <Skeleton style={{ marginBottom: '24px' }} />
          </>
        )}
        {item ? (
          <Button width="100%" onClick={handleApplyScreen} mt="16px">
            Apply to screens
          </Button>
        ) : (
          <Skeleton style={{ width: '100%', height: '48px' }} />
        )}
      </Box>
    </PayListsWrapper>
  );
};

export default PlayListsCard;
