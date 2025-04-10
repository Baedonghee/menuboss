import { IApi } from '@repo/ui/types';
import { AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import qs from 'qs';

import screenApi from '@/api/server/screen.json';
import axios from '@/utils/server/axios';
import errorMiddleWare from '@/utils/server/error-middle-ware';
import headerMiddleWare from '@/utils/server/header';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method, query } = req;
    switch (method) {
      case 'GET': {
        const url = `${screenApi.screens}?${qs.stringify(query)}`;
        const { data }: AxiosResponse<IApi> = await axios.get(url);
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
