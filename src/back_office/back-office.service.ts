import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TopMenuEntity } from "../entity/top-menu/top-menu.entity";
import { TopMenuEntityRepository } from "../entity/top-menu/top-menu-entity.repository";
import { TopMenuDto } from "../burgerking/dto/top-menu.dto";
import { MenuDetailRequestDto } from "./dto/menu-detail-request.dto";
import { MenuDetailEntity } from "../entity/menu-detail/menu-detail.entity";
import { MenuDetailEntityRepository } from "../entity/menu-detail/menu-detail-entity.repository";
import { MenuDetailResponseDto } from "./dto/menu-detail-response.dto";
import { getManager } from "typeorm";
import { MenuTypeEntityRepository } from "../entity/menu-type/menu-type-entity.repository";
import { MenuTypeEntity } from "../entity/menu-type/menu-type.entity";
import { MenuTypeRequestDto } from "./dto/menu-type-request.dto";
import { MenuTypeResponseDto } from "./dto/menu-type-response.dto";
import { MenuEntity } from "../entity/menu/menu.entity";
import { MenuEntityRepository } from "../entity/menu/menu-entity.repository";
import { MenuDto } from "../burgerking/dto/menu.dto";

@Injectable()
export class BackOfficeService {

  constructor(
    @InjectRepository(TopMenuEntity)
    private readonly topMenuEntityRepository: TopMenuEntityRepository,

    @InjectRepository(MenuDetailEntity)
    private readonly menuDetailEntityRepository: MenuDetailEntityRepository,
    private readonly topMenuRepository: TopMenuEntityRepository,
    @InjectRepository(MenuDetailEntity)
    private readonly menuDetailRepository: MenuDetailEntityRepository,
    @InjectRepository(MenuEntity)
    private readonly menuRepository: MenuEntityRepository,
    @InjectRepository(MenuTypeEntity)
    private readonly menuTypeRepository: MenuTypeEntityRepository,
  ) {}

  // Top Menu service
  findTopMenu(id: number): Promise<TopMenuEntity> {
    return this.topMenuEntityRepository.findOne(id);
  }

  findAllTopMenu(): Promise<TopMenuEntity[]> {
    return this.topMenuEntityRepository.find();
  }

  saveTopMenu(request: TopMenuDto): Promise<number> {
    // const c = new MyClass();
    // console.log(c.getName());
    const topMenu = new TopMenuEntity();
    topMenu.name = request.name;
    return this.topMenuEntityRepository.save(topMenu).then(r => r.id)
    // return this.topMenuEntityRepository.save(request.toEntity()).then(r => r.id)
  }
//   await getManager().transaction(async (transactionalEntityManager) => {
//   await this.boardRepository.deleteBoardsByUserId(transactionalEntityManager, userId)
//   await this.userRepository.deleteUserByUserId(transactionalEntityManager, userId)
// }).catch((err) => {
//   throw err
// })
  // Menu Detail service
  async createMenuDetail(request: MenuDetailRequestDto): Promise<number> {
    const menuDetail = new MenuDetailEntity();
    menuDetail.name = request.name;
    menuDetail.cost = request.cost;
    menuDetail.imagePath = request.imagePath;

    return await getManager().transaction(async (transactionalEntityManager) => {
      return this.menuDetailEntityRepository.save(menuDetail).then(menuDetail => menuDetail.id);
    }).catch((err) => {
      throw err;
    });
  }

  async findMenuDetail(id): Promise<MenuDetailResponseDto> {
    const entity = await this.menuDetailEntityRepository.findOneActivated(id)

    const menuDetailResponseDto = new MenuDetailResponseDto()
    return Object.assign(menuDetailResponseDto, entity);
  }

  async findAllMenuDetails(): Promise<MenuDetailResponseDto[]> {
    const menuDetails = await this.menuDetailEntityRepository.findAllActivated();

    const menuDetailsResponseDto: MenuDetailResponseDto[] = [];
    menuDetails.forEach(menuDetail => menuDetailsResponseDto.push(Object.assign({}, menuDetail)));

    return menuDetailsResponseDto;
  }

  async deleteMenuDetail(id: number): Promise<boolean> {
    const entity = await this.menuDetailEntityRepository.findOneActivated(id)

    if (entity == null) return false;

    entity.isActive = false

    return await getManager().transaction(async (transactionalEntityManager) => {
      await this.menuDetailEntityRepository.save(entity)
      return true;
    }).catch((err) => {
      throw err;
    });
  }

  async updateMenuDetail(id: number, requestDto: MenuDetailRequestDto): Promise<number> {
    const entity = await this.menuDetailEntityRepository.findOneActivated(id)

    if (entity == null) return 0;

    entity.name = requestDto.name;
    entity.cost = requestDto.cost;
    entity.imagePath = requestDto.imagePath;

    return getManager().transaction(async (transactionEntityManager) => {
      return await this.menuDetailEntityRepository.save(entity).then(menuDetail => menuDetail.id)
    }).catch((err) => {
      throw err;
    });
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
