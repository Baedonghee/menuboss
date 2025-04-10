/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { DropEvent, FileWithPath, useDropzone } from 'react-dropzone';
import { Box, Button, Typography } from '@repo/ui/components';
import { Upload } from '@repo/ui/icons';
import { theme } from '@repo/ui/theme';
import { IApi, IMediaUploadData } from '@repo/ui/types';
import { getCustomErrorMessage } from '@repo/ui/utils';
import { AxiosResponse } from 'axios';
import classNames from 'classnames';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import fileApi from '@/api/client/file.json';
import ModalLayout from '@/components/Layout/Modal';
import { authUserSelector } from '@/state/auth';
import { mediaListSelector } from '@/state/media';
import {
  uploadCompletedListSelector,
  uploadFileListSelector,
  uploadFolderIdSelector,
  uploadListSelector,
  uploadTempListSelector
} from '@/state/upload';
import axios from '@/utils/client/file-axios';
import { errorToast } from '@/utils/toast';

import UploadModalItem from './UploadModalItem';

const UploadWrapper = styled(Box)`
  .drop-box {
    &.active {
      border-color: ${theme.color.primary500};
      background-color: ${theme.color.gray100};
    }
  }
  ul {
    height: 260px;
    padding: 0px 24px;
    overflow-y: auto;
    overflow-x: hidden;
    margin-top: 32px;
    li {
      margin-bottom: 24px;
      &:last-child {
        margin-bottom: 0;
      }
      .progress {
        position: relative;
        width: 100%;
        border-radius: 100px;
        height: 6px;
        margin-top: 12px;
        .progress-bar {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          border-radius: 100px;
        }
      }
    }
  }
`;

interface IUpload {
  onClose: () => void;
}

const UploadModal: React.FC<IUpload> = ({ onClose }) => {
  const { query } = useRouter();
  const user = useRecoilValue(authUserSelector);
  const [uploadList, setUploadList] = useRecoilState(uploadListSelector);
  const [uploadCompleteList, setUploadCompleteList] = useRecoilState(uploadCompletedListSelector);
  const [uploadTempList, setUploadTempList] = useRecoilState(uploadTempListSelector);
  const setUploadFileList = useSetRecoilState(uploadFileListSelector);
  const setUploadFolderId = useSetRecoilState(uploadFolderIdSelector);
  const setList = useSetRecoilState(mediaListSelector);

  useEffect(() => {
    setUploadFolderId((query.id as string) || undefined);
  }, []);

  const onDrop = (acceptedFiles: FileWithPath[], _fileRejections: any, _event?: DropEvent) => {
    const newAcceptedFiles = acceptedFiles.map((file) => ({
      id: nanoid(),
      file
    }));
    setUploadFileList((prevUploadFileList) => [...prevUploadFileList, ...newAcceptedFiles]);
  };

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    multiple: true,
    noClick: true,
    accept: {
      'image/png': [],
      'image/jpg': [],
      'image/jpeg': [],
      'video/mp4': [],
      'video/quicktime': []
    }
  });

  const handleUploadDelete = (id: string, type: 'temp' | 'progress' | 'complete') => {
    if (type === 'temp') {
      setUploadTempList(uploadTempList.filter((uploadItem) => id !== uploadItem.id));
    } else if (type === 'progress') {
      setUploadList(uploadList.filter((uploadItem) => id !== uploadItem.id));
    } else {
      setUploadCompleteList(uploadCompleteList.filter((uploadItem) => id !== uploadItem.id));
    }
  };

  const handleRefreshUpload = async (index: number) => {
    if (user) {
      const token = atob(user.authorization.accessToken);
      try {
        const formData = {
          file: uploadCompleteList[index].file
        } as {
          file: File;
          folderId?: string;
        };
        if (uploadCompleteList[index].folderId) {
          formData.folderId = uploadCompleteList[index].folderId;
        }
        setUploadCompleteList((prevUploadList) => {
          return prevUploadList.map((item) => {
            if (item.name === uploadCompleteList[index].name) {
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

        const {
          data: { status, message, data }
        }: AxiosResponse<IApi<IMediaUploadData>> = await axios.post(fileApi.image, formData, {
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
                if (item.name === uploadCompleteList[index].name) {
                  return {
                    ...item,
                    progress: percentCompleted,
                    fileProgress:
                      progressEvent.loaded >= uploadCompleteList[index].size
                        ? uploadCompleteList[index].size
                        : progressEvent.loaded
                  };
                }
                return item;
              });
            });
          }
        });
        if (status === 200) {
          setList((prevList) => {
            const newMediaItem = {
              ...data,
              type: data.type
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
          setUploadCompleteList((prevUploadList) => {
            return prevUploadList.map((item) => {
              if (item.name === uploadCompleteList[index].name) {
                return {
                  ...item,
                  progress: 100,
                  fileProgress: uploadCompleteList[index].size,
                  result: 'success'
                };
              }
              return item;
            });
          });
        } else {
          setUploadCompleteList((prevUploadList) => {
            return prevUploadList.map((item) => {
              if (item.name === uploadCompleteList[index].name) {
                return {
                  ...item,
                  progress: 100,
                  fileProgress: uploadCompleteList[index].size,
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
            if (item.name === uploadCompleteList[index].name) {
              return {
                ...item,
                progress: 100,
                fileProgress: uploadCompleteList[index].size,
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

  return (
    <ModalLayout title="파일 업로드" onClose={onClose} width="580px" p="0px">
      <UploadWrapper mt="24px">
        <Box p="0px 24px">
          <Box onClick={open}>
            <Box
              width="100%"
              height="220px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              border={`1.5px dashed ${theme.color.gray400}`}
              className={classNames('drop-box', { active: isDragActive })}
              cursor="pointer"
              {...getRootProps()}
            >
              <Box textAlign="center">
                <Upload width="32" height="32" color={theme.color.gray700} />
                <Typography mt="16px" fontSize={theme.fontSize.text16} color={theme.color.gray700}>
                  파일을 여기에 끌어다 놓거나 클릭해서 파일을 업로드해주세요
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <input {...getInputProps()} style={{ display: 'none' }} />
        {(!!uploadList.length || !!uploadCompleteList.length) && (
          <ul>
            {uploadTempList.map((item, index) => (
              <UploadModalItem
                key={`upload-temp-${index}`}
                index={index}
                item={item}
                id={item.id}
                handleRefreshUpload={handleRefreshUpload}
                handleUploadDelete={handleUploadDelete}
                type="temp"
              />
            ))}
            {uploadList.map((item, index) => (
              <UploadModalItem
                key={`upload-${index}`}
                index={index}
                id={item.id}
                item={item}
                handleRefreshUpload={handleRefreshUpload}
                handleUploadDelete={handleUploadDelete}
                type="progress"
              />
            ))}
            {uploadCompleteList.map((item, index) => (
              <UploadModalItem
                key={`upload-complete-${index}`}
                index={index}
                item={item}
                id={item.id}
                handleRefreshUpload={handleRefreshUpload}
                handleUploadDelete={handleUploadDelete}
                type="complete"
              />
            ))}
          </ul>
        )}
        <Box mt="32px" display="flex" justifyContent="end" p="0px 24px 24px">
          <Button color="neutral" variant="outline" width="120px" onClick={onClose}>
            닫기
          </Button>
        </Box>
      </UploadWrapper>
    </ModalLayout>
  );
};

export default UploadModal;
