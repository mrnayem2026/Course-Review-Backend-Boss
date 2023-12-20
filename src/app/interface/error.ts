export type TErrorResponse = {
  message: string;
  errorMessage: string;
  errorDetails: TErrorIssue[];
  statusCode: number;
};

export type TErrorIssue = {
  path: string | number;
  message: string;
};
