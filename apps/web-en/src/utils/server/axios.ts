import axios from 'axios';
import { produce } from 'immer';
import getConfig from 'next/config';
import { v4 as uuidV4 } from 'uuid';

import packageJson from '../../../package.json';

const { publicRuntimeConfig } = getConfig();
const { SERVER_API } = publicRuntimeConfig;

const instance = axios.create({
  baseURL: SERVER_API,
  timeout: 30000
});

export const setHeader = (headers: any) => {
  (instance.defaults.headers.common as any) = produce(headers, (draft: any) => {
    draft['x-Device-Model'] = headers['user-agent'];
    draft['x-Unique-Id'] = headers['unique-id'] || uuidV4();
    draft['x-App-Version'] = packageJson.version.replace('-SNAPSHOT', '');

    delete draft['accept-encoding'];
    delete draft.connection;
    delete draft.host;
    delete draft['content-length'];
    delete draft.origin;
  });
};

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const setToken = (token: string) => {
  instance.defaults.headers.common = produce(instance.defaults.headers.common, (draft: any) => {
    draft['Authorization'] = `Bearer ${token}`;
  });
};

export default instance;
