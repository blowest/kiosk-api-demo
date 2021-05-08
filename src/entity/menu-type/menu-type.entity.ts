import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Base } from "../base.entity";

@Entity("menu_type")
export class MenuTypeEntity extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 20
  })
  name: string;
}
