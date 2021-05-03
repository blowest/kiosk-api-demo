import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TopMenu } from "../entity/top-menu/top-menu.entity";
import { TopMenuRepository } from "../entity/top-menu/top-menu.repository";
import { TopMenuDto } from "../burgerking/dto/top-menu.dto";
import { MenuDetailDto } from "./dto/menu-detail.dto";
import { MenuDetail } from "../entity/menu-detail/menu-detail.entity";
import { Menu } from "../entity/menu/menu.entity";
import { MenuDetailRepository } from "../entity/menu-detail/menu-detail.repository";

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

  createTopMenu(request: TopMenuDto): Promise<number> {
    // const c = new MyClass();
    // console.log(c.getName());
    const topMenu = new TopMenu();
    topMenu.name = request.name;
    return this.topMenuRepository.save(topMenu).then(r => r.id)
    // return this.topMenuRepository.save(request.toEntity()).then(r => r.id)
  }

  // Menu Detail service
  createMenuDetail(request: MenuDetailDto) {
    const menuDetail = new MenuDetail();
    menuDetail.name = request.name;
    menuDetail.cost = request.cost;
    menuDetail.imagePath = request.imagePath;

    return this.menuDetailRepository.save(menuDetail).then(menuDetail => menuDetail.id)
  }
}