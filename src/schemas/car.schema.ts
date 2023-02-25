import { any, array, number, object, string, TypeOf, z } from 'zod';
import { TransmissionTypes } from '../entities/car.entity';
import { categoryRepository } from '../services/category.service';

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const createCarSchema = object({
  body: object({
    name: string({
      required_error: 'Name is required',
    }),
    description: string().nullable().optional(),
    plate: string({
      required_error: "Car's plate number is required" ,
    }),
    transmission: z.nativeEnum(TransmissionTypes),
    price: string(),
    seats: number().positive(),
    category: string().array().nullable().optional(),
    carImages: any().array().nonempty({
      message: "There has to be at least one image",
    }).refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
  }),
});