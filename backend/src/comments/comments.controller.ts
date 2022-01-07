import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from "@nestjs/common";
import {
  ApiOperation,
  ApiBearerAuth,
  ApiTags,
  ApiQuery,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { User } from "src/users/entities/user.entity";
import { CurrentUser } from "src/users/users.decorator";
import { CommentsService } from "./comments.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";

@ApiTags("Comments")
@Controller("comments")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  @Post()
  @ApiOperation({
    summary: "댓글 등록 API",
    description: "댓글 등록 API 입니다.",
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  create(
    @Body() createCommentDto: CreateCommentDto,
    @Query("post") postId: number,
    @CurrentUser() user: User
  ) {
    return this.commentsService.create(createCommentDto, postId, user);
  }

  @Get()
  @ApiOperation({
    summary: "게시물 id 기반 댓글 조회 API",
    description:
      "게시물 id 기반 댓글 조회 API 입니다. 쿼리로 게시판 id 값이 필요합니다.",
  })
  @ApiQuery({ name: "post" })
  async findAllByPostId(@Query("post") postId: number) {
    return await this.commentsService.findAllByPostId(postId);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.commentsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "댓글 수정 API",
    description: "댓글 수정 API 입니다.",
  })
  update(@Param("id") id: number, @Body() updateComentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateComentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  @ApiOperation({
    summary: "댓글 삭제 API",
    description: "댓글 삭제 API 입니다.",
  })
  @ApiBearerAuth()
  remove(@Param("id") id: number) {
    return this.commentsService.remove(+id);
  }
}
