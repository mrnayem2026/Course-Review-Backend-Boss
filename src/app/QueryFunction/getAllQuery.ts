import { Query } from 'mongoose';
import { TQuery } from './TQuery';
import filter from './filter';

const getAllQuery = <T>(modelQuery: Query<T[], T>, query: TQuery) => {
  const filteredQuery = filter(modelQuery, query);

  return filteredQuery;
};

export default getAllQuery;
