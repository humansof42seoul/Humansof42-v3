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
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { Roles } from "src/auth/utils/roles.decorator";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @ApiOperation({
    summary: "회원가입 API",
    description: "회원가입 API 입니다.",
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  // @Roles("admin", "h42")
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({
    summary: "모든회원 조회 API",
    description: "모든회원 조회 API 입니다.",
  })
  // @ApiBearerAuth()
  @ApiOkResponse({ description: "조회 성공" })
  findAll() {
    return this.usersService.findAll();
  }

  // @Get(":id")
  // @ApiOperation({
  //   summary: "개별회원 조회 API",
  //   description: "개별회원 조회 API 입니다.",
  // })
  // @ApiOkResponse({ description: "조회 성공" })
  // findOne(@Param("id") id: number) {
  //   return this.usersService.findOne(+id);
  // }

  @Get(":nickname")
  @ApiOperation({
    summary: "회원 조회 API",
    description:
      "회원 조회 API 입니다. unique 필드인 nickname 기반으로 검색합니다.",
  })
  @ApiOkResponse({ description: "조회 성공" })
  findOneByNickname(@Param("nickname") nickname: string) {
    return this.usersService.findOneByNickname(nickname);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "회원정보수정 API",
    description: "회원정보수정 API 입니다.",
  })
  update(@Param("id") id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  @ApiOperation({
    summary: "회원탈퇴 API",
    description: "회원탈퇴 API 입니다.",
  })
  @ApiBearerAuth()
  remove(@Param("id") id: number) {
    return this.usersService.remove(+id);
  }
}
