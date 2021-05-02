import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TopMenu } from "../entity/top-menu/top-menu.entity";
import { TopMenuRepository } from "../entity/top-menu/top-menu-repository";
import { TopMenuDto } from "./dto/top-menu.dto";

@Injectable()
export class MenuExposureService {
  constructor(
    @InjectRepository(TopMenu)
    private readonly topMenuRepository: TopMenuRepository,
  ) {}

}