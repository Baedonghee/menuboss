/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Box, Button, Image, TitleBox, Typography } from '@repo/ui/components';
import {
  Fill,
  Fit,
  HorizontalLine,
  PlayListLine,
  Stretch,
  Trash,
  VerticalLine
} from '@repo/ui/icons';
import { useAlert } from '@repo/ui/providers';
import { theme } from '@repo/ui/theme';
import { IPreviewList } from '@repo/ui/types';
import { formatter, getCustomErrorMessage } from '@repo/ui/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { useMediaActions } from '@/actions/media-action';
import { usePlaylistsActions } from '@/actions/playlists-action';
import SeoHead from '@/components/common/SeoHead';
import Layout from '@/components/Layout';
import Protect from '@/components/Layout/Protect';
import Preview from '@/components/PlayLists/Preview';
import { skeletonList } from '@/models/skeleton';
import { playlistsDetailSelector } from '@/state/playlists';
import { ADMIN_PATH } from '@/utils/path';
import { errorToast } from '@/utils/toast';

const PlaylistDetailWrapper = styled(Box)`
  ul {
    min-height: 600px;
    li {
      display: flex;
      border-bottom: 1px solid ${({ theme }) => theme.color.gray100};
      &:last-child {
        border-bottom: none;
      }
      &.header {
        border-bottom: 1px solid ${({ theme }) => theme.color.gray200};
        & > div {
          font-weight: ${({ theme }) => theme.fontWeight.semiBold} !important;
          height: 48px;
          color: ${({ theme }) => theme.color.gray700};
        }
      }
      & > div {
        display: flex;
        height: 84px;
        align-items: center;
        justify-content: center;
        font-size: ${({ theme }) => theme.fontSize.text14};
        color: ${({ theme }) => theme.color.gray900};
        font-weight: ${({ theme }) => theme.fontWeight.normal};
        &:nth-of-type(1) {
          width: 72px;
          font-weight: ${({ theme }) => theme.fontWeight.semiBold};
        }
        &:nth-of-type(2) {
          width: calc(100% - 272px);
          justify-content: start;
          padding-left: 16px;
          overflow: hidden;
          padding: 12px 0px;
        }
        &:nth-of-type(3) {
          width: 200px;
        }
      }
    }
  }
`;

