import { IsDate, IsEmail, IsNumber, IsString } from "class-validator";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm";
import { userGrade } from "../utils/types";

@Entity()
@Unique(["email"])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id!: number;

  @Column()
  @IsEmail()
  email!: string;

  @Column()
  @IsString()
  nickname!: string;

  @Column()
  @IsString()
  profile?: string;

  @Column()
  @IsString()
  grade!: userGrade;

  @Column()
  @IsString()
  password!: string;

  @CreateDateColumn()
  @IsDate()
  created_at!: Date;

  @UpdateDateColumn()
  @IsDate()
  modified_at!: Date;

  @DeleteDateColumn()
  @IsDate()
  deleted_at?: Date;
}
