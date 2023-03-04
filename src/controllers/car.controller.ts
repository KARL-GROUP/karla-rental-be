import { Request, Response, NextFunction } from "express";
import { createCar, findCars, findCarById } from "../services/car.service";
import { findCategoryByName } from "../services/category.service";
import AppError from "../utils/appError";
import cloudinary from "../utils/cloudinary";
import * as fs from "fs";
import { Car } from "../entities/car.entity";
import { toNumber } from "../utils/zod";
import {
  LessThanOrEqual,
  Like,
  MoreThanOrEqual,
} from "typeorm";

export const getCarsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    var cars: Car[];
    if (Object.keys(req.query).length) {
      var options: any = req.query;
      Object.keys(options).forEach(async (key, index) => {
        if (key != "categories")
          if (toNumber(options[key])) {
            if (key == "seats") options[key] = MoreThanOrEqual(options[key]);
            else options[key] = LessThanOrEqual(options[key]);
          } else {
            if (key != "transmission") options[key] = Like(`%${options[key]}%`);
          }
      });

      const queryCategories = options.categories;

      delete options.categories;

      cars = await findCars(options);

      if (queryCategories) {
        cars = cars.filter((car) =>
          car.categories.some((category) =>
            queryCategories.includes(category.name)
          )
        );

        console.log(cars);
      }
    } else {
      cars = await findCars({});
    }

    res.status(200).send(cars);
  } catch (err: any) {
    next(err);
  }
};

export const createCarHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description, plate, transmission, price, seats, categories } =
      req.body;

    var uploads: any = [];

    if (req.files) {
      for (const image of req.files as Express.Multer.File[]) {
        const imageUpload = await cloudinary.uploader.upload(image.path, {
          folder: "karl-rental/cars",
        });

        uploads.push({
          public_id: imageUpload.public_id,
          url: imageUpload.secure_url,
        });

        fs.unlinkSync(image.path);
      }
    }

    var assignedCategories = [];
    if (categories) {
      for (var category of categories) {
        const newCategory = await findCategoryByName(category);
        if (newCategory) assignedCategories.push(newCategory);
      }
    }

    const car = await createCar({
      name,
      description,
      plate,
      transmission,
      price,
      seats,
      categories: assignedCategories,
      carImages: uploads,
    });

    res.status(201).json({
      status: "success",
      data: {
        car,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const deleteCarHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const car = await findCarById(req.params.id);

    if (!car) {
      return next(new AppError(404, "Category with that name not found"));
    }

    // const images = JSON.parse(car.carImages);

    if (car.carImages.length != 0) {
      for (var image of car.carImages) {
        // cloudinary.uploader.destroy(image.public_id);
      }
    }

    await car.remove();
    res.status(204).json({
      status: "success",
      message: `Car deleted`,
    });
  } catch (err: any) {
    next(err);
  }
};
