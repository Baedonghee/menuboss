/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { DropEvent, FileWithPath, useDropzone } from 'react-dropzone';
import {
  Box,
  Button,
  DragFile,
  Empty,
  ModalContainer,
  Select,
  TitleBox
} from '@repo/ui/components';
import { Move, NewFolder, PlusFill, Trash, UploadFile } from '@repo/ui/icons';
import { useAlert } from '@repo/ui/providers';
import { theme } from '@repo/ui/theme';
import { IMediaList, IOption } from '@repo/ui/types';
import { getCustomErrorMessage } from '@repo/ui/utils';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/router';
import { useRecoilValue, useSetRecoilState } from 'recoil';

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
import { mediaListLoadingSelector, mediaListSelector, mediaPageSelector } from '@/state/media';
import { uploadModalOpenSelector } from '@/state/upload';
import { errorToast } from '@/utils/toast';

const Media = () => {
  const router = useRouter();
  const { handleShowAlert, handleClose } = useAlert();
  const { mediaList, createFolder, deleteFile, mediaFolderMove, mediaFileList, reset } =
    useMediaActions();
  const page = useRecoilValue(mediaPageSelector);
  const loading = useRecoilValue(mediaListLoadingSelector);
  const list = useRecoilValue(mediaListSelector);

  const [isFolderMoveOpen, setIsFolderMoveOpen] = useState(false);
  const [menuSelectMedia, setMenuSelectMedia] = useState<string>('');
  const [menuCheckList, setMenuCheckList] = useState<string[]>([]);
  const [selectOption, setSelectOption] = useState(
    router.query.sort
      ? mediaSearchSortList.find((media) => media.value === router.query.sort) ||
          mediaSearchSortList[0]
      : mediaSearchSortList[0]
  );

  const [isOpenUploadModal, setIsOpenUploadModal] = useState(false);
  const { setUploadFileList, setUploadFolderId } = useUpload();
  const [filterList, setFilterList] = useState<IMediaList[]>([]);
  const setIsFileUploadModal = useSetRecoilState(uploadModalOpenSelector); // 파일 업로드 모달

  useEffect(() => {
    setUploadFolderId('');
    return () => {
      reset();
    };
  }, []);

  useEffect(() => {
    fetchList();
    setMenuCheckList([]);
  }, [router.asPath]);

  useEffect(() => {
    if (list.length) {
      setFilterList(
        list.filter((item) => {
          if (item.type.code === 'Folder' && item.property.count && item.property.count > 0) {
            return false;
          }
          return item;
        })
      );
    } else {
      setFilterList([]);
    }
  }, [list.length, router.asPath]);

  const handleSelectOption = (item: IOption) => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        sort: item.value
      }
    });
    setSelectOption({
      name: item.name,
      value: String(item.value)
    });
  };

  const fetchList = async () => {
    try {
      await mediaList(router.query);
      handleClose();
    } catch (err) {
      errorToast(getCustomErrorMessage(err));
    }
  };

  const onClose = () => {
    setIsOpenUploadModal(false);
  };

  const handleUploadModalOpen = () => {
    setIsOpenUploadModal(true);
  };

  const handleNewFolder = async () => {
    try {
      await createFolder();
    } catch (err) {
      errorToast(getCustomErrorMessage(err));
    }
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
    if (menuCheckList.length === filterList.length) {
      setMenuCheckList([]);
    } else {
      setMenuCheckList(filterList.map((item) => item.mediaId));
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
          setMenuCheckList([]);
          fetchList();
          handleClose();
        } catch (err) {
          errorToast(getCustomErrorMessage(err));
        }
      }
    });
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

  const handleFolderMoveModalClose = () => {
    setIsFolderMoveOpen(false);
  };

  const handleMove = async () => {
    try {
      await mediaFileList();
      setIsFolderMoveOpen(true);
    } catch (err) {
      errorToast(getCustomErrorMessage(err));
    }
  };

  const handleFolderMove = async (folderId: string) => {
    try {
      if (folderId) {
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
      <SeoHead title="Media | MenuBoss" />
      <Layout>
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
        <TitleBox title="Media">
          <Button
            color="neutral"
            variant="outline"
            size="m"
            borderRadius="100px"
            width="160px"
            mr="12px"
            onClick={handleNewFolder}
          >
            <NewFolder width="20" height="20" color={theme.color.black} />
            New folder
          </Button>
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
          <Box position="relative">
            <MediaTable
              handleMenuSelectMedia={handleMenuSelectMedia}
              menuSelectMedia={menuSelectMedia}
              handleMenuCheckList={handleMenuCheckList}
              menuCheckList={menuCheckList}
              handleMenuCheckAll={handleMenuCheckAll}
              filterList={filterList}
            />
          </Box>
        )}
        {!loading && !list.length && (
          <Box {...getRootProps()} position="relative">
            {isDragActive && <DragFile />}
            <Empty
              icon={<UploadFile width="68" height="68" color={theme.color.gray400} />}
              text="There are no current files or folders<br/>Please create a file or folder"
            />
          </Box>
        )}
        {page && !(page.totalPages === 0 || page.totalPages === 1) && (
          <Box mt="32px">
            <Pagination totalPage={page.totalPages} />
          </Box>
        )}
      </Layout>
    </>
  );
};

export default Protect(Media);
