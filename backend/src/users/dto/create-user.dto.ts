import { ApiProperty } from "@nestjs/swagger";
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from "class-validator";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { regExpConstants } from "../utils/constants";
import { userGrade } from "../utils/types";

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
    description: "닉네임",
  })
  @Column()
  @IsString()
  @IsNotEmpty()
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
  readonly grade: userGrade;

  @ApiProperty({
    type: String,
    description: "비밀번호(세가지 종류 이상의 문자구성, 최소 8자)",
  })
  @Column()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(regExpConstants.password)
  readonly password: string;

  @ApiProperty({
    type: Date,
    description: "생성일자",
  })
  @CreateDateColumn()
  @IsDate()
  readonly created_at: Date;

  @ApiProperty({
    type: Date,
    description: "수정일자",
  })
  @UpdateDateColumn()
  @IsDate()
  readonly modified_at: Date;

  @ApiProperty({
    type: Date,
    description: "삭제일자",
  })
  @DeleteDateColumn()
  @IsDate()
  readonly deleted_at: Date;
}
