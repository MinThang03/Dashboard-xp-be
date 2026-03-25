import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'LoaiThuTuc', schema: 'dashboard_xp' })
export class LoaiThuTuc {
  @PrimaryGeneratedColumn()
  MaLoaiThuTuc: number;

  @Column({ type: 'varchar', length: 200 })
  TenThuTuc: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  LinhVuc: string;

  @Column({ type: 'int', default: 3 })
  ThoiGianXuLy: number;

  @Column({ type: 'decimal', precision: 18, scale: 0, default: 0 })
  PhiDichVu: number;

  @Column({ type: 'text', nullable: true })
  MoTa: string;
}
