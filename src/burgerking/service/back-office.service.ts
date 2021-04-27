import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TopMenu } from "../entity/top-menu/top-menu.entity";
import { TopMenuRepository } from "../entity/top-menu/top-menu-repository";
import { TopMenuDto } from "../dto/top-menu.dto";

@Injectable()
export class BackOfficeService {
  constructor(
    @InjectRepository(TopMenu)
    private readonly topMenuRepository: TopMenuRepository,
  ) {}

  findTopMenu(id: number): Promise<TopMenu> {
    return this.topMenuRepository.findOne(id);
  }

  findAllTopMenu(): Promise<TopMenu[]> {
    return this.topMenuRepository.find();
  }

  createTopMenu(request: TopMenuDto): Promise<number> {
    const topMenu = new TopMenu();
    topMenu.name = request.name;
    return this.topMenuRepository.save(topMenu).then(r => r.id)
  }
}