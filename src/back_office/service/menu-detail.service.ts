import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MenuDetailEntity } from "../../entity/menu-detail/menu-detail.entity";
import { MenuDetailEntityRepository } from "../../entity/menu-detail/menu-detail-entity.repository";
import { MenuDetailRequestDto } from "../dto/menu-detail-request.dto";
import { getManager } from "typeorm";
import { MenuDetailResponseDto } from "../dto/menu-detail-response.dto";

@Injectable()
export class MenuDetailService {

  constructor(
    @InjectRepository(MenuDetailEntity)
    private readonly menuDetailEntityRepository: MenuDetailEntityRepository,
    private readonly menuEntityRepository: MenuDetailEntityRepository
  ) {}

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

    const menuDetails = await this.menuDetailEntityRepository.find({
      relations: ["menuEntity"]
    });
    // const menuDetails = await this.menuDetailEntityRepository.findAllActivated();
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

  async createMenuDetailWithMenu(menuId: number, request: MenuDetailRequestDto) {
    const menuDetail = new MenuDetailEntity();
    menuDetail.name = request.name;
    menuDetail.cost = request.cost;
    menuDetail.imagePath = request.imagePath;
    menuDetail.menuEntity = await this.menuEntityRepository.findOneActivated(menuId)

    return await getManager().transaction(async (transactionalEntityManager) => {
      return this.menuDetailEntityRepository.save(menuDetail).then(menuDetail => menuDetail.id);
    }).catch((err) => {
      throw err;
    });
    return Promise.resolve(0);
  }
}