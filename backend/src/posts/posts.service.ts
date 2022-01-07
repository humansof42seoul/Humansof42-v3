import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";
import { createQueryBuilder, Repository } from "typeorm";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { Post } from "./entities/post.entity";

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    private usersService: UsersService
  ) { }

  async create(createPostDto: CreatePostDto, currentUser: User) {
    const author: User = await this.usersService.findOneByEmail(
      currentUser.email
    );
    const newPost: Post = this.postsRepository.create({
      type: createPostDto.type,
      title: createPostDto.title,
      content: createPostDto.content,
      read_count: 0,
      like_count: 0,
      author: author,
    });
    this.postsRepository.insert(newPost);
  }

  findAll(): Promise<Post[]> {
    return this.postsRepository.find();
  }

  // to do: finedone interface 만들어 반환값 타입 정의 필요
  async findOne(id: number): Promise<unknown> {
    const post: unknown = await createQueryBuilder("Post")
      .leftJoinAndSelect("Post.author", "author")
      .where("Post.id = :id", { id: id })
      .select([
        "Post.id",
        "Post.type",
        "Post.title",
        "Post.content",
        "Post.read_count",
        "Post.like_count",
        "author.nickname",
        "author.role",
      ])
      .getOne();
    if (!post) {
      throw new NotFoundException(`${id} not found.`);
    }
    return post;
  }

  async findOneById(id: number): Promise<Post> {
    const post: Post = await this.postsRepository.findOne(id);
    if (!post) {
      throw new NotFoundException(`${id} not found.`);
    }
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<void> {
    await this.postsRepository.update(id, updatePostDto);
  }

  async remove(id: number): Promise<void> {
    await this.postsRepository.softDelete({ id });
  }
}
