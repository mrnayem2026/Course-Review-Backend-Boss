import { Request, Response } from 'express';
import catchAsyncFunction from '../../utils/catchAsyncFunction';
import { CategoryService } from './category.services';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createCategoryIntoDB = catchAsyncFunction(
  async (req: Request, res: Response) => {
    const result = await CategoryService.createCategoryIntoDB(req.body);

    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: 'Category created successfully',
      data: result,
    });
  },
);

const getAllCategorysFromDB = catchAsyncFunction(
  async (req: Request, res: Response) => {
    const result = await CategoryService.getAllCategorysFromDB();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Categories retrieved successfully',
      data: result,
    });
  },
);

export const CategoryControllers = {
  createCategoryIntoDB,
  getAllCategorysFromDB,
};
