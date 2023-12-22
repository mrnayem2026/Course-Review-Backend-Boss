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

    const page = req.query.page;
    const limit = req.query.limit;
    const sortBy = req.query.sortBy;
    const sortOrder = req.query.sortOrder;
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;
    const tags = req.query.tags;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    const language = req.query.language;
    const provider = req.query.provider;
    const durationInWeeks = req.query.durationInWeeks;
    const level = req.query.level;

    let total = 0;
    if (
      page ||
      limit ||
      sortBy ||
      sortOrder ||
      minPrice ||
      maxPrice ||
      tags ||
      startDate ||
      endDate ||
      language ||
      provider ||
      durationInWeeks ||
      level
    ) {
      total = Object.values(result).length;
    }

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Courses retrieved successfully',
      meta: {
        page: Number(page) || 0,
        limit: Number(limit) || 0,
        total: total || 0,
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
