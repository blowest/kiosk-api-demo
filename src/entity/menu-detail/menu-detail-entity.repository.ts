import { EntityRepository, Repository } from "typeorm";
import { MenuDetailEntity } from "./menu-detail.entity";

@EntityRepository(MenuDetailEntity)
export class MenuDetailEntityRepository extends Repository<MenuDetailEntity> {
  findOneActivated(id) {
    const isActive = true;
    return this.findOne({id, isActive});
  }
  findAllActivated() {
    const isActive = true;
    return this.find({isActive});
  }
}