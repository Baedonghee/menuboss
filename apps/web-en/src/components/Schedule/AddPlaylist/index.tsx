/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Box, Button, Empty, Image, Radio, Typography } from '@repo/ui/components';
import { Canvas, Image as ImageIcon, NewPlaylists, Video } from '@repo/ui/icons';
import { theme } from '@repo/ui/theme';
import { IPlayList } from '@repo/ui/types';
import { formatter, getCustomErrorMessage } from '@repo/ui/utils';
import classNames from 'classnames';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { usePlaylistsActions } from '@/actions/playlists-action';
import ModalLayout from '@/components/Layout/Modal';
import { skeletonList } from '@/models/skeleton';
import { playlistsListSelector, playlistsLoadingSelector } from '@/state/playlists';
import { errorToast } from '@/utils/toast';

const AddPlaylistWrapper = styled(Box)`
  ul.tab {
    display: flex;
    border-bottom: 1px solid ${({ theme }) => theme.color.gray200};
    li {
      cursor: pointer;
      font-size: ${({ theme }) => theme.fontSize.text18};
      font-weight: ${({ theme }) => theme.fontWeight.semiBold};
      color: ${({ theme }) => theme.color.gray400};
      padding-bottom: 8px;
      margin-right: 24px;
      &.active {
        border-bottom: 3px solid ${({ theme }) => theme.color.gray900};
        color: ${({ theme }) => theme.color.gray900};
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
  ul.list {
    margin-top: 24px;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.color.gray300};
    li {
      display: flex;
      cursor: pointer;
      border-bottom: 1px solid ${({ theme }) => theme.color.gray100};
      &:last-child {
        border-bottom: none;
      }
      &.header {
        border-bottom: 1px solid ${({ theme }) => theme.color.gray200};
        & > div {
          font-weight: ${({ theme }) => theme.fontWeight.bold};
          height: 44px;
          &:nth-of-type(2) {
            color: ${({ theme }) => theme.color.gray700};
          }
          &:nth-of-type(3) {
            color: ${({ theme }) => theme.color.gray700};
          }
        }
      }
      &.vertical {
        & > div {
          height: 84px;
        }
      }
      & > div {
        display: flex;
        height: 72px;
        align-items: center;
        justify-content: center;
        font-size: ${({ theme }) => theme.fontSize.text14};
        color: ${({ theme }) => theme.color.gray900};
        font-weight: ${({ theme }) => theme.fontWeight.semiBold};
        &:nth-of-type(1) {
          width: 68px;
          font-weight: ${({ theme }) => theme.fontWeight.semiBold};
        }
        &:nth-of-type(2) {
          width: calc(100% - 472px);
          justify-content: start;
          padding-left: 16px;
          overflow: hidden;
          padding: 12px 0px;
        }
        &:nth-of-type(3) {
          width: 200px;
        }
        &:nth-of-type(4) {
          width: 200px;
        }
        .icon-wrapper {
          svg {
            margin-right: 8px;
            &:last-child {
              margin-right: 0;
            }
          }
        }
      }
    }
  }
`;

interface IAddPlaylist {
  selectPlaylist: IPlayList | null;
  onClose: () => void;
  handleSelectPlaylist: (playlist: IPlayList) => void;
}

