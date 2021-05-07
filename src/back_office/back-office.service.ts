import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TopMenu } from "../entity/top-menu/top-menu.entity";
import { TopMenuRepository } from "../entity/top-menu/top-menu.repository";
import { TopMenuDto } from "../burgerking/dto/top-menu.dto";
import { MenuDetailRequestDto } from "./dto/menu-detail-request.dto";
import { MenuDetail } from "../entity/menu-detail/menu-detail.entity";
import { Menu } from "../entity/menu/menu.entity";
import { MenuDetailRepository } from "../entity/menu-detail/menu-detail.repository";
import { MenuDetailResponseDto } from "./dto/menu-detail-response.dto";
import { getManager } from "typeorm";

@Injectable()
export class BackOfficeService {

  constructor(
    @InjectRepository(TopMenu)
    private readonly topMenuRepository: TopMenuRepository,

    @InjectRepository(MenuDetail)
    private readonly menuDetailRepository: MenuDetailRepository,
  ) {}

  // Top Menu service
  findTopMenu(id: number): Promise<TopMenu> {
    return this.topMenuRepository.findOne(id);
  }

  findAllTopMenu(): Promise<TopMenu[]> {
    return this.topMenuRepository.find();
  }

  saveTopMenu(request: TopMenuDto): Promise<number> {
    // const c = new MyClass();
    // console.log(c.getName());
    const topMenu = new TopMenu();
    topMenu.name = request.name;
    return this.topMenuRepository.save(topMenu).then(r => r.id)
    // return this.topMenuRepository.save(request.toEntity()).then(r => r.id)
  }
//   await getManager().transaction(async (transactionalEntityManager) => {
//   await this.boardRepository.deleteBoardsByUserId(transactionalEntityManager, userId)
//   await this.userRepository.deleteUserByUserId(transactionalEntityManager, userId)
// }).catch((err) => {
//   throw err
// })
  // Menu Detail service
  async createMenuDetail(request: MenuDetailRequestDto): Promise<number> {
    const menuDetail = new MenuDetail();
    menuDetail.name = request.name;
    menuDetail.cost = request.cost;
    menuDetail.imagePath = request.imagePath;

    return await getManager().transaction(async (transactionalEntityManager) => {
      return this.menuDetailRepository.save(menuDetail).then(menuDetail => menuDetail.id);
    }).catch((err) => {
      throw err;
    });
  }

  async findMenuDetail(id): Promise<MenuDetailResponseDto> {
    const entity = await this.menuDetailRepository.findOneActivated(id)

    const menuDetailResponseDto = new MenuDetailResponseDto()
    return Object.assign(menuDetailResponseDto, entity);
  }

  async findAllMenuDetails(): Promise<MenuDetailResponseDto[]> {
    const menuDetails = await this.menuDetailRepository.findAllActivated();

    const menuDetailsResponseDto: MenuDetailResponseDto[] = [];
    menuDetails.forEach(menuDetail => menuDetailsResponseDto.push(Object.assign({}, menuDetail)));

    return menuDetailsResponseDto;
  }

  async deleteMenuDetail(id: number): Promise<boolean> {
    const entity = await this.menuDetailRepository.findOneActivated(id)

    if (entity == null) return false;

    entity.isActive = false

    return await getManager().transaction(async (transactionalEntityManager) => {
      await this.menuDetailRepository.save(entity)
      return true;
    }).catch((err) => {
      throw err;
    });
  }

  async updateMenuDetail(id: number, requestDto: MenuDetailRequestDto): Promise<number> {
    const entity = await this.menuDetailRepository.findOneActivated(id)

    if (entity == null) return 0;

    entity.name = requestDto.name;
    entity.cost = requestDto.cost;
    entity.imagePath = requestDto.imagePath;

    return getManager().transaction(async (transactionEntityManager) => {
      return await this.menuDetailRepository.save(entity).then(menuDetail => menuDetail.id)
    }).catch((err) => {
      throw err;
    });
  }
}