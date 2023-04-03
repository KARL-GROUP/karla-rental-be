import { Car } from "../entities/car.entity";
import { CreateCarInput } from "../schemas/car.schema";
import { AppDataSource } from "../utils/data-source";

// export const createCar = async (params: type) => {};
export const carRepository = AppDataSource.getRepository(Car);

export const createCar = async (input: CreateCarInput) => {
  return (await AppDataSource.manager.save(
    AppDataSource.manager.create(Car, input)
  )) as Car;
};

export const findCarById = async (carId: string) => {
  return await carRepository.findOne({
    where: { id: carId },
    relations: {
      tags: true,
    },
  });
};

export const findCarOrders = async (carId: string) => {
  return await carRepository.findOne({
    where: { id: carId },
    relations: { orders: true },
  });
};

export const findCars = async (query: object) => {
  return await carRepository.find({
    where: { ...query },
    relations: {
      tags: true,
    },
  });
};

export const selectionModelYears = async (query: object) => {
  return await carRepository
    .createQueryBuilder()
    .select("Car.year")
    .where({ ...query })
    .distinctOn(["Car.year"])
    .getMany();
};

export const findCar = async (query: object) => {
  return await carRepository.findOneBy(query);
};

export const updateCar = async (carId: string, query: object) => {
  return await carRepository.save({ id: carId, ...query });
};
