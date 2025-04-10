import React from 'react';
import { Box, Image, LoadingIcon, Typography } from '@repo/ui/components';
import { CheckFilled, CloseLine, Refresh } from '@repo/ui/icons';
import { theme } from '@repo/ui/theme';
import { IUploadList } from '@repo/ui/types';
import { conversion } from '@repo/ui/utils';

interface IUploadModalItem {
  index: number;
  id: string;
  item: IUploadList;
  handleUploadDelete: (id: string, type: 'temp' | 'progress' | 'complete') => void;
  handleRefreshUpload: (index: number) => void;
  type: 'temp' | 'progress' | 'complete';
}

const UploadModalItem: React.FC<IUploadModalItem> = ({
  index,
  item,
  id,
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
            width="20"
            height="20"
            color={theme.color.green500}
            style={{ marginRight: '16px' }}
          />
          <CloseLine
            width="20"
            height="20"
            color={theme.color.gray500}
            style={{ cursor: 'pointer' }}
            onClick={() => handleUploadDelete(id, type)}
          />
        </>
      );
    } else if (uploadStatus === 'error') {
      return (
        <>
          <Refresh
            width="20"
            height="20"
            color={theme.color.gray500}
            style={{ marginRight: '16px' }}
            onClick={() => handleRefreshUpload(index)}
          />
          <CloseLine
            width="20"
            height="20"
            color={theme.color.gray500}
            onClick={() => handleUploadDelete(id, type)}
          />
        </>
      );
    }
  };

  return (
    <li key={`upload-complete-${index}`}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Box width="60px" height="40px" mr="12px" overflow="hidden">
            <Image src={item.imageUrl} alt={item.name} width={60} height={40} />
          </Box>
          <Box>
            <Box>
              <Typography mr="8px" fontSize={theme.fontSize.text14} mb="4px">
                {item.name}
              </Typography>
              <Box display="flex">
                <Typography
                  as="span"
                  fontSize={theme.fontSize.text12}
                  color={item.result === 'error' ? theme.color.red500 : theme.color.green500}
                >
                  {conversion.kilobytesToMegabytes(item.fileProgress)}
                </Typography>
                <Typography as="span" fontSize={theme.fontSize.text12} color={theme.color.gray500}>
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

export default UploadModalItem;
