import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("menu")
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titleImage: string;

  @Column()
  isBest: boolean;

  @Column()
  minCost: number;
}
