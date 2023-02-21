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

  @Column()
  description: string;

  @ManyToMany((type) => Category, {
		cascade: true,
	})
	@JoinTable({
		name: 'car_category',
		joinColumn: {
			name: 'car',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'category',
			referencedColumnName: 'name',
		},
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
  car_images: string[];

  @OneToMany(() => Order, (order) => order.car)
  orders: Order[];
}
