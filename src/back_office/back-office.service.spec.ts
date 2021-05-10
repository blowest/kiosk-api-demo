import { Test, TestingModule } from '@nestjs/testing';
import { BackOfficeService } from './back-office.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuEntity } from '../entity/menu/menu.entity';
import { MenuEntityRepository } from "../entity/menu/menu-entity.repository";
import { MenuDetailEntityRepository } from "../entity/menu-detail/menu-detail-entity.repository";
import { MenuTypeEntityRepository } from "../entity/menu-type/menu-type-entity.repository";
import { TopMenuEntityRepository } from "../entity/top-menu/top-menu-entity.repository";
import { MenuDetailEntity } from "../entity/menu-detail/menu-detail.entity";
import { TopMenuEntity } from "../entity/top-menu/top-menu.entity";
import { MenuTypeEntity } from "../entity/menu-type/menu-type.entity";

describe('back-office TEST', () => {
  let service: BackOfficeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'root',
          database: 'kiosk',
          entities: [MenuEntity, MenuTypeEntity, MenuDetailEntity, TopMenuEntity],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([
          MenuEntityRepository,
          MenuDetailEntityRepository,
          MenuTypeEntityRepository,
          TopMenuEntityRepository,
        ]),
      ],
      providers: [BackOfficeService],
    }).compile();

    service = module.get<BackOfficeService>(BackOfficeService);
  });

  it('메뉴 조회', async () => {
    const result = await service.findMenu(1);

    expect(result.id).toBe(1);
    expect(result.imagePath).toBe("test_path");
    expect(result.isBest).toBe(true);
    expect(result.minCost).toBe(10000);
  });
});
