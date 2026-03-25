import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'ChungThuc', schema: 'dashboard_xp' })
export class ChungThuc {
  @PrimaryGeneratedColumn()
  MaChungThuc: number;

  @Column({ type: 'varchar', length: 50 })
  SoChungThuc: string;

  @Column({ type: 'varchar', length: 100 })
  LoaiGiayTo: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  TenNghiepVu: string;

  @Column({ type: 'varchar', length: 150 })
  NguoiYeuCau: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  CCCD: string;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  NgayYeuCau: Date;

  @Column({ type: 'date', nullable: true })
  NgayHoanThanh: Date;

  @Column({ type: 'varchar', length: 50, default: 'Đang xử lý' })
  TrangThai: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  MaTrangThai: string;

  @Column({ type: 'int', nullable: true })
  NguoiXuLy: number;

  @Column({ type: 'varchar', length: 150, nullable: true })
  TenCanBoXuLy: string;

  @Column({ type: 'date', nullable: true })
  HanXuLy: Date;

  @Column({ type: 'int', default: 2 })
  MucDoUuTien: number;

  @Column({ type: 'decimal', precision: 18, scale: 0, default: 0 })
  PhiDichVu: number;

  @Column({ type: 'text', nullable: true })
  GhiChu: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  NgayTao: Date;
}
