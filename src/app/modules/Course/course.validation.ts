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
export const courseSchemaValidation = z.object({
  title: z
    .string()
    .trim()
    .min(1)
    .max(255)
    .refine((data) => !!data, { message: 'Title is required.' }),
  instructor: z
    .string()
    .refine((data) => !!data, { message: 'Instructor is required.' }),
  categoryId: z
    .string()
    .refine((data) => !!data, { message: 'Category ID is required.' }),
  price: z.number().optional(),
  tags: tagSchema,
  startDate: z.string().refine((data) => isValidDate(data), {
    message: 'Start Date is required. and must be  "YYYY-MM-DD" formate.',
  }),
  endDate: z
    .string()
    .refine((data) => isValidDate(data), { message: 'End Date is required. and must be  "YYYY-MM-DD" formate.' }),
  language: z
    .string()
    .trim()
    .refine((data) => !!data, { message: 'Language is required.' }),
  provider: z
    .string()
    .trim()
    .refine((data) => !!data, { message: 'Provider is required.' }),
  details: courseDetailsSchema,
});

// Helper function to check if a string is a valid date
function isValidDate(dateString: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(dateString);
}
