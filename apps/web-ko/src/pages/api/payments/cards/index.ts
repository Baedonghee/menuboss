import { IApi } from '@repo/ui/types';
import { AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import paymentApi from '@/api/server/payment.json';
import axios from '@/utils/server/axios';
import errorMiddleWare from '@/utils/server/error-middle-ware';
import headerMiddleWare from '@/utils/server/header';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method, body } = req;
    switch (method) {
      case 'POST': {
        const { data }: AxiosResponse<IApi> = await axios.post(paymentApi.postPaymentCards, body);
        if (data.status === 200) {
          res.json(data);
          return;
        }
        throw data;
      }
      case 'PUT': {
        const { data }: AxiosResponse<IApi> = await axios.put(paymentApi.updatePaymentCards, body);
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
