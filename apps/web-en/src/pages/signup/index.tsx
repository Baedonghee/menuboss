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

const SignUp = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const { signup } = useAuthActions();
  const { query } = useRouter();
  const [isPasswordView, setIsPasswordView] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { isValid, errors }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      name: '',
      password: '',
      business: ''
    }
  });

  const onSubmit = handleSubmit(async ({ email, name, password, business }) => {
    try {
      setIsSubmit(true);
      await signup({
        email,
        name,
        password,
        business,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
      });
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
      <SeoHead title="Sign Up | MenuBoss" />
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
          Sign up
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
            mb="12px"
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
              required: 'Password is required',
              pattern: {
                value: validator.passwordReg,
                message: 'Invalid password'
              }
            }}
            width="100%"
            placeholder="Password"
            mb="12px"
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
            type="text"
            name="name"
            register={register}
            options={{
              required: 'Name is required',
              maxLength: {
                value: 32,
                message: 'Name is too long'
              }
            }}
            mb="12px"
            width="100%"
            placeholder="Full name"
            size="l"
            error={errors.name?.message}
          />
          <Input
            type="text"
            name="business"
            register={register}
            options={{
              required: 'Business is required'
            }}
            mb="32px"
            width="100%"
            placeholder="Business name"
            size="l"
          />
          <Button type="submit" size="l" width="100%" mb="32px" disabled={!isValid || isSubmit}>
            Sign up
          </Button>
          <Box display="flex" justifyContent="center">
            <Typography
              as="span"
              mr="8px"
              color={theme.color.gray500}
              fontSize={theme.fontSize.text16}
            >
              Already have an account?
            </Typography>
            <Typography
              as="span"
              color={theme.color.primary500}
              fontWeight={theme.fontWeight.semiBold}
            >
              <Link
                href={`${PATH.LOGIN}${query.continue ? `?continue=${query.continue}` : ''}`}
                className="underline"
              >
                Log in
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

export default SignUp;
