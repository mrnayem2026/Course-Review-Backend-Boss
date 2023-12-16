import { Request, Response } from "express";
import catchAsyncFunction from "../../utils/catchAsyncFunction";
import { CourseService } from "./course.services";
import sendResponse from "../../utils/sendResponse";

const createCourseIntoDB = catchAsyncFunction(async (req:Request,res:Response)=>{
    const payload = req.body;
    const result = await CourseService.createCourseIntoDB(payload);

    sendResponse(res,{
        success:true,
        statusCode: 201,
        message:"Course created successfully",
        data:result
    })
})

export const CourseControllers = {
    createCourseIntoDB
}