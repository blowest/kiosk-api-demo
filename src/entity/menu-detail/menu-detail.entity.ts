import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Base } from "../base.entity";

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
    name: "image_path",
    type: "text"
  })
  imagePath: string;
}