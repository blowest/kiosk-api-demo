import { Timestamp } from "typeorm";

export class MenuDetailResponseDto {

  id: number;

  name: string;

  cost: number;

  imagePath: string;

  isActive: boolean;

  createdTime: Timestamp

  modifiedTime: Timestamp
}