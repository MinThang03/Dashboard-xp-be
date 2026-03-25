import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'dashboard_xp', name: 'ViPham' })
export class ViPham {
  @PrimaryGeneratedColumn({ name: 'MaViPham' })
  MaViPham: number;

  @Column({ name: 'TenViPham', type: 'varchar', length: 200 })
  TenViPham: string;

  @Column({ name: 'LoaiViPham', type: 'varchar', length: 50, nullable: true })
  LoaiViPham?: string | null;

  @Column({ name: 'DiaDiem', type: 'varchar', length: 255, nullable: true })
  DiaDiem?: string | null;

  @Column({ name: 'NgayViPham', type: 'date' })
  NgayViPham: Date;

  @Column({ name: 'NguoiViPham', type: 'varchar', length: 150, nullable: true })
  NguoiViPham?: string | null;

  @Column({ name: 'MucPhat', type: 'decimal', precision: 18, nullable: true })
  MucPhat?: number | null;

  @Column({ name: 'TrangThai', type: 'varchar', length: 50, default: 'Đã xử lý' })
  TrangThai: string;

  @Column({ name: 'GhiChu', type: 'text', nullable: true })
  GhiChu?: string | null;

  @Column({ name: 'NguoiLap', type: 'int', nullable: true })
  NguoiLap?: number | null;

}
