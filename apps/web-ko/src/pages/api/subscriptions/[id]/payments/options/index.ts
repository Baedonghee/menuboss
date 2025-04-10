import { IApi } from '@repo/ui/types';
import { AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import subscriptionApi from '@/api/server/subscription.json';
import axios from '@/utils/server/axios';
import errorMiddleWare from '@/utils/server/error-middle-ware';
import headerMiddleWare from '@/utils/server/header';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method, body, query } = req;
    switch (method) {
      case 'PATCH': {
        const url = subscriptionApi.updateSubscriptionPayments.replace(':id', query.id as string);
        const { data }: AxiosResponse<IApi> = await axios.patch(url, body);
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
    console.log(error);
    throw error;
  }
}

export default headerMiddleWare(errorMiddleWare(handler));
