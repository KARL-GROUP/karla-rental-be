import { Car } from "../entities/car.entity";
import { AppDataSource } from "../utils/data-source";

// export const createCar = async (params: type) => {};
const carRepository = AppDataSource.getRepository(Car);