import { FilterQuery, Query, Document } from 'mongoose';

type ModelType<T> = Query<T[], T>;

function BuildQuery<T extends Document>(
  modelQuery: ModelType<T>,
  query: Record<string, unknown>,
  searchableFields: string[],
): ModelType<T> {
  const searchTerm = query?.searchTerm;
  if (searchTerm) {
    modelQuery = modelQuery.find({
      $or: searchableFields.map(
        (field) =>
          ({
            [field]: { $regex: searchTerm, $options: 'i' },
          }) as FilterQuery<T>,
      ),
    });
  }

  const queryObj = { ...query }; // copy

  // Filtering
  const excludeFields = [
    'searchTerm',
    'sort',
    'limit',
    'page',
    'fields',
    'minPrice',
    'maxPrice',
    'tags',
    'startDate',
    'endDate',
    'language',
    'provider',
    'durationInWeeks',
    'level',
  ];

  excludeFields.forEach((el) => delete queryObj[el]);

  // Handle additional filters
  if (queryObj.minPrice || queryObj.maxPrice) {
    queryObj.price = {
      $gte: queryObj.minPrice || 0,
      $lte: queryObj.maxPrice || Number.MAX_SAFE_INTEGER,
    };
    delete queryObj.minPrice;
    delete queryObj.maxPrice;
  }

  if (queryObj.startDate || queryObj.endDate) {
    queryObj.startDate = {
      $gte: queryObj.startDate || new Date(0),
    };
    queryObj.endDate = {
      $lte: queryObj.endDate || new Date('9999-12-31'),
    };
  }

  // Apply filters
  modelQuery = modelQuery.find(queryObj as FilterQuery<T>);

  // Sorting
  const sort = (query?.sort as string)?.split(',')?.join(' ') || '-createdAt';
  modelQuery = modelQuery.sort(sort as string);

  // Pagination
  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  const skip = (page - 1) * limit;

  modelQuery = modelQuery.skip(skip).limit(limit);

  // Selecting fields
  const fields = (query?.fields as string)?.split(',')?.join(' ') || '-__v';
  modelQuery = modelQuery.select(fields);

  return modelQuery;
}

export default BuildQuery;
