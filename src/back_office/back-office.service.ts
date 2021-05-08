import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TopMenuEntity } from "../entity/top-menu/top-menu.entity";
import { TopMenuEntityRepository } from "../entity/top-menu/top-menu-entity.repository";
import { TopMenuDto } from "../burgerking/dto/top-menu.dto";
import { MenuDetailRequestDto } from "./dto/menu-detail-request.dto";
import { MenuDetailEntity } from "../entity/menu-detail/menu-detail.entity";
import { MenuDetailEntityRepository } from "../entity/menu-detail/menu-detail-entity.repository";
import { MenuDetailResponseDto } from "./dto/menu-detail-response.dto";
import { MenuTypeEntityRepository } from "src/entity/menu-type/menu-type-entity.repository";
import { MenuTypeEntity } from "src/entity/menu-type/menu-type.entity";
import { MenuTypeRequestDto } from "./dto/menu-type-request.dto";
import { MenuTypeResponseDto } from "./dto/menu-type-response.dto";

@Injectable()
export class BackOfficeService {
  constructor(
    @InjectRepository(TopMenuEntity)
    private readonly topMenuRepository: TopMenuEntityRepository,
    private readonly menuDetailRepository: MenuDetailEntityRepository,
    private readonly menuTypeRepository: MenuTypeEntityRepository,
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
    return this.topMenuRepository.save(topMenu).then(r => r.id)
    // return this.topMenuRepository.save(request.toEntity()).then(r => r.id)
  }

  // Menu Detail service
  saveMenuDetail(request: MenuDetailRequestDto) {
    const menuDetail = new MenuDetailEntity();
    menuDetail.name = request.name;
    menuDetail.cost = request.cost;
    menuDetail.imagePath = request.imagePath;

    return this.menuDetailRepository.save(menuDetail).then(menuDetail => menuDetail.id)
  }


  async findMenuDetail(id): Promise<MenuDetailResponseDto> {
    const entity = await this.menuDetailRepository.findOne(id)
    const menuDetailResponseDto = new MenuDetailResponseDto()
    menuDetailResponseDto.id = entity.id;
    menuDetailResponseDto.name = entity.name;
    menuDetailResponseDto.cost = entity.cost;
    menuDetailResponseDto.imagePath = entity.imagePath;
    menuDetailResponseDto.isActive = entity.isActive;
    menuDetailResponseDto.createdTime = entity.createdTime;
    menuDetailResponseDto.modifiedTime = entity.modifiedTime;

    return menuDetailResponseDto;
  }

  // Menu Type service
  saveMenuType(request: MenuTypeRequestDto) {
    const menuType = new MenuTypeEntity();
    menuType.name = request.name;

    return this.menuTypeRepository.save(menuType).then(menuType => menuType.id)
  }

  async findMenuType(id): Promise<MenuTypeResponseDto> {
    const entity = await this.menuTypeRepository.findOne(id)
    const menuTypeResponseDto = new MenuTypeResponseDto()

    Object.assign(menuTypeResponseDto,entity);
    // menuTypeResponseDto.id = entity.id;
    // menuTypeResponseDto.name = entity.name;
    // menuTypeResponseDto.isActive = entity.isActive;
    // menuTypeResponseDto.createdTime = entity.createdTime;
    // menuTypeResponseDto.modifiedTime = entity.modifiedTime;

    return menuTypeResponseDto;
  }

  async findAllMenuTypes(): Promise<MenuTypeResponseDto[]> {
    const menuTypes = await this.menuTypeRepository.find()
    const menuTypeResponseDto : MenuTypeResponseDto[] = [];
    
    menuTypes.forEach(menuType => menuTypeResponseDto.push(Object.assign({}, menuType)))
    
    return menuTypeResponseDto;
  }

  async deleteMenuType(id) {
    const entity = await this.menuTypeRepository.findOne(id)
    entity.isActive = false;
    await this.menuTypeRepository.save(entity)
  }

  async updateMenuType(id:number, requestDto: MenuTypeRequestDto) {
    const entity = await this.menuTypeRepository.findOne(id)
    entity.name = requestDto.name;

    return await this.menuTypeRepository.save(entity).then(menutype => menutype.id)
  }
}