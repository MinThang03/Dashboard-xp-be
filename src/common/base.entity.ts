import { CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseEntity {
  @CreateDateColumn({ name: 'NgayTao', nullable: true })
  NgayTao?: Date;

  @UpdateDateColumn({ name: 'NgayCapNhat', nullable: true })
  NgayCapNhat?: Date;
}
