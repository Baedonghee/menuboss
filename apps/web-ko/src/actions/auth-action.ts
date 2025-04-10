import { IApi, IMe } from '@repo/ui/types';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';

import authApi from '@/api/client/auth.json';
import meApi from '@/api/client/me.json';
import { authAtom, authPasswordTokenSelector, authUserSelector } from '@/state/auth';
import { uploadAtom } from '@/state/upload';
import axios from '@/utils/client/axios';
import { ADMIN_PATH } from '@/utils/path';

function useAuthActions() {
  const router = useRouter();
  const setAuth = useSetRecoilState(authAtom);
  const setUser = useSetRecoilState(authUserSelector);
  const setPasswordToken = useSetRecoilState(authPasswordTokenSelector);
  const setUpload = useSetRecoilState(uploadAtom);

  async function me() {
    try {
      const {
        data: { data }
      }: AxiosResponse<IApi<IMe>> = await axios.get(meApi.me);
      setAuth({
        initLoading: false,
        user: data,
        social: null,
        passwordToken: ''
      });
    } catch (err) {
      throw err;
    }
  }

  async function socialJoin(formData: {
    type: 'Kakao' | 'Apple';
    accessToken: string;
    name: string;
    business: string;
    timeZone: string;
    asPath?: string;
  }) {
    try {
      const {
        data: { data }
      }: AxiosResponse<IApi<IMe>> = await axios.post(meApi.socialJoin, formData);
      setAuth({
        initLoading: false,
        user: data,
        social: null,
        passwordToken: ''
      });
      router.replace(formData.asPath ? decodeURIComponent(formData.asPath) : ADMIN_PATH.SCREENS);
    } catch (err) {
      throw err;
    }
  }

  async function login(formData: { email: string; password: string; asPath?: string }) {
    try {
      const {
        data: { data }
      }: AxiosResponse<IApi<IMe>> = await axios.post(authApi.login, formData);
      setUser(data);
      router.replace(formData.asPath ? decodeURIComponent(formData.asPath) : ADMIN_PATH.SCREENS);
    } catch (err) {
      throw err;
    }
  }

  async function signup(formData: {
    email: string;
    password: string;
    name: string;
    business: string;
    timeZone: string;
  }) {
    try {
      const {
        data: { data }
      }: AxiosResponse<IApi<IMe>> = await axios.post(meApi.join, formData);
      setUser(data);
      router.replace(ADMIN_PATH.SCREENS);
    } catch (err) {
      throw err;
    }
  }

  async function socialLogin(formData: {
    type: 'Kakao' | 'Apple';
    accessToken: string;
    asPath?: string;
  }) {
    try {
      const {
        data: { data }
      }: AxiosResponse<IApi<IMe>> = await axios.post(authApi.socialLogin, formData);
      setUser(data);
      router.replace(formData.asPath ? decodeURIComponent(formData.asPath) : ADMIN_PATH.SCREENS);
    } catch (err) {
      throw err;
    }
  }

  async function sendEmailCode(email: string) {
    try {
      await axios.post(authApi.postEmailCode, {
        email
      });
    } catch (err) {
      throw err;
    }
  }

  async function sendCode(email: string, code: string) {
    try {
      const url = `${authApi.getSendCode}?email=${email}&code=${code}`;
      const {
        data: {
          data: { authToken }
        }
      }: AxiosResponse<IApi<{ authToken: string }>> = await axios.get(url);
      setPasswordToken(authToken);
    } catch (err) {
      throw err;
    }
  }

  async function updatePassword(passwordToken: string, password: string) {
    try {
      await axios.patch(authApi.updatePassword, {
        password,
        authToken: passwordToken
      });
    } catch (err) {
      throw err;
    }
  }

  async function logout() {
    try {
      await axios.post(authApi.logout);
      setUser(null);
      setUpload({
        list: [],
        completedList: [],
        tempList: [],
        fileList: [],
        folderId: undefined,
        uploadProgress: false,
        uploadModalOpen: false
      });
    } catch (err) {
      throw err;
    }
  }

  return {
    me,
    socialJoin,
    login,
    signup,
    socialLogin,
    sendEmailCode,
    sendCode,
    updatePassword,
    logout
  };
}

export { useAuthActions };
