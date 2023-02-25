import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { Category } from "./category.entity";
import Model from "./model.entity";
import { Order } from "./order.entity";

export enum TransmissionTypes {
  MANUAL = "manual",
  AUTOMATIC = "automatic",
}

@Entity("cars")
export class Car extends Model {
  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  description?: string;

  @Column()
  plate: string;

  @ManyToMany((type) => Category, {
    cascade: true,
    onDelete: "SET NULL",
    nullable: true,
  })
  categories: Category[];

  @Column({
    type: "enum",
    enum: TransmissionTypes,
    default: TransmissionTypes.AUTOMATIC,
  })
  transmission: string;

  @Column({
    type: "numeric",
  })
  price: number;

  @Column({
    type: "numeric",
  })
  seats: number;

  @Column({
    type: "simple-array",
    default: [],
  })
  car_images?: string[];

  @OneToMany(() => Order, (order) => order.car, {})
  orders: Order[];
}
