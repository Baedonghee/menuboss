/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Empty,
  Form,
  Radio,
  TitleBox,
  Typography,
  UnderlineInput
} from '@repo/ui/components';
import { useBeforeUnload } from '@repo/ui/hooks';
import {
  Fill,
  Fit,
  HorizontalLine,
  PlayListLineEmpty,
  Stretch,
  VerticalLine
} from '@repo/ui/icons';
import { theme } from '@repo/ui/theme';
import { IAddPlayList, IMediaList, IPlayListItemContent, IPreviewList } from '@repo/ui/types';
import { delay, formatter, getCustomErrorMessage } from '@repo/ui/utils';
import classNames from 'classnames';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { useMediaActions } from '@/actions/media-action';
import { usePlaylistsActions } from '@/actions/playlists-action';
import Layout from '@/components/Layout';
import FileItem from '@/components/PlayLists/FileItem';
import { mediaListSelector, mediaTempMediaFileSelector } from '@/state/media';
import {
  playlistsContentListSelector,
  playlistsEditDetailSelector,
  playlistsSettingAlignSelector,
  playlistsSettingOptionSelector
} from '@/state/playlists';
import { ADMIN_PATH } from '@/utils/path';
import { errorToast } from '@/utils/toast';

import Preview from '../Preview';

import SettingsCanvas from './Canvas';
import SettingsMedia from './Media';

const PlaylistsSettingsWrapper = styled(Box)`
  .left {
    ul.tabs {
      display: flex;
      margin-bottom: 24px;
      padding: 0px 16px;
      li {
        width: 50%;
        padding-bottom: 12px;
        text-align: center;
        cursor: pointer;
        &.active {
          border-bottom: 2px solid ${({ theme }) => theme.color.gray900};
        }
      }
    }
    .file-search-wrapper {
      padding: 0px 16px;
    }
    .folder-back {
      margin: 0 8px;
      transform: rotate(180deg);
    }
    ul.list {
      & > li {
        height: 48px;
        margin-bottom: 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
  .right {
    ul.file-list {
      margin-top: 16px;
      min-height: 591px;
      max-height: calc(100vh - 500px);
      overflow: auto;
      & > li {
        & > div {
          height: 80px;
          padding: 0 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      }
    }
  }
`;

interface IPlaylistsSettings {
  playlistId?: string;
}

