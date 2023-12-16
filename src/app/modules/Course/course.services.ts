/* eslint-disable @typescript-eslint/no-unused-vars */

import { TCourse } from './course.interface';
import { Course } from './course.model';

const createCourseIntoDB = async (payload: TCourse) => {
  const startDate = payload.startDate;
  const endDate = payload.endDate;

  /**
   * Calculate the duration in weeks between two dates and ensure the end month is greater than the start month.
   *
   * @param startDate - The start date in the format 'YYYY-MM-DD'.
   * @param endDate - The end date in the format 'YYYY-MM-DD'.
   * @returns The duration in weeks between the start and end dates, rounded up to the nearest integer.
   * @throws Error if the month of the end date is not greater than the month of the start date.
   */

  const durationInWeekss = (startDate: string, endDate: string): number => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // const isEndDateMonthGreater  = end.getMonth() > start.getMonth();
    const isEndDateMonthGreater: boolean = end.getMonth() > start.getMonth();
    
    if (!isEndDateMonthGreater) {
      throw new Error('End monthe tik vade deo hoi nai!');
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

export const CourseService = {
  createCourseIntoDB,
};
