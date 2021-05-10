import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
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
}
