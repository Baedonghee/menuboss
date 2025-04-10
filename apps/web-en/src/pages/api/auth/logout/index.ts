import { IApi, IMe } from '@repo/ui/types';
import { AxiosResponse } from 'axios';
import { deleteCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';

import authApi from '@/api/server/auth.json';
import axios from '@/utils/server/axios';
import errorMiddleWare from '@/utils/server/error-middle-ware';
import headerMiddleWare from '@/utils/server/header';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method } = req;
    switch (method) {
      case 'POST': {
        const url = authApi.logout;
        const { data }: AxiosResponse<IApi<IMe>> = await axios.post(url);
        if (data.status === 200) {
          deleteCookie('auth', { req, res });
          res.json(data);
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
