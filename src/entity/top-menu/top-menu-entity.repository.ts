import { EntityRepository, Repository } from "typeorm";
import { TopMenuEntity } from "./top-menu.entity";

@EntityRepository(TopMenuEntity)
export class TopMenuEntityRepository extends Repository<TopMenuEntity> {}