const PlaylistsSettings: React.FC<IPlaylistsSettings> = ({ playlistId }) => {
  const router = useRouter();
  const { addPlaylist, updatePlaylist, editPlaylistDetail, reset } = usePlaylistsActions();

  const detail = useRecoilValue(playlistsEditDetailSelector);
  const [list, setList] = useRecoilState(playlistsContentListSelector);
  const [playlistsErrorFile, setPlaylistsErrorFile] = useState<string[]>([]);
  const [selectFolder, setSelectFolder] = useState<IMediaList | undefined>(undefined);
  const [isFocus, setIsFocus] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [previewList, setPreviewList] = useState<IPreviewList[]>([]);
  const scrollRef = useRef<HTMLUListElement | null>(null);
  const [mediaFileList, setMediaFileList] = useRecoilState(mediaListSelector);
  const [mediaFilterList, setMediaFilterList] = useState<IMediaList[]>([]);
  const { mediaFile } = useMediaActions();

  const {
    register,
    getValues,
    setValue,
    watch,
    setFocus,
    handleSubmit,
    formState: { isDirty }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: ''
    }
  });

  const [activeTab, setActiveTab] = useState<'media' | 'canvas'>('media');
  const [settingAlign, setSettingAlign] = useRecoilState(playlistsSettingAlignSelector);
  const [settingOption, setSettingOption] = useRecoilState(playlistsSettingOptionSelector);

  const [mediaTemp, setMediaTemp] = useRecoilState(mediaTempMediaFileSelector);

  const [, drop] = useDrop(() => ({ accept: ['ITEM', 'CARD'] }));

  const { isDirty: isPageChange, setIsDirty: setIsPageChange } = useBeforeUnload(
    isDirty,
    detail
      ? ADMIN_PATH.DETAIL_PLAYLISTS.replace(':id', detail.playlistId.toString())
      : ADMIN_PATH.PLAYLISTS,
    'ko'
  );

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  useEffect(() => {
    if (playlistId) {
      fetchPlaylist(playlistId);
    }
  }, [playlistId]);

  useEffect(() => {
    if (mediaFileList.length) {
      setMediaFilterList(
        mediaFileList.filter((item) => {
          if (item.type.code === 'Folder' && !item.property.count) {
            return false;
          }
          return item;
        })
      );
    } else {
      setMediaFilterList([]);
    }
  }, [JSON.stringify(mediaFileList)]);

  useEffect(() => {
    if (detail) {
      if (JSON.stringify(detail.contents) !== JSON.stringify(list) || isDirty) {
        setIsPageChange(true);
      } else {
        setIsPageChange(false);
      }
    } else {
      if (list.length || isDirty) {
        setIsPageChange(true);
      } else {
        setIsPageChange(false);
      }
    }
  }, [detail, list]);

  useEffect(() => {
    if (detail) {
      setList(detail.contents);
      setSettingAlign(detail.property.direction.code as 'Horizontal' | 'Vertical');
      setSettingOption(detail.property.fill.code as 'Fit' | 'Fill' | 'Stretch');
      setValue('name', detail.name);
    }
  }, [detail]);

  useEffect(() => {
    if (mediaTemp) {
      if (selectFolder?.mediaId === mediaTemp.folderId || (!selectFolder && !mediaTemp.folderId)) {
        setMediaFileList((prevList) => {
          const newMediaItem = {
            mediaId: mediaTemp.mediaId,
            name: mediaTemp.name,
            property: mediaTemp.property,
            type: mediaTemp.type,
            object: mediaTemp.object,
            updatedDate: mediaTemp.updatedAt
              ? format(new Date(mediaTemp.updatedAt), 'MM/dd/yyyy')
              : format(new Date(), 'MM/dd/yyyy')
          };

          // type이 'folder'인 객체들 중에서 마지막 'folder'의 인덱스를 찾기
          let lastIndex = -1;
          for (let i = prevList.length - 1; i >= 0; i--) {
            if (prevList[i].type.code === 'Folder') {
              lastIndex = i;
              break;
            }
          }

          if (lastIndex !== -1) {
            // 'folder'를 찾은 경우, 마지막 'folder' 뒤에 추가
            return [
              ...prevList.slice(0, lastIndex + 1),
              newMediaItem,
              ...prevList.slice(lastIndex + 1)
            ];
          } else {
            // 'folder'를 찾지 못한 경우, 배열 끝에 추가
            return [newMediaItem, ...prevList];
          }
        });
      }
      setMediaTemp(null);
    }
  }, [mediaTemp, selectFolder]);

  const fetchPlaylist = async (playlistId: string) => {
    try {
      await editPlaylistDetail(playlistId);
    } catch (err) {
      errorToast(getCustomErrorMessage(err));
    }
  };

  const findCard = useCallback(
    (id: string) => {
      const item = list.filter((c) => `${c.id}` === id)[0] as IPlayListItemContent;
      return {
        item,
        index: list.indexOf(item)
      };
    },
    [list]
  );

  const moveCard = useCallback(
    (id: string, atIndex: number) => {
      const { item, index } = findCard(id);
      const newLists = [...list];
      newLists.splice(index, 1);
      newLists.splice(atIndex, 0, item);
      setList(newLists);
    },
    [findCard, list, setList]
  );

  const handleSettingAlign = (align: 'Horizontal' | 'Vertical') => {
    setSettingAlign(align);
  };

  const handleSettingOption = (option: 'Fit' | 'Fill' | 'Stretch') => {
    setSettingOption(option);
  };

  const handleDelete = (id: string) => {
    setList((prev) => prev.filter((item) => item.id !== id));
    setPlaylistsErrorFile((prev) => prev.filter((errorFile) => errorFile !== id));
  };

  const handlePlaylistPreview = async () => {
    try {
      if (playlistsErrorFile.length) {
        errorToast('재생시간을 확인해주세요');

        return;
      }
      let error = false;
      list.forEach((item) => {
        if (!item.duration) {
          if (!playlistsErrorFile.includes(item.id)) {
            setPlaylistsErrorFile((prev) => [...prev, item.id]);
          }
          error = true;
          return;
        }
      });
      if (error) {
        errorToast('재생시간을 확인해주세요');
        return;
      }
      const newPreviewList = [] as IPreviewList[];
      for (const item of list) {
        if (item.type.code === 'Video') {
          const file = await mediaFile(item.contentId, true);
          if (file) {
            newPreviewList.push({
              videoUrl: file?.property.videoUrl,
              duration: file.property.duration * 1000
            });
          }
        } else {
          const file = await mediaFile(item.contentId, true);
          if (file) {
            newPreviewList.push({
              imageUrl: file.property.imageUrl,
              duration: item.duration * 1000
            });
          }
        }
      }
      setPreviewList(newPreviewList);
      setIsPreview(true);
    } catch (err) {
      errorToast(getCustomErrorMessage(err));
    }
  };

  const handlePlaylistSave = async () => {
    try {
      const { name } = getValues();
      if (playlistsErrorFile.length) {
        errorToast('재생시간을 확인해주세요');
        return;
      }
      let error = false;
      list.forEach((item) => {
        if (!item.duration) {
          if (!playlistsErrorFile.includes(item.id)) {
            setPlaylistsErrorFile((prev) => [...prev, item.id]);
          }
          error = true;
          return;
        }
      });
      if (error) {
        errorToast('재생시간을 확인해주세요');
        return;
      }
      const formData = {
        property: {
          direction: settingAlign,
          fill: settingOption
        },
        contents: list.map((item) => ({
          contentId: item.contentId,
          duration: item.duration
        }))
      } as IAddPlayList;
      if (name) {
        formData.name = name;
      }
      if (playlistId) {
        await updatePlaylist(playlistId, formData);
      } else {
        await addPlaylist(formData);
      }
      setIsPageChange(false);
      await delay(100);
      router.push(ADMIN_PATH.PLAYLISTS);
    } catch (err) {
      errorToast(getCustomErrorMessage(err));
    }
  };

  const handleTimeUpdate = (time: string, item: IPlayListItemContent) => {
    if (!time) {
      if (!playlistsErrorFile.includes(item.id)) {
        setPlaylistsErrorFile((prev) => [...prev, item.id]);
      }
      return;
    }
    const duration = formatter.timeConvertToSeconds(time);
    if (playlistsErrorFile.includes(item.id)) {
      setPlaylistsErrorFile((prev) => prev.filter((errorFile) => errorFile !== item.id));
    }
    setList((prev) =>
      prev.map((listItem) => {
        if (item.id === listItem.id) {
          return { ...listItem, duration };
        }
        return listItem;
      })
    );
  };

  const handleFolderNameBlur = () => {
    if (playlistId && detail) {
      const { name } = getValues();
      if (!name) {
        setValue('name', detail.name);
        return;
      }
    }
  };

  const handleFocus = (isFocus: boolean) => {
    setIsFocus(isFocus);
  };

  const handlePreviewClose = () => {
    setIsPreview(false);
  };

  const onNameSubmit = handleSubmit(({ name }) => {
    if (playlistId && detail) {
      const { name } = getValues();
      if (!name) {
        setValue('name', detail.name);
        return;
      }
    }
    setValue('name', name);
    setIsFocus(false);
  });

  const handleSetTab = (selectTab: 'media' | 'canvas') => {
    if (activeTab !== selectTab) {
      setActiveTab(selectTab);
    }
  };

  // const handleNewFolder = async () => {
  //   try {
  //     await createFolder();
  //   } catch (err) {
  //     errorToast(getCustomErrorMessage(err));
  //   }
  // };

  return (
    <Layout>
      {isPreview && (
        <Preview
          list={previewList}
          onClose={handlePreviewClose}
          settingAlign={settingAlign.toLocaleLowerCase() as 'horizontal' | 'vertical'}
          settingOption={settingOption.toLocaleLowerCase() as 'fit' | 'fill' | 'stretch'}
          language="ko"
        />
      )}
      <TitleBox
        backUrl={
          detail
            ? ADMIN_PATH.DETAIL_PLAYLISTS.replace(':id', detail.playlistId.toString())
            : ADMIN_PATH.PLAYLISTS
        }
        isDirty={isPageChange}
        setIsDirty={setIsPageChange}
      >
        <Box display="flex" alignItems="center">
          <Form title="Change playlists name" onSubmit={onNameSubmit}>
            <UnderlineInput
              name="name"
              register={register}
              onBlur={handleFolderNameBlur}
              width="auto"
              value={watch('name')}
              setFocus={setFocus}
              placeholder="제목을 입력해주세요"
              isFocus={isFocus}
              handleFocus={handleFocus}
            />
          </Form>
        </Box>
        <Box display="flex">
          <Button
            color="neutral"
            variant="outline"
            size="m"
            width="120px"
            mr="12px"
            onClick={handlePlaylistPreview}
            disabled={!list.length}
          >
            미리보기
          </Button>
          <Button
            color="primary"
            variant="fill"
            size="m"
            width="120px"
            onClick={handlePlaylistSave}
            disabled={!list.length}
          >
            저장
          </Button>
        </Box>
      </TitleBox>
      <PlaylistsSettingsWrapper
        display="flex"
        borderLeft={`1px solid ${theme.color.gray300}`}
        borderTop={`1px solid ${theme.color.gray300}`}
        borderRight={`1px solid ${theme.color.gray300}`}
        borderRadius="8px"
        mt="24px"
      >
        <Box
          className="left"
          width="320px"
          minWidth="320px"
          minHeight="754px"
          maxHeight="754px"
          display="flex"
          flexDirection="column"
          borderBottom={`1px solid ${theme.color.gray200}`}
          p="20px 0px"
          position="relative"
        >
          <ul className="tabs">
            <li
              className={classNames({ active: activeTab === 'media' })}
              onClick={() => handleSetTab('media')}
            >
              <Typography
                fontSize={theme.fontSize.text16}
                color={activeTab === 'media' ? theme.color.gray900 : theme.color.gray400}
              >
                보관함
              </Typography>
            </li>
            <li
              className={classNames({ active: activeTab === 'canvas' })}
              onClick={() => handleSetTab('canvas')}
            >
              <Typography
                fontSize={theme.fontSize.text16}
                color={activeTab === 'canvas' ? theme.color.gray900 : theme.color.gray400}
              >
                캔버스
              </Typography>
            </li>
          </ul>
          {activeTab === 'media' ? (
            <SettingsMedia
              selectFolder={selectFolder}
              setSelectFolder={setSelectFolder}
              filterList={mediaFilterList}
              setFilterList={setMediaFilterList}
            />
          ) : (
            <SettingsCanvas />
          )}
        </Box>
        <Box
          className="right"
          width="calc(100% - 320px)"
          borderBottom={`1px solid ${theme.color.gray200}`}
          borderLeft={`1px solid ${theme.color.gray200}`}
        >
          <Box p="24px 20px 16px" borderBottom={`1px solid ${theme.color.gray200}`}>
            <Typography
              fontSize={theme.fontSize.text16}
              color={theme.color.gray900}
              fontWeight={theme.fontWeight.semiBold}
            >
              옵션
            </Typography>
            <Box display="flex" alignItems="center" mt="16px">
              <Box display="flex" pr="24px" borderRight={`1.5px solid ${theme.color.gray200}`}>
                <Box
                  display="flex"
                  alignItems="center"
                  mr="16px"
                  onClick={() => handleSettingAlign('Horizontal')}
                  cursor="pointer"
                >
                  <Radio
                    display="flex"
                    alignItems="center"
                    mr="12px"
                    checked={settingAlign === 'Horizontal'}
                  />
                  <HorizontalLine width="24" height="24" color={theme.color.gray900} />
                  <Typography fontSize={theme.fontSize.text14} color={theme.color.gray900} ml="8px">
                    가로
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  mr="16px"
                  onClick={() => handleSettingAlign('Vertical')}
                  cursor="pointer"
                >
                  <Radio
                    display="flex"
                    alignItems="center"
                    mr="12px"
                    checked={settingAlign === 'Vertical'}
                  />
                  <VerticalLine width="24" height="24" color={theme.color.gray900} />
                  <Typography fontSize={theme.fontSize.text14} color={theme.color.gray900} ml="8px">
                    세로
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" pl="24px">
                <Box
                  display="flex"
                  alignItems="center"
                  mr="16px"
                  onClick={() => handleSettingOption('Fill')}
                  cursor="pointer"
                >
                  <Radio
                    display="flex"
                    alignItems="center"
                    mr="12px"
                    checked={settingOption === 'Fill'}
                  />
                  <Fill
                    width="24"
                    height="24"
                    color={theme.color.gray900}
                    fill={theme.color.white}
                  />
                  <Typography fontSize={theme.fontSize.text14} color={theme.color.gray900} ml="8px">
                    채우기
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  onClick={() => handleSettingOption('Fit')}
                  cursor="pointer"
                  mr="16px"
                >
                  <Radio
                    display="flex"
                    alignItems="center"
                    mr="12px"
                    checked={settingOption === 'Fit'}
                  />
                  <Fit width="24" height="24" color={theme.color.gray900} />
                  <Typography fontSize={theme.fontSize.text14} color={theme.color.gray900} ml="8px">
                    맞추기
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  onClick={() => handleSettingOption('Stretch')}
                  cursor="pointer"
                >
                  <Radio
                    display="flex"
                    alignItems="center"
                    mr="12px"
                    checked={settingOption === 'Stretch'}
                  />
                  <Stretch width="24" height="24" color={theme.color.gray900} />
                  <Typography fontSize={theme.fontSize.text14} color={theme.color.gray900} ml="8px">
                    늘리기
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box mt="24px" display="flex" justifyContent="start" p="0px 20px">
            <Typography
              fontSize={theme.fontSize.text14}
              fontWeight={theme.fontWeight.semiBold}
              color={theme.color.gray500}
              mr="8px"
            >
              총 재생시간
            </Typography>
            <Typography
              fontSize={theme.fontSize.text14}
              fontWeight={theme.fontWeight.semiBold}
              color={theme.color.gray900}
            >
              {list.length
                ? formatter.timeConvert(list.reduce((acc, cur) => acc + cur.duration, 0))
                : '00:00:00'}
            </Typography>
          </Box>
          <Box ref={drop}>
            <ul className="file-list" ref={scrollRef}>
              {list.length ? (
                list.map((item) => {
                  return (
                    <FileItem
                      key={`playlist-content-${item.id}`}
                      id={item.id}
                      item={item}
                      findCard={findCard}
                      moveCard={moveCard}
                      handleDelete={handleDelete}
                      handleTimeUpdate={handleTimeUpdate}
                      error={playlistsErrorFile.includes(item.id)}
                    />
                  );
                })
              ) : (
                <Empty
                  icon={<PlayListLineEmpty width="60" height="60" color={theme.color.gray400} />}
                  text="재생목록이 비어있습니다<br/>보관함의 컨텐츠를 선택하여 추가해주세요"
                  minHeight="591px"
                />
              )}
            </ul>
          </Box>
        </Box>
      </PlaylistsSettingsWrapper>
    </Layout>
  );
};

export default PlaylistsSettings;
