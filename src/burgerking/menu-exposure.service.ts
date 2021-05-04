import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TopMenuEntity } from "../entity/top-menu/top-menu.entity";
import { TopMenuEntityRepository } from "../entity/top-menu/top-menu-entity.repository";

@Injectable()
export class MenuExposureService {
  constructor(
    @InjectRepository(TopMenuEntity)
    private readonly topMenuRepository: TopMenuEntityRepository,
  ) {}

}