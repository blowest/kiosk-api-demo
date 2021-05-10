import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TopMenuEntity } from '../entity/top-menu/top-menu.entity';
import { TopMenuEntityRepository } from '../entity/top-menu/top-menu-entity.repository';
import { TopMenuDto } from '../burgerking/dto/top-menu.dto';
import { MenuDetailRequestDto } from './dto/menu-detail-request.dto';
import { MenuDetailEntity } from '../entity/menu-detail/menu-detail.entity';
import { MenuDetailEntityRepository } from '../entity/menu-detail/menu-detail-entity.repository';
import { MenuDetailResponseDto } from './dto/menu-detail-response.dto';
import { MenuEntityRepository } from "../entity/menu/menu-entity.repository";
import { MenuEntity } from "../entity/menu/menu.entity";
import { MenuDto } from "../burgerking/dto/menu.dto";

@Injectable()
export class BackOfficeService {
  constructor(
    @InjectRepository(TopMenuEntity)
    private readonly topMenuRepository: TopMenuEntityRepository,
    @InjectRepository(MenuDetailEntity)
    private readonly menuDetailRepository: MenuDetailEntityRepository,
    @InjectRepository(MenuEntity)
    private readonly menuRepository: MenuEntityRepository,
  ) {}

  // Top Menu service
  findTopMenu(id: number): Promise<TopMenuEntity> {
    return this.topMenuRepository.findOne(id);
  }

  findAllTopMenu(): Promise<TopMenuEntity[]> {
    return this.topMenuRepository.find();
  }

  saveTopMenu(request: TopMenuDto): Promise<number> {
    // const c = new MyClass();
    // console.log(c.getName());
    const topMenu = new TopMenuEntity();
    topMenu.name = request.name;
    return this.topMenuRepository.save(topMenu).then((r) => r.id);
    // return this.topMenuRepository.save(request.toEntity()).then(r => r.id)
  }

  // Menu Detail service
  saveMenuDetail(request: MenuDetailRequestDto) {
    const menuDetail = new MenuDetailEntity();
    menuDetail.name = request.name;
    menuDetail.cost = request.cost;
    menuDetail.imagePath = request.imagePath;

    return this.menuDetailRepository
      .save(menuDetail)
      .then((menuDetail) => menuDetail.id);
  }

  async findMenuDetail(id): Promise<MenuDetailResponseDto> {
    const entity = await this.menuDetailRepository.findOne(id);
    const menuDetailResponseDto = new MenuDetailResponseDto();
    menuDetailResponseDto.id = entity.id;
    menuDetailResponseDto.name = entity.name;
    menuDetailResponseDto.cost = entity.cost;
    menuDetailResponseDto.imagePath = entity.imagePath;
    menuDetailResponseDto.isActive = entity.isActive;
    menuDetailResponseDto.createdTime = entity.createdTime;
    menuDetailResponseDto.modifiedTime = entity.modifiedTime;

    return menuDetailResponseDto;
  }

  findMenu(id: number): Promise<MenuEntity> {
    return this.menuRepository.findOne(id);
  }

  findAllMenu(): Promise<MenuEntity[]> {
    return this.menuRepository.find();
  }

  saveMenu(request: MenuDto): Promise<number> {
    const newMenu = new MenuEntity();
    newMenu.imagePath = request.imagePath;
    newMenu.isBest = request.isBest;
    newMenu.minCost = request.minCost;
    return this.menuRepository.save(newMenu).then((r) => r.id);
  }
}
