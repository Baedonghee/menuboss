/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { DropEvent, FileWithPath, useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';
import {
  Box,
  Button,
  DragFile,
  Empty,
  Form,
  ModalContainer,
  Select,
  TitleBox,
  UnderlineInput
} from '@repo/ui/components';
import { useHistory } from '@repo/ui/hooks';
import { Move, PlusFill, Trash, UploadFile } from '@repo/ui/icons';
import { useAlert } from '@repo/ui/providers';
import { theme } from '@repo/ui/theme';
import { IOption } from '@repo/ui/types';
import { getCustomErrorMessage } from '@repo/ui/utils';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { useMediaActions } from '@/actions/media-action';
import Pagination from '@/components/common/Pagination';
import SeoHead from '@/components/common/SeoHead';
import Layout from '@/components/Layout';
import Protect from '@/components/Layout/Protect';
import FolderMove from '@/components/Media/FolderMove';
import MediaTable from '@/components/Media/Table';
import UploadModal from '@/components/Media/UploadModal';
import { mediaSearchSortList } from '@/models/media';
import { useUpload } from '@/providers/upload.provider';
import {
  mediaFolderSelector,
  mediaListLoadingSelector,
  mediaListSelector,
  mediaPageSelector
} from '@/state/media';
import { uploadModalOpenSelector } from '@/state/upload';
import { ADMIN_PATH } from '@/utils/path';
import { errorToast } from '@/utils/toast';

const MediaFolder = () => {
  const router = useRouter();
  const { query } = router;
  const { handleShowAlert, handleClose } = useAlert();
  const { back } = useHistory();
  const { mediaList, deleteFile, mediaFolderNameUpdate, mediaFileList, mediaFolderMove, reset } =
    useMediaActions();
  const page = useRecoilValue(mediaPageSelector);
  const list = useRecoilValue(mediaListSelector);
  const [folder, setFolder] = useRecoilState(mediaFolderSelector);
  const loading = useRecoilValue(mediaListLoadingSelector);
  const [isFocus, setIsFocus] = useState(false);
  const { register, watch, setValue, setFocus, handleSubmit } = useForm({
    defaultValues: {
      name: ''
    }
  });
  const [isFolderMoveOpen, setIsFolderMoveOpen] = useState(false);
  const [menuSelectMedia, setMenuSelectMedia] = useState<string>('');
  const [menuCheckList, setMenuCheckList] = useState<string[]>([]);
  const [selectOption, setSelectOption] = useState(
    query.sort
      ? mediaSearchSortList.find((media) => media.value === query.sort) || mediaSearchSortList[0]
      : mediaSearchSortList[0]
  );

  const [isOpenUploadModal, setIsOpenUploadModal] = useState(false);
  const { setUploadFileList, setUploadFolderId } = useUpload();
  const setIsFileUploadModal = useSetRecoilState(uploadModalOpenSelector); // 파일 업로드 모달

  useEffect(() => {
    setUploadFolderId((query.id as string) || undefined);
  }, []);

  const handleSelectOption = (item: IOption) => {
    router.push({
      pathname: router.pathname,
      query: {
        ...query,
        sort: item.value
      }
    });
    setSelectOption({
      name: item.name,
      value: String(item.value)
    });
  };

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  useEffect(() => {
    if (folder) {
      setValue('name', folder.name);
    }
  }, [folder]);

  useEffect(() => {
    fetchList();
    setMenuCheckList([]);
  }, [router.asPath]);

  const fetchList = async () => {
    try {
      query.mediaId = query.id as string;
      await mediaList(query);
    } catch (err) {
      errorToast(getCustomErrorMessage(err));
      back(ADMIN_PATH.MEDIA);
    }
  };

  const onClose = () => {
    setIsOpenUploadModal(false);
  };

  const handleUploadModalOpen = () => {
    setIsOpenUploadModal(true);
  };

  const handleMenuSelectMedia = (mediaId: string) => {
    setMenuSelectMedia(mediaId);
  };

  const handleMenuCheckList = (mediaId: string) => {
    if (menuCheckList.includes(mediaId)) {
      setMenuCheckList(menuCheckList.filter((item) => item !== mediaId));
    } else {
      setMenuCheckList([...menuCheckList, mediaId]);
    }
  };

  const handleMenuCheckAll = () => {
    if (menuCheckList.length === list.length) {
      setMenuCheckList([]);
    } else {
      setMenuCheckList(list.map((item) => item.mediaId));
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
          await deleteFile(menuCheckList, false);
          handleClose();
          fetchList();
          setMenuCheckList([]);
        } catch (err) {
          errorToast(getCustomErrorMessage(err));
        }
      }
    });
  };

  const onSubmit = handleSubmit(({ name }) => {
    updateFolderName(name);
  });

  const handleFocus = (isFocus: boolean) => {
    setIsFocus(isFocus);
  };

  const updateFolderName = async (folderName: string) => {
    try {
      await mediaFolderNameUpdate(query.id as string, folderName);
      setFolder((prevFolder) => {
        if (prevFolder) {
          return {
            ...prevFolder,
            name: folderName
          };
        }
        return prevFolder;
      });
      handleFocus(false);
    } catch (err) {
      errorToast(getCustomErrorMessage(err));
    }
  };

  const handleFolderNameBlur = () => {
    setValue('name', folder?.name || '');
  };

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

  const handleMove = async () => {
    try {
      await mediaFileList();
      setIsFolderMoveOpen(true);
    } catch (err) {
      errorToast(getCustomErrorMessage(err));
    }
  };

  const handleFolderMoveModalClose = () => {
    setIsFolderMoveOpen(false);
  };

  const handleFolderMove = async (folderId: string) => {
    try {
      if (folderId !== query.id) {
        await mediaFolderMove(folderId, menuCheckList);
        setMenuCheckList([]);
        setIsFolderMoveOpen(false);
      } else {
        setMenuCheckList([]);
        setIsFolderMoveOpen(false);
      }
    } catch (err) {
      errorToast(getCustomErrorMessage(err));
    }
  };

  return (
    <>
      <SeoHead title={folder?.name ? `${folder.name} | MenuBoss` : undefined} />
      <Layout isSearch>
        {isFolderMoveOpen && (
          <ModalContainer onClose={handleFolderMoveModalClose}>
            <FolderMove onClose={handleFolderMoveModalClose} handleMove={handleFolderMove} />
          </ModalContainer>
        )}
        {isOpenUploadModal && (
          <ModalContainer onClose={onClose}>
            <UploadModal onClose={onClose} />
          </ModalContainer>
        )}
        <TitleBox backUrl={ADMIN_PATH.MEDIA} historyBack>
          <Box display="flex" alignItems="center">
            {folder?.name ? (
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
                />
              </Form>
            ) : (
              <Skeleton width={200} style={{ marginRight: '12px' }} />
            )}
          </Box>
          <Button
            color="primary"
            variant="fill"
            size="m"
            borderRadius="100px"
            width="160px"
            onClick={handleUploadModalOpen}
          >
            <PlusFill width="20" height="20" color={theme.color.white} />
            Upload file
          </Button>
        </TitleBox>
        <Box
          display="flex"
          justifyContent={menuCheckList.length ? 'space-between' : 'end'}
          alignItems="center"
          mb="24px"
          mt="32px"
          height="48px"
        >
          {!!menuCheckList.length && (
            <Box display="flex" alignItems="center">
              <Button
                color="neutral"
                variant="outline"
                icon="left"
                width="120px"
                onClick={handleMove}
                mr="16px"
              >
                <Move width="20" height="20" color={theme.color.gray900} />
                Move
              </Button>
              <Button
                color="error"
                variant="outline"
                icon="left"
                width="120px"
                onClick={handleDelete}
              >
                <Trash width="20" height="20" color={theme.color.red500} />
                Delete
              </Button>
            </Box>
          )}
          <Select
            list={mediaSearchSortList}
            width="240px"
            size="s"
            selectOption={selectOption}
            onClick={handleSelectOption}
          />
        </Box>
        {(loading || !!list.length) && (
          <Box>
            <MediaTable
              handleMenuSelectMedia={handleMenuSelectMedia}
              menuSelectMedia={menuSelectMedia}
              handleMenuCheckList={handleMenuCheckList}
              menuCheckList={menuCheckList}
              handleMenuCheckAll={handleMenuCheckAll}
            />
          </Box>
        )}
        {!loading && !list.length && (
          <Box {...getRootProps()} position="relative">
            {isDragActive && <DragFile />}
            <Empty
              icon={<UploadFile width="68" height="68" color={theme.color.gray400} />}
              text="There are no current files<br/>Please create a file"
            />
          </Box>
        )}
        {page && page.totalPages !== 1 && (
          <Box mt="32px">
            <Pagination totalPage={page.totalPages} />
          </Box>
        )}
      </Layout>
    </>
  );
};

export default Protect(MediaFolder);
