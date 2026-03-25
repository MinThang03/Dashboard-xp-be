import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'dashboard_xp', name: 'TiemChung' })
export class TiemChung {
  @PrimaryGeneratedColumn({ name: 'MaTiemChung' })
  MaTiemChung: number;

  @Column({ name: 'TenDot', type: 'varchar', length: 150, nullable: true })
  TenDot?: string | null;

  @Column({ name: 'LoaiVacxin', type: 'varchar', length: 100, nullable: true })
  LoaiVacxin?: string | null;

  @Column({ name: 'NgayBatDau', type: 'date', nullable: true })
  NgayBatDau?: Date | null;

  @Column({ name: 'NgayKetThuc', type: 'date', nullable: true })
  NgayKetThuc?: Date | null;

  @Column({ name: 'SoLuongDaTiem', type: 'int', default: 0 })
  SoLuongDaTiem: number;

  @Column({ name: 'SoLuongKeHoach', type: 'int', nullable: true })
  SoLuongKeHoach?: number | null;

  @Column({ name: 'MaTram', type: 'int', nullable: true })
  MaTram?: number | null;

  @Column({ name: 'TrangThai', type: 'varchar', length: 50, nullable: true })
  TrangThai?: string | null;

  @Column({ name: 'GhiChu', type: 'text', nullable: true })
  GhiChu?: string | null;

  @Column({ name: 'NgayTao', type: 'timestamp', nullable: true })
  NgayTao?: Date | null;

  @Column({ name: 'MaPhieu', type: 'varchar', length: 50, nullable: true })
  MaPhieu?: string | null;

  @Column({ name: 'MaDoiTuong', type: 'int', nullable: true })
  MaDoiTuong?: number | null;

  @Column({ name: 'TenDoiTuong', type: 'varchar', length: 150, nullable: true })
  TenDoiTuong?: string | null;

  @Column({ name: 'NgaySinh', type: 'date', nullable: true })
  NgaySinh?: Date | null;

  @Column({ name: 'GioiTinh', type: 'varchar', length: 10, nullable: true })
  GioiTinh?: string | null;

  @Column({ name: 'TenChaMeBaoHo', type: 'varchar', length: 150, nullable: true })
  TenChaMeBaoHo?: string | null;

  @Column({ name: 'SoDienThoai', type: 'varchar', length: 20, nullable: true })
  SoDienThoai?: string | null;

  @Column({ name: 'DiaChi', type: 'varchar', length: 255, nullable: true })
  DiaChi?: string | null;

  @Column({ name: 'LoaiDoiTuong', type: 'varchar', length: 50, nullable: true })
  LoaiDoiTuong?: string | null;

  @Column({ name: 'TenVacXin', type: 'varchar', length: 150, nullable: true })
  TenVacXin?: string | null;

  @Column({ name: 'LoaiVacXin', type: 'varchar', length: 100, nullable: true })
  LoaiVacXin?: string | null;

  @Column({ name: 'MuiThu', type: 'int', default: 1 })
  MuiThu: number;

  @Column({ name: 'TongSoMui', type: 'int', default: 1 })
  TongSoMui: number;

  @Column({ name: 'NgayTiem', type: 'timestamp', nullable: true })
  NgayTiem?: Date | null;

  @Column({ name: 'ViTriTiem', type: 'varchar', length: 100, nullable: true })
  ViTriTiem?: string | null;

  @Column({ name: 'SoLo', type: 'varchar', length: 50, nullable: true })
  SoLo?: string | null;

  @Column({ name: 'NguoiTiem', type: 'varchar', length: 150, nullable: true })
  NguoiTiem?: string | null;

  @Column({ name: 'MaTrangThai', type: 'varchar', length: 30, nullable: true })
  MaTrangThai?: string | null;

  @Column({ name: 'PhanUngSauTiem', type: 'text', nullable: true })
  PhanUngSauTiem?: string | null;

  @Column({ name: 'NgayHenTiemKe', type: 'date', nullable: true })
  NgayHenTiemKe?: Date | null;
}
