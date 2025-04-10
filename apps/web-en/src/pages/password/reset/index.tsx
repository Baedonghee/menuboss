/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Form, Input, Typography } from '@repo/ui/components';
import { Logo2, ViewOff, ViewOn } from '@repo/ui/icons';
import { theme } from '@repo/ui/theme';
import { getCustomErrorMessage, validator } from '@repo/ui/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';

import { useAuthActions } from '@/actions/auth-action';
import SeoHead from '@/components/common/SeoHead';
import { authPasswordTokenSelector } from '@/state/auth';
import { PATH } from '@/utils/path';
import { errorToast } from '@/utils/toast';

const PasswordForget = () => {
  const [isPasswordView, setIsPasswordView] = useState(false);
  const [isRePasswordView, setIsRePasswordView] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const router = useRouter();
  const { updatePassword } = useAuthActions();
  const passwordToken = useRecoilValue(authPasswordTokenSelector);
  const {
    register,
    getValues,
    formState: { errors, isValid },
    handleSubmit
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      password: '',
      rePassword: ''
    }
  });

  useEffect(() => {
    if (!passwordToken) {
      router.push(PATH.LOGIN);
    }
  }, [passwordToken]);

  const handlePasswordView = () => {
    setIsPasswordView((prev) => !prev);
  };

  const handleRePasswordView = () => {
    setIsRePasswordView((prev) => !prev);
  };

  const onSubmit = handleSubmit(async ({ password }) => {
    try {
      await updatePassword(passwordToken, password);
      setIsComplete(true);
    } catch (err) {
      errorToast(getCustomErrorMessage(err));
    }
  });

  return (
    <>
      <SeoHead title="Reset Password | MenuBoss" />
      <Box margin="0 auto" mt="80px" width="360px" textAlign="center">
        <Form title="find password" onSubmit={onSubmit}>
          <Logo2 width="126" height="60" color={theme.color.primary500} />
          <Typography
            fontSize={theme.fontSize.text24}
            fontWeight={theme.fontWeight.semiBold}
            color={theme.color.gray900}
            mt="32px"
          >
            {isComplete ? 'Password was reset' : 'Reset password'}
          </Typography>
          {isComplete ? (
            <>
              <Typography fontSize={theme.fontSize.text16} color={theme.color.gray900} mt="12px">
                Please go to the login screen and log in
              </Typography>
              <Box mt="32px">
                <Link href={PATH.LOGIN}>
                  <Button width="100%" size="l">
                    Return to Log in
                  </Button>
                </Link>
              </Box>
            </>
          ) : (
            <>
              <Box mt="32px">
                <Input
                  type={isPasswordView ? 'text' : 'password'}
                  register={register}
                  name="password"
                  options={{
                    required: 'Password is required',
                    pattern: {
                      value: validator.passwordReg,
                      message: 'Invalid password'
                    }
                  }}
                  width="100%"
                  placeholder="New password"
                  size="l"
                  iconAlign="right"
                  icon={
                    isPasswordView ? (
                      <ViewOff
                        width="20"
                        height="20"
                        color={theme.color.gray600}
                        onClick={handlePasswordView}
                      />
                    ) : (
                      <ViewOn
                        width="20"
                        height="20"
                        color={theme.color.gray600}
                        onClick={handlePasswordView}
                      />
                    )
                  }
                  error={errors.password?.message}
                />
                <Input
                  type={isRePasswordView ? 'text' : 'password'}
                  register={register}
                  name="rePassword"
                  mt="12px"
                  options={{
                    required: 'Password is required',
                    validate: {
                      samePassword: (value) =>
                        value === getValues('password') || 'Passwords do not match'
                    }
                  }}
                  width="100%"
                  placeholder="New password again"
                  size="l"
                  iconAlign="right"
                  icon={
                    isRePasswordView ? (
                      <ViewOff
                        width="20"
                        height="20"
                        color={theme.color.gray600}
                        onClick={handleRePasswordView}
                      />
                    ) : (
                      <ViewOn
                        width="20"
                        height="20"
                        color={theme.color.gray600}
                        onClick={handleRePasswordView}
                      />
                    )
                  }
                  error={errors.rePassword?.message}
                />
              </Box>
              <Button width="100%" mt="32px" size="l" disabled={!isValid} type="submit">
                Done
              </Button>
            </>
          )}
        </Form>
      </Box>
    </>
  );
};

export default PasswordForget;
