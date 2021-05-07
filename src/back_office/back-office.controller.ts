import { BackOfficeService } from "./back-office.service";
import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { TopMenuDto } from "../burgerking/dto/top-menu.dto";
import { MenuDetailRequestDto } from "./dto/menu-detail-request.dto";
import { MenuDetailResponseDto } from "./dto/menu-detail-response.dto";
import { MenuDetail } from "../entity/menu-detail/menu-detail.entity";
import { DeleteResult } from "typeorm";

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
    return this.backOfficeService.createMenuDetail(request);
  }

  @Get('menu_details/:id')
  getMenuDetail(@Param("id") id: number): Promise<MenuDetailResponseDto> {
    return this.backOfficeService.findMenuDetail(id);
  }

  @Get('menu_details')
  getAllMenuDetails(): Promise<MenuDetailResponseDto[]> {
    return this.backOfficeService.findAllMenuDetails()
  }

  @Delete('menu_details/:id')
  async deleteMenuDetail(@Param("id") id: number): Promise<boolean> {
    return await this.backOfficeService.deleteMenuDetail(id)
  }

  @Patch('menu_details/:id')
  updateMenuDetail(@Param("id") id: number, @Body() menuDetailRequest: MenuDetailRequestDto): Promise<number> {
    return this.backOfficeService.updateMenuDetail(id, menuDetailRequest)
  }

}