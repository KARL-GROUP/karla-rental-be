import { Order } from "../entities/order.entity";
import { newOrderInput } from "../schemas/order.schema";
import { AppDataSource } from "../utils/data-source";

export const orderRepository = AppDataSource.getRepository(Order);

export const createOrder = async (input: newOrderInput) => {
  return (await AppDataSource.manager.save(
    AppDataSource.manager.create(Order, input)
  )) as Order;
};

export const findOrders = async (query: object) => {
  return await orderRepository.find({
    where: { ...query },
    relations: {
      car: true,
    },
  });
};

export const findOrderById = async (orderId: string) => {
  return await orderRepository.findOneBy({ id: orderId });
};

export const updateOrder = async (orderId: string, query: object) => {
  return await orderRepository.save({ id: orderId }, { ...query });
};

