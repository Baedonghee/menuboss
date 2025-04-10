import { IApi } from '@repo/ui/types';
import { AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import businessApi from '@/api/server/business.json';
import axios from '@/utils/server/axios';
import errorMiddleWare from '@/utils/server/error-middle-ware';
import headerMiddleWare from '@/utils/server/header';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method, body } = req;
    switch (method) {
      case 'GET': {
        const url = businessApi.getRoles;
        const { data }: AxiosResponse<IApi> = await axios.get(url);
        if (data.status === 200) {
          res.json(data);
          return;
        }
        throw data;
      }
      case 'POST': {
        const url = businessApi.createRoles;
        const { data }: AxiosResponse<IApi> = await axios.post(url, body);
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
