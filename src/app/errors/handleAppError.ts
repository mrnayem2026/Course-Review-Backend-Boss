import { TErrorIssue, TErrorResponse } from "../interface/error"
import AppError from "./AppError"


const handleAppError = (err: AppError): TErrorResponse => {
  const issues: TErrorIssue[] = [
    {
      path: '',
      message: err.message,
    },
  ]

  return {
    statusCode: 400,
    errorMessage: issues[0].message,
    errorDetails: issues,
    message: 'App Error',
  }
}

export default handleAppError
