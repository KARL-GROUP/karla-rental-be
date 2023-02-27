import express from "express";
import { createCarHandler, deleteCarHandler } from "../controllers/car.controller";
import { validate } from "../middleware/validate";
import { createCarSchema } from "../schemas/car.schema";

const router = express.Router();

router.post("/create", validate(createCarSchema), createCarHandler);

router.delete('/delete/:name', deleteCarHandler);

export default router;