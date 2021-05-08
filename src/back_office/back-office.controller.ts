import { BackOfficeService } from "./back-office.service";
import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { TopMenuDto } from "../burgerking/dto/top-menu.dto";
import { MenuDetailRequestDto } from "./dto/menu-detail-request.dto";
import { MenuDetailResponseDto } from "./dto/menu-detail-response.dto";
import { MenuTypeRequestDto } from "./dto/menu-type-request.dto";
import { MenuTypeResponseDto } from "./dto/menu-type-response.dto";

@Controller('api/v1/back_office/')
export class BackOfficeController {
  constructor(private readonly backOfficeService: BackOfficeService) {}

  // Top Menu Controller
  @Post('top_menus')
  createTopMenu(@Body() request: TopMenuDto): Promise<number> {
    return this.backOfficeService.saveTopMenu(request);
  }

  @Get('top_menus')
  getAllTopMenu(): object {
    return this.backOfficeService.findAllTopMenu();
  }

  // Menu Detail Controller
  @Post('menu_details')
  createMenuDetail(@Body() request: MenuDetailRequestDto): Promise<number> {
    return this.backOfficeService.saveMenuDetail(request);
  }

  @Get('menu_details/:id')
  getMenuDetail(@Param("id") id): Promise<MenuDetailResponseDto> {
    return this.backOfficeService.findMenuDetail(id);
  }

  // Menu Type Controller
  @Post('menu_type')
  createMenuType(@Body() request: MenuTypeRequestDto): Promise<number> {
    return this.backOfficeService.saveMenuType(request);
  }

  @Get('menu_type/:id')
  getMenuType(@Param("id") id): Promise<MenuTypeResponseDto> { 
    return this.backOfficeService.findMenuType(id);
  }

  @Get('menu_types')
  getMenuDetails(): Promise<MenuTypeResponseDto[]> {
    return this.backOfficeService.findAllMenuTypes();
  }

  @Delete('menu_type/:id')
  deleteMenuType(@Param("id") id: number) {
    return this.backOfficeService.deleteMenuType(id);
  }

  @Patch('menu_type/:id')
  updateMenuType(@Param("id") id: number, @Body() request: MenuTypeRequestDto){
    return this.backOfficeService.updateMenuType(id, request);
  }
}