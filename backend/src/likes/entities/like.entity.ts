import { IsNumber } from "class-validator";
import { Post } from "src/posts/entities/post.entity";
import { User } from "src/users/entities/user.entity";
import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Like extends BaseEntity {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id!: number;

  @ManyToOne(() => User, (user) => user.likes)
  user!: User;

  @ManyToOne(() => Post, (post) => post.likes)
  post!: Post;
}
