import axios from 'axios';
import { produce } from 'immer';
import getConfig from 'next/config';
import { v4 as uuidV4 } from 'uuid';

import packageJson from '../../../package.json';

const { publicRuntimeConfig } = getConfig();
const { SERVER_API } = publicRuntimeConfig;

const instance = axios.create({
  baseURL: SERVER_API,
  timeout: 30000,
  headers: {
    'Accept-Language': 'ko-KR',
    'x-Unique-Id': uuidV4(),
    'x-App-Version': packageJson.version.replace('-SNAPSHOT', ''),
    'x-client-id': 'MBKW'
  }
});

instance.interceptors.request.use((request) => {
  if (typeof window !== 'undefined') {
    // Next.js에서 호출한 게 아니면(내부 호출) 베이스 URL을 제거한다.
    request.headers['Application-Time-Zone'] = Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
  return request;
});

export const getHeaders = () => {
  return instance.defaults.headers.common;
};

export const setAuthorization = (token: string) => {
  const newHeaders = { ...instance.defaults.headers.common };
  newHeaders.authorization = token;
  instance.defaults.headers.common = newHeaders;
};

export const setUniqueId = (uniqueId: any, headers: any = {}) => {
  (instance.defaults.headers.common as any) = produce(headers, (draft: any) => {
    draft['unique-id'] = uniqueId || uuidV4();
  });
};

export default instance;
