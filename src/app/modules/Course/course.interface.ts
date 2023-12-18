import { Types } from 'mongoose';

export type TTag = {
  name: string;
  isDeleted: boolean;
};

export type TCourseDetails = {
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
};

export type TCourse = {
  title: string;
  instructor: string;
  categoryId: Types.ObjectId;
  price: number;
  tags: TTag[];
  startDate: string;
  endDate: string;
  language: string;
  provider: string;
  durationInWeeks?: number;
  details: TCourseDetails;
};

export type TDateRange = {
  startDate: string;
  endDate: string;
};
