import { Timestamp } from "typeorm";

export class MenuResponseDto {
  id: number;

  imagePath: string;

  isBest: boolean;

  minCost: number;

  isActive: boolean;

  createdTime: Timestamp;

  modifiedTime: Timestamp;
}