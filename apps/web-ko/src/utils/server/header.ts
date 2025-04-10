import { deleteCookie, getCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';

import { setHeader } from './axios';
import { decodeJwt } from './decode-jwt';

const headerMiddleWare =
  (handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) =>
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const auth = getCookie('auth', { req, res });
    const newHeader = {
      ...req.headers,
      'application-time-zone': 'Asia/Seoul',
      'x-client-id': 'MBKW'
    } as any;
    const { authorization } = newHeader;
    const token = auth || authorization;
    if (token) {
      try {
        const payload = await decodeJwt(token);
        newHeader.authorization = `Bearer ${payload.token}`;
        newHeader['x-User-Id'] = String(payload.memberId);
      } catch (err) {
        deleteCookie('auth', { req, res });
        delete newHeader.authorization;
        delete newHeader['x-User-Id'];
      }
    }

    setHeader(newHeader);
    return handler(req, res);
  };

export default headerMiddleWare;
