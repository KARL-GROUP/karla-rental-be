import { object, string, TypeOf } from 'zod';

export const createCategorySchema = object({
  body: object({
    name: string({
      required_error: 'Name is required',
    }),
    description: string().nullable().optional(),
  }),
});

export type CreateCategoryInput = TypeOf<typeof createCategorySchema>['body'];