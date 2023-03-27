import {
  Column,
  Entity,
  ManyToMany,
} from "typeorm";
import { Car } from "./car.entity";
import Model from "./model.entity";

@Entity("tags")
export class Tag extends Model {
  @Column({
    unique: true,
  })
  name: string;

  @Column({
    type: "text",
    nullable: true,
    default: "",
  })
  description!: string | null;

  @ManyToMany((type) => Car, (car) => car.tags, {
    nullable: true,
    onDelete:"CASCADE",
  })
  cars: Car[];
}
