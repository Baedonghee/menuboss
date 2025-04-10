import React, { useState } from 'react';
import { DropEvent, FileWithPath, useDropzone } from 'react-dropzone';
import { CheckBox, DragFile, ModalContainer } from '@repo/ui/components';
import { IMediaList } from '@repo/ui/types';
import { getCustomErrorMessage } from '@repo/ui/utils';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/router';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { useMediaActions } from '@/actions/media-action';
import { skeletonList } from '@/models/skeleton';
import { mediaListLoadingSelector, mediaListSelector } from '@/state/media';
import { uploadFileListSelector, uploadModalOpenSelector } from '@/state/upload';
import { errorToast } from '@/utils/toast';

import FolderMove from '../FolderMove';
import MediaTableItem from '../TableItem';

const MediaTableWrapper = styled.ul`
  border: 1px solid ${({ theme }) => theme.color.gray300};
  border-radius: 8px;
  position: relative;
  outline: 0;
  & > li {
    display: flex;
    align-items: center;
    height: 84px;
    border-bottom: 1px solid ${({ theme }) => theme.color.gray300};
    font-size: ${({ theme }) => theme.fontSize.text14};
    font-weight: ${({ theme }) => theme.fontWeight.normal};
    color: ${({ theme }) => theme.color.gray900};
    cursor: pointer;
    &:last-child {
      border-bottom: none;
    }
    &:hover {
      background-color: ${({ theme }) => theme.color.gray50};
      & > div {
        &:nth-of-type(3) {
          .file-name {
            text-decoration: underline;
          }
        }
      }
    }
    &.header {
      font-weight: ${({ theme }) => theme.fontWeight.semiBold};
      color: ${({ theme }) => theme.color.gray700};
      height: 48px;
      cursor: text;
      &:hover {
        background-color: transparent;
      }
    }
    & > div {
      display: flex;
      align-items: center;
      justify-content: center;
      &:nth-of-type(1) {
        width: 72px;
      }
      &:nth-of-type(2) {
        width: 132px;
      }
      &:nth-of-type(3) {
        width: calc(100% - 476px);
        justify-content: start;
        padding-left: 16px;
      }
      &:nth-of-type(4) {
        width: 200px;
      }
      &:nth-of-type(5) {
        width: 72px;
      }
    }
  }
`;

interface IMediaTable {
  menuSelectMedia: string;
  handleMenuSelectMedia: (mediaId: string) => void;
  menuCheckList: string[];
  handleMenuCheckList: (mediaId: string) => void;
  handleMenuCheckAll: () => void;
  filterList?: IMediaList[];
}

const MediaTable: React.FC<IMediaTable> = ({
  menuSelectMedia,
  handleMenuSelectMedia,
  menuCheckList,
  handleMenuCheckList,
  handleMenuCheckAll,
  filterList
}) => {
  const { query } = useRouter();
  const { mediaFileList, mediaFolderMove } = useMediaActions();
  const setUploadFileList = useSetRecoilState(uploadFileListSelector);
  const [isFolderMoveOpen, setIsFolderMoveOpen] = useState(false);
  const [isSelectFile, setIsSelectFile] = useState('');
  const loading = useRecoilValue(mediaListLoadingSelector);
  const list = useRecoilValue(mediaListSelector);
  const setIsFileUploadModal = useSetRecoilState(uploadModalOpenSelector); // 파일 업로드 모달

  const onDrop = (acceptedFiles: FileWithPath[], _fileRejections: any, _event?: DropEvent) => {
    const newAcceptedFiles = acceptedFiles.map((file) => ({
      id: nanoid(),
      file
    }));
    setIsFileUploadModal(true);
    setUploadFileList((prevUploadFileList) => [...prevUploadFileList, ...newAcceptedFiles]);
  };

  const { getRootProps, isDragActive } = useDropzone({
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

  const handleMenuCheckAllEvent = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    handleMenuCheckAll();
  };

  const handleFileToFolderMove = async (mediaId: string) => {
    try {
      await mediaFileList(query.id as string);
      setIsFolderMoveOpen(true);
      setIsSelectFile(mediaId);
    } catch (err) {
      setIsSelectFile('');
      errorToast(getCustomErrorMessage(err));
    }
  };

  const handleFolderMoveModalClose = () => {
    setIsSelectFile('');
    setIsFolderMoveOpen(false);
  };

  const handleFolderMove = async (folderId: string) => {
    try {
      if (!!folderId === !!query.id) {
        await mediaFolderMove(folderId, [isSelectFile]);
        setIsSelectFile('');
        setIsFolderMoveOpen(false);
        if (menuCheckList.includes(isSelectFile)) {
          handleMenuCheckList(isSelectFile);
        }
        if (menuSelectMedia === isSelectFile) {
          handleMenuSelectMedia('');
        }
      } else {
        setIsSelectFile('');
        setIsFolderMoveOpen(false);
        if (menuCheckList.includes(isSelectFile)) {
          handleMenuCheckList(isSelectFile);
        }
        if (menuSelectMedia === isSelectFile) {
          handleMenuSelectMedia('');
        }
      }
    } catch (err) {
      errorToast(getCustomErrorMessage(err));
    }
  };

  return (
    <>
      {isFolderMoveOpen && (
        <ModalContainer onClose={handleFolderMoveModalClose}>
          <FolderMove onClose={handleFolderMoveModalClose} handleMove={handleFolderMove} />
        </ModalContainer>
      )}
      <MediaTableWrapper {...getRootProps()}>
        {isDragActive && <DragFile />}
        <li className="header">
          <div>
            <CheckBox
              name="checkAll"
              checked={
                list.length
                  ? filterList?.length
                    ? filterList.length === menuCheckList.length
                    : menuCheckList.length === list.length
                  : false
              }
              onClick={handleMenuCheckAllEvent}
            />
          </div>
          <div></div>
          <div>이름</div>
          <div>수정일</div>
          <div></div>
        </li>
        {loading
          ? skeletonList.map((_, index) => (
              <MediaTableItem
                key={`skeleton-${index}`}
                menuSelectMedia={menuSelectMedia}
                handleMenuSelectMedia={handleMenuSelectMedia}
                checked={false}
                handleMenuCheckList={handleMenuCheckList}
                handleFileToFolderMove={handleFileToFolderMove}
              />
            ))
          : list.map((item) => (
              <MediaTableItem
                key={`media-${item.mediaId}`}
                item={item}
                menuSelectMedia={menuSelectMedia}
                handleMenuSelectMedia={handleMenuSelectMedia}
                checked={menuCheckList.includes(item.mediaId)}
                handleMenuCheckList={handleMenuCheckList}
                handleFileToFolderMove={handleFileToFolderMove}
              />
            ))}
      </MediaTableWrapper>
    </>
  );
};

export default MediaTable;
