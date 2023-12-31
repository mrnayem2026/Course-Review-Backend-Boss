import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const apiNotFound = (req: Request, res: Response, next: NextFunction) => {
  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: `4️⃣0️⃣4️⃣ THIS ${req.originalUrl} API Not Found !! 😔 `,
    error: req.originalUrl,
  });
};

export default apiNotFound;
