import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { PostService } from "./post.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { Roles } from "src/auth/utils/roles.decorator";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { User } from "src/users/entities/user.entity";
import { CurrentUser } from "src/users/users.decorator";

@ApiTags("Posts")
@Controller("post")
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post()
  @ApiOperation({
    summary: "글 등록 API",
    description: "글 등록 API 입니다.",
  })
  // @Roles("admin")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  create(@Body() createPostDto: CreatePostDto, @CurrentUser() user: User) {
    return this.postService.create(createPostDto, user);
  }

  @Get()
  @ApiOperation({
    summary: "모든 글 조회 API",
    description: "모든 글 조회 API 입니다.",
  })
  @ApiOkResponse({ description: "조회 성공" })
  findAll() {
    return this.postService.findAll();
  }

  @Get(":id")
  @ApiOperation({
    summary: "글 상세 조회 API",
    description: "글 상세 조회 API 입니다.",
  })
  @ApiOkResponse({ description: "조회 성공" })
  findOne(@Param("id") id: number) {
    return this.postService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "글 수정 API",
    description: "글 수정 API 입니다.",
  })
  update(@Param("id") id: number, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  @ApiOperation({
    summary: "글 삭제 API",
    description: "글 삭제 API 입니다.",
  })
  @ApiBearerAuth()
  remove(@Param("id") id: number) {
    return this.postService.remove(+id);
  }
}
