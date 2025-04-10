import { IApi, IJoinAndLogin, IMe } from '@repo/ui/types';
import { delay } from '@repo/ui/utils';
import { AxiosResponse } from 'axios';
import { setCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';

import meApi from '@/api/server/me.json';
import axios, { setToken } from '@/utils/server/axios';
import errorMiddleWare from '@/utils/server/error-middle-ware';
import headerMiddleWare from '@/utils/server/header';
import { userJwt } from '@/utils/server/jwt';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method } = req;
    switch (method) {
      case 'POST': {
        const url = meApi.socialJoin;
        const { data }: AxiosResponse<IApi<IJoinAndLogin>> = await axios.post(url, req.body);
        if (data.status === 200) {
          await delay(1000);
          const { data: loginData } = data;
          setToken(loginData.accessToken);
          const { data: meResponseData }: AxiosResponse<IApi<IMe>> = await axios.get(meApi.me);
          const { status, data: meData } = meResponseData;
          if (status === 200) {
            try {
              const accessToken = await userJwt(meData.memberId, meData.authorization.accessToken);
              setCookie('auth', accessToken, {
                req,
                res,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                path: '/',
                maxAge: 30 * 24 * 60 * 60
              });
              res.json({
                status: 200,
                data: {
                  ...meData,
                  authorization: {
                    accessToken: btoa(meData.authorization.accessToken)
                  }
                }
              });
              return;
            } catch (err) {
              throw err;
            }
          }
          throw meResponseData;
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
