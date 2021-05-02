import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("menu_detail")
export class MenuDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  cost: number;

  @Column()
  image: string;
}