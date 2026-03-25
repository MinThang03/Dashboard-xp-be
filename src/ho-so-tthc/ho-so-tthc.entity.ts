import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'HoSoTTHC', schema: 'dashboard_xp' })
export class HoSoTTHC {
  @PrimaryColumn({ type: 'varchar', length: 20 })
  MaHoSo: string;

  @Column({ type: 'varchar', length: 50 })
  SoHoSo: string;

  @Column({ type: 'int' })
  MaLoaiThuTuc: number;

  @Column({ type: 'varchar', length: 150 })
  NguoiNop: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  CCCD: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  DiaChiLienHe: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  LinhVuc: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  TenThuTuc: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  SoDienThoai: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  Email: string;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  NgayNop: Date;

  @Column({ type: 'date', nullable: true })
  NgayHenTra: Date;

  @Column({ type: 'date', nullable: true })
  NgayHoanThanh: Date;

  @Column({ type: 'varchar', length: 50, default: 'Đã tiếp nhận' })
  TrangThai: string;

  @Column({ type: 'int', nullable: true })
  CanBoXuLy: number;

  @Column({ type: 'text', nullable: true })
  KetQua: string;

  @Column({ type: 'text', nullable: true })
  GhiChu: string;

  @Column({ type: 'decimal', precision: 18, scale: 0, default: 0 })
  PhiLePhi: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  NgayTao: Date;
}
