import { any, array, boolean, number, object, string, TypeOf, z } from "zod";
import { TransmissionTypes } from "../entities/car.entity";
import { Tag } from "../entities/tag.entity";
import { tagRepository } from "../services/tag.service";
import { toNumber } from "../utils/zod";

const ACCEPTED_IMAGE_TYPES = [
  "Image/jpeg",
  "Image/jpg",
  "Image/png",
  "Image/webp",
];

export const imageFileSchema = z.custom<FileList>().superRefine((f, ctx) => {
  // console.log(f);
  if (!ACCEPTED_IMAGE_TYPES.includes(f[0].type)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `File must be one of [${ACCEPTED_IMAGE_TYPES.join(
        ", "
      )}] but was ${f[0].type}`,
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
    brand: string({
      required_error: "Brand mame is required",
    }),
    model: string({
      required_error: "Model mame is required",
    }),
    year: number({
      required_error: "Year is required",
    }),
    description: string().nullable().optional(),
    type: string({
      required_error: "Car type is required",
    }),
    transmission: z.nativeEnum(TransmissionTypes),
    seats: number({
      required_error: "Number of seats is required",
    }),
    price: number({
      required_error: "Price is required",
    }),
    display: boolean().optional().default(false),
    tags: any().array().optional(),
    coverImage: imageSchema,
    carImages: imageSchema.array(),
  }),
});

export const createCarSchema = object({
  body: object({
    carImages: any().nullable().optional(),
    brand: string({
      required_error: "Brand mame is required",
    }),
    model: string({
      required_error: "Model mame is required",
    }),
    year: z.preprocess(
      toNumber,
      z.number({
        required_error: "Model year is required",
      })
    ),
    description: string().nullable().optional(),
    type: string({
      required_error: "Car type is required",
    }),
    transmission: z.nativeEnum(TransmissionTypes),
    seats: z.preprocess(
      toNumber,
      z.number({
        required_error: "Number of seats is required",
      })
    ),
    price: z.preprocess(
      toNumber,
      z.number({
        required_error: "Price is required",
      })
    ),
    display: boolean().optional().nullable(),
    tags: string().array().nullable().optional(),
  }),
});

export const getCarsSchema = object({
  query: object({
    brand: string().optional(),
    model: string().optional(),
    year: z.preprocess(toNumber, z.number().optional()).optional(),
    type: string().optional(),
    transmission: z.nativeEnum(TransmissionTypes).optional(),
    seats: z.preprocess(toNumber, z.number().optional()).optional(),
    minPrice: z.preprocess(toNumber, z.number().optional()).optional(),
    maxPrice: z.preprocess(toNumber, z.number().optional()).optional(),
    tags: string().array().optional(),
    display: boolean().optional(),
  })
    .optional()
    .nullable(),
});

export const deleteCarSchema = object({
  params: object({
    id: z.string({
      required_error: "Car id must be provided in params!",
    }),
  }),
});


export type CreateCarInput = TypeOf<typeof createCarDBSchema>["body"];
