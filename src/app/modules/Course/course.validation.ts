import { z } from 'zod';

// Below  Zod schema for tagSchema
const tagSchema = z.object({
  name: z.string().trim(),
  isDeleted: z.boolean().default(false),
});

// Below Zod schema for courseDetailsSchema
const courseDetailsSchema = z.object({
  level: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  description: z.string().optional(),
});

// Below  Zod schema for the courseSchema
const CreateCourseSchemaValidation = z.object({
  body: z.object({
    title: z
      .string()
      .trim()
      .refine((data) => !!data, { message: 'Title is required.' }),
    instructor: z
      .string()
      .refine((data) => !!data, { message: 'Instructor is required.' }),
    categoryId: z
      .string()
      .refine((data) => !!data, { message: 'Category ID is required.' }),
    price: z.number().optional(),
    tags: z.array(tagSchema),
    startDate: z.string().refine((data) => isValidDate(data), {
      message: 'Start Date is required. and must be  "YYYY-MM-DD" formate.',
    }),
    endDate: z.string().refine((data) => isValidDate(data), {
      message: 'End Date is required. and must be  "YYYY-MM-DD" formate.',
    }),
    language: z
      .string()
      .trim()
      .refine((data) => !!data, { message: 'Language is required.' }),
    provider: z
      .string()
      .trim()
      .refine((data) => !!data, { message: 'Provider is required.' }),
    details: courseDetailsSchema,
  }),
});

// Below Zod schema for the Updatee CourseSchema Validation

// Below  Zod schema for tagSchema
const updateTagSchema = z.object({
  name: z.string().trim().optional(),
  isDeleted: z.boolean().default(false),
});

// Below Zod schema for courseDetailsSchema
const updateCourseDetailsSchema = z.object({
  level: z.enum(['Beginner', 'Intermediate', 'Advanced']).optional(),
  description: z.string().optional(),
});

const UpdateeCourseSchemaValidation = z.object({
  body: z.object({
    title: z
      .string()
      .trim()
      .refine((data) => !!data, { message: 'Title is required.' })
      .optional(),
    instructor: z
      .string()
      .refine((data) => !!data, { message: 'Instructor is required.' })
      .optional(),
    categoryId: z
      .string()
      .refine((data) => !!data, { message: 'Category ID is required.' })
      .optional(),
    price: z.number().optional(),
    tags: z.array(updateTagSchema).optional(),
    startDate: z
      .string()
      .refine((data) => isValidDate(data), {
        message: 'Start Date is required. and must be  "YYYY-MM-DD" formate.',
      })
      .optional(),
    endDate: z
      .string()
      .refine((data) => isValidDate(data), {
        message: 'End Date is required. and must be  "YYYY-MM-DD" formate.',
      })
      .optional(),
    language: z
      .string()
      .trim()
      .refine((data) => !!data, { message: 'Language is required.' })
      .optional(),
    provider: z
      .string()
      .trim()
      .refine((data) => !!data, { message: 'Provider is required.' })
      .optional(),
    details: updateCourseDetailsSchema.optional(),
  }),
});

// Helper function to check if a string is a valid date
function isValidDate(dateString: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(dateString);
}

export const CourseValidation = {
  CreateCourseSchemaValidation,
  UpdateeCourseSchemaValidation,
};
