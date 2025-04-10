/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, DragFile, Form, Input, Typography } from '@repo/ui/components';
import { Back, NewFolder, Search, Upload, UploadFile } from '@repo/ui/icons';
import { useCanvas } from '@repo/ui/providers';
import { theme } from '@repo/ui/theme';
import { IMediaList } from '@repo/ui/types';
import { debounce, getCustomErrorMessage, getImageDimensions } from '@repo/ui/utils';
import { format } from 'date-fns';
import { fabric } from 'fabric';
import { IObjectOptions } from 'fabric/fabric-impl';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { useMediaActions } from '@/actions/media-action';
import { skeletonList } from '@/models/skeleton';
import {
  mediaFolderFileListSelector,
  mediaListLoadingSelector,
  mediaListSelector,
  mediaPageSelector,
  mediaTempMediaFileSelector
} from '@/state/media';
import { uploadFolderIdSelector } from '@/state/upload';
import { errorToast } from '@/utils/toast';

import FolderItem from '../../FolderItem';

interface ISidebarMedia {
  isDragActive: boolean;
  getInputProps: any;
  open: any;
}

const SidebarMedia: React.FC<ISidebarMedia> = ({ isDragActive, getInputProps, open }) => {
  const { canvas, setSelectedImageObject, imageList, setImageList } = useCanvas();
  const mediaLoading = useRecoilValue(mediaListLoadingSelector);
  const [mediaFolderFileList, setMediaFolderFileList] = useRecoilState(mediaFolderFileListSelector);
  const { mediaScrollList, createFolder, mediaFile } = useMediaActions();
  const [loading, setLoading] = useState(false);
  const [selectFolder, setSelectFolder] = useState<IMediaList | undefined>(undefined);
  const [mediaTemp, setMediaTemp] = useRecoilState(mediaTempMediaFileSelector);
  const setUploadFolderId = useSetRecoilState(uploadFolderIdSelector);
  const mediaPage = useRecoilValue(mediaPageSelector);
  const [mediaFileList, setMediaFileList] = useRecoilState(mediaListSelector);

  const {
    register: searchRegister,
    setValue: searchSetValue,
    getValues: searchGetValues,
    handleSubmit: handleSearchSubmit
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      q: ''
    }
  });
  const fileUploadRef = useRef<HTMLInputElement | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setUploadFolderId(undefined);
    fetchMediaFileList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (mediaTemp) {
      if (selectFolder?.mediaId === mediaTemp.folderId || (!selectFolder && !mediaTemp.folderId)) {
        if (selectFolder) {
          setMediaFolderFileList((prevList) => {
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
          return;
        }
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

  const handleFileUpload = () => {
    // inputRef.current?.click();
    open();
  };

  const handleImageClick = async (item: IMediaList) => {
    if (canvas) {
      if (item.type.code === 'Image') {
        try {
          const data = await mediaFile(item.mediaId, true);
          if (data) {
            const { width, height } = await getImageDimensions(data.property.imageUrl);
            fabric.Image.fromURL(
              data.property.imageUrl,
              (img) => {
                img.set({
                  width,
                  height,
                  id: item.mediaId,
                  originX: 'center',
                  originY: 'center',
                  left: width / 2,
                  top: height / 2
                } as IObjectOptions);
                canvas.add(img);
                canvas.setActiveObject(img);
                canvas.renderAll();
                setSelectedImageObject(img);
                if (!imageList.includes(item.mediaId)) {
                  setImageList([...imageList, item.mediaId]);
                }
                const object = canvas
                  .getObjects()
                  .find((obj) => obj.name === 'canvas-background-line');

                if (object) {
                  canvas.bringToFront(object);
                }
              },
              {
                crossOrigin: 'anonymous'
              }
            );
          }
        } catch (error) {
          console.error('Error downloading image:', error);
        }
      }
    }
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

  const handleScroll = () => {
    const scrollElement = document.getElementById('fileList');
    if (scrollElement) {
      const { scrollTop, scrollHeight, clientHeight } = scrollElement;
      if (scrollTop + clientHeight >= scrollHeight) {
        if (mediaPage?.hasNext && !loading) {
          fetchMediaFileList(selectFolder, searchGetValues('q'), String(page));
        }
      }
    }
  };

  const debouncedScrollHandler = debounce(handleScroll, 300);

  useEffect(() => {
    const scrollElement = document.getElementById('fileList');
    scrollElement?.addEventListener('scroll', debouncedScrollHandler);
    return () => {
      scrollElement?.removeEventListener('scroll', debouncedScrollHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectFolder, loading, page, searchGetValues('q')]);

  const fetchMediaFileList = async (item?: IMediaList, q?: string, page?: string) => {
    try {
      setLoading(true);
      const query = {
        page: page || '1'
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
      await mediaScrollList(query, true);
      setPage(Number(query.page) + 1);
    } catch (err) {
      errorToast(getCustomErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = handleSearchSubmit(({ q }) => {
    fetchMediaFileList(selectFolder, q);
  });

  const handleNewFolder = async () => {
    try {
      await createFolder();
    } catch (err) {
      errorToast(getCustomErrorMessage(err));
    }
  };

  const handleFolderMove = (item?: IMediaList) => {
    searchSetValue('q', '');
    setSelectFolder(item || undefined);
    setUploadFolderId(item?.mediaId);
    fetchMediaFileList(item);
    searchSetValue('q', '');
  };

  return (
    <>
      <Box mt="24px" p="0px 16px">
        <Form title="file-search" onSubmit={onSubmit} className="file-search-wrapper">
          <Input
            register={searchRegister}
            name="q"
            size="s"
            icon={<Search width="20" height="20" color={theme.color.black} />}
            iconAlign="left"
            width="100%"
            placeholder="Search"
          />
        </Form>
      </Box>
      <Box mt="12px" p="0px 16px">
        <Button color="neutral" variant="outline" width="100%" onClick={handleFileUpload} size="s">
          <Upload width="20" height="20" color={theme.color.black} />
          File upload
        </Button>
      </Box>
      <Box p="0px 16px" mt="32px" className="file-location">
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
            Media
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
      <Box width="100%" display="flex" justifyContent="end" alignItems="center" p="0px 16px">
        {!selectFolder && (
          <Box cursor="pointer" display="flex" alignItems="center" onClick={handleNewFolder}>
            <NewFolder width="20" height="20" color={theme.color.gray900} />
            <Typography ml="8px" fontSize={theme.fontSize.text14} color={theme.color.gray900}>
              New folder
            </Typography>
          </Box>
        )}
      </Box>
      <input {...getInputProps()} style={{ display: 'none' }} ref={fileUploadRef} />
      <Box
        position="relative"
        width="100%"
        overflowY="auto"
        p="24px 16px"
        height={`calc(100vh - 344px)`}
        id="fileList"
      >
        <ul className="list">
          {mediaLoading
            ? skeletonList.map((_, index) => (
                <FolderItem
                  id="1"
                  key={`skeleton-${index}`}
                  findCard={findCard}
                  handleImageClick={handleImageClick}
                />
              ))
            : selectFolder
              ? mediaFolderFileList.length
                ? mediaFolderFileList.map((item, index) => (
                    <FolderItem
                      key={`media-folder-file-${item.mediaId}-${index}`}
                      type="folder"
                      id={item.mediaId}
                      item={item}
                      handleFolderMove={handleFolderMove}
                      handleImageClick={handleImageClick}
                      findCard={findCard}
                    />
                  ))
                : null
              : mediaFileList.length
                ? mediaFileList.map((item, index) => (
                    <FolderItem
                      key={`media-file-${item.mediaId}-${index}`}
                      type="file"
                      id={item.mediaId}
                      item={item}
                      handleFolderMove={handleFolderMove}
                      handleImageClick={handleImageClick}
                      findCard={findCard}
                    />
                  ))
                : null}
        </ul>
        {((!mediaLoading && !mediaFileList.length) ||
          (selectFolder && !mediaLoading && !mediaFolderFileList.length)) && (
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
                There are no current files or folders
                <br />
                Please create a file or folder
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
      {isDragActive && <DragFile />}
    </>
  );
};

export default SidebarMedia;
