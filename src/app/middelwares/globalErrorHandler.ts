/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';

const globalErrorHandler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong!';
  // console.log({`${err.stack`}});

  res.status(statusCode).json({
    success: false,
    message: message,
    errorMessage: '',
    errorDetails: {
      stringValue: '',
      valueType: '',
      kind: '',
      value: '',
      path: '',
      reason: {},
      name: '',
      message: '',
    },
    stack: err.stack,
  });
};

export default globalErrorHandler;
