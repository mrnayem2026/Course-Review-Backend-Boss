import { Schema, model } from "mongoose";
import { TReview } from "./review.interface";

const reviewSchema = new Schema<TReview>({
    courseId:{
        type:Schema.Types.ObjectId,
        required:[true,'Course id is required'],
        ref:  'Course'
    },
    rating:{
        type:Number,
        min:1,
        max:5,
    },
    review:{
        type:String,
        trim:true
    }
})

export const Review = model<TReview>('Review',reviewSchema)