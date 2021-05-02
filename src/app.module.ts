import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { BurgerkingModule } from './burgerking/burgerking.module';
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MenuRepository } from "./entity/menu/menu.repository";
import { MenuDetailRepository } from "./entity/menu-detail/menu-detail.repository";
import { MenuTypeRepository } from "./entity/menu-type/menu-type.repository";
import { TopMenuRepository } from "./entity/top-menu/top-menu.repository";
import { BackOfficeModule } from "./back_office/back-office.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    BurgerkingModule,
    BackOfficeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
