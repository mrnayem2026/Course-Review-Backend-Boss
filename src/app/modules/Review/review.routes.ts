import { Router } from 'express';
import validateRequest from '../../middelwares/validateRequest';
import { ReviewValidation } from './review.validation';
import { ReviewControllers } from './review.controllers';

const router = Router();

router.post(
  '/',
  validateRequest(ReviewValidation.CreateReviewValidation),
  ReviewControllers.createReviewIntoDB,
);

export const ReviewRouter = router;
