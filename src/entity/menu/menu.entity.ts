import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Base } from "../base.entity";

@Entity("menu")
export class MenuEntity extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: "image_path",
    type: "text"
  })
  imagePath: string;

  @Column({
    name: "is_best",
    type: "bool"
  })
  isBest: boolean;

  @Column({
    name: "min_cost"
  })
  minCost: number;
}
