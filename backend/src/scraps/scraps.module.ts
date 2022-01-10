import { Module } from "@nestjs/common";
import { ScrapsService } from "./scraps.service";
import { Scrap } from "./entities/scrap.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Scrap])],
  providers: [ScrapsService],
  exports: [ScrapsService],
})
export class ScrapsModule { }
