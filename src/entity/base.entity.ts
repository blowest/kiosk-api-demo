import { Column, CreateDateColumn, Timestamp, UpdateDateColumn } from 'typeorm';

export abstract class Base {
  @Column({
    name: 'is_active',
    type: 'bool',
    default: true,
  })
  isActive: boolean;

  @CreateDateColumn({
    name: 'created_time',
  })
  createdTime: Timestamp;

  @UpdateDateColumn({
    name: 'modified_time',
  })
  modifiedTime: Timestamp;
}
