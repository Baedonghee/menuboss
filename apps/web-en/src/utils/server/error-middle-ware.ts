import { NextApiRequest, NextApiResponse } from 'next';

const errorMiddleWare = (handler: any) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handler(req, res);
    } catch (error: any) {
      if (error.status) {
        res.status(error.status).json({
          message: error.message || "Sorry, we're addressing a system error."
        });
        return;
      }
      if (error.response) {
        res.status(error.response.status).json({
          message: error.response.data.message || "Sorry, we're addressing a system error."
        });
        return;
      }
      res.status(500).json({ message: "Sorry, we're addressing a system error." });
    }
  };
};

export default errorMiddleWare;
