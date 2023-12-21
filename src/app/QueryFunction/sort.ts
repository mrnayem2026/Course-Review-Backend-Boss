import { Query } from 'mongoose';
import { TQuery } from './TQuery';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';

export const sort = <T>(modelQuery: Query<T[], T>, query: TQuery) => {
  if (query.sortBy && query.sortOrder) {
    const validSortFields = [
      'title',
      'price',
      'startDate',
      'endDate',
      'language',
      'durationInWeeks',
    ];

    if (validSortFields.includes(query.sortBy)) {
      const sortBy = query.sortBy;
      const sortOrder = query.sortOrder;
      const sortStr = `${sortOrder === 'desc' ? '-' : ''}${sortBy}`;
      modelQuery.sort(sortStr);
    } else {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Invalid sortBy field. Allowed fields are: title, price, startDate, endDate, language, durationInWeeks',
      );
    }
  }

  return modelQuery;
};
