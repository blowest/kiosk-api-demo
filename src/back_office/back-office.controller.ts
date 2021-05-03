import { BackOfficeService } from "./back-office.service";
import { Body, Controller, Get, Post } from "@nestjs/common";
import { TopMenuDto } from "../burgerking/dto/top-menu.dto";
import { MenuDetailDto } from "./dto/menu-detail.dto";

@Controller('api/v1/back_office/')
export class BackOfficeController {
  constructor(private readonly backOfficeService: BackOfficeService) {}

  // Top Menu Controller
  @Post('top_menus')
  createTopMenu(@Body() request: TopMenuDto): Promise<number> {
    return this.backOfficeService.createTopMenu(request);
  }

  @Get('top_menus')
  getAllTopMenu(): object {
    return this.backOfficeService.findAllTopMenu();
  }

  // Menu Detail Controller
  @Post('menu_details')
  createMenuDetail(@Body() request: MenuDetailDto): Promise<number> {
    return this.backOfficeService.createMenuDetail(request);
  }
}