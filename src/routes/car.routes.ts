import express from "express";
import {
  createCarHandler,
  deleteCarHandler,
  getCarsHandler,
  getCarHandler,
} from "../controllers/car.controller";
import { validate } from "../middleware/validate";
import {
  createCarSchema,
  deleteCarSchema,
  getCarsSchema,
} from "../schemas/car.schema";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import upload from "../utils/multer";

const router = express.Router();

router.get("/", validate(getCarsSchema), getCarsHandler);

router.use(deserializeUser, requireUser);

router.get("/:id", validate(deleteCarSchema), getCarHandler);

router.delete("/:id", validate(deleteCarSchema), deleteCarHandler);

router.use(upload.any());

router.post("/", validate(createCarSchema), createCarHandler);

export default router;
