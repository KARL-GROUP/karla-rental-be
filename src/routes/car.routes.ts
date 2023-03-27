import express from "express";
import { createCarHandler, deleteCarHandler, getCarsHandler } from "../controllers/car.controller";
import { validate } from "../middleware/validate";
import { createCarSchema, getCarsSchema } from "../schemas/car.schema";
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';

const router = express.Router();

router.get("/",validate(getCarsSchema), getCarsHandler);

// router.use(deserializeUser, requireUser);

router.post("/", validate(createCarSchema), createCarHandler);


router.delete('/:id', deleteCarHandler);

export default router;