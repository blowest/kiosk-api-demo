import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("top_menu")
export class TopMenu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string
}