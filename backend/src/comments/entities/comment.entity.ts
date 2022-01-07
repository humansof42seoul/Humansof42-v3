import { IsNumber, IsString, IsDate } from "class-validator";
import { Post } from "src/posts/entities/post.entity";
import { User } from "src/users/entities/user.entity";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  DeleteDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id!: number;

  @Column()
  @IsString()
  content!: string;

  @CreateDateColumn()
  @IsDate()
  created_at!: Date;

  @UpdateDateColumn()
  @IsDate()
  modified_at!: Date;

  @DeleteDateColumn()
  @IsDate()
  deleted_at?: Date;

  @ManyToOne(() => User, (user) => user.comments, { onDelete: "CASCADE" })
  author!: User;

  @ManyToOne(() => Post, (post) => post.id, { onDelete: "CASCADE" })
  post!: Post;
}
