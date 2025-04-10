import fs from 'fs';
import jwt, { JwtPayload } from 'jsonwebtoken';
import path from 'path';

const configDirectory = path.resolve(process.cwd(), 'config');
const publicKey = fs.readFileSync(path.join(configDirectory, 'public.key'));

interface IToken {
  memberId: number;
  token: string;
  trainerId?: number;
}

type IPayload = IToken & JwtPayload;

export const decodeJwt = (token: string): Promise<IPayload> => {
  return new Promise((resolve, reject) => {
    const payload = jwt.verify(token, publicKey, {
      algorithms: ['RS256'],
    }) as IPayload;

    if (payload.token) {
      resolve(payload);
    } else {
      reject();
    }
  });
};
