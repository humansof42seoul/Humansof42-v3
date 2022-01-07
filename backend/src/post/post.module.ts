import { forwardRef, Module } from "@nestjs/common";
import { PostService } from "./post.service";
import { PostController } from "./post.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "./entities/post.entity";
import { UsersModule } from "src/users/users.module";

@Module({
  imports: [TypeOrmModule.forFeature([Post]), forwardRef(() => UsersModule)],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule { }
