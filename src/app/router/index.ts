import { Router } from 'express';
import { CategoryRouter } from '../modules/Category/category.routes';
import { CourseRouter } from '../modules/Course/course.routes';
import { ReviewRouter } from '../modules/Review/review.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/categories',
    route: CategoryRouter,
  },
  {
    path: '/course',
    route: CourseRouter,
  },
  {
    path: '/courses',
    route: CourseRouter,
  },
  {
    path: '/reviews',
    route: ReviewRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
