import { EntityRepository, Repository } from "typeorm";
import { MenuTypeEntity } from "./menu-type.entity";

@EntityRepository(MenuTypeEntity)
export class MenuTypeEntityRepository extends Repository<MenuTypeEntity> {}