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

@Injectable()
export class BackOfficeService {

  constructor(
    @InjectRepository(TopMenuEntity)
    private readonly topMenuEntityRepository: TopMenuEntityRepository,

    @InjectRepository(MenuDetailEntity)
    private readonly menuDetailEntityRepository: MenuDetailEntityRepository,
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
}