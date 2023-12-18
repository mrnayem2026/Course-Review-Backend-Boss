/* eslint-disable @typescript-eslint/no-explicit-any */

// import BuildQuery from '../../QueryFunction/QueryFunction';
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

    const isEndDateMonthGreater: boolean = end.getMonth() > start.getMonth();

    if (!isEndDateMonthGreater) {
      throw new Error('Your start month is less then end month.');
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

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  let searchTerm = '';

  if (query?.provider) {
    searchTerm = query?.provider as string;
  }
  // TODO:QUERY KORA HOI NAI
  const result = await Course.find({
    $or: [
      'searchTerm',
      'sort',
      'limit',
      'page',
      'fields',
      'minPrice',
      'maxPrice',
      'startDate',
      'endDate',
      'language',
      'provider',
      'level',
    ].map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });

  return result;
};

const updateCoursesIntoDB = async (courseId: string, payload: TCourse) => {
  const id = courseId;
  const { tags, ...data } = payload;
  // const data = payload;

  const updateBasicInfo = await Course.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!updateBasicInfo) {
    throw new Error('Update  hoi nai!');
  }

  if (tags && tags.length > 0) {
    const deletedTags = tags
      .filter((tag) => tag.name && tag.isDeleted)
      .map((del) => del.name);
    console.log({ tags });
    console.log({ deletedTags });

    const updateTagInfo = await Course.findByIdAndUpdate(
      id,
      {
        $pull: { tags: { name: { $in: deletedTags } } },
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updateTagInfo) {
      throw new Error('Update  tag  hoi nai!');
    }
  }

  const result = await Course.findById(id);

  return result;
};

export const CourseService = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  updateCoursesIntoDB,
};
