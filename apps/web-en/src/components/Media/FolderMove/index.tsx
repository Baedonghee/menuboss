import React, { useState } from 'react';
import { Box, Button, Radio, Typography } from '@repo/ui/components';
import { ChevronDown, Folder } from '@repo/ui/icons';
import { theme } from '@repo/ui/theme';
import classNames from 'classnames';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import ModalLayout from '@/components/Layout/Modal';
import { mediaFolderListSelector } from '@/state/media';

const FolderMoveWrapper = styled(Box)`
  ul {
    li {
      display: flex;
      height: 56px;
      cursor: pointer;
      align-items: center;
      padding-left: 48px;
      justify-content: space-between;
      border-bottom: 1px solid ${({ theme }) => theme.color.gray200};
      &:last-child {
        border-bottom: none;
      }
      &.header {
        padding-left: 0;
      }
      &:hover {
        background-color: ${({ theme }) => theme.color.gray50};
      }
      .arrow {
        margin-right: 8px;
        cursor: pointer;
        &.arrow__close {
          transform: rotate(180deg);
        }
      }
    }
  }
`;

interface IFolderMove {
  onClose: () => void;
  handleMove: (folderId: string) => void;
}

const FolderMove: React.FC<IFolderMove> = ({ onClose, handleMove }) => {
  const list = useRecoilValue(mediaFolderListSelector);
  const [isOpenList, setIsOpenList] = useState<boolean>(true);
  const [isSelectedFolder, setIsSelectedFolder] = useState<string>('');

  const handleFileListOpen = (e: React.MouseEvent<HTMLOrSVGElement, MouseEvent>) => {
    e.stopPropagation();
    setIsOpenList((prev) => !prev);
  };

  const handleSelectFolder = (folderId: string) => {
    setIsSelectedFolder(folderId);
  };

  return (
    <ModalLayout title="Move to file" onClose={onClose} width="580px">
      <FolderMoveWrapper mt="32px">
        <ul>
          <li className="header" onClick={() => handleSelectFolder('')}>
            <Box display="flex" alignItems="center">
              <ChevronDown
                width="24"
                height="24"
                color={theme.color.gray500}
                className={classNames('arrow', {
                  arrow__close: !isOpenList
                })}
                onClick={handleFileListOpen}
              />
              <Folder width="24" height="24" color={theme.color.gray400} />
              <Typography fontSize={theme.fontSize.text16} ml="12px">
                Media
              </Typography>
            </Box>
            <Radio display="flex" alignItems="center" checked={!isSelectedFolder} />
          </li>
          {!!list.length &&
            isOpenList &&
            list.map((item) => (
              <li
                key={`folder-move-${item.mediaId}`}
                onClick={() => handleSelectFolder(item.mediaId)}
              >
                <Box display="flex" alignItems="center">
                  <Folder width="24" height="24" color={theme.color.gray400} />
                  <Box
                    fontSize={theme.fontSize.text16}
                    ml="12px"
                    width="400px"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                  >
                    {item.name}
                  </Box>
                </Box>
                <Radio checked={isSelectedFolder === item.mediaId} />
              </li>
            ))}
        </ul>
        <Box mt="32px" display="flex" justifyContent="end">
          <Button mr="16px" color="neutral" variant="outline" width="120px" onClick={onClose}>
            Cancel
          </Button>
          <Button width="120px" onClick={() => handleMove(isSelectedFolder)}>
            Move
          </Button>
        </Box>
      </FolderMoveWrapper>
    </ModalLayout>
  );
};

export default FolderMove;
