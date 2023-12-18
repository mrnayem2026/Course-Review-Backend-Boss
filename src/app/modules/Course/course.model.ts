import { Schema, model } from 'mongoose';
import { TCourse, TCourseDetails, TTag } from './course.interface';

const courseTagsSchema = new Schema<TTag>(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Tag name is required'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  },
);

const courseDetailsSchema = new Schema<TCourseDetails>({
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
  },
  description: {
    type: String,
  },
});

// Helper function to check if a string is a valid date
const isValidDate = (dateString: string): boolean => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(dateString);
};

const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    unique: true,
    trim: true,
    required: [true, 'Title is required.'],
  },
  instructor: {
    type: String,
    required: [true, 'Instructor is required.'],
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category ID is required.'],
  },
  price: {
    type: Number,
  },
  tags: [courseTagsSchema],
  startDate: {
    type: String,
    validate: {
      validator: isValidDate,
      message: (props) => `${props.value} is not a valid date string.`,
    },
    required: [true, 'Start Date is required.'],
  },
  endDate: {
    type: String,
    validate: {
      validator: isValidDate,
      message: (props) => `${props.value} is not a valid date string.`,
    },
    required: [true, 'End Date is required.'],
  },
  language: {
    type: String,
    trim: true,
    required: [true, 'Language is required.'],
  },
  durationInWeeks: {
    type: Number,
  },
  provider: {
    type: String,
    trim: true,
    required: [true, 'Provider is required.'],
  },
  details: courseDetailsSchema,
});

export const Course = model<TCourse>('Course', courseSchema);
