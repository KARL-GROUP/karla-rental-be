import express from 'express';
import { createCategoryHandler, deleteCategoryHandler, getCategoriesHandler } from '../controllers/category.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { validate } from '../middleware/validate';
import { createCategorySchema } from '../schemas/category.schema';

const router = express.Router();

router.get('/', getCategoriesHandler);

router.use(deserializeUser, requireUser);

router.post('/create', validate(createCategorySchema), createCategoryHandler);

router.delete('/delete/:id', deleteCategoryHandler);

export default router;

