import { Query } from 'mongoose';
import { TQuery } from './TQuery';

const filter = <T>(modelQuery: Query<T[], T>, query: TQuery) => {
  const excludedFieldQueryObj = { ...query };
  const excludedFields = [
    'page',
    'limit',
    'sortBy',
    'sortOrder',
    'tags',
    'level',
    'minPrice',
    'maxPrice',
  ];

  excludedFields.forEach((field) => delete excludedFieldQueryObj[field]);

  modelQuery = modelQuery.find(excludedFieldQueryObj);

  if (query.minPrice !== undefined) {
    modelQuery = modelQuery.find({ price: { $gte: query.minPrice } });
  }

  if (query.maxPrice !== undefined) {
    modelQuery = modelQuery.find({ price: { $lte: query.maxPrice } });
  }

  if (query.tags !== undefined) {
    modelQuery = modelQuery.find({
      'tags.name': { $in: query.tags.split('|') },
    });
  }

  if (query.level !== undefined) {
    modelQuery = modelQuery.find({ 'details.level': query.level });
  }
  return modelQuery;
};

export default filter;
