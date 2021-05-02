import { Body, Controller, Get, Post } from "@nestjs/common";
import { TopMenuDto } from "./dto/top-menu.dto";
import { BackOfficeService } from "../back_office/back-office.service";
import { MenuExposureService } from "./menu-exposure.service";

@Controller('api/v1/burgerking/')
export class BurgerkingController {
  constructor(private readonly menuExposureService: MenuExposureService) {}

  @Get()
  welcome(): string {
    return "Welcome Burgerking Kiosk Service";
  }
}