import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { Column } from "typeorm";

export class CreateCommentDto {
  @ApiProperty({
    type: String,
    description: "본문",
  })
  @Column()
  @IsString()
  @IsNotEmpty()
  readonly content: string;
}
