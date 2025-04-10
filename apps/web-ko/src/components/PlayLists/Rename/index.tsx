/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Form, Input, Typography } from '@repo/ui/components';
import { theme } from '@repo/ui/theme';
import { getCustomErrorMessage } from '@repo/ui/utils';

import { useCanvasActions } from '@/actions/canvas-actions';
import { useMediaActions } from '@/actions/media-action';
import { usePlaylistsActions } from '@/actions/playlists-action';
import { useScheduleActions } from '@/actions/schedule-action';
import { useScreenActions } from '@/actions/screen-action';
import ModalLayout from '@/components/Layout/Modal';
import { errorToast } from '@/utils/toast';

interface IRename {
  onClose: () => void;
  id: number | string;
  type: 'folder' | 'playlist' | 'schedule' | 'screen' | 'canvas';
  editName: string;
}

const RenameModal: React.FC<IRename> = ({ onClose, id, type, editName }) => {
  const { mediaFolderNameUpdate } = useMediaActions();
  const { playlistNameUpdate } = usePlaylistsActions();
  const { scheduleNameUpdate } = useScheduleActions();
  const { screenNameUpdate } = useScreenActions();
  const { canvasNameUpdate } = useCanvasActions();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: ''
    }
  });

  useEffect(() => {
    if (editName) {
      setValue('name', editName, {
        shouldValidate: true
      });
    }
  }, []);

  const onSubmit = handleSubmit(async ({ name }) => {
    try {
      if (type === 'folder') {
        await mediaFolderNameUpdate(id as string, name);
      } else if (type === 'playlist') {
        await playlistNameUpdate(id as number, name);
      } else if (type === 'schedule') {
        await scheduleNameUpdate(id as number, name);
      } else if (type === 'screen') {
        await screenNameUpdate(id as number, name);
      } else if (type === 'canvas') {
        await canvasNameUpdate(id as string, name);
      }
      onClose();
    } catch (err) {
      errorToast(getCustomErrorMessage(err));
    }
  });

  const getTitle = () => {
    switch (type) {
      case 'folder':
        return '폴더 이름';
      case 'playlist':
        return '재생목록 이름';
      case 'schedule':
        return '시간표 이름';
      case 'screen':
        return 'TV 이름';
      case 'canvas':
        return '캔버스 이름';
      default:
        return '';
    }
  };

  const getNameRequiredMessage = () => {
    switch (type) {
      case 'folder':
        return '폴더 이름을 입력해주세요';
      case 'playlist':
        return '재생목록 이름을 입력해주세요';
      case 'schedule':
        return '시간표 이름을 입력해주세요';
      case 'screen':
        return 'TV 이름을 입력해주세요';
      case 'canvas':
        return '캔버스 이름을 입력해주세요';
      default:
        return '';
    }
  };

  const getNamePlaceholder = () => {
    switch (type) {
      case 'folder':
        return '폴더 이름';
      case 'playlist':
        return '재생목록 이름';
      case 'schedule':
        return '시간표 이름';
      case 'screen':
        return 'TV 이름';
      case 'canvas':
        return '캔버스 이름';
      default:
        return '';
    }
  };

  return (
    <ModalLayout title="이름 변경" onClose={onClose} width="580px">
      <Box mt="24px">
        <Typography fontSize={theme.fontSize.text16} color={theme.color.gray900}>
          {getTitle()}
        </Typography>
        <Form title="rename form" onSubmit={onSubmit}>
          <Input
            name="name"
            width="100%"
            register={register}
            options={{
              required: getNameRequiredMessage()
            }}
            size="l"
            placeholder={getNamePlaceholder()}
            error={errors.name?.message}
            mt="12px"
          />
          <Box mt="32px" display="flex" justifyContent="end">
            <Button mr="16px" color="neutral" variant="outline" width="120px" onClick={onClose}>
              취소
            </Button>
            <Button width="120px" type="submit">
              확인
            </Button>
          </Box>
        </Form>
      </Box>
    </ModalLayout>
  );
};

export default RenameModal;
