import { Router } from "express";
// import validateRequest from "../../middelwares/validateRequest";
// import { CourseValidation } from "./course.validation";
// validateRequest(CourseValidation.CreateCourseSchemaValidation)
import { CourseControllers } from "./course.controllers";

const router = Router();

router.post('/',CourseControllers.createCourseIntoDB)

export const CourseRouter = router;