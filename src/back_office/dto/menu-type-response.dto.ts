import { Timestamp } from "typeorm";

export class MenuTypeResponseDto {

  id: number;

  name: string;

  isActive: boolean;

  createdTime: Timestamp

  modifiedTime: Timestamp
}