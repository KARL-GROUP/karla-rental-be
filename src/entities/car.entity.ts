import {
  BeforeRemove,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
} from "typeorm";
import cloudinary from "../utils/cloudinary";
import { Tag } from "./tag.entity";
import Model from "./model.entity";
import { Order } from "./order.entity";

export enum TransmissionTypes {
  MANUAL = "Manual",
  AUTOMATIC = "Automatic",
  BOTH = "Both",
}

@Entity("cars")
export class Car extends Model {
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

  @Column({
    type: "jsonb",
    default: () => "'{}'",
    nullable: false,
  })
  coverImage: {
    public_id: string;
    url: string;
  };

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column({
    type: "text",
    nullable: true,
  })
  description!: string | null;

  @Column({
    type: "text",
  })
  type: string;

  @Column({
    type: "enum",
    enum: TransmissionTypes,
    default: TransmissionTypes.AUTOMATIC,
  })
  transmission: string;

  @Column({
    type: "numeric",
  })
  seats: number;

  @Column({
    type: "numeric",
    default: 50,
  })
  price: number;

  @Column({
    type: "boolean",
    default: false,
  })
  display: boolean;

  @ManyToMany(() => Tag, (tag) => tag.cars, {
    cascade: true,
    onDelete: "SET NULL",
    nullable: true,
  })
  @JoinTable({
    name: "car_tag",
    joinColumn: {
      name: "car",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "tag",
      referencedColumnName: "id",
    },
  })
  tags: Tag[];

  @OneToMany(() => Order, (order) => order.car, {
    nullable: true,
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
    cascade: true,
  })
  orders: Order[];

  @BeforeRemove()
  async deleteImages() {
    if (this.carImages.length != 0) {
      for (var image of this.carImages) {
        cloudinary.uploader.destroy(image.public_id);
      }
    }
  }
}
