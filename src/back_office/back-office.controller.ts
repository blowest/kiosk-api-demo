import { BackOfficeService } from './back-office.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TopMenuDto } from '../burgerking/dto/top-menu.dto';
import { MenuDetailRequestDto } from './dto/menu-detail-request.dto';
import { MenuDetailResponseDto } from './dto/menu-detail-response.dto';
import { MenuResponseDto } from "./dto/menu-response.dto";
import { MenuRequestDto } from "./dto/menu-request.dto";

@Controller('api/v1/back_office/')
export class BackOfficeController {
  constructor(private readonly backOfficeService: BackOfficeService) {}

  // Top Menu Controller
  @Post('top_menus')
  createTopMenu(@Body() request: TopMenuDto): Promise<number> {
    return this.backOfficeService.saveTopMenu(request);
  }

  @Get('top_menus')
  // eslint-disable-next-line @typescript-eslint/ban-types
  getAllTopMenu(): object {
    return this.backOfficeService.findAllTopMenu();
  }

  // Menu Detail Controller
  @Post('menu_details')
  createMenuDetail(@Body() request: MenuDetailRequestDto): Promise<number> {
    return this.backOfficeService.saveMenuDetail(request);
  }

  @Get('menu_details/:id')
  getMenuDetail(@Param('id') id): Promise<MenuDetailResponseDto> {
    return this.backOfficeService.findMenuDetail(id);
  }

  @Get("menu")
  getMenu(@Param("id") id): Promise<MenuResponseDto> {
    return this.backOfficeService.findMenu(id);
  }

  @Get('menu/all')
  getAllMenu(): Promise<MenuResponseDto[]> {
    return this.backOfficeService.findAllMenu();
  }

  @Post('menu')
  createMenu(@Body() request: MenuRequestDto): Promise<number> {
    return this.backOfficeService.saveMenu(request);
  }
}
