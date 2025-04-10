import { IApi, IMe } from '@repo/ui/types';
import { AxiosResponse } from 'axios';
import { deleteCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';

import meApi from '@/api/server/me.json';
import axios from '@/utils/server/axios';
import errorMiddleWare from '@/utils/server/error-middle-ware';
import headerMiddleWare from '@/utils/server/header';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method } = req;
    switch (method) {
      case 'GET': {
        if (!axios.defaults.headers.common.authorization) {
          throw {
            status: 400
          };
        }
        const url = meApi.me;
        const { data }: AxiosResponse<IApi<IMe>> = await axios.get(url);
        if (data.status === 200) {
          res.json({
            status: 200,
            data: {
              ...data.data,
              authorization: {
                accessToken: btoa(data.data.authorization.accessToken)
              }
            }
          });
          return;
        }
        deleteCookie('auth', { req, res });
        throw data;
      }
      default:
        throw new Error();
    }
  } catch (error: any) {
    deleteCookie('auth', { req, res });
    throw error;
  }
}

export default headerMiddleWare(errorMiddleWare(handler));
