import React from 'react';
import { Box, Image, LoadingIcon, Typography } from '@repo/ui/components';
import { CheckFilled, CloseLine, Refresh } from '@repo/ui/icons';
import { theme } from '@repo/ui/theme';
import { IUploadList } from '@repo/ui/types';
import { conversion } from '@repo/ui/utils';

interface IUploadItem {
  index: number;
  item: IUploadList;
  handleUploadDelete: (id: string, type: 'temp' | 'progress' | 'complete') => void;
  handleRefreshUpload: (index: number) => void;
  type: 'temp' | 'progress' | 'complete';
}

const UploadItem: React.FC<IUploadItem> = ({
  index,
  item,
  handleUploadDelete,
  handleRefreshUpload,
  type
}) => {
  const onUploadStatus = (uploadStatus: 'progress' | 'success' | 'error', index: number) => {
    if (uploadStatus === 'progress') {
      return <LoadingIcon />;
    } else if (uploadStatus === 'success') {
      return (
        <>
          <CheckFilled
            width="18"
            height="18"
            color={theme.color.green500}
            style={{ marginRight: '12px' }}
          />
          <CloseLine
            width="18"
            height="18"
            color={theme.color.gray500}
            style={{ cursor: 'pointer' }}
            onClick={() => handleUploadDelete(item.id, type)}
          />
        </>
      );
    } else if (uploadStatus === 'error') {
      return (
        <>
          <Refresh
            width="18"
            height="18"
            color={theme.color.gray500}
            style={{ marginRight: '12px', cursor: 'pointer' }}
            onClick={() => handleRefreshUpload(index)}
          />
          <CloseLine
            width="18"
            height="18"
            color={theme.color.gray500}
            style={{ cursor: 'pointer' }}
            onClick={() => handleUploadDelete(item.id, type)}
          />
        </>
      );
    }
  };
  return (
    <li>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Box
            width="32px"
            height="32px"
            mr="12px"
            overflow="hidden"
            display="flex"
            alignItems="center"
          >
            <Image src={item.imageUrl} alt={item.name} width={32} height={32} />
          </Box>
          <Box>
            <Box>
              <Box
                fontSize={theme.fontSize.text14}
                mb="4px"
                width="207px"
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
              >
                {item.name}
              </Box>
              <Box display="flex">
                <Typography
                  as="span"
                  fontSize={theme.fontSize.text10}
                  color={item.result === 'error' ? theme.color.red500 : theme.color.green500}
                >
                  {conversion.kilobytesToMegabytes(item.fileProgress)}
                </Typography>
                <Typography as="span" fontSize={theme.fontSize.text10} color={theme.color.gray500}>
                  {` / ${conversion.kilobytesToMegabytes(item.size)}`}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box display="flex">{onUploadStatus(item.result, index)}</Box>
      </Box>
      <Box className="progress" backgroundColor={theme.color.gray100}>
        <Box
          className="progress-bar"
          width={`${item.progress}%`}
          backgroundColor={item.result === 'error' ? theme.color.red500 : theme.color.green500}
        />
      </Box>
    </li>
  );
};

export default UploadItem;
