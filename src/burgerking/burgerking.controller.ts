import { Body, Controller, Get, Post } from "@nestjs/common";
import { MenuExposureService } from "./menu-exposure.service";

@Controller('api/v1/burgerking/')
export class BurgerkingController {
  constructor(private readonly menuExposureService: MenuExposureService) {}

  @Get()
  welcome(): string {
    return "Welcome Burgerking Kiosk Service";
  }
  
}