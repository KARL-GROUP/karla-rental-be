import { Category } from "../entities/category.entity";
import { AppDataSource } from "../utils/data-source";
import { CreateCategoryInput } from "../schemas/category.schema";

// export const createCar = async (params: type) => {};
export const categoryRepository = AppDataSource.getRepository(Category);

export const createCategory = async (input: CreateCategoryInput) => {
  return (await AppDataSource.manager.save(
    AppDataSource.manager.create(Category, input)
  )) as Category;
};

export const findCategoryByName = async (categoryName: string) => {
  return await categoryRepository.findOneBy({ name: categoryName });
};

export const findCategory = async (query: Object) => {
  return await categoryRepository.findOneBy(query);
};

export const findCategoryById = async (categoryId: string) => {
  return await categoryRepository.findOneBy({ id: categoryId });
};

export const getCategories = async () => {
  return (await categoryRepository.find()) as Category[];
};
