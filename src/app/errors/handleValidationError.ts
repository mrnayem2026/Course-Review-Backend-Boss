import mongoose from 'mongoose';
import { TErrorIssue, TErrorResponse } from '../interface/error';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TErrorResponse => {
  const issues: TErrorIssue[] = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      };
    },
  );

  return {
    statusCode: 400,
    errorMessage: err.message,
    errorDetails: issues,
    message: 'Validation Error',
  };
};

export default handleValidationError;
