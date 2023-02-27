import { Request, Response, NextFunction } from "express";
import { createCar, findCars, findCarById } from "../services/car.service";
import AppError from "../utils/appError";
import cloudinary from "../utils/cloudinary";

export const getCarsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cars = await findCars({});

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
    const {
      name,
      description,
      plate,
      transmission,
      price,
      seats,
      category,
      carImages,
    } = req.body;

    var uploads: any = [];
    for (var image of carImages) {
      const upload = await cloudinary.uploader.upload(image, {
        folder: "karl-rental/cars",
      });

      console.log(upload);
      uploads.push({
        public_id: upload.public_id,
        url: upload.secure_url,
      });
    }
    const car = await createCar({
      name,
      description,
      plate,
      transmission,
      price,
      seats,
      category,
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

    if (car.car_images.length != 0) {
      for (var image of car.car_images) {
        cloudinary.uploader.destroy(image.public_id);
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
