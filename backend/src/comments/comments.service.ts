import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "src/posts/entities/post.entity";
import { PostsService } from "src/posts/posts.service";
import { User } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";
import { createQueryBuilder, Repository } from "typeorm";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { Comment } from "./entities/comment.entity";

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    private postsService: PostsService,
    private usersService: UsersService
  ) { }

  async create(
    createCommentDto: CreateCommentDto,
    postId: number,
    currentUser: User
  ) {
    const author: User = await this.usersService.findOneByEmail(
      currentUser.email
    );
    const newComment: Comment = this.commentsRepository.create({
      content: createCommentDto.content,
      post: await this.postsService.findOneById(postId),
      author: author,
    });
    await this.commentsRepository.insert(newComment);
  }

  async findAllByPostId(postId: number) {
    const comment = await createQueryBuilder("Comment")
      .innerJoin("Comment.post", "post")
      .where("post.id = :id", { id: postId })
      .getMany();
    if (!comment) {
      throw new NotFoundException(`${postId} not found.`);
    }
    return comment;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
