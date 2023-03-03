import express from "express";
import { createCarHandler, deleteCarHandler, getCarsHandler } from "../controllers/car.controller";
import { validate } from "../middleware/validate";
import { createCarSchema, getCarsQuerySchema } from "../schemas/car.schema";
import upload from "../utils/multer";

const router = express.Router();

router.post("/create", validate(createCarSchema), createCarHandler);

router.get("/",validate(getCarsQuerySchema), getCarsHandler);

router.delete('/delete/:name', deleteCarHandler);

export default router;