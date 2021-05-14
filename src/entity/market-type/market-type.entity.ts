import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Base } from "../base.entity";
import { TopMenuEntity } from "../top-menu/top-menu.entity";

@Entity("market_type")
export class MarketTypeEntity extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 20
  })
  name: string;

  @OneToMany(
    (type) => TopMenuEntity,
    (topMenuEntity) => topMenuEntity.marketTypeEntity
  )
  topMenuEntityList!: TopMenuEntity[]
}