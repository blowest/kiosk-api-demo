import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import { Base } from "../base.entity";

@Entity("top_menu")
export class TopMenu extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 20,
    nullable: false
  })
  name: string
}