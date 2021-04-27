import { EntityRepository, Repository } from "typeorm";
import { MenuType } from "./menu-type.entity";

@EntityRepository(MenuType)
export class MenuTypeRepository extends Repository<MenuType> {}