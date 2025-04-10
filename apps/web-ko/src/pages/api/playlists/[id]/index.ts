import { IApi } from '@repo/ui/types';
import { AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import playlistsApi from '@/api/server/playlists.json';
import axios from '@/utils/server/axios';
import errorMiddleWare from '@/utils/server/error-middle-ware';
import headerMiddleWare from '@/utils/server/header';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method, query, body } = req;
    switch (method) {
      case 'GET': {
        const { data }: AxiosResponse<IApi> = await axios.get(
          playlistsApi.getPlaylist.replace(':id', query.id as string)
        );
        if (data.status === 200) {
          res.json(data);
          return;
        }
        throw data;
      }
      case 'PATCH': {
        const { data }: AxiosResponse<IApi> = await axios.patch(
          playlistsApi.updatePlaylist.replace(':id', query.id as string),
          body
        );
        if (data.status === 200) {
          res.json(data);
          return;
        }
        throw data;
      }
      case 'DELETE': {
        const { data }: AxiosResponse<IApi> = await axios.delete(
          playlistsApi.deletePlaylist.replace(':id', query.id as string)
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