const AddPlaylist: React.FC<IAddPlaylist> = ({ selectPlaylist, onClose, handleSelectPlaylist }) => {
  const { playlistsList, reset } = usePlaylistsActions();
  const list = useRecoilValue(playlistsListSelector);
  const [loading, setLoading] = useRecoilState(playlistsLoadingSelector);
  const [tab, setTab] = useState<'Horizontal' | 'Vertical'>(
    selectPlaylist?.property.direction.code || 'Horizontal'
  ); // 'Horizontal' | 'Vertical
  const [selectedPlaylist, setSelectedPlaylist] = useState<IPlayList | null>(
    selectPlaylist || null
  );

  useEffect(() => {
    fetchPlaylists(tab);
    return () => {
      reset();
    };
  }, []);

  const fetchPlaylists = async (selectTab: 'Horizontal' | 'Vertical') => {
    try {
      await playlistsList({ direction: selectTab });
    } catch (err) {
      errorToast(getCustomErrorMessage(err));
    }
  };

  const handleTab = (selectTab: 'Horizontal' | 'Vertical') => {
    setSelectedPlaylist(null);
    setLoading(true);
    setTab(selectTab);
    fetchPlaylists(selectTab);
  };

  const handleCheck = (playlist: IPlayList) => {
    setSelectedPlaylist(playlist);
  };

  const handleAddPlaylist = () => {
    if (!selectedPlaylist) {
      errorToast('Please select playlist');
      return;
    }
    handleSelectPlaylist(selectedPlaylist);
  };

  return (
    <ModalLayout title="Add playlist" onClose={onClose} width="1000px">
      <AddPlaylistWrapper mt="32px">
        <ul className="tab">
          <li
            className={classNames({ active: tab === 'Horizontal' })}
            onClick={() => handleTab('Horizontal')}
          >
            Horizontal
          </li>
          <li
            className={classNames({ active: tab === 'Vertical' })}
            onClick={() => handleTab('Vertical')}
          >
            Vertical
          </li>
        </ul>
        {(loading || !!list.length) && (
          <ul className="list">
            <li className="header">
              <div></div>
              <div>Playlist name</div>
              <div>Media content</div>
              <div>Type</div>
            </li>
            {loading
              ? skeletonList.map((_, index) => (
                  <li key={`playlist-skeleton-${index}`}>
                    <div>
                      <Skeleton width={20} height={20} />
                    </div>
                    <div>
                      <Skeleton width="400px" height="60px" />
                    </div>
                    <div>
                      <Skeleton width="100px" height="60px" />
                    </div>
                    <div>
                      <Skeleton width="100px" height="60px" />
                    </div>
                  </li>
                ))
              : list.map((item) => (
                  <li
                    key={`playlist-${item.playlistId}`}
                    onClick={() => handleCheck(item)}
                    className={classNames({
                      vertical: item.property.direction.code === 'Vertical'
                    })}
                  >
                    <div>
                      <Radio checked={selectedPlaylist?.playlistId === item.playlistId} />
                    </div>
                    <div>
                      <Box display="flex" alignItems="center" height="100%" overflow="hidden">
                        <Box
                          display="flex"
                          width={item.property.direction.code === 'Horizontal' ? '100px' : '36px'}
                          height={item.property.direction.code === 'Horizontal' ? '60px' : '60px'}
                          backgroundColor={theme.color.black}
                        >
                          <Image
                            src={item.property.imageUrl}
                            alt={item.name}
                            width={item.property.direction.code === 'Horizontal' ? 100 : 60}
                            height={item.property.direction.code === 'Horizontal' ? 60 : 100}
                            objectFill={tab === 'Horizontal' ? 'fill' : 'contain'}
                          />
                        </Box>
                        <Typography ml="32px">{item.name}</Typography>
                      </Box>
                    </div>
                    <div>
                      <Box display="flex" alignItems="center" className="icon-wrapper" mr="12px">
                        {formatter.sortContent(item.property.contentTypes).map((type, index) => {
                          if (type.code === 'Image') {
                            return (
                              <ImageIcon
                                key={`${type.code}-${index}`}
                                width="20"
                                height="20"
                                color={theme.color.gray900}
                              />
                            );
                          } else if (type.code === 'Video') {
                            return (
                              <Video
                                key={`${type.code}-${index}`}
                                width="20"
                                height="20"
                                color={theme.color.gray900}
                              />
                            );
                          } else if (type.code === 'Canvas') {
                            return (
                              <Canvas
                                key={`${type.code}-${index}`}
                                width="20"
                                height="20"
                                color={theme.color.gray900}
                              />
                            );
                          }
                          return null;
                        })}
                      </Box>
                      <Typography fontSize={theme.fontSize.text14} color={theme.color.gray900}>
                        {`${item.property.contentTypes.length} page${
                          item.property.contentTypes.length > 1 ? 's' : ''
                        }`}
                      </Typography>
                    </div>
                    <div>{item.property.direction.name}</div>
                  </li>
                ))}
          </ul>
        )}
        {!loading && !list.length && (
          <Empty
            icon={<NewPlaylists width="60" height="60" color={theme.color.gray400} />}
            text="There are currently no saved playlists<br/>Please register or create a playlist"
            minHeight="214px"
            size="s"
          />
        )}
        <Box mt="32px" display="flex" justifyContent="end">
          <Button mr="16px" color="neutral" variant="outline" width="120px" onClick={onClose}>
            Cancel
          </Button>
          <Button width="120px" onClick={handleAddPlaylist}>
            Done
          </Button>
        </Box>
      </AddPlaylistWrapper>
    </ModalLayout>
  );
};

export default AddPlaylist;
