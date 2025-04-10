import { IApi } from '@repo/ui/types';
import { AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import qs from 'qs';

import scheduleApi from '@/api/server/schedule.json';
import axios from '@/utils/server/axios';
import errorMiddleWare from '@/utils/server/error-middle-ware';
import headerMiddleWare from '@/utils/server/header';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method, query, body } = req;
    switch (method) {
      case 'GET': {
        const url = `${scheduleApi.schedules}?${qs.stringify(query)}`;
        const { data }: AxiosResponse<IApi> = await axios.get(url);
        if (data.status === 200) {
          res.json(data);
          return;
        }
        throw data;
      }
      case 'POST': {
        const { data }: AxiosResponse<IApi> = await axios.post(scheduleApi.addSchedule, body);
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
