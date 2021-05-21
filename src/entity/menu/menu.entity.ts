/* eslint-disable prettier/prettier */
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Base } from '../base.entity';
import { TopMenuEntity } from "../top-menu/top-menu.entity";
import { MenuTypeEntity } from "../menu-type/menu-type.entity";
import { MenuDetailEntity } from "../menu-detail/menu-detail.entity";

@Entity("menu")
export class MenuEntity extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: "image_path",
  })
  imagePath: string;

  @Column({
    name: "is_best",
  })
  isBest: boolean;

  @Column({
    name: "min_cost"
  })
  minCost: number;

  @ManyToOne(
    (type) => TopMenuEntity,
    (topMenuEntity) => topMenuEntity.menuEntityList,
    {onDelete: "CASCADE"}
  )
  @JoinColumn({name: "top_menu_id"})
  topMenuEntity!: TopMenuEntity

  @ManyToOne(
    (type) => MenuTypeEntity,
    (menuTypeEntity) => menuTypeEntity.menuEntityList,
    {onDelete: "CASCADE"}
  )
  @JoinColumn({name: "menu_type_id"})
  menuTypeEntity!: MenuTypeEntity

  @OneToMany(
    (type) => MenuDetailEntity,
    (menuDetailEntity) => menuDetailEntity.menuEntity
  )
  menuDetailEntityList!: MenuDetailEntity[]
}
