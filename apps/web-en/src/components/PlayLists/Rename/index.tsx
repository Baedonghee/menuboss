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
        return 'Folder name';
      case 'playlist':
        return 'Playlist name';
      case 'schedule':
        return 'Schedule name';
      case 'screen':
        return 'Screen name';
      case 'canvas':
        return 'Canvas name';
      default:
        return '';
    }
  };

  const getNameRequiredMessage = () => {
    switch (type) {
      case 'folder':
        return 'Folder name is required';
      case 'playlist':
        return 'Playlist name is required';
      case 'schedule':
        return 'Schedule name is required';
      case 'screen':
        return 'Screen name is required';
      case 'canvas':
        return 'Canvas name is required';
      default:
        return '';
    }
  };

  const getNamePlaceholder = () => {
    switch (type) {
      case 'folder':
        return 'Folder name';
      case 'playlist':
        return 'Playlist name';
      case 'schedule':
        return 'Schedule name';
      case 'screen':
        return 'Screen name';
      case 'canvas':
        return 'Canvas name';
      default:
        return '';
    }
  };

  return (
    <ModalLayout title="Rename" onClose={onClose} width="580px">
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
              Cancel
            </Button>
            <Button width="120px" type="submit">
              Ok
            </Button>
          </Box>
        </Form>
      </Box>
    </ModalLayout>
  );
};

export default RenameModal;
