import { Query } from 'mongoose';
import { TQuery } from './TQuery';
import filter from './filter';
import { sort } from './sort';
import { paginate } from './paginate';

const getAllQuery = <T>(modelQuery: Query<T[], T>, query: TQuery) => {
  const filteredQuery = filter(modelQuery, query);
  const sortedQuery = sort(filteredQuery, query);
  const paginatedQuery = paginate(sortedQuery, query);
  return paginatedQuery;
};

export default getAllQuery;
