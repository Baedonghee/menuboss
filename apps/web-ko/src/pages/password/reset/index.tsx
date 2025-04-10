/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Form, Input, Typography } from '@repo/ui/components';
import { Logo2, ViewOff, ViewOn } from '@repo/ui/icons';
import { useAlert } from '@repo/ui/providers';
import { theme } from '@repo/ui/theme';
import { getCustomErrorMessage, validator } from '@repo/ui/utils';
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
  const router = useRouter();
  const { updatePassword } = useAuthActions();
  const passwordToken = useRecoilValue(authPasswordTokenSelector);
  const { handleShowAlert } = useAlert();
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
      handleShowAlert({
        title: '비밀번호 변경 완료',
        description: `비밀번호 변경이 완료되었습니다. 변경된 비밀번호로 다시 로그인해주세요`,
        type: 'success',
        onConfirm: () => {
          router.push(PATH.LOGIN);
        },
        onClose: () => {
          router.push(PATH.LOGIN);
        }
      });
    } catch (err) {
      errorToast(getCustomErrorMessage(err));
    }
  });

  return (
    <>
      <SeoHead title="비밀번호 초기화 | MenuBoss" />
      <Box margin="0 auto" mt="80px" width="360px" textAlign="center">
        <Form title="find password" onSubmit={onSubmit}>
          <Logo2 width="126" height="60" color={theme.color.primary500} />
          <Typography
            fontSize={theme.fontSize.text24}
            fontWeight={theme.fontWeight.semiBold}
            color={theme.color.gray900}
            mt="32px"
          >
            비밀번호 재설정
          </Typography>
          <Box mt="32px">
            <Input
              type={isPasswordView ? 'text' : 'password'}
              register={register}
              name="password"
              options={{
                required: '비밀번호를 입력해주세요',
                pattern: {
                  value: validator.passwordReg,
                  message: '비밀번호는 영문,숫자 포함 8자 이상이어야 합니다'
                }
              }}
              width="100%"
              placeholder="새 비밀번호를 입력해주세요"
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
                required: '비밀번호를 입력해주세요',
                validate: {
                  samePassword: (value) =>
                    value === getValues('password') || '비밀번호가 일치하지 않습니다'
                }
              }}
              width="100%"
              placeholder="비밀번호를 한번 더 입력해주세요"
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
            확인
          </Button>
        </Form>
      </Box>
    </>
  );
};

export default PasswordForget;
