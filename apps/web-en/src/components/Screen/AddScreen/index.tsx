import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Form, Input, Typography } from '@repo/ui/components';
import { theme } from '@repo/ui/theme';

import ModalLayout from '@/components/Layout/Modal';

interface IFolderMove {
  onClose: () => void;
  handleCreateScreen: (code: string) => void;
}

const AddScreen: React.FC<IFolderMove> = ({ onClose, handleCreateScreen }) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      code: ''
    }
  });

  const onSubmit = handleSubmit(({ code }) => {
    handleCreateScreen(code);
  });

  return (
    <ModalLayout title="Add screen" onClose={onClose} width="580px">
      <Box mt="32px">
        <Typography fontSize={theme.fontSize.text16} color={theme.color.gray900}>
          Enter PIN code
        </Typography>
        <Form title="Pin code" onSubmit={onSubmit}>
          <Input
            width="100%"
            mt="12px"
            register={register}
            options={{
              required: 'Enter PIN code'
            }}
            placeholder="Enter PIN code"
            name="code"
            error={errors.code?.message}
            size="l"
          />
          <Box display="flex" justifyContent="end" mt="32px">
            <Button mr="16px" color="neutral" variant="outline" width="120px" onClick={onClose}>
              Cancel
            </Button>
            <Button width="120px" type="submit" disabled={!isValid}>
              Ok
            </Button>
          </Box>
        </Form>
      </Box>
    </ModalLayout>
  );
};

export default AddScreen;
