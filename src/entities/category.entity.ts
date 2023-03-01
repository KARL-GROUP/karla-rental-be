import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";
import { Car } from "./car.entity";

@Entity("categories")
export class Category extends BaseEntity {
  @PrimaryColumn()
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
