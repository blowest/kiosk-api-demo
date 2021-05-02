import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { MenuRepository } from "../entity/menu/menu.repository";
import { MenuDetailRepository } from "../entity/menu-detail/menu-detail.repository";
import { MenuTypeRepository } from "../entity/menu-type/menu-type.repository";
import { TopMenuRepository } from "../entity/top-menu/top-menu.repository";
import { MenuExposureService } from "./menu-exposure.service";
import { BurgerkingController } from "./burgerking.controller";

@Module({
  imports: [TypeOrmModule.forFeature([
      MenuRepository,
      MenuDetailRepository,
      MenuTypeRepository,
      TopMenuRepository
    ]),
  ],
  controllers: [BurgerkingController],
  providers: [MenuExposureService],
})
export class BurgerkingModule {}
