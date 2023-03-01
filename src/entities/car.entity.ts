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
    type: "text",
    nullable: true,
  })
  description!: string | null;

  @Column()
  plate: string;

  @ManyToMany((type) => Category, {
    cascade: true,
    onDelete: "SET NULL",
    nullable: true,
  })
  @JoinTable({
    name: "car_category",
    joinColumn: {
      name: "car",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "category",
      referencedColumnName: "name",
    },
  })
  categories: Category[];

  @Column({
    type: "enum",
    enum: TransmissionTypes,
    default: TransmissionTypes.AUTOMATIC,
  })
  transmission: string;

  @Column()
  price: string;

  @Column({
    type: "numeric",
  })
  seats: number | string;

  @Column({
    type: "jsonb",
    array: false,
    default: () => "'[]'",
    nullable: false,
  })
  carImages: Array<{
    public_id: string;
    url: string;
  }>;

  @OneToMany(() => Order, (order) => order.car, {
    nullable: true,
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
    cascade: true,
  })
  orders: Order[];
}
