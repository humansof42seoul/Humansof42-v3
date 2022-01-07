import { IsDate, IsNumber, IsString } from "class-validator";
import { User } from "src/users/entities/user.entity";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { postType } from "../utils/types";

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id!: number;

  @Column()
  @IsString()
  type!: postType;

  @Column()
  @IsString()
  title!: string;

  @Column()
  @IsString()
  content!: string;

  @Column()
  @IsNumber()
  read_count!: number;

  @Column()
  @IsNumber()
  like_count!: number;

  @CreateDateColumn()
  @IsDate()
  created_at!: Date;

  @UpdateDateColumn()
  @IsDate()
  modified_at!: Date;

  @DeleteDateColumn()
  @IsDate()
  deleted_at?: Date;

  @ManyToOne(() => User, (user) => user.posts, { onDelete: "CASCADE" })
  author!: User;
}
