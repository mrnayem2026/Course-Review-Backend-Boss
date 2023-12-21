/* eslint-disable @typescript-eslint/no-explicit-any */

import { TErrorResponse } from '../interface/error';

const handleDuplicateError = (err: any): TErrorResponse => {
  // Extract value within double quotes using regex
  const match = err.message.match(/"([^"]*)"/);

  // The extracted value will be in the first capturing group
  const extractedMessage = match && match[1];

  const errorSources = [
    {
      path: '',
      message: `${extractedMessage} is already exists`,
    },
  ];

  return {
    statusCode: 400,
    errorMessage: errorSources[0].message,
    errorDetails: err,
    message: 'Duplicate Error',
  };
};

export default handleDuplicateError;
