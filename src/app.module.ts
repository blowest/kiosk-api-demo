import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { BurgerkingModule } from './burgerking/burgerking.module';
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MenuRepository } from "./burgerking/entity/menu/menu.repository";
import { MenuDetailRepository } from "./burgerking/entity/menu-detail/menu-detail.repository";
import { MenuTypeRepository } from "./burgerking/entity/menu-type/menu-type.repository";
import { TopMenuRepository } from "./burgerking/entity/top-menu/top-menu-repository";

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    BurgerkingModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
