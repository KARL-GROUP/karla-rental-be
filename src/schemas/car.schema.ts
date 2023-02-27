import { any, array, number, object, string, TypeOf, z } from "zod";
import { TransmissionTypes } from "../entities/car.entity";
import { categoryRepository } from "../services/category.service";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const imageSchema = object({
  public_id: string({
    required_error: "Image public id is required",
  }),
  url: string({
    required_error: "Image URL id is required",
  }),
});

export const createCarDBSchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    description: string().nullable().optional(),
    plate: string({
      required_error: "Car's plate number is required",
    }),
    transmission: z.nativeEnum(TransmissionTypes),
    price: string({
      required_error: "Price is required",
    }),
    seats: number({
      required_error: "Number of seats is missing",
    }).positive(),
    category: string().array().nullable().optional(),
    carImages: imageSchema.array(),
  }),
});

export const createCarSchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    description: string().nullable().optional(),
    plate: string({
      required_error: "Car's plate number is required",
    }),
    transmission: z.nativeEnum(TransmissionTypes),
    price: string({
      required_error: "Price is required",
    }),
    seats: number({
      required_error: "Number of seats is missing",
    }).positive(),
    category: string().array().nullable().optional(),
    carImages: any()
      .array()
      .nonempty({
        message: "There has to be at least one image",
      })
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type),
        "Only .jpg, .jpeg, .png and .webp formats are supported."
      ),
  }),
});

export type CreateCarInput = TypeOf<typeof createCarDBSchema>["body"];
