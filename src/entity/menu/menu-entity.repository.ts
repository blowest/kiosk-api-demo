import { EntityRepository, Repository } from 'typeorm';
import { MenuEntity } from './menu.entity';

@EntityRepository(MenuEntity)
export class MenuEntityRepository extends Repository<MenuEntity> {}
