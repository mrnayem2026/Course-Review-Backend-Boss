import { Router } from 'express';
import validateRequest from '../../middelwares/validateRequest';
import { CourseValidation } from './course.validation';

import { CourseControllers } from './course.controllers';

const router = Router();
router.post(
  '/',
  validateRequest(CourseValidation.CreateCourseSchemaValidation),
  CourseControllers.createCourseIntoDB,
);
router.put(
  '/:courseId',
  validateRequest(CourseValidation.UpdateeCourseSchemaValidation),
  CourseControllers.updateCoursesIntoDB,
);
router.get('/:courseId/reviews', CourseControllers.getCoursesReviewsFromDB);
router.get('/', CourseControllers.getAllCoursesFromDB);
router.get('/best', CourseControllers.getBestCoursesByReviewsFromDB);

export const CourseRouter = router;
