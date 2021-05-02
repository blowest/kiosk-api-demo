import { MenuRepository } from "../entity/menu/menu.repository";
import { MenuDetailRepository } from "../entity/menu-detail/menu-detail.repository";
import { MenuTypeRepository } from "../entity/menu-type/menu-type.repository";
import { TopMenuRepository } from "../entity/top-menu/top-menu.repository";
import { BackOfficeService } from "./back-office.service";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BackOfficeController } from "./back-office.controller";

@Module({
  imports: [TypeOrmModule.forFeature([
      MenuRepository,
      MenuDetailRepository,
      MenuTypeRepository,
      TopMenuRepository
    ]),
  ],
  controllers: [BackOfficeController],
  providers: [BackOfficeService]
})
export class BackOfficeModule {}