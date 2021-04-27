import { EntityRepository, Repository } from "typeorm";
import { TopMenu } from "./top-menu.entity";

@EntityRepository(TopMenu)
export class TopMenuRepository extends Repository<TopMenu> {}