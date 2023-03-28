import { Request, Response, NextFunction } from "express";
import {
  createCar,
  findCars,
  findCarById,
  selectionModelYears,
  findCarOrders,
} from "../services/car.service";
import { createTag, findTagByName } from "../services/tag.service";
import AppError from "../utils/appError";
import { Car } from "../entities/car.entity";
import { Equal, LessThanOrEqual, Like, MoreThanOrEqual } from "typeorm";

export const getCarHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const car = await findCarOrders(req.params.id);

    if (!car) {
      return next(new AppError(404, "Car with that :id not found"));
    }

    res.status(200).json({
      staus: "success",
      data: car,
    });
  } catch (err) {
    next(err);
  }
};

export const getCarsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    var cars: Car[];
    var years: number[];
    if (Object.keys(req.query).length) {
      var options: any = req.query;

      const querytags = options.tags;

      delete options.tags;

      Object.keys(options).forEach(async (key, index) => {
        if (key in ["brand", "model", "type"]) {
          options[key] = Like(`%${options[key]}%`);
        }
        if (key in ["year", "maxPrice"]) {
          options[key] = LessThanOrEqual(options[key]);
        }
        if (key in ["minPrice", "seats"]) {
          options[key] = MoreThanOrEqual(options[key]);
        }
        if (key in ["display", "transmission"]) {
          options[key] = Equal(options[key]);
        }
      });

      cars = await findCars(options);
      delete options.year;
      delete options.minPrice;
      delete options.maxPrice;
      years = (await selectionModelYears(options)).map(
        (val) => val.year as number
      );

      if (querytags) {
        cars = cars.filter((car) =>
          car.tags.some((tag) => querytags.includes(tag.name))
        );

        console.log(cars);
      }
    } else {
      cars = await findCars({});
      years = (await selectionModelYears({})).map((val) => val.year as number);
    }

    res.status(200).json({
      staus: "success",
      data: {
        cars: cars,
        years: years,
      },
    });
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
    var uploads: any = [];

    if (req.files) {
      uploads = (req.files as Express.Multer.File[]).map(
        (image: Express.Multer.File) => ({
          public_id: image.filename,
          url: image.path,
        })
      );
    }

    var assignedTags = [];
    if (req.body.tags) {
      for (var tag of req.body.tags) {
        const newTag = await findTagByName(tag);
        if (newTag) assignedTags.push(newTag);
        else {
          const createdTag = await createTag({ name: tag });
          assignedTags.push(createdTag);
        }
      }
    }

    const car = await createCar({
      ...req.body,
      tags: assignedTags,
      coverImage: uploads[uploads.length - 1],
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
      return next(new AppError(404, "Car with that :id not found"));
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
