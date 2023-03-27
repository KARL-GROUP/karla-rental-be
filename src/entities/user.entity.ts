import { Entity, Index, Column, BeforeInsert, BeforeUpdate, AfterLoad } from "typeorm";
import Model from "./model.entity";
import bcrypt from "bcryptjs";

export enum RoleEnumType {
    USER = 'user',
    ADMIN = 'admin',
  }

@Entity('users')
export class User extends Model {
    @Column()
    userName: string;
  
    @Index('email_index')
    @Column({
      unique: true,
    })
    email: string;

    @Column()
    password: string;

    @Column({
        type: 'enum',
        enum: RoleEnumType,
        default: RoleEnumType.USER,
    })
    role: RoleEnumType.USER;

    @Column({
    default: false,
    })
    verified: boolean;

    toJSON() {
        return { ...this, password: undefined, verified: undefined, tempPassword: undefined };
    }

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 12);
    }

    static async comparePasswords(
        candidatePassword: string,
        hashedPassword: string
    ) {
        return await bcrypt.compare(candidatePassword, hashedPassword);
    }

}
