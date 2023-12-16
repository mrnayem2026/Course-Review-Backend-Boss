import { NextFunction, Request, RequestHandler, Response } from 'express';

const catchAsyncFunction = (asyncfunction: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(asyncfunction(req, res, next)).catch((err) => next(err));
  };
};

export default catchAsyncFunction;
