import { EntityRepository, Repository } from "typeorm";
import { MenuEntityRepository } from "../menu/menu-entity.repository";
import { MenuDetailEntity } from "./menu-detail.entity";

@EntityRepository(MenuDetailEntity)
export class MenuDetailEntityRepository extends Repository<MenuDetailEntity> {}