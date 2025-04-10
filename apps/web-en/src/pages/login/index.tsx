import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Form, Input, Typography } from '@repo/ui/components';
import { Logo, ViewOff, ViewOn } from '@repo/ui/icons';
import { theme } from '@repo/ui/theme';
import { getCustomErrorMessage, validator } from '@repo/ui/utils';
import { getCookie } from 'cookies-next';
import { NextPageContext } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useAuthActions } from '@/actions/auth-action';
import AuthSocial from '@/components/Auth/Social';
import SeoHead from '@/components/common/SeoHead';
import AuthLayout from '@/components/Layout/Auth';
import { ADMIN_PATH, PATH } from '@/utils/path';
import { errorToast } from '@/utils/toast';

const Login = () => {
  const { query } = useRouter();
  const { login } = useAuthActions();
  const [isSubmit, setIsSubmit] = useState(false);
  const [isPasswordView, setIsPasswordView] = useState(false);
  const {
    register,
    formState: { errors, isValid },
    handleSubmit
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = handleSubmit(async ({ email, password }) => {
    try {
      setIsSubmit(true);
      await login({ email, password, asPath: query.continue as string });
    } catch (err) {
      setIsSubmit(false);
      errorToast(getCustomErrorMessage(err));
    }
  });

  const handlePasswordView = () => {
    setIsPasswordView((prev) => !prev);
  };

  return (
    <>
      <SeoHead title="Log in | MenuBoss" />
      <AuthLayout>
        <Link href={PATH.MAIN}>
          <Logo width="126" height="61" color={theme.color.primary500} className="logo" />
        </Link>
        <Typography
          as="h1"
          fontSize={theme.fontSize.text24}
          fontWeight={theme.fontWeight.semiBold}
          mb="12px"
          textAlign="center"
        >
          Log in
        </Typography>
        <Typography fontSize={theme.fontSize.text16} mb="32px" color={theme.color.gray700}>
          Enter your email address and try the Menuboss
        </Typography>
        <AuthSocial isSubmit={isSubmit} setIsSubmit={setIsSubmit} />
        <Box className="line">
          <span>or</span>
        </Box>
        <Form title="login" onSubmit={onSubmit}>
          <Input
            type="text"
            name="email"
            register={register}
            options={{
              required: 'Email is required',
              pattern: {
                value: validator.emailReg,
                message: 'Invalid email address'
              }
            }}
            m="0px 0px 12px 0px"
            width="100%"
            placeholder="Email"
            size="l"
            error={errors.email?.message}
          />
          <Input
            type={isPasswordView ? 'text' : 'password'}
            name="password"
            register={register}
            options={{
              required: 'Password is required'
            }}
            width="100%"
            placeholder="Password"
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
          <Typography
            m="12px 0px 32px"
            fontSize={theme.fontSize.text16}
            color={theme.color.gray500}
            textAlign="right"
          >
            <Link href={PATH.FORGET_PASSWORD} className="underline">
              Forgot password?
            </Link>
          </Typography>
          <Button type="submit" size="l" width="100%" mb="32px" disabled={isSubmit || !isValid}>
            Log in
          </Button>
          <Box display="flex" justifyContent="center">
            <Typography as="span" mr="8px" color={theme.color.gray500}>
              No account?
            </Typography>
            <Typography
              as="span"
              color={theme.color.primary500}
              fontWeight={theme.fontWeight.semiBold}
            >
              <Link
                href={`${PATH.SIGN_UP}${query.continue ? `?continue=${query.continue}` : ''}`}
                className="underline"
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </Form>
      </AuthLayout>
    </>
  );
};

export const getServerSideProps = async (ctx: NextPageContext) => {
  const auth = getCookie('auth', {
    req: ctx.req,
    res: ctx.res
  });

  if (auth) {
    return {
      redirect: {
        destination: ctx.query.continue || ADMIN_PATH.SCREENS,
        permanent: false
      }
    };
  }
  return {
    props: {}
  };
};

export default Login;
