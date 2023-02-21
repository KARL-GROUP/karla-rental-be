import { BaseEntity, Column, Entity, ManyToMany, PrimaryColumn } from "typeorm";
import { Car } from "./car.entity";

@Entity('categories')
export class Category extends BaseEntity{
  @PrimaryColumn()
  name: string;

  @Column()
  description?: string;

  @ManyToMany((type) => Car, {
		cascade: true,
	})
	cars: Car[];
}