import { BackOfficeService } from "./back-office.service";
import { Body, Controller, Get, Post } from "@nestjs/common";
import { TopMenuDto } from "../burgerking/dto/top-menu.dto";

@Controller('api/v1/back_office/')
export class BackOfficeController {
  constructor(private readonly backOfficeService: BackOfficeService) {}

  @Post('top_menus')
  createTopMenu(@Body() request: TopMenuDto): Promise<number> {
    return this.backOfficeService.createTopMenu(request);
  }

  @Get('top_menus')
  getAllTopMenu(): object {
    return this.backOfficeService.findAllTopMenu();
  }
}