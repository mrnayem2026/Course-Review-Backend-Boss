/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { TCourse } from './course.interface';
import { Course } from './course.model';
import { Review } from '../Review/review.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { TQuery } from '../../QueryFunction/TQuery';
import getAllQuery from '../../QueryFunction/getAllQuery';

const createCourseIntoDB = async (payload: TCourse) => {
  const startDate = payload.startDate;
  const endDate = payload.endDate;

  /**
   * Calculate the duration in weeks between two dates and ensure the end month is greater than the start month.
   * COURESE_REVIEW
   * @param startDate - The start date in the format 'YYYY-MM-DD'.
   * @param endDate - The end date in the format 'YYYY-MM-DD'.
   * @returns The duration in weeks between the start and end dates, rounded up to the nearest integer.
   * @throws Error if the month of the end date is not greater than the month of the start date.
   */

  const durationInWeekss = (startDate: string, endDate: string): number => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const isEndDateMonthGreater: boolean =start <= end  ; // strat: 2023-03-15 <=  end: 2023-03-16

    if (!isEndDateMonthGreater) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Your EndDate is less then StartDate month. ☹️',
      );
    }

    const millisecondsInWeek: number = 7 * 24 * 60 * 60 * 1000;
    const durationInWeeks: number = Math.ceil(
      (end.getTime() - start.getTime()) / millisecondsInWeek,
    );

    return durationInWeeks;
  };

  payload.durationInWeeks = durationInWeekss(startDate, endDate);

  const result = await Course.create(payload);
  return result;
};

const getAllCoursesFromDB = async (query: TQuery) => {
  const result = await getAllQuery(Course.find(), query);
  return result;
};

const updateCoursesIntoDB = async (courseId: string, payload: TCourse) => {
  const id = courseId;
  const { details, tags, ...data } = payload;

  const modifiedUpdateData: Record<string, unknown> = { ...data };

  const updateBasicInfo = await Course.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!updateBasicInfo) {
    throw new AppError(httpStatus.BAD_REQUEST, '😟 Unable to perform update for basic info');
  }

  // Handle non-primitive data update

  if (details && Object.keys(details)) {
    for (const [key, value] of Object.entries(details)) {
      modifiedUpdateData[`details.${key}`] = value;
    }
  }

  const updateDetailsInfo = await Course.findByIdAndUpdate(
    id,
    modifiedUpdateData,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!updateDetailsInfo) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      '😟 Unable to perform update for details info',
    );
  }

  // Check if there are tags provided and if the array has elements. then delete some unnecesary tag. than insert some needed tag
  if (tags && tags.length > 0) {
    const deletedTags = tags
      .filter((tag) => tag.name && tag.isDeleted)
      .map((tagName) => tagName.name);

    const insertTags = tags.filter((tag) => tag.name && !tag.isDeleted);

    const updateAndDeleteTagInfo = await Course.findByIdAndUpdate(
      id,
      {
        $pull: { tags: { name: { $in: deletedTags } } },
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updateAndDeleteTagInfo) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        '😟 Unable to perform update: Tag information is missing or invalid.!',
      );
    }

    const updateAndInsertTagInfo = await Course.findByIdAndUpdate(
      id,
      {
        $addToSet: { tags: { $each: insertTags } },
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updateAndInsertTagInfo) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        '😟 Unable to perform update: Tag information is missing or invalid.!',
      );
    }
  }

  const result = await Course.findById(id);

  return result;
};

const getCoursesReviewsFromDB = async (courseId: string) => {
  const result = await Course.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(courseId),
      },
    },
    {
      $lookup: {
        from: 'reviews',
        localField: '_id',
        foreignField: 'courseId',
        as: 'reviews',
      },
    },
  ]);

  return result;
};

const getBestCoursesByReviewsFromDB = async () => {
  const result = await Review.aggregate([
    {
      $group: {
        _id: '$courseId',
        reviewCount: { $sum: 1 },
        averageRating: { $avg: '$rating' },
      },
    },
    {
      $project: {
        _id: 0,
        courseId: '$_id',
        averageRating: { $round: ['$averageRating', 1] },
        reviewCount: '$reviewCount',
      },
    },
    {
      $lookup: {
        from: 'courses',
        localField: 'courseId',
        foreignField: '_id',
        as: 'course',
      },
    },
    {
      $project: {
        courseId: 0,
      },
    },
    {
      $unwind: '$course',
    },
    {
      $sort: { averageRating: -1 },
    },
    {
      $limit: 1,
    },
  ]);

  return result;
};

export const CourseService = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  updateCoursesIntoDB,
  getCoursesReviewsFromDB,
  getBestCoursesByReviewsFromDB,
};
