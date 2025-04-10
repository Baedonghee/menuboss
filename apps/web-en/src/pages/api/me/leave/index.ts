import { IApi } from '@repo/ui/types';
import { AxiosResponse } from 'axios';
import { deleteCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';

import meApi from '@/api/server/me.json';
import axios from '@/utils/server/axios';
import errorMiddleWare from '@/utils/server/error-middle-ware';
import headerMiddleWare from '@/utils/server/header';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method, body } = req;
    switch (method) {
      case 'POST': {
        const { data }: AxiosResponse<IApi> = await axios.post(meApi.deleteMember, body);
        if (data.status === 200) {
          deleteCookie('auth', { req, res });
          res.json(data);
          return;
        }
        throw data;
      }
      default:
        throw new Error();
    }
  } catch (error: any) {
    throw error;
  }
}

export default headerMiddleWare(errorMiddleWare(handler));
