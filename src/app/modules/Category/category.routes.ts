import { Router } from "express";
import validateRequest from "../../middelwares/validateRequest";
import { CategoryValidation } from "./category.validation";
import { CategoryControllers } from "./category.controllers";

const router = Router();

router.post('/',validateRequest(CategoryValidation.createCategoryValidationSchema),CategoryControllers.createCategoryIntoDB);

export const CategoryRouter = router;