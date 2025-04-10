import { OAuth2Client } from 'google-auth-library';
import { type NextApiRequest, type NextApiResponse } from 'next';
import getConfig from 'next/config';

import errorMiddleWare from '@/utils/server/error-middle-ware';

const { publicRuntimeConfig } = getConfig();
const { GOOGLE_LOGIN_API_KEY, GOOGLE_LOGIN_SECRET_KEY } = publicRuntimeConfig;

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method } = req;
    if (method === 'POST') {
      const oAuth2Client = new OAuth2Client(
        GOOGLE_LOGIN_API_KEY,
        GOOGLE_LOGIN_SECRET_KEY,
        'postmessage'
      );
      const { tokens } = await oAuth2Client.getToken(req.body.code);
      res.status(200).json({
        status: 200,
        message: 'success',
        data: tokens
      });
    }
  } catch (err) {
    throw err;
  }
}
export default errorMiddleWare(handler);
