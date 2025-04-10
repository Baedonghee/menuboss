import React, { useInsertionEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Form, Input, Typography } from '@repo/ui/components';
import { Logo } from '@repo/ui/icons';
import { theme } from '@repo/ui/theme';
import { getCustomErrorMessage } from '@repo/ui/utils';
import { getCookie } from 'cookies-next';
import { NextPageContext } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';

import { useAuthActions } from '@/actions/auth-action';
import SeoHead from '@/components/common/SeoHead';
import AuthLayout from '@/components/Layout/Auth';
import { authSocialAccessTokenSelector } from '@/state/auth';
import { ADMIN_PATH, PATH } from '@/utils/path';
import { errorToast } from '@/utils/toast';

const SocialSignUp = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const router = useRouter();
  const { query } = router;
  const { socialJoin } = useAuthActions();
  const social = useRecoilValue(authSocialAccessTokenSelector);

  const {
    register,
    handleSubmit,
    formState: { isValid }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      business: ''
    }
  });

  useInsertionEffect(() => {
    if (!social) {
      router.replace(`${PATH.LOGIN}${query.continue ? `?continue=${query.continue}` : ''}`);
    }
  }, []);

  const onSubmit = handleSubmit(async ({ name, business }) => {
    try {
      if (social) {
        setIsSubmit(true);
        await socialJoin({
          name,
          business,
          accessToken: social.token,
          type: social.type,
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          asPath: query.continue as string
        });
      }
    } catch (err) {
      setIsSubmit(false);
      errorToast(getCustomErrorMessage(err));
    }
  });

  return (
    <>
      <SeoHead title="Social Sign Up | MenuBoss" />
      <AuthLayout>
        <Logo width="126" height="61" color={theme.color.primary500} className="logo" />
        <Typography
          as="h1"
          fontSize={theme.fontSize.text24}
          fontWeight={theme.fontWeight.semiBold}
          mb="12px"
          textAlign="center"
        >
          Sign up
        </Typography>
        <Typography fontSize={theme.fontSize.text14} color={theme.color.gray700} mb="32px">
          Enter your email address and try the Menuboss
        </Typography>
        <Form title="login" onSubmit={onSubmit}>
          <Input
            type="text"
            name="name"
            register={register}
            options={{
              required: 'Name is required'
            }}
            mb="12px"
            width="100%"
            placeholder="Full name"
            size="l"
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
              <Link href={PATH.LOGIN} className="underline">
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

export default SocialSignUp;
