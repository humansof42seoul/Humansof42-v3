import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary: "모든회원 조회 API",
    description: "모든회원 조회 API 입니다.",
  })
  @ApiOkResponse({ description: "조회 성공" })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(":id")
  @ApiOperation({
    summary: "개별회원 조회 API",
    description: "개별회원 조회 API 입니다.",
  })
  @ApiOkResponse({ description: "조회 성공" })
  findOne(@Param("id") id: number) {
    return this.usersService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "회원정보수정 API",
    description: "회원정보수정 API 입니다.",
  })
  update(@Param("id") id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "회원탈퇴 API",
    description: "회원탈퇴 API 입니다.",
  })
  remove(@Param("id") id: number) {
    return this.usersService.remove(+id);
  }
}
