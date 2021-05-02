import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("menu_type")
export class MenuType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
