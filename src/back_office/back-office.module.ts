import { MenuEntityRepository } from "../entity/menu/menu-entity.repository";
import { MenuDetailEntityRepository } from "../entity/menu-detail/menu-detail-entity.repository";
import { MenuTypeEntityRepository } from "../entity/menu-type/menu-type-entity.repository";
import { TopMenuEntityRepository } from "../entity/top-menu/top-menu-entity.repository";
import { BackOfficeService } from "./back-office.service";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BackOfficeController } from "./back-office.controller";

@Module({
  imports: [TypeOrmModule.forFeature([
      MenuEntityRepository,
      MenuDetailEntityRepository,
      MenuTypeEntityRepository,
      TopMenuEntityRepository
    ]),
  ],
  controllers: [BackOfficeController],
  providers: [BackOfficeService]
})
export class BackOfficeModule {}