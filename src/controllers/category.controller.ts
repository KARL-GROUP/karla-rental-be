import { NextFunction, Request, Response } from "express";
import { Category } from "../entities/category.entity";
import { createCategory, deleteCategory, findCategoryByName, getCategories } from "../services/category.service";
import AppError from "../utils/appError";

export const createCategoryHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await createCategory(req.body);

    res.status(201).json({
      status: "success",
      data: {
        category,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getCategoriesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allCategories = await getCategories();

    res.status(200).send(allCategories);
  } catch (err: any) {
    next(err);
  }
};

export const deleteCategoryHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await findCategoryByName(req.params.name);

    if (!category) {
      return next(new AppError(404, 'Category with that name not found'));
    }

    await category.remove();
    res.status(204).json({
      status: 'success',
      message: `Category deleted`,
    });
  } catch (err: any) {
    next(err);
  }
};