import express from "express";
import {
  createCarHandler,
  deleteCarHandler,
  getCarsHandler,
  getCarHandler,
  deleteImageHandler,
  addImageHandler,
  updateCarHandler,
} from "../controllers/car.controller";
import { validate } from "../middleware/validate";
import {
  createCarSchema,
  carImageActionSchema,
  carParamSchema,
  getCarsSchema,
  updateCarSchema,
} from "../schemas/car.schema";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import upload from "../utils/multer";

const router = express.Router();

router.get("/", validate(getCarsSchema), getCarsHandler);

router.get("/:id", validate(carParamSchema), getCarHandler);

router.use(deserializeUser, requireUser);

router.put("/:id", validate(updateCarSchema), updateCarHandler);

router.delete("/:id", validate(carParamSchema), deleteCarHandler);

router.delete("/:id/images", validate(carImageActionSchema), deleteImageHandler);

router.use(upload.any());

router.post("/:id/images", validate(carParamSchema), addImageHandler);

router.post("/", validate(createCarSchema), createCarHandler);

export default router;
