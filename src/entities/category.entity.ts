import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";
import { Car } from "./car.entity";
import Model from "./model.entity";

@Entity("categories")
export class Category extends Model {
  @Column({
    unique: true
  })
  name: string;

  @Column({
    type: 'text',
    nullable: true,
    default: '',
  })
  description!: string | null;

  @ManyToMany((type) => Car, {
    cascade: true,
    onDelete: "NO ACTION",
  })
  cars: Car[];
}
