import { Column, Entity } from "typeorm";
import Model from "./model.entity";

@Entity("messages")
export class Message extends Model {
  @Column({
    nullable: true,
    type: "text",
    default: "",
  })
  name!: string | null;

  @Column()
  email: string;

  @Column({
    nullable: true,
    type: "text",
    default: "",
  })
  phone!: string | null;

  @Column({
    type: "text",
    nullable: true,
  })
  description!: string | null;
}
