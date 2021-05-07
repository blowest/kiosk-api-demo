import { EntityRepository, Repository } from "typeorm";
import { MenuRepository } from "../menu/menu.repository";
import { MenuDetail } from "./menu-detail.entity";

@EntityRepository(MenuDetail)
export class MenuDetailRepository extends Repository<MenuDetail> {
  findOneActivated(id) {
    const isActive = true;
    return this.findOne({id, isActive});
  }
  findAllActivated() {
    const isActive = true;
    return this.find({isActive});
  }
}