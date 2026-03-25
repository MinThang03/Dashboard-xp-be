import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'HoKhau', schema: 'dashboard_xp' })
export class HoKhau {
  @PrimaryColumn({ type: 'varchar', length: 20 })
  MaHoKhau: string;

  @Column({ type: 'varchar', length: 50 })
  SoHoKhau: string;

  @Column({ type: 'varchar', length: 150 })
  ChuHo: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  CCCDChuHo: string;

  @Column({ type: 'date', nullable: true })
  NgaySinhChuHo: Date;

  @Column({ type: 'varchar', length: 10, nullable: true })
  GioiTinhChuHo: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  SoDienThoaiChuHo: string;

  @Column({ type: 'varchar', length: 255 })
  DiaChiThuongTru: string;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  NgayDangKy: Date;

  @Column({ type: 'varchar', length: 50, default: 'Thường trú' })
  LoaiHoKhau: string;

  @Column({ type: 'int', default: 1 })
  SoThanhVien: number;

  @Column({ type: 'varchar', length: 50, default: 'Hoạt động' })
  TrangThai: string;

  @Column({ type: 'text', nullable: true })
  GhiChu: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  NgayTao: Date;
}
