import { Timestamp } from "typeorm";
import { MenuEntity } from "../../entity/menu/menu.entity";

export class MenuDetailResponseDto {

  id: number;

  name: string;

  cost: number;

  imagePath: string;

  // menuEntity!: MenuEntity;

  isActive: boolean;

  createdTime: Timestamp

  modifiedTime: Timestamp
}