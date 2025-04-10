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
        handleShowAlert({
          title: '비밀번호 변경 완료',
          description: `비밀번호 변경이 완료되었습니다. 변경된 비밀번호로 다시 로그인해주세요`,
          type: 'check',
          onConfirm: () => {
            handleClose();
            router.push(PATH.RESET_PASSWORD);
          },
          onClose: () => {
            handleClose();
            router.push(PATH.RESET_PASSWORD);
          }
        });
      } else {
        const { email } = getValues();
        await sendEmailCode(email);
        handleShowAlert({
          title: '발송 완료',
          description: `임시 비밀번호가 ${email}로 전송되었습니다`,
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
      <SeoHead title="비밀번호 찾기 | MenuBoss" />
      <Box margin="0 auto" mt="80px" width="360px" textAlign="center">
        <Form title="find password" onSubmit={onSubmit}>
          <Logo2 width="126" height="60" color={theme.color.primary500} />
          <Typography
            fontSize={theme.fontSize.text24}
            fontWeight={theme.fontWeight.semiBold}
            color={theme.color.gray900}
            mt="32px"
          >
            {isComplete ? 'PIN 번호 입력' : '비밀번호를 잊어버리셨나요?'}
          </Typography>
          <Typography
            fontSize={theme.fontSize.text16}
            color={theme.color.gray700}
            mt="12px"
            whiteSpace="pre-line"
            lineHeight="21px"
          >
            {isComplete
              ? '이메일로 발송된 여섯자리 숫자를 입력해주세요'
              : `걱정하지 마세요! 가입하셨던 이메일 계정을 입력하시면\n임시 비밀번호를 보내드립니다`}
          </Typography>
          {isComplete ? (
            <Input
              register={pinRegister}
              name="code"
              mt="32px"
              options={{
                required: 'PIN 번호를 입력해주세요'
              }}
              width="100%"
              placeholder="-제외 숫자를 입력해주세요"
              size="l"
              error={pinErrors.code?.message}
            />
          ) : (
            <Input
              register={register}
              name="email"
              mt="32px"
              options={{
                required: '이메일을 입력해주세요',
                pattern: {
                  value: validator.emailReg,
                  message: '이메일 형식이 올바르지 않습니다'
                }
              }}
              width="100%"
              placeholder="이메일을 입력해주세요"
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
            {isComplete ? '확인' : '이메일 발송'}
          </Button>
        </Form>
      </Box>
    </>
  );
};

export default PasswordForget;
