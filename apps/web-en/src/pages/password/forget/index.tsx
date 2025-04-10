import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Form, Input, Typography } from '@repo/ui/components';
import { Logo2 } from '@repo/ui/icons';
import { useAlert } from '@repo/ui/providers';
import { theme } from '@repo/ui/theme';
import { getCustomErrorMessage, validator } from '@repo/ui/utils';
import { useRouter } from 'next/router';

import { useAuthActions } from '@/actions/auth-action';
import SeoHead from '@/components/common/SeoHead';
import { PATH } from '@/utils/path';
import { errorToast } from '@/utils/toast';

const PasswordForget = () => {
  const { sendEmailCode, sendCode } = useAuthActions();
  const { handleShowAlert, handleClose } = useAlert();
  const router = useRouter();
  const [isComplete, setIsComplete] = useState(false);
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: ''
    }
  });

  const {
    getValues: pinGetValues,
    register: pinRegister,
    formState: { errors: pinErrors, isValid: pinIsValid }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      code: ''
    }
  });

  const onSubmit = handleSubmit(async () => {
    try {
      if (isComplete) {
        const { email } = getValues();
        const { code } = pinGetValues();
        await sendCode(email, code);
        router.push(PATH.RESET_PASSWORD);
      } else {
        const { email } = getValues();
        await sendEmailCode(email);
        handleShowAlert({
          title: 'Notification',
          description: `A temporary password has been sent to ${email}`,
          type: 'check',
          onConfirm: () => {
            setIsComplete(true);
            handleClose();
          },
          onClose: () => {
            setIsComplete(true);
            handleClose();
          }
        });
      }
    } catch (err) {
      errorToast(getCustomErrorMessage(err));
    }
  });

  return (
    <>
      <SeoHead title="Forgot Password | MenuBoss" />
      <Box margin="0 auto" mt="80px" width="360px" textAlign="center">
        <Form title="find password" onSubmit={onSubmit}>
          <Logo2 width="126" height="60" color={theme.color.primary500} />
          <Typography
            fontSize={theme.fontSize.text24}
            fontWeight={theme.fontWeight.semiBold}
            color={theme.color.gray900}
            mt="32px"
          >
            {isComplete ? 'Enter PIN number' : 'Forgot your password?'}
          </Typography>
          <Typography fontSize={theme.fontSize.text16} color={theme.color.gray700} mt="12px">
            {isComplete
              ? 'Please enter the emailed number'
              : `Don't worry, you can find it by entering an email account to find your password.`}
          </Typography>
          {isComplete ? (
            <Input
              register={pinRegister}
              name="code"
              mt="32px"
              options={{
                required: 'PIN Code is required'
              }}
              width="100%"
              placeholder="Enter PIN code"
              size="l"
              error={pinErrors.code?.message}
            />
          ) : (
            <Input
              register={register}
              name="email"
              mt="32px"
              options={{
                required: 'Email is required',
                pattern: {
                  value: validator.emailReg,
                  message: 'Invalid email address'
                }
              }}
              width="100%"
              placeholder="Email"
              size="l"
              error={errors.email?.message}
            />
          )}
          <Button
            width="100%"
            mt="32px"
            size="l"
            disabled={isComplete ? !pinIsValid : !isValid}
            type="submit"
          >
            {isComplete ? 'Next' : 'Send email'}
          </Button>
        </Form>
      </Box>
    </>
  );
};

export default PasswordForget;
