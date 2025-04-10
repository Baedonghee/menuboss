import React from 'react';
import AppleSignin from 'react-apple-signin-auth';
import { useGoogleLogin } from '@react-oauth/google';
import { Box, Button } from '@repo/ui/components';
import { Apple, Google } from '@repo/ui/icons';
import { theme } from '@repo/ui/theme';
import { IApi, IGoogle } from '@repo/ui/types';
import { getCustomErrorMessage } from '@repo/ui/utils';
// import { useGoogleLogin } from '@react-oauth/google';
import { AxiosResponse } from 'axios';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { useAuthActions } from '@/actions/auth-action';
import authApi from '@/api/client/auth.json';
// import authApi from '@/api/client/auth.json';
import validationApi from '@/api/client/validation.json';
// import Google from '@/components/common/SVG/icons/google';
import { authSocialAccessTokenSelector } from '@/state/auth';
import axios from '@/utils/client/axios';
import { PATH } from '@/utils/path';
import { errorToast } from '@/utils/toast';

const { publicRuntimeConfig } = getConfig();
const { APPLE_LOGIN_API_KEY, CLIENT_API } = publicRuntimeConfig;

interface IAuthSocial {
  isSubmit: boolean;
  setIsSubmit: (isSubmit: boolean) => void;
}

const AuthSocialWrapper = styled(Box)`
  .login-btn {
    border: 1px solid ${({ theme }) => theme.color.gray300} !important;
    background-color: ${({ theme }) => theme.color.white} !important;
    color: ${({ theme }) => theme.color.gray900} !important;
  }
`;

const AuthSocial: React.FC<IAuthSocial> = ({ isSubmit, setIsSubmit }) => {
  const router = useRouter();
  const { query } = router;
  const { socialLogin } = useAuthActions();
  const setSocial = useSetRecoilState(authSocialAccessTokenSelector);

  const validationSocialCheck = async (type: 'Google' | 'Apple', accessToken: string) => {
    try {
      setIsSubmit(true);
      const {
        data: { status }
      }: AxiosResponse<IApi> = await axios.post(validationApi.socialLogin, {
        type,
        accessToken
      });
      if (status === 200) {
        // 회원 있을때
        await socialLogin({
          type,
          accessToken,
          asPath: query.continue as string
        });
      } else if (status === 404) {
        // 회원 없을때
        setSocial({
          type: type,
          token: accessToken
        });
        router.push(
          query.continue ? `${PATH.SOCIAL_SIGN_UP}?continue=${query.continue}` : PATH.SOCIAL_SIGN_UP
        );
      }
    } catch (err) {
      setIsSubmit(false);
      errorToast(getCustomErrorMessage(err));
    }
  };
  const handleGoogleLogin = useGoogleLogin({
    ux_mode: 'popup',
    flow: 'auth-code',
    onSuccess: async (tokenResponse: any) => {
      try {
        setIsSubmit(true);
        const {
          data: {
            status,
            data: { id_token: idToken }
          }
        }: AxiosResponse<IApi<IGoogle>> = await axios.post(authApi.google, {
          code: tokenResponse.code
        });
        if (status === 200) {
          validationSocialCheck('Google', idToken);
        } else {
          setIsSubmit(false);
          errorToast();
        }
      } catch (err) {
        setIsSubmit(false);
        errorToast('Google login failed');
      }
    },
    onError: () => {
      setIsSubmit(false);
      errorToast('Google login failed');
    }
  });

  const handleAppleLogin = (result: any) => {
    if (result?.authorization?.id_token) {
      validationSocialCheck('Apple', result.authorization.id_token);
    } else {
      errorToast('Apple login failed');
    }
  };

  return (
    <AuthSocialWrapper>
      <Button
        icon="left"
        variant="outline"
        color="neutral"
        w="100%"
        mb="12px"
        size="l"
        onClick={handleGoogleLogin}
        disabled={isSubmit}
        className="login-btn"
      >
        <Google width="24" height="24" />
        Continue with Google
      </Button>
      <AppleSignin
        authOptions={{
          clientId: APPLE_LOGIN_API_KEY,
          scope: 'email name',
          redirectURI: `${CLIENT_API}/login`,
          state: '',
          nonce: 'nonce',
          usePopup: true
        }}
        render={(renderProps: any) => (
          <Button
            icon="left"
            variant="outline"
            color="neutral"
            w="100%"
            size="l"
            {...renderProps}
            disabled={isSubmit}
            className="login-btn"
          >
            <Apple width="24" height="24" color={theme.color.black} />
            Continue with Apple
          </Button>
        )}
        onSuccess={handleAppleLogin}
        onError={() => {
          errorToast('Apple login failed');
        }}
      />
    </AuthSocialWrapper>
  );
};

export default AuthSocial;
