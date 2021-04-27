import { EntityRepository, Repository } from "typeorm";
import { MenuRepository } from "../menu/menu.repository";
import { MenuDetail } from "./menu-detail.entity";

@EntityRepository(MenuDetail)
export class MenuDetailRepository extends Repository<MenuDetail> {}