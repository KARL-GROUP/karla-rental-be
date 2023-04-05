import { type } from "os";
import { object, TypeOf, z } from "zod";
import { IdType, orderStatus } from "../entities/order.entity";
import { Car } from "../entities/car.entity";

const checkValidDates = (startDate: string | Date, endDate: string | Date) => {
  return (
    z.date().safeParse(startDate) < z.date().safeParse(new Date(Date.now())) ||
    startDate < endDate
  );
};

export const newOrderSchema = object({
  body: object({
    car: z.string({ required_error: "Ordered car id must be provided!" }),
    fullName: z.string({
      required_error: "Customer full name must be provided!",
    }),
    customerId: object({
      type: z.nativeEnum(IdType),
      value: z.string({ required_error: "Customer Id not provided" }),
    }),
    email: z
      .string({ required_error: "Email must be provided!" })
      .email("Invalid email address"),
    phone: z.string({ required_error: "Phone number must be provided!" }),
    description: z.string().nullable().optional(),
    startDate: z
      .date({ required_error: "start date must be provided" })
      .or(
        z.string({ required_error: "start date must be provided" }).datetime()
      ),
    endDate: z
      .date({ required_error: "end date must be provided" })
      .or(z.string({ required_error: "end date must be provided" }).datetime()),
  }).refine(
    (data) => checkValidDates(data.startDate, data.endDate),
    "Invalid dates were provided!"
  ),
});

export const newOrderDBSchema = object({
  body: object({
    car: z.instanceof(Car),
    fullName: z.string({
      required_error: "Customer full name must be provided!",
    }),
    customerId: object({
      type: z.nativeEnum(IdType),
      value: z.string({ required_error: "Customer Id not provided" }),
    }),
    email: z
      .string({ required_error: "Email must be provided!" })
      .email("Invalid email address"),
    phone: z.string({ required_error: "Phone number must be provided!" }),
    description: z.string().nullable().optional(),
    startDate: z
      .date({ required_error: "start date must be provided" })
      .or(
        z.string({ required_error: "start date must be provided" }).datetime()
      ),
    endDate: z
      .date({ required_error: "end date must be provided" })
      .or(z.string({ required_error: "end date must be provided" }).datetime()),
  }).refine(
    (data) => checkValidDates(data.startDate, data.endDate),
    "Invalid dates were provided!"
  ),
});

export const getOrdersSchema = object({
  query: object({
    fullName: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    customerId: object({
      type: z.nativeEnum(IdType).optional(),
      value: z.string().optional(),
    }).optional(),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
  }),
});

export const updateOrderSchema = object({
  params: object({
    orderId: z.string({
      required_error: "Order id must be provided in params!",
    }),
  }),
  body: object({
    status: z.nativeEnum(orderStatus).optional(),
    car: z.string().optional(),
    fullName: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    customerId: object({
      type: z.nativeEnum(IdType),
      value: z.string(),
    }).optional(),
    startDate: z.date().or(z.string().datetime()).optional(),
    endDate: z.date().or(z.string().datetime()).optional(),
  }),
});

export const deleteOrderSchema = object({
  params: object({
    orderId: z.string({
      required_error: "Order id must be provided in params!",
    }),
  }),
});

export type newOrderInput = TypeOf<typeof newOrderDBSchema>["body"];
