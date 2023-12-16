import { Router } from 'express';
import { CategoryRouter } from '../modules/Category/category.routes';


const router = Router();

const moduleRoutes = [
  {
    path: '/categories',
    route: CategoryRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
