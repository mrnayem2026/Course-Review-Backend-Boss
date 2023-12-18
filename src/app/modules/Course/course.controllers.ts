import { Request, Response } from 'express';
import catchAsyncFunction from '../../utils/catchAsyncFunction';
import { CourseService } from './course.services';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createCourseIntoDB = catchAsyncFunction(
  async (req: Request, res: Response) => {
    const payload = req.body;
    const result = await CourseService.createCourseIntoDB(payload);

    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: 'Course created successfully',
      data: result,
    });
  },
);

const getAllCoursesFromDB = catchAsyncFunction(
  async (req: Request, res: Response) => {
    const result = await CourseService.getAllCoursesFromDB(req.query);
      console.log(req.query);
      
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Courses retrieved successfully',
      meta: {
        page: 0,
        limit: 0,
        total: 0,
      },
      data: result,
    });
  },
);

export const CourseControllers = {
  createCourseIntoDB,
  getAllCoursesFromDB,
};
