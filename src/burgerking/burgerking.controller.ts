import { Body, Controller, Get, Post } from "@nestjs/common";
import { AppService } from "../app.service";
import { MenuExposureService } from "./service/menu-exposure.service";
import { TopMenuDto } from "./dto/top-menu.dto";
import { BackOfficeService } from "./service/back-office.service";

@Controller('api/v1/burgerking/')
export class BurgerkingController {
  constructor(private readonly backOfficeService: BackOfficeService) {}

  @Post('top_menu')
  createTopMenu(@Body() request: TopMenuDto): Promise<number> {
    return this.backOfficeService.createTopMenu(request);
  }

  @Get('test')
  test(): number {
    return 123;
  }
}