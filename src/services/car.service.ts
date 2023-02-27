import { Car } from "../entities/car.entity";
import { createCarInput } from "../schemas/car.schema";
import { AppDataSource } from "../utils/data-source";

// export const createCar = async (params: type) => {};
const carRepository = AppDataSource.getRepository(Car);

export const createCar = async (input: createCarInput) => {
  return (await AppDataSource.manager.save(
    AppDataSource.manager.create(Car, input)
  )) as Car;
};

export const findCarById = async (carId: string) => {
  return await carRepository.findOneBy({id: carId});
};

export const findCars =async (query:object) => {
  return await carRepository.findBy(query);
}

export const findCar =async (query:object) => {
  return await carRepository.findOneBy(query);
}