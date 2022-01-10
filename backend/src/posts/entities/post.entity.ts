import { IsDate, IsNumber, IsString } from "class-validator";
import { User } from "src/users/entities/user.entity";
import { Comment } from "src/comments/entities/comment.entity";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { postType } from "../utils/types";
import { Like } from "src/likes/entities/like.entity";

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

  @ManyToOne(() => User, (user) => user.posts)
  author!: User;

  @OneToMany(() => Comment, (comments) => comments.id)
  comments: Comment[];

  @OneToMany(() => Like, (likes) => likes.id)
  likes: Like[];
}
