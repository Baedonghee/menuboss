import React, { useCallback, useEffect, useState } from 'react';
import { DropEvent, FileWithPath, useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { Box, Button, CheckBox, DragFile, Form, Input, Typography } from '@repo/ui/components';
import { Back, Search, Upload, UploadFile } from '@repo/ui/icons';
import { theme } from '@repo/ui/theme';
import { IMediaList, IPlayListItemContent } from '@repo/ui/types';
import { getCustomErrorMessage } from '@repo/ui/utils';
import { nanoid } from 'nanoid';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { useMediaActions } from '@/actions/media-action';
import { skeletonList } from '@/models/skeleton';
import { mediaListLoadingSelector, mediaListSelector } from '@/state/media';
import { playlistsContentListSelector } from '@/state/playlists';
import {
  uploadFileListSelector,
  uploadFolderIdSelector,
  uploadModalOpenSelector
} from '@/state/upload';
import { errorToast } from '@/utils/toast';

import FolderItem from '../../FolderItem';

interface ISettingsMedia {
  selectFolder?: IMediaList;
  setSelectFolder: React.Dispatch<React.SetStateAction<IMediaList | undefined>>;
  filterList: IMediaList[];
  setFilterList: React.Dispatch<React.SetStateAction<IMediaList[]>>;
}

const SettingsMedia: React.FC<ISettingsMedia> = ({
  selectFolder,
  setSelectFolder,
  filterList,
  setFilterList
}) => {
  const setList = useSetRecoilState(playlistsContentListSelector);
  const { mediaList, mediaFolderFileList } = useMediaActions();
  const setUploadFolderId = useSetRecoilState(uploadFolderIdSelector);
  const mediaFileList = useRecoilValue(mediaListSelector);
  const setIsFileUploadModal = useSetRecoilState(uploadModalOpenSelector); // 파일 업로드 모달
  const setUploadFileList = useSetRecoilState(uploadFileListSelector);
  const mediaLoading = useRecoilValue(mediaListLoadingSelector);

  const [selectFolderAndFileCheckList, setSelectFolderAndFileCheckList] = useState<IMediaList[]>(
    []
  );

  const handleFolderMove = (item?: IMediaList) => {
    searchSetValue('q', '');
    setSelectFolder(item || undefined);
    setSelectFolderAndFileCheckList([]);
    setUploadFolderId(item?.mediaId);
    fetchMediaFileList(item);
    setFilterList([]);
  };

  const {
    register: searchRegister,
    setValue: searchSetValue,
    handleSubmit: handleSearchSubmit
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      q: ''
    }
  });

  const fetchMediaFileList = async (item?: IMediaList, q?: string) => {
    try {
      const query = {
        page: '1'
      } as {
        page: string;
        mediaId?: string;
        q?: string;
      };
      if (item) {
        query.mediaId = item.mediaId;
      }
      if (q) {
        query.q = q;
      }
      await mediaList(query);
    } catch (err) {
      errorToast(getCustomErrorMessage(err));
    }
  };

  useEffect(() => {
    fetchMediaFileList();
    setUploadFolderId(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = handleSearchSubmit(({ q }) => {
    fetchMediaFileList(selectFolder, q);
  });

  const handleAddPlaylist = async () => {
    const newPlayListContent = [] as IPlayListItemContent[];

    for (const item of selectFolderAndFileCheckList) {
      if (item.type.code === 'Folder') {
        const folderContent = await mediaFolderFileList(item.mediaId);
        if (folderContent?.length) {
          newPlayListContent.push(
            ...folderContent.map((content) => ({
              id: nanoid(),
              contentId: content.mediaId,
              type: content.type,
              name: content.name,
              duration: content.type.code === 'Image' ? 10 : content.property.duration || 10,
              property: {
                size: content.property.size,
                imageUrl: content.property.imageUrl
              }
            }))
          );
        }
      } else {
        newPlayListContent.push({
          id: nanoid(),
          contentId: item.mediaId,
          type: item.type,
          name: item.name,
          duration: item.type.code === 'Image' ? 10 : item.property.duration || 10,
          property: {
            size: item.property.size,
            imageUrl: item.property.imageUrl
          }
        });
      }
    }
    setList((prev) => [...prev, ...newPlayListContent]);
    setSelectFolderAndFileCheckList([]);
  };

  const handleMenuCheckAll = () => {
    if (selectFolderAndFileCheckList.length === filterList.length) {
      setSelectFolderAndFileCheckList([]);
    } else {
      setSelectFolderAndFileCheckList([...filterList]);
    }
  };

  const handleFileUpload = () => {
    // inputRef.current?.click();
    open();
  };

  const onDrop = (acceptedFiles: FileWithPath[], _fileRejections: any, _event?: DropEvent) => {
    const newAcceptedFiles = acceptedFiles.map((file) => ({
      id: nanoid(),
      file
    }));
    setIsFileUploadModal(true);
    setUploadFileList((prevUploadFileList) => [...prevUploadFileList, ...newAcceptedFiles]);
  };

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true,
    multiple: true,
    accept: {
      'image/png': [],
      'image/jpg': [],
      'image/jpeg': [],
      'video/mp4': [],
      'video/quicktime': []
    }
  });

  const handleFileAndFolderCheck = (item: IMediaList) => {
    setSelectFolderAndFileCheckList((prev) => {
      if (prev.some((checkItem) => checkItem.mediaId === item.mediaId)) {
        return prev.filter((checkItem) => checkItem.mediaId !== item.mediaId);
      }
      return [...prev, item];
    });
  };

  const findCard = useCallback(
    (id: string) => {
      const item = mediaFileList.filter((c) => `${c.mediaId}` === id)[0] as IMediaList;
      return {
        item,
        index: mediaFileList.indexOf(item)
      };
    },
    [mediaFileList]
  );

  const handleMediaClick = async (item: IMediaList) => {
    const newPlayListContent = [] as IPlayListItemContent[];

    if (item.type.code === 'Folder') {
      const folderContent = await mediaFolderFileList(item.mediaId);
      if (folderContent?.length) {
        newPlayListContent.push(
          ...folderContent.map((content) => ({
            id: nanoid(),
            contentId: content.mediaId,
            type: content.type,
            name: content.name,
            duration: content.type.code === 'Image' ? 10 : content.property.duration || 10,
            property: {
              size: content.property.size,
              imageUrl: content.property.imageUrl
            }
          }))
        );
      }
    } else {
      newPlayListContent.push({
        id: nanoid(),
        contentId: item.mediaId,
        type: item.type,
        name: item.name,
        duration: item.type.code === 'Image' ? 10 : item.property.duration || 10,
        property: {
          size: item.property.size,
          imageUrl: item.property.imageUrl
        }
      });
    }

    setList((prev) => [...prev, ...newPlayListContent]);
  };

  return (
    <Box {...getRootProps()}>
      <Form title="file-search" onSubmit={onSubmit} className="file-search-wrapper">
        <Input
          name="q"
          register={searchRegister}
          iconAlign="left"
          icon={<Search width="20" height="20" color={theme.color.black} />}
          placeholder="검색어를 입력해주세요"
          width="100%"
          size="s"
        />
      </Form>
      <Box display="flex" justifyContent="center" p="0px 16px" mt="12px">
        <Button
          color="primary"
          variant="fill"
          size="s"
          width="100%"
          borderRadius="4px"
          onClick={handleAddPlaylist}
          disabled={!selectFolderAndFileCheckList.length}
        >
          재생목록에 추가
        </Button>
      </Box>
      <Box mt="12px">
        <Box p="0px 16px">
          <Box
            display="flex"
            alignItems="center"
            mb="16px"
            borderBottom={`1px solid ${theme.color.gray300}`}
            pb="8px"
          >
            <Box
              fontSize={theme.fontSize.text14}
              color={selectFolder ? theme.color.gray400 : theme.color.gray900}
              style={{ cursor: 'pointer' }}
              className="underline"
              onClick={() => handleFolderMove()}
            >
              보관함
            </Box>
            {selectFolder && (
              <>
                <Back width="16" height="16" color={theme.color.gray900} className="folder-back" />
                <Box
                  fontSize={theme.fontSize.text14}
                  color={theme.color.gray900}
                  width="200px"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                >
                  {selectFolder.name}
                </Box>
              </>
            )}
          </Box>
        </Box>
        <Box
          width="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb="24px"
          p="0px 16px"
        >
          <Box>
            <CheckBox
              name="selectAll"
              checked={
                mediaFileList.length
                  ? filterList?.length
                    ? filterList.length === selectFolderAndFileCheckList.length
                    : selectFolderAndFileCheckList.length === mediaFileList.length
                  : false
              }
              width="16px"
              height="16px"
              onClick={handleMenuCheckAll}
            >
              전체선택
            </CheckBox>
          </Box>
          <Box display="flex" alignItems="center" onClick={handleFileUpload} cursor="pointer">
            <Upload width="18" height="18" color={theme.color.gray900} />
            <Typography ml="8px" fontSize={theme.fontSize.text14} color={theme.color.gray900}>
              파일 업로드
            </Typography>
          </Box>
          {/* {!selectFolder && (
                <Box cursor="pointer" display="flex" alignItems="center" onClick={handleNewFolder}>
                  <NewFolder width="20" height="20" color={theme.color.black} />
                  <Typography
                    ml="8px"
                    fontSize={theme.fontSize.text14}
                    fontWeight={theme.fontWeight.semiBold}
                    color={theme.color.gray900}
                  >
                    New folder
                  </Typography>
                </Box>
              )} */}
        </Box>
        <input {...getInputProps()} style={{ display: 'none' }} />
        <Box position="relative" width="100%" height="482px" overflowY="auto" p="0px 16px 16px">
          <ul className="list">
            {mediaLoading
              ? skeletonList.map((_, index) => (
                  <FolderItem id="1" key={`skeleton-${index}`} findCard={findCard} />
                ))
              : mediaFileList.length
                ? mediaFileList.map((item, index) => (
                    <FolderItem
                      key={`media-file-${item.mediaId}-${index}`}
                      id={item.mediaId}
                      item={item}
                      checked={selectFolderAndFileCheckList.some(
                        (checkItem) => checkItem.mediaId === item.mediaId
                      )}
                      handleCheck={handleFileAndFolderCheck}
                      handleFolderMove={handleFolderMove}
                      findCard={findCard}
                      handleMediaClick={handleMediaClick}
                    />
                  ))
                : null}
          </ul>
          {!mediaLoading && !mediaFileList.length && (
            <Box
              display="flex"
              width="100%"
              height="100%"
              alignItems="center"
              justifyContent="center"
            >
              <Box textAlign="center">
                <UploadFile width="60" height="60" color={theme.color.gray400} />
                <Typography mt="12px" fontSize={theme.fontSize.text12} color={theme.color.gray400}>
                  현재 저장된 파일 및 폴더가 없습니다
                  <br />
                  파일 또는 폴더를 추가하여 만들어주세요
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
      {isDragActive && <DragFile />}
    </Box>
  );
};

export default SettingsMedia;
