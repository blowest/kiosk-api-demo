import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Base } from "../base.entity";
import { MenuEntity } from "../menu/menu.entity";

@Entity("menu_detail")
export class MenuDetailEntity extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 20
  })
  name: string;

  @Column()
  cost: number;

  @Column({
    name: "image_path"
  })
  imagePath: string;

  @ManyToOne(
    (type) => MenuEntity,
    (menuEntity) => menuEntity.menuDetailEntityList,
    {onDelete: "CASCADE"}
  )
  @JoinColumn({name: "menu_id"})
  menuEntity!: MenuEntity
}