import {
  Column,
  CreateDateColumn,
  Entity, JoinColumn,
  ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn
} from "typeorm";
import { Base } from "../base.entity";
import { MarketTypeEntity } from "../market-type/market-type.entity";
import { MenuEntity } from "../menu/menu.entity";

@Entity("top_menu")
export class TopMenuEntity extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 20,
    nullable: false
  })
  name: string

  @ManyToOne(
    (type) => MarketTypeEntity,
    (marketTypeEntity) => marketTypeEntity.topMenuEntityList,
    {onDelete: "CASCADE"}
  )
  @JoinColumn({name: "market_type_id"})
  marketTypeEntity!: MarketTypeEntity

  @OneToMany(
    (type) => MenuEntity,
    (menuEntity) => menuEntity.topMenuEntity
  )
  menuEntityList!: MenuEntity[]
}