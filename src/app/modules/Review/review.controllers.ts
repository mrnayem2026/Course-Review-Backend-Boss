import { Request, Response } from 'express';
import catchAsyncFunction from '../../utils/catchAsyncFunction';
import { ReviewServices } from './review.services';
import sendResponse from '../../utils/sendResponse';

const createReviewIntoDB = catchAsyncFunction(
  async (req: Request, res: Response) => {
    const payload = req.body;

    const result = await ReviewServices.createReviewIntoDB(payload);

    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: 'Review created successfully',
      data: result,
    });
  },
);

export const ReviewControllers = {
  createReviewIntoDB,
};
