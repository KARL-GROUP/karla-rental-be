import { any, array, number, object, string, TypeOf, z } from "zod";
import { TransmissionTypes } from "../entities/car.entity";
import { Category } from "../entities/category.entity";
import { categoryRepository } from "../services/category.service";

const ACCEPTED_IMAGE_TYPES = [
  "Image/jpeg",
  "Image/jpg",
  "Image/png",
  "Image/webp",
];

export const imageFileSchema = z.custom<FileList>().superRefine((f, ctx) => {
  // First, add an issue if the mime type is wrong.
  console.log(f);
  if (!ACCEPTED_IMAGE_TYPES.includes(f[0].type)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `File must be one of [${ACCEPTED_IMAGE_TYPES.join(
        ", "
      )}] but was ${f[0].type}`
    });
  }
}); 

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
    seats: string(),
    categories: any().array().optional(),
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
    seats: string().optional().nullable(),
    category: string().array().nullable().optional(),
    carImages: any().nullable().optional(),
  }),
});

export type CreateCarInput = TypeOf<typeof createCarDBSchema>["body"];
