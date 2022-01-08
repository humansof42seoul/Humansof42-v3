import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from "class-validator";
import { Column } from "typeorm";
import { REGEXP } from "../utils/constants";
import { userRole } from "../utils/types";

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: "이메일 주소",
  })
  @Column()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    type: String,
    description: "닉네임(영문 대소문자와 숫자, 3자~15자",
  })
  @Column()
  @IsString()
  @IsNotEmpty()
  @Matches(REGEXP.NICKNAME)
  readonly nickname: string;

  @ApiProperty({
    type: String,
    description: "프로필 이미지 주소",
  })
  @Column()
  @IsString()
  readonly profile: string;

  @ApiProperty({
    description: "회원등급",
  })
  @Column()
  @IsString()
  @IsNotEmpty()
  readonly role: userRole;

  @ApiProperty({
    type: String,
    description: "비밀번호(세가지 종류 이상의 문자구성, 최소 8자)",
  })
  @Column()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(REGEXP.PASSWORD)
  readonly password: string;
}
