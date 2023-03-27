import { NextFunction, Request, Response } from "express";
import { Tag } from "../entities/tag.entity";
import {
  createTag,
  findTag,
  findTagById,
  findTagByName,
  getTags,
} from "../services/tag.service";
import AppError from "../utils/appError";

export const createTagHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tag = await createTag(req.body);

    res.status(201).json({
      status: "success",
      data: {
        tag,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getTagsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allTags = await getTags();

    res.status(200).send(allTags);
  } catch (err: any) {
    next(err);
  }
};

export const deleteTagHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tagname = req.params.name;

    if (!tagname) {
      return next(new AppError(400, "No Tag name provided"));
    }

    const Tag = await findTagByName(tagname);

    if (!Tag) {
      return next(new AppError(404, "Tag with that name not found"));
    }

    await Tag.remove();
    res.status(204).json({
      status: "success",
      message: `Tag deleted`,
    });
  } catch (err: any) {
    console.log(err);
    next(err);
  }
};