const PlaylistDetail = () => {
  const router = useRouter();
  const { query } = router;
  const { handleShowAlert, handleClose: handleAlertClose } = useAlert();
  const { getPlaylist, deletePlaylist, reset } = usePlaylistsActions();
  const { mediaFile } = useMediaActions();
  const detail = useRecoilValue(playlistsDetailSelector);

  const [isPreview, setIsPreview] = useState(false);
  const [previewList, setPreviewList] = useState<IPreviewList[]>([]);

  useEffect(() => {
    fetchPlaylist(query.id as string);
    return () => {
      reset();
    };
  }, []);

  const fetchPlaylist = async (playlistId: string) => {
    try {
      await getPlaylist(playlistId);
    } catch (err) {
      errorToast(getCustomErrorMessage(err));
    }
  };

  const handleDelete = () => {
    if (detail) {
      handleShowAlert({
        title: 'Delete playlists',
        description: 'Are you sure you want to remove this playlists from your account?',
        alertType: 'confirm',
        type: 'error',
        confirmText: 'Delete',
        onConfirm: async () => {
          try {
            await deletePlaylist(detail.playlistId);
            handleAlertClose();
            router.replace(ADMIN_PATH.PLAYLISTS);
          } catch (err) {
            errorToast(getCustomErrorMessage(err));
          }
        }
      });
    }
  };

  const handlePlaylistPreview = async () => {
    try {
      if (detail) {
        const newPreviewList = [] as IPreviewList[];
        for (const item of detail.contents) {
          if (item.type.code === 'Video') {
            const file = await mediaFile(item.contentId, true);
            if (file) {
              newPreviewList.push({
                videoUrl: file?.property.videoUrl,
                duration: file.property.duration * 1000
              });
            }
          } else {
            newPreviewList.push({
              imageUrl: item.property.imageUrl,
              duration: item.duration * 1000
            });
          }
        }
        setPreviewList(newPreviewList);
        setIsPreview(true);
      }
    } catch (err) {
      errorToast(getCustomErrorMessage(err));
    }
  };

  const handlePreviewClose = () => {
    setIsPreview(false);
  };

  return (
    <>
      <SeoHead title={detail?.name ? `${detail.name} | MenuBoss` : undefined} />
      <Layout>
        {isPreview && detail && (
          <Preview
            list={previewList}
            onClose={handlePreviewClose}
            settingAlign={
              detail.property.direction.code.toLocaleLowerCase() as 'horizontal' | 'vertical'
            }
            settingOption={
              detail.property.fill.code.toLocaleLowerCase() as 'fit' | 'fill' | 'stretch'
            }
          />
        )}
        <TitleBox backUrl={ADMIN_PATH.PLAYLISTS}>
          <Box display="flex" alignItems="center">
            {detail ? (
              <Typography
                fontSize={theme.fontSize.text24}
                fontWeight={theme.fontWeight.semiBold}
                mr="12px"
              >
                {detail.name}
              </Typography>
            ) : (
              <Skeleton width="300px" />
            )}
          </Box>
          <Box display="flex">
            <Button
              color="error"
              variant="outline"
              size="m"
              width="120px"
              mr="12px"
              icon="left"
              onClick={handleDelete}
            >
              <Trash width="20" height="20" color={theme.color.red500} />
              Delete
            </Button>
            <Link href={ADMIN_PATH.EDIT_PLAYLISTS.replace(':id', query.id as string)}>
              <Button color="primary" variant="fill" size="m" width="120px">
                Edit
              </Button>
            </Link>
          </Box>
        </TitleBox>
        <PlaylistDetailWrapper
          mt="24px"
          width="100%"
          borderRadius="8px"
          border={`1px solid ${theme.color.gray300}`}
        >
          <Box p="24px 24px 16px" borderBottom={`1px solid ${theme.color.gray200}`}>
            <Typography
              fontSize={theme.fontSize.text16}
              fontWeight={theme.fontWeight.semiBold}
              color={theme.color.gray900}
            >
              Option
            </Typography>
            {detail ? (
              <Box mt="16px" display="flex" alignItems="center" justifyContent="space-between">
                <Box display="flex" alignItems="center">
                  <Box
                    display="flex"
                    alignItems="center"
                    mr="24px"
                    pr="24px"
                    borderRight={`1.5px solid ${theme.color.gray200}`}
                  >
                    {detail.property.direction.code === 'Horizontal' ? (
                      <>
                        <HorizontalLine width="24" height="24" color={theme.color.gray900} />
                        <Typography
                          fontSize={theme.fontSize.text14}
                          color={theme.color.gray900}
                          ml="8px"
                        >
                          Horizontal
                        </Typography>
                      </>
                    ) : (
                      <>
                        <VerticalLine width="24" height="24" color={theme.color.gray900} />
                        <Typography
                          fontSize={theme.fontSize.text14}
                          color={theme.color.gray900}
                          ml="8px"
                        >
                          Vertical
                        </Typography>
                      </>
                    )}
                  </Box>
                  <Box display="flex" alignItems="center">
                    {detail.property.fill.code === 'Fit' ? (
                      <>
                        <Fit width="24" height="24" color={theme.color.gray900} />
                        <Typography
                          fontSize={theme.fontSize.text14}
                          fontWeight={theme.fontWeight.semiBold}
                          color={theme.color.gray900}
                          ml="8px"
                        >
                          Fit
                        </Typography>
                      </>
                    ) : detail.property.fill.code === 'Fill' ? (
                      <>
                        <Fill
                          width="24"
                          height="24"
                          color={theme.color.gray900}
                          fill={theme.color.white}
                        />
                        <Typography
                          fontSize={theme.fontSize.text14}
                          fontWeight={theme.fontWeight.semiBold}
                          color={theme.color.gray900}
                          ml="8px"
                        >
                          Fill
                        </Typography>
                      </>
                    ) : (
                      <>
                        <Stretch
                          width="24"
                          height="24"
                          color={theme.color.gray900}
                          fill={theme.color.white}
                        />
                        <Typography
                          fontSize={theme.fontSize.text14}
                          fontWeight={theme.fontWeight.semiBold}
                          color={theme.color.gray900}
                          ml="8px"
                        >
                          Stretch
                        </Typography>
                      </>
                    )}
                  </Box>
                </Box>
                <Button
                  color="neutral"
                  variant="outline"
                  icon="left"
                  width="120px"
                  onClick={handlePlaylistPreview}
                >
                  <PlayListLine width="20" height="20" color={theme.color.black} />
                  Preview
                </Button>
              </Box>
            ) : (
              <Box mt="16px">
                <Skeleton width="300px" height="24px" />
              </Box>
            )}
          </Box>
          <Box mt="24px">
            <Box p="0px 24px" display="flex" mb="16px">
              <Typography
                fontSize={theme.fontSize.text14}
                fontWeight={theme.fontWeight.semiBold}
                color={theme.color.gray500}
              >
                Total duration
              </Typography>
              {detail ? (
                <Typography
                  fontSize={theme.fontSize.text14}
                  fontWeight={theme.fontWeight.semiBold}
                  color={theme.color.gray900}
                  ml="8px"
                >
                  {formatter.timeConvert(
                    detail.contents.reduce((acc, cur) => acc + cur.duration, 0)
                  )}
                </Typography>
              ) : (
                <Box ml="8px">
                  <Skeleton width="65px" height="20px" />
                </Box>
              )}
            </Box>
            <ul>
              <li className="header">
                <div>No.</div>
                <div>File name</div>
                <div>Duration</div>
              </li>
              {detail
                ? detail.contents.map((item, index) => (
                    <li key={`content-${item.contentId}`}>
                      <div>{index + 1}</div>
                      <div>
                        <Box display="flex" alignItems="center" height="100%" overflow="hidden">
                          <Image
                            src={item.property.imageUrl}
                            alt={item.name}
                            width={100}
                            height={60}
                          />
                          <Typography ml="32px">{item.name}</Typography>
                        </Box>
                      </div>
                      <div>{formatter.timeConvert(item.duration)}</div>
                    </li>
                  ))
                : skeletonList.map((_, index) => (
                    <li key={`skeleton-${index}`}>
                      <div>
                        <Skeleton width="20px" height="20px" />
                      </div>
                      <div>
                        <Skeleton width="500px" height="60px" />
                      </div>
                      <div>
                        <Skeleton width="100px" height="20px" />
                      </div>
                    </li>
                  ))}
            </ul>
          </Box>
        </PlaylistDetailWrapper>
      </Layout>
    </>
  );
};

export default Protect(PlaylistDetail);
