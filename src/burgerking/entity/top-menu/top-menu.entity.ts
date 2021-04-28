import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity("top_menu")
export class TopMenu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: "name"})
  name: string

  @CreateDateColumn({name: "created_time"})
  createdTime: Timestamp;

  @UpdateDateColumn({name: "modified_time"})
  modifiedTime: Timestamp;
}