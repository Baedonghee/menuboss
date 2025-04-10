/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect } from 'react';
import { IApi, IMediaUploadData, IUploadList } from '@repo/ui/types';
import { generateVideoThumbnails, getCustomErrorMessage } from '@repo/ui/utils';
import { AxiosResponse } from 'axios';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import fileApi from '@/api/client/file.json';
import { authUserSelector } from '@/state/auth';
import { mediaListSelector, mediaTempMediaFileSelector } from '@/state/media';
import {
  uploadCompletedListSelector,
  uploadFileListSelector,
  uploadFolderIdSelector,
  uploadListSelector,
  uploadProgressSelector,
  uploadTempListSelector
} from '@/state/upload';
import axios from '@/utils/client/file-axios';
import { errorToast } from '@/utils/toast';

interface IUploadContext {
  handleRefreshUpload: (index: number) => void;
  handleUploadDelete: (id: string, type: 'temp' | 'progress' | 'complete') => void;
  setUploadFileList: React.Dispatch<
    React.SetStateAction<
      {
        file: File;
        id: string;
      }[]
    >
  >;
  setUploadFolderId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const UploadContext = createContext<IUploadContext | undefined>(undefined);

export function useUpload() {
  const context = useContext(UploadContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
}

export function UploadProvider({ children }: React.PropsWithChildren<any>) {
  const router = useRouter();
  const user = useRecoilValue(authUserSelector);
  const { query, pathname } = router;
  const [mediaTemp, setMediaTemp] = useRecoilState(mediaTempMediaFileSelector);
  const [isUploadProgress, setIsUploadProgress] = useRecoilState(uploadProgressSelector);
  const [uploadList, setUploadList] = useRecoilState(uploadListSelector);
  const setList = useSetRecoilState(mediaListSelector);
  const [uploadCompleteList, setUploadCompleteList] = useRecoilState(uploadCompletedListSelector);
  const [uploadFolderId, setUploadFolderId] = useRecoilState(uploadFolderIdSelector);
  const [uploadTempList, setUploadTempList] = useRecoilState(uploadTempListSelector);
  const [uploadFileList, setUploadFileList] = useRecoilState(uploadFileListSelector);

  useEffect(() => {
    if (mediaTemp) {
      if (
        pathname.includes('media') &&
        ((query.id as string) === mediaTemp.folderId || (!query.id && !mediaTemp.folderId))
      ) {
        setList((prevList) => {
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
  }, [mediaTemp, query.id, pathname]);

  useEffect(() => {
    const processUploadsSequentially = async () => {
      if (user) {
        setIsUploadProgress(true);

        for (let currentIndex = 0; currentIndex < uploadList.length; currentIndex++) {
          const item = uploadList[currentIndex];
          try {
            const formData = {
              file: item.file
            } as {
              file: File;
              folderId?: string;
            };
            if (uploadFolderId) {
              formData.folderId = item.folderId;
            }
            const token = atob(user.authorization.accessToken);
            const url = item.type === 'image' ? fileApi.image : fileApi.video;
            const {
              data: { status, message, data }
            }: AxiosResponse<IApi<IMediaUploadData>> = await axios.post(url, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                'x-User-Id': user.memberId,
                Authorization: `Bearer ${token}`,
                'x-Device-Model': window.navigator.userAgent
              },
              onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total!
                );
                setUploadList((prevUploadList) => {
                  return prevUploadList.map((prevItem) => {
                    if (item.id === prevItem.id) {
                      return {
                        ...prevItem,
                        progress: percentCompleted,
                        fileProgress:
                          progressEvent.loaded >= item.file.size
                            ? item.file.size
                            : progressEvent.loaded
                      };
                    }
                    return prevItem;
                  });
                });
              }
            });
            if (status === 200) {
              setMediaTemp({
                ...data,
                name: data.name,
                folderId: item.folderId,
                type: data.type
              });
              setUploadList((prevUploadList) => {
                return prevUploadList.map((prevItem) => {
                  if (item.id === prevItem.id) {
                    // parsingCompleteList.current.push({
                    //   ...item,
                    //   name: data.name,
                    //   progress: 100,
                    //   fileProgress: item.file.size,
                    //   result: 'success'
                    // });
                    return {
                      ...prevItem,
                      name: data.name,
                      progress: 100,
                      fileProgress: item.file.size,
                      result: 'success'
                    };
                  }
                  return prevItem;
                });
              });
            } else {
              setUploadList((prevUploadList) => {
                return prevUploadList.map((prevItem) => {
                  if (prevItem.id === item.id) {
                    // parsingCompleteList.current.push({
                    //   ...prevItem,
                    //   progress: 100,
                    //   fileProgress: item.file.size,
                    //   result: 'error'
                    // });
                    return {
                      ...prevItem,
                      progress: 100,
                      fileProgress: item.file.size,
                      result: 'error'
                    };
                  }
                  return prevItem;
                });
              });
              errorToast(message);
            }
          } catch (err) {
            setUploadList((prevUploadList) => {
              return prevUploadList.map((prevItem) => {
                if (prevItem.id === item.id) {
                  // parsingCompleteList.current.push({
                  //   ...prevItem,
                  //   progress: 100,
                  //   fileProgress: item.file.size,
                  //   result: 'error'
                  // });
                  return {
                    ...prevItem,
                    progress: 100,
                    fileProgress: item.file.size,
                    result: 'error'
                  };
                }
                return prevItem;
              });
            });
            errorToast(getCustomErrorMessage(err));
          }
        }
        let currentList = [] as IUploadList[];
        setUploadList((prevList) => {
          currentList = [...prevList];
          return prevList;
        });
        setUploadCompleteList((prevList) => [...currentList, ...prevList]);
        setUploadList([]);
        // parsingCompleteList.current = [];
        setIsUploadProgress(false); // 모든 파일 업로드 완료 시 업로드 상태 변경
      }
    };
    if (uploadList.length > 0 && !isUploadProgress) {
      processUploadsSequentially();
    }
  }, [uploadList.length, isUploadProgress, query.id, pathname]);

  useEffect(() => {
    if (!isUploadProgress && uploadTempList.length && !uploadList.length) {
      setUploadList(uploadTempList);
      setUploadTempList([]);
    }
  }, [isUploadProgress, uploadTempList.length, uploadList.length]);

  useEffect(() => {
    const processUploads = async () => {
      const parsingUploadList = [] as IUploadList[];
      for (const file of uploadFileList) {
        if (file.file.type.startsWith('image/')) {
          const reader = new FileReader();
          await new Promise((resolve) => {
            reader.onload = () => {
              parsingUploadList.push({
                name: file.file.name,
                progress: 0,
                fileProgress: 0,
                result: 'progress',
                size: file.file.size,
                imageUrl: reader.result as string,
                type: 'image',
                file: file.file,
                id: file.id,
                folderId: uploadFolderId
              });
              resolve('');
            };
            reader.readAsDataURL(file.file);
          });
        } else {
          const thumbnailImage: any = await generateVideoThumbnails(file.file, 0);
          parsingUploadList.push({
            name: file.file.name,
            progress: 0,
            fileProgress: 0,
            result: 'progress',
            size: file.file.size,
            imageUrl: thumbnailImage[0],
            type: 'video',
            file: file.file,
            id: file.id,
            folderId: uploadFolderId
          });
        }
      }
      if (!isUploadProgress) {
        setUploadList((prevUploadList) => [...parsingUploadList, ...prevUploadList]);
      } else {
        setUploadTempList((prevUploadList) => [...parsingUploadList, ...prevUploadList]);
      }
      setUploadFileList([]);
    };
    if (uploadFileList.length) {
      processUploads();
    }
  }, [uploadFileList.length, isUploadProgress]);

  const handleRefreshUpload = async (index: number) => {
    const uploadFile = uploadCompleteList[index];
    if (user && uploadFile) {
      const token = atob(user.authorization.accessToken);
      try {
        const formData = {
          file: uploadFile.file
        } as {
          file: File;
          folderId?: string;
        };
        if (uploadFile.folderId) {
          formData.folderId = uploadFile.folderId;
        }
        setUploadCompleteList((prevUploadList) => {
          return prevUploadList.map((item) => {
            if (item.id === uploadFile.id) {
              return {
                ...item,
                progress: 0,
                fileProgress: 0,
                result: 'progress'
              };
            }
            return item;
          });
        });
        const url = uploadFile.type === 'image' ? fileApi.image : fileApi.video;
        const {
          data: { status, message, data }
        }: AxiosResponse<IApi<IMediaUploadData>> = await axios.post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'x-User-Id': user.memberId,
            Authorization: `Bearer ${token}`,
            'x-Device-Model': window.navigator.userAgent
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total!
            );
            setUploadCompleteList((prevUploadList) => {
              return prevUploadList.map((item) => {
                if (item.id === uploadFile.id) {
                  return {
                    ...item,
                    progress: percentCompleted,
                    fileProgress:
                      progressEvent.loaded >= uploadFile.size
                        ? uploadFile.size
                        : progressEvent.loaded
                  };
                }
                return item;
              });
            });
          }
        });
        if (status === 200) {
          setMediaTemp({
            ...data,
            name: data.name,
            folderId: uploadFile.folderId,
            type: data.type
          });
          setUploadCompleteList((prevUploadList) => {
            return prevUploadList.map((item) => {
              if (item.id === uploadFile.id) {
                return {
                  ...item,
                  name: data.name,
                  progress: 100,
                  fileProgress: uploadFile.size,
                  result: 'success'
                };
              }
              return item;
            });
          });
        } else {
          setUploadCompleteList((prevUploadList) => {
            return prevUploadList.map((item) => {
              if (item.id === uploadFile.id) {
                return {
                  ...item,
                  progress: 100,
                  fileProgress: uploadFile.size,
                  result: 'error'
                };
              }
              return item;
            });
          });
          errorToast(message);
        }
      } catch (err) {
        setUploadCompleteList((prevUploadList) => {
          return prevUploadList.map((item) => {
            if (item.id === uploadFile.id) {
              return {
                ...item,
                progress: 100,
                fileProgress: uploadFile.size,
                result: 'error'
              };
            }
            return item;
          });
        });
        errorToast(getCustomErrorMessage(err));
      }
    }
  };

  const handleUploadDelete = (id: string, type: 'temp' | 'progress' | 'complete') => {
    if (type === 'temp') {
      setUploadTempList(uploadTempList.filter((item) => item.id !== id));
    } else if (type === 'progress') {
      setUploadList(uploadList.filter((item) => item.id !== id));
      // parsingCompleteList.current = parsingCompleteList.current.filter((_, i) => i !== index);
    } else {
      setUploadCompleteList(uploadCompleteList.filter((item) => item.id !== id));
    }
  };

  const contextValue: IUploadContext = {
    handleRefreshUpload,
    handleUploadDelete,
    setUploadFileList,
    setUploadFolderId
  };

  return <UploadContext.Provider value={contextValue}>{children}</UploadContext.Provider>;
}
