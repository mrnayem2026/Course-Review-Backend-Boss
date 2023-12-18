import { z } from "zod";

const CreateReviewValidation = z.object({
    body:z.object({
        courseId: z.string().refine((data)=>!!data, {message: 'Course Id is required!'}),
        rating:z.number().min(1).max(5).optional(),
        review:z.string().trim().optional()
    })
})

export const ReviewValidation = {
    CreateReviewValidation
}