/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { DropEvent, FileWithPath, useDropzone } from 'react-dropzone';
import { Box } from '@repo/ui/components';
import classNames from 'classnames';
import { nanoid } from 'nanoid';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { uploadFileListSelector } from '@/state/upload';

import SidebarCanvas from './Canvas';
import SidebarMedia from './Media';

const CanvasSidebarWrapper = styled(Box)`
  ul.media-tab {
    display: flex;
    padding: 0 16px;
    li {
      cursor: pointer;
      width: 33.33%;
      padding-bottom: 8px;
      text-align: center;
      font-size: ${({ theme }) => theme.fontSize.text16};
      color: ${({ theme }) => theme.color.gray400};
      &.active {
        color: ${({ theme }) => theme.color.gray900};
        border-bottom: 2px solid ${({ theme }) => theme.color.gray900};
      }
    }
  }
  .file-location {
    .folder-back {
      margin: 0 8px;
      transform: rotate(180deg);
    }
  }
  ul.list {
    & > li {
      height: 48px;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      &:hover {
        .name {
          text-decoration: underline;
        }
      }
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

const CanvasSidebar = () => {
  const setUploadFileList = useSetRecoilState(uploadFileListSelector);
  const [tab, setTab] = useState<'media' | 'canvas' | 'template'>('media');

  const handleTab = (selectTab: 'media' | 'canvas' | 'template') => {
    if (tab === selectTab) {
      return;
    }
    setTab(selectTab);
  };

  const onDrop = (acceptedFiles: FileWithPath[], _fileRejections: any, _event?: DropEvent) => {
    const newAcceptedFiles = acceptedFiles.map((file) => ({
      id: nanoid(),
      file
    }));
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
      'video/mov': []
    }
  });

  return (
    <CanvasSidebarWrapper pt="20px" {...getRootProps()} position="relative">
      <ul className="media-tab">
        <li className={classNames({ active: tab === 'media' })} onClick={() => handleTab('media')}>
          보관함
        </li>
        <li
          className={classNames({ active: tab === 'canvas' })}
          onClick={() => handleTab('canvas')}
        >
          내 캔버스
        </li>
        <li
          className={classNames({ active: tab === 'template' })}
          onClick={() => handleTab('template')}
        >
          템플릿
        </li>
      </ul>

      {tab === 'media' && (
        <SidebarMedia isDragActive={isDragActive} getInputProps={getInputProps} open={open} />
      )}
      {tab === 'canvas' && <SidebarCanvas />}
    </CanvasSidebarWrapper>
  );
};

export default CanvasSidebar;
