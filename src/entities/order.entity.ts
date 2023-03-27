import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Car } from "./car.entity";
import Model from "./model.entity";

export enum orderStatus {
  APPOROVED = "approved",
  PENDING = "pending",
  DECLINED = "declined",
}

@Entity('orders')
export class Order extends Model {
  @ManyToOne(() => Car, (car) => car.orders, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "car_id",
  })
  car: Car;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({
    type: "enum",
    enum: orderStatus,
    default: orderStatus.PENDING,
  })
  status: string;

  @Column({
    type: "text",
    nullable: true,
  })
  description!: string | null;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @BeforeUpdate()
  @BeforeInsert()
  async checkValidDates() {
    if (this.endDate < this.startDate)
      throw new Error("Invalid dates provided!!");
  }
}
