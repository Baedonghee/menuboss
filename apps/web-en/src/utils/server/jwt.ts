import fs from 'fs';
import jwt from 'jsonwebtoken';
import path from 'path';

const configDirectory = path.resolve(process.cwd(), 'config');
const privateKey = fs.readFileSync(path.join(configDirectory, 'private.key'));

export const userJwt = (memberId: number, token: string): Promise<string> => {
  return new Promise((resolve) => {
    const createJwt = jwt.sign(
      {
        memberId,
        token
      },
      privateKey,
      { algorithm: 'RS256', expiresIn: '30d' }
    );
    resolve(createJwt);
  });
};
