import React from 'react';
import AppleSignin from 'react-apple-signin-auth';
import KakaoLogin from 'react-kakao-login';
import { Box, Button } from '@repo/ui/components';
import { Apple, Kakao } from '@repo/ui/icons';
import { theme } from '@repo/ui/theme';
import { IApi } from '@repo/ui/types';
import { getCustomErrorMessage } from '@repo/ui/utils';
// import { useGoogleLogin } from '@react-oauth/google';
import { AxiosResponse } from 'axios';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { useAuthActions } from '@/actions/auth-action';
// import authApi from '@/api/client/auth.json';
import validationApi from '@/api/client/validation.json';
// import Google from '@/components/common/SVG/icons/google';
import { authSocialAccessTokenSelector } from '@/state/auth';
import axios from '@/utils/client/axios';
import { PATH } from '@/utils/path';
import { errorToast } from '@/utils/toast';

const { publicRuntimeConfig } = getConfig();
const { APPLE_LOGIN_API_KEY, KAKAO_LOGIN_API_KEY, CLIENT_API } = publicRuntimeConfig;

interface IAuthSocial {
  isSubmit: boolean;
  setIsSubmit: (isSubmit: boolean) => void;
}

const AuthSocialWrapper = styled(Box)`
  .login-btn {
    border: #fee500 !important;
    background-color: #fee500 !important;
    color: ${({ theme }) => theme.color.gray900} !important;
    &.apple-btn {
      background-color: ${({ theme }) => theme.color.black} !important;
      color: ${({ theme }) => theme.color.white} !important;
      border: 1px solid ${({ theme }) => theme.color.black} !important;
    }
  }
`;

const AuthSocial: React.FC<IAuthSocial> = ({ isSubmit, setIsSubmit }) => {
  const router = useRouter();
  const { query } = router;
  const { socialLogin } = useAuthActions();
  const setSocial = useSetRecoilState(authSocialAccessTokenSelector);

  const validationSocialCheck = async (type: 'Kakao' | 'Apple', accessToken: string) => {
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

  const handleAppleLogin = (result: any) => {
    if (result?.authorization?.id_token) {
      validationSocialCheck('Apple', result.authorization.id_token);
    } else {
      errorToast('애플 로그인에 실패하였습니다');
    }
  };

  const onKakaoSuccess = (result: any) => {
    validationSocialCheck('Kakao', result.response.access_token);
  };

  const onKakaoFail = () => {
    errorToast('카카오 로그인에 실패하였습니다');
  };

  return (
    <AuthSocialWrapper>
      <KakaoLogin
        token={KAKAO_LOGIN_API_KEY}
        onSuccess={onKakaoSuccess}
        onFail={onKakaoFail}
        render={({ onClick }) => {
          return (
            <Button
              icon="left"
              variant="outline"
              color="neutral"
              w="100%"
              mb="12px"
              size="l"
              onClick={onClick}
              disabled={isSubmit}
              className="login-btn"
            >
              <Kakao width="20" height="20" color={theme.color.black} />
              카카오로 간편 로그인
            </Button>
          );
        }}
      />
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
            className="login-btn apple-btn"
          >
            <Apple width="20" height="20" color={theme.color.white} />
            애플로 간편 로그인
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
