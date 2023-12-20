/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import handlerZodError from '../errors/handlerZodError';
import config from '../config';

const globalErrorHandler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong!';
  let errorMessage = err.errorMessage || 'Something went wrong!';

  if (err instanceof ZodError) {
    const simplifiedError = handlerZodError(err);
    message = simplifiedError?.message;
    errorMessage = simplifiedError?.errorMessage;
    statusCode = simplifiedError?.statusCode;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    errorDetails: err,
    stack: config.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

export default globalErrorHandler;
