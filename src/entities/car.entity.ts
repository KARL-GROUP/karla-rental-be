import { BeforeRemove, Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import cloudinary from "../utils/cloudinary";
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

  @Column({
    nullable: true,
  })
  plate: string;

  @ManyToMany(() => Category, (category) => category.cars,{
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
      referencedColumnName: "id",
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
    default: 50
  })
  price: number;

  @Column({
    type: "numeric",
  })
  seats: number;

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

  @BeforeRemove()
  async deleteImages(){
    if (this.carImages.length != 0) {
      for (var image of this.carImages) {
        cloudinary.uploader.destroy(image.public_id);
      }
    }
  }
}
