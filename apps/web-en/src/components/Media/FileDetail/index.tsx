/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';
import ReactPlayer from 'react-player';
import {
  Box,
  Button,
  Form,
  Image,
  TitleBox,
  Typography,
  UnderlineInput
} from '@repo/ui/components';
import { Trash } from '@repo/ui/icons';
import { useAlert } from '@repo/ui/providers';
import { theme } from '@repo/ui/theme';
import { conversion, getCustomErrorMessage } from '@repo/ui/utils';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { useMediaActions } from '@/actions/media-action';
import SeoHead from '@/components/common/SeoHead';
import Layout from '@/components/Layout';
import { mediaFileSelector } from '@/state/media';
import { ADMIN_PATH } from '@/utils/path';
import { errorToast } from '@/utils/toast';

const FileWrapper = styled(Box)`
  .img {
    border-radius: 8px;
  }
`;

const FileDetail = () => {
  const { query } = useRouter();
  const router = useRouter();
  const { mediaFile, deleteFile, mediaFolderNameUpdate } = useMediaActions();
  const { handleShowAlert } = useAlert();
  const [isFocus, setIsFocus] = useState(false);
  const file = useRecoilValue(mediaFileSelector);
  const { register, watch, getValues, setValue, setFocus, handleSubmit } = useForm({
    defaultValues: {
      name: ''
    }
  });

  useEffect(() => {
    if (file) {
      setValue('name', file.name);
    }
  }, [file]);

  useEffect(() => {
    fetchMediaFile();
  }, []);

  const fetchMediaFile = async () => {
    try {
      await mediaFile(query.subId ? (query.subId as string) : (query.id as string));
    } catch (err) {
      errorToast(getCustomErrorMessage(err));
    }
  };

  const handleDelete = async () => {
    handleShowAlert({
      title: 'Delete file',
      description: 'Are you sure you want to remove this file from your account?',
      alertType: 'confirm',
      type: 'error',
      confirmText: 'Delete',
      onConfirm: async () => {
        try {
          await deleteFile([query.subId ? (query.subId as string) : (query.id as string)], false);
          router.replace(
            query.subId
              ? ADMIN_PATH.MEDIA_FOLDER.replace(':id', query.id as string)
              : ADMIN_PATH.MEDIA
          );
        } catch (err) {
          errorToast(getCustomErrorMessage(err));
        }
      }
    });
  };

  const handleFileChange = () => {
    const { name } = getValues();
    if (name !== file?.name) {
      updateFolderName(name);
    }
  };

  const onSubmit = handleSubmit(({ name }) => {
    updateFolderName(name);
  });

  const handleFocus = (isFocus: boolean) => {
    setIsFocus(isFocus);
  };

  const updateFolderName = async (folderName: string) => {
    try {
      await mediaFolderNameUpdate(
        query.subId ? (query.subId as string) : (query.id as string),
        folderName
      );
      handleFocus(false);
    } catch (err) {
      errorToast(getCustomErrorMessage(err));
    }
  };

  const handleFolderNameBlur = () => {
    setValue('name', file?.name || '');
  };

  return (
    <>
      <SeoHead title={file?.name ? `${file.name} | MenuBoss` : undefined} />
      <Layout>
        <TitleBox
          backUrl={
            query.subId
              ? ADMIN_PATH.MEDIA_FOLDER.replace(':id', query.id as string)
              : ADMIN_PATH.MEDIA
          }
        >
          <Box display="flex" alignItems="center">
            {file?.name ? (
              <Form title="Change folder name" onSubmit={onSubmit}>
                <UnderlineInput
                  name="name"
                  register={register}
                  onBlur={handleFolderNameBlur}
                  width="auto"
                  value={watch('name')}
                  setFocus={setFocus}
                  placeholder="placeholder"
                  isFocus={isFocus}
                  handleFocus={handleFocus}
                  handleSubmit={handleFileChange}
                />
              </Form>
            ) : (
              <Skeleton width={200} style={{ marginRight: '12px' }} />
            )}
          </Box>
          <Button color="error" variant="outline" size="m" width="120px" onClick={handleDelete}>
            <Trash width="20" height="20" color={theme.color.red500} />
            Delete
          </Button>
        </TitleBox>
        <FileWrapper mt="24px" display="flex">
          <Box mr="32px" display="flex" alignItems="center">
            {file ? (
              file.property.videoUrl ? (
                <ReactPlayer url={file.property.videoUrl} controls width="100%" height="100%" />
              ) : (
                <Image
                  src={file.property.imageUrl}
                  alt={file.name}
                  width={754}
                  height={754}
                  className="img"
                />
              )
            ) : (
              <Skeleton width="754px" height="754px" />
            )}
          </Box>
          <Box
            maxHeight="754px"
            minWidth="750px"
            p="32px"
            border={`1px solid ${theme.color.gray300}`}
            borderRadius="8px"
          >
            <Typography
              fontSize={theme.fontSize.text20}
              fontWeight={theme.fontWeight.semiBold}
              mb="32px"
            >
              Media information
            </Typography>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb="16px">
              <Typography fontSize={theme.fontSize.text14} color={theme.color.gray900}>
                Uploaded date
              </Typography>
              {file ? (
                <Typography fontSize={theme.fontSize.text14} color={theme.color.gray500}>
                  {file.updatedAt}
                </Typography>
              ) : (
                <Skeleton width="100px" />
              )}
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb="16px">
              <Typography fontSize={theme.fontSize.text14} color={theme.color.gray900}>
                File size
              </Typography>
              {file ? (
                <Typography fontSize={theme.fontSize.text14} color={theme.color.gray500}>
                  {`${file.property.width} X ${file.property.height}`}
                </Typography>
              ) : (
                <Skeleton width="100px" />
              )}
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb="16px">
              <Typography fontSize={theme.fontSize.text14} color={theme.color.gray900}>
                File type
              </Typography>
              {file ? (
                <Typography fontSize={theme.fontSize.text14} color={theme.color.gray500}>
                  {file.property.contentType}
                </Typography>
              ) : (
                <Skeleton width="100px" />
              )}
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb="16px">
              <Typography fontSize={theme.fontSize.text14} color={theme.color.gray900}>
                File capacity
              </Typography>
              {file ? (
                <Typography fontSize={theme.fontSize.text14} color={theme.color.gray500}>
                  {conversion.kilobytesToMegabytes(file.property.size)}
                </Typography>
              ) : (
                <Skeleton width="100px" />
              )}
            </Box>
          </Box>
        </FileWrapper>
      </Layout>
    </>
  );
};

export default FileDetail;
