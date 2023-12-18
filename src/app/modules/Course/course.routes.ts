import { Router } from 'express';
// import validateRequest from "../../middelwares/validateRequest";
// import { CourseValidation } from "./course.validation";
// validateRequest(CourseValidation.CreateCourseSchemaValidation)
import { CourseControllers } from './course.controllers';

const router = Router();
// TODO: Zod validation korte hobe
router.post('/', CourseControllers.createCourseIntoDB);
router.get('/', CourseControllers.getAllCoursesFromDB);
router.put('/:courseId', CourseControllers.updateCoursesIntoDB);

export const CourseRouter = router;
