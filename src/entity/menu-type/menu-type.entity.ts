import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Base } from "../base.entity";
import { MenuEntity } from "../menu/menu.entity";

@Entity("menu_type")
export class MenuTypeEntity extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 20
  })
  name: string;

  @OneToMany(
    (type) => MenuEntity,
    (menuEntity) => menuEntity.menuTypeEntity
  )
  menuEntityList!: MenuEntity[]
}
