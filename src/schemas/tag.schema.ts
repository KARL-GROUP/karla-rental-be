import { object, string, TypeOf } from 'zod';

export const createTagSchema = object({
  body: object({
    name: string({
      required_error: 'Name is required',
    }),
    description: string().nullable().optional(),
  }),
});

export type CreateTagInput = TypeOf<typeof createTagSchema>['body'];