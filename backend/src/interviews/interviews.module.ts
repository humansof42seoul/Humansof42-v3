import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InterviewsService } from "./interviews.service";

@Module({
  imports: [TypeOrmModule.forFeature()],
  providers: [InterviewsService],
  exports: [InterviewsService],
})
export class InterviewsModule { }
