import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { Column } from "typeorm";
import { postType } from "../utils/types";

export class CreatePostDto {
  @ApiProperty({
    description: "게시판 분류",
  })
  @Column()
  @IsString()
  @IsNotEmpty()
  readonly type: postType;

  @ApiProperty({
    type: String,
    description: "제목",
  })
  @Column()
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({
    type: String,
    description: "본문",
  })
  @Column()
  @IsString()
  @IsNotEmpty()
  readonly content: string;
}
