import express from 'express';
import { createCategoryHandler, deleteCategoryHandler, getCategoriesHandler } from '../controllers/category.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { validate } from '../middleware/validate';
import { createCategorySchema } from '../schemas/category.schema';

const router = express.Router();

router.post('/create', validate(createCategorySchema), createCategoryHandler);

router.get('/', getCategoriesHandler);

router.delete('/delete/:name', deleteCategoryHandler);

export default router;

