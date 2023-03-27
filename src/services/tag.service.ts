import { Tag } from "../entities/tag.entity";
import { AppDataSource } from "../utils/data-source";
import { CreateTagInput } from "../schemas/tag.schema";

// export const createCar = async (params: type) => {};
export const tagRepository = AppDataSource.getRepository(Tag);

export const createTag = async (input: CreateTagInput) => {
  return (await AppDataSource.manager.save(
    AppDataSource.manager.create(Tag, input)
  )) as Tag;
};

export const findTagByName = async (TagName: string) => {
  return await tagRepository.findOneBy({ name: TagName });
};

export const findTag = async (query: Object) => {
  return await tagRepository.findOneBy(query);
};

export const findTagById = async (TagId: string) => {
  return await tagRepository.findOneBy({ id: TagId });
};

export const getTags = async () => {
  return (await tagRepository.find()) as Tag[];
};
