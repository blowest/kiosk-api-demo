import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { MenuEntityRepository } from "../entity/menu/menu-entity.repository";
import { MenuDetailEntityRepository } from "../entity/menu-detail/menu-detail-entity.repository";
import { MenuTypeEntityRepository } from "../entity/menu-type/menu-type-entity.repository";
import { TopMenuEntityRepository } from "../entity/top-menu/top-menu-entity.repository";
import { MenuExposureService } from "./menu-exposure.service";
import { BurgerkingController } from "./burgerking.controller";

@Module({
  imports: [TypeOrmModule.forFeature([
      MenuEntityRepository,
      MenuDetailEntityRepository,
      MenuTypeEntityRepository,
      TopMenuEntityRepository
    ]),
  ],
  controllers: [BurgerkingController],
  providers: [MenuExposureService],
})
export class BurgerkingModule {}
