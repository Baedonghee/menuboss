import { IApi } from '@repo/ui/types';
import { AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import mediaApi from '@/api/server/media.json';
import axios from '@/utils/server/axios';
import errorMiddleWare from '@/utils/server/error-middle-ware';
import headerMiddleWare from '@/utils/server/header';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method, query, body } = req;
    switch (method) {
      case 'PATCH': {
        const { data }: AxiosResponse<IApi> = await axios.patch(
          mediaApi.updateMediaFolderName.replace(':id', query.id as string),
          body
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
