import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Base } from "../base.entity";

@Entity("market")
export class marketTypeEntity extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 20
  })
  name: string;
}