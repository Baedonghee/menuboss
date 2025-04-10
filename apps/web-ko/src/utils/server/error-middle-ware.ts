import { NextApiRequest, NextApiResponse } from 'next';

const errorMiddleWare = (handler: any) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handler(req, res);
    } catch (error: any) {
      if (error.status) {
        res.status(error.status).json({
          message:
            error.message || '현재 네트워크 오류가 발생했습니다. 잠시 후에 다시 시도해 주세요.'
        });
        return;
      }
      if (error.response) {
        res.status(error.response.status).json({
          message:
            error.response.data.message ||
            '현재 네트워크 오류가 발생했습니다. 잠시 후에 다시 시도해 주세요.'
        });
        return;
      }
      res
        .status(500)
        .json({ message: '현재 네트워크 오류가 발생했습니다. 잠시 후에 다시 시도해 주세요.' });
    }
  };
};

export default errorMiddleWare;
