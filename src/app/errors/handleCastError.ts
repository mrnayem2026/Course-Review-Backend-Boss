import mongoose from 'mongoose';
import { TErrorResponse } from '../interface/error';

const handleCastError = (err: mongoose.Error.CastError): TErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);

  const invalidId = match && match[1];
  const errorMessage = ` ${invalidId} is not a valid ID!`;

  const errorSources = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  return {
    statusCode: 400,
    errorMessage: errorMessage,
    errorDetails: errorSources,
    message: 'Invalid ID',
  };
};

export default handleCastError;
