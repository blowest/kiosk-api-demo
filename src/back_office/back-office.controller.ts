import { BackOfficeService } from "./back-office.service";
import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { TopMenuDto } from "../burgerking/dto/top-menu.dto";
import { MenuDetailRequestDto } from "./dto/menu-detail-request.dto";
import { MenuDetailResponseDto } from "./dto/menu-detail-response.dto";
import { MenuTypeRequestDto } from "./dto/menu-type-request.dto";
import { MenuTypeResponseDto } from "./dto/menu-type-response.dto";
import { MenuResponseDto } from "./dto/menu-response.dto";
import { MenuRequestDto } from "./dto/menu-request.dto";
import { MenuDetailService } from "./service/menu-detail.service";

@Controller('api/v1/back_office/')
export class BackOfficeController {
  constructor(
    private readonly backOfficeService: BackOfficeService,
    private readonly menuDetailService: MenuDetailService
  ) {}

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
    return this.menuDetailService.createMenuDetail(request);
  }

  @Post('menu/:id/menu_details')
  createMenuDetailWithMenu(@Param("id") menuId: number, @Body() request: MenuDetailRequestDto): Promise<number> {
    return this.menuDetailService.createMenuDetailWithMenu(menuId, request);
  }

  @Get('menu_details/:id')
  getMenuDetail(@Param("id") id: number): Promise<MenuDetailResponseDto> {
    return this.menuDetailService.findMenuDetail(id);
}

  @Get('menu_details')
  getAllMenuDetails(): Promise<MenuDetailResponseDto[]> {
    return this.menuDetailService.findAllMenuDetails()
  }

  @Delete('menu_details/:id')
  async deleteMenuDetail(@Param("id") id: number): Promise<boolean> {
    return await this.menuDetailService.deleteMenuDetail(id)
  }

  @Patch('menu_details/:id')
  updateMenuDetail(@Param("id") id: number, @Body() menuDetailRequest: MenuDetailRequestDto): Promise<number> {
    return this.menuDetailService.updateMenuDetail(id, menuDetailRequest)
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
