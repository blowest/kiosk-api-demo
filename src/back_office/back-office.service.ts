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

@Injectable()
export class BackOfficeService {
  constructor(
    @InjectRepository(TopMenu)
    private readonly topMenuRepository: TopMenuRepository,
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

  // Menu Detail service
  saveMenuDetail(request: MenuDetailRequestDto) {
    const menuDetail = new MenuDetail();
    menuDetail.name = request.name;
    menuDetail.cost = request.cost;
    menuDetail.imagePath = request.imagePath;

    return this.menuDetailRepository.save(menuDetail).then(menuDetail => menuDetail.id)
  }


  async findMenuDetail(id): Promise<MenuDetailResponseDto> {
    const entity = await this.menuDetailRepository.findOne(id)

    const menuDetailResponseDto = new MenuDetailResponseDto()
    Object.assign(menuDetailResponseDto, entity);

    return menuDetailResponseDto;
  }

  async findAllMenuDetails(): Promise<MenuDetailResponseDto[]> {
    const menuDetails = await this.menuDetailRepository.find();
    const menuDetailsResponseDto: MenuDetailResponseDto[] = [];

    menuDetails.forEach(menuDetail => menuDetailsResponseDto.push(Object.assign({}, menuDetail)));

    return menuDetailsResponseDto;
  }

  async deleteMenuDetail(id: number) {
    const entity = await this.menuDetailRepository.findOne(id)
    entity.isActive = false
    await this.menuDetailRepository.save(entity)
  }

  async updateMenuDetail(id: number, requestDto: MenuDetailRequestDto) {
    const entity = await this.menuDetailRepository.findOne(id);
    entity.name = requestDto.name;
    entity.cost = requestDto.cost;
    entity.imagePath = requestDto.imagePath;
    return await this.menuDetailRepository.save(entity).then(menuDetail => menuDetail.id)
  }
}