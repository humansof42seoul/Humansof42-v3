import { IsDate, IsNumber } from "class-validator";
import { Post } from "src/posts/entities/post.entity";
import { User } from "src/users/entities/user.entity";
import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Scrap extends BaseEntity {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id!: number;

  @CreateDateColumn()
  @IsDate()
  created_at!: Date;

  @ManyToOne(() => User, (user) => user.likes)
  user!: User;

  @ManyToOne(() => Post, (post) => post.likes)
  post!: Post;
}
