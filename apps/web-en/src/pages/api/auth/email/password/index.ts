import { IApi } from '@repo/ui/types';
import { AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import qs from 'qs';

import authApi from '@/api/server/auth.json';
import axios from '@/utils/server/axios';
import errorMiddleWare from '@/utils/server/error-middle-ware';
import headerMiddleWare from '@/utils/server/header';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method, query } = req;
    switch (method) {
      case 'GET': {
        const { data }: AxiosResponse<IApi> = await axios.get(
          `${authApi.getSendCode}?${qs.stringify(query)}`
        );
        if (data.status === 200) {
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
