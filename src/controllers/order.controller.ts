import { Request, Response, NextFunction } from "express";
import { LessThanOrEqual, Like, MoreThanOrEqual } from "typeorm";
import { findCarById } from "../services/car.service";
import {
  createOrder,
  findOrderById,
  findOrders,
  updateOrder,
} from "../services/order.service";
import AppError from "../utils/appError";

export const createOrderHnadler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const chosenCar = await findCarById(req.body.car);
    if (!chosenCar) {
      return next(
        new AppError(404, "Requested car does not exist in the database!")
      );
    }

    const order = await createOrder({
      car: chosenCar,
      ...req.body,
    });

    res.status(201).json({
      status: "success",
      data: {
        order,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getOrdersHnadler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    var options: any = {};
    if (Object.keys(req.query).length) {
      options = req.query;

      Object.keys(options).forEach(async (key, index) => {
        if (key in ["fullName", "email", "phone"])
          options[key] = Like(`%${options[key]}%`);
        if (key in ["startDate"]) options[key] = MoreThanOrEqual(options[key]);
        if (key in ["endDate"]) options[key] = LessThanOrEqual(options[key]);
        if (key in ["customerId"])
          Object.keys(options[key]).forEach(async (idKey, index) => {
            options[key][idKey] = Like(`%${options[key][idKey]}%`);
          });
      });
    }

    const orders = await findOrders(options);

    res.status(200).json({
      staus: "success",
      data: {
        orders,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const updateOrderHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    var options: any = req.body;
    if ("car" in options) {
      const chosenCar = await findCarById(options.car);
      if (!chosenCar) {
        return next(
          new AppError(404, "Requested car does not exist in the database!")
        );
      }

      options.car = chosenCar;
    }

    const newOrder = updateOrder(req.params.orderId, options);

    res.status(200).json({
      staus: "success",
      data: {
        newOrder,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const deleteOrderHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await findOrderById(req.params.orderId);

    if (!order) {
      return next(new AppError(404, "Order with that :id not found"));
    }

    await order.remove();
    res.status(204).json({
      status: "success",
      message: `Car deleted`,
    });
  } catch (err) {
    next(err);
  }
};
