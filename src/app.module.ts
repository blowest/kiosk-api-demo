import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { BurgerkingModule } from './burgerking/burgerking.module';
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
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
