import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { BurgerkingModule } from './burgerking/burgerking.module';
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MenuEntityRepository } from "./entity/menu/menu-entity.repository";
import { MenuDetailEntityRepository } from "./entity/menu-detail/menu-detail-entity.repository";
import { MenuTypeEntityRepository } from "./entity/menu-type/menu-type-entity.repository";
import { TopMenuEntityRepository } from "./entity/top-menu/top-menu-entity.repository";
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
