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
    } = req.body;

    var uploads: any = [];

    for (const image of (req.files as Express.Multer.File[])) {
      const imageUpload = await cloudinary.uploader.upload(image.path, {
        folder: "karl-rental/cars",
      });

      // console.log(imageUpload);
      uploads.push({
        public_id: imageUpload.public_id,
        url: imageUpload.secure_url,
      });
    }
    console.log(uploads);
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
