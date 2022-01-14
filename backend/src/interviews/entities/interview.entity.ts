import { IsNumber } from "class-validator";
import { Post } from "src/posts/entities/post.entity";
import { User } from "src/users/entities/user.entity";
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Interview extends BaseEntity {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id!: number;

  @Column()
  post!: Post;

  @ManyToMany(() => User)
  @JoinTable()
  interviewees: User[];

  @ManyToMany(() => User)
  @JoinTable()
  interviewers: User[];

  @ManyToMany(() => User)
  @JoinTable()
  photographers: User[];
}
