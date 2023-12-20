import { ZodError } from 'zod';
import { TErrorIssue, TErrorResponse } from '../interface/error';

const handlerZodError = (err: ZodError): TErrorResponse => {
  const issues: TErrorIssue[] = err.issues.map((issue) => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  const errorMessages = issues
    .map(
      (errorInfo) => `${errorInfo.path} is ${errorInfo.message.toLowerCase()}`,
    )
    .join('. ');

  return {
    statusCode: 400,
    errorMessage: errorMessages,
    errorDetails: issues,
    message: 'Validation Error',
  };
};

export default handlerZodError;
