import { EntityRepository, Repository } from "typeorm";
import { MenuDetailEntity } from "./menu-detail.entity";

@EntityRepository(MenuDetailEntity)
export class MenuDetailEntityRepository extends Repository<MenuDetailEntity> {}