import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ schema: 'dashboard_xp', name: 'HoTich' })
export class HoTich {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30, unique: true })
  so_ho_tich: string;

  @Column({ type: 'varchar', length: 150 })
  ten_chu_ho: string;

  @Column({ type: 'date', nullable: true })
  ngay_sinh_chu_ho?: Date;

  @Column({ type: 'varchar', length: 10, nullable: true })
  gioi_tinh_chu_ho?: string;

  @Column({ type: 'varchar', length: 255 })
  dia_chi_ho_tich: string;

  @Column({ type: 'int', default: 0 })
  so_thanh_vien_ho_tich: number;

  @Column({ type: 'date', nullable: true })
  ngay_lap_ho_tich?: Date;

  @Column({ type: 'text', nullable: true })
  ghi_chu?: string;

  @Column({ type: 'boolean', default: true })
  trang_thai: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
