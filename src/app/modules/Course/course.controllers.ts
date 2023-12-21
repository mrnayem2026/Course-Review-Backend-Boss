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

const updateCoursesIntoDB = catchAsyncFunction(
  async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const payload = req.body;

    const result = await CourseService.updateCoursesIntoDB(courseId, payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Course updated successfully',
      data: result,
    });
  },
);
const getCoursesReviewsFromDB = catchAsyncFunction(
  async (req: Request, res: Response) => {
    const { courseId } = req.params;

    const result = await CourseService.getCoursesReviewsFromDB(courseId);
    const course = result.length > 0 ? result[0] : null;
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Course and Reviews retrieved successfully',
      data: {
        course: course,
      },
    });
  },
);

const getBestCoursesByReviewsFromDB = catchAsyncFunction(
  async (req: Request, res: Response) => {
    const result = await CourseService.getBestCoursesByReviewsFromDB();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Best course retrieved successfully',
      data: result,
    });
  },
);
export const CourseControllers = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  updateCoursesIntoDB,
  getCoursesReviewsFromDB,
  getBestCoursesByReviewsFromDB,
};
