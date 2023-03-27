import express from "express";
import {
  createTagHandler,
  deleteTagHandler,
  getTagsHandler,
} from "../controllers/tag.controller";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import { validate } from "../middleware/validate";
import { createTagSchema } from "../schemas/tag.schema";

const router = express.Router();

router.get("/", getTagsHandler);

// router.use(deserializeUser, requireUser);

router.post("/", validate(createTagSchema), createTagHandler);

router.delete("/:name", deleteTagHandler);

export default router;
