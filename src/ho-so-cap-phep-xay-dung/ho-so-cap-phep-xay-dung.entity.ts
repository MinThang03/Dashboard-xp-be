import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'dashboard_xp', name: 'HoSoCapPhepXayDung' })
export class HoSoCapPhepXayDung {
  @PrimaryGeneratedColumn({ name: 'MaHoSo' })
  MaHoSo: number;

  @Column({ name: 'TenCongTrinh', type: 'varchar', length: 200 })
  TenCongTrinh: string;

  @Column({ name: 'DiaDiem', type: 'varchar', length: 255, nullable: true })
  DiaDiem?: string | null;

  @Column({ name: 'ChuDauTu', type: 'varchar', length: 150, nullable: true })
  ChuDauTu?: string | null;

  @Column({ name: 'DienTich', type: 'decimal', precision: 18, scale: 2, nullable: true })
  DienTich?: number | null;

  @Column({ name: 'NgayNopHoSo', type: 'date', nullable: true })
  NgayNopHoSo?: Date | null;

  @Column({ name: 'TrangThai', type: 'varchar', length: 50, nullable: true })
  TrangThai?: string | null;

  @Column({ name: 'MaCanBo', type: 'int', nullable: true })
  MaCanBo?: number | null;

  @Column({ name: 'LoaiCongTrinh', type: 'varchar', length: 100, nullable: true })
  LoaiCongTrinh?: string | null;

  @Column({ name: 'LoaiGiayPhep', type: 'varchar', length: 100, nullable: true })
  LoaiGiayPhep?: string | null;

  @Column({ name: 'CCCD', type: 'varchar', length: 30, nullable: true })
  CCCD?: string | null;

  @Column({ name: 'SoDienThoai', type: 'varchar', length: 20, nullable: true })
  SoDienThoai?: string | null;

  @Column({ name: 'DiaChi', type: 'varchar', length: 255, nullable: true })
  DiaChi?: string | null;

  @Column({ name: 'DiaChiCongTrinh', type: 'varchar', length: 255, nullable: true })
  DiaChiCongTrinh?: string | null;

  @Column({ name: 'MaThua', type: 'varchar', length: 50, nullable: true })
  MaThua?: string | null;

  @Column({ name: 'SoTo', type: 'varchar', length: 50, nullable: true })
  SoTo?: string | null;

  @Column({ name: 'DienTichXayDung', type: 'decimal', precision: 18, scale: 2, nullable: true })
  DienTichXayDung?: number | null;

  @Column({ name: 'DienTichSan', type: 'decimal', precision: 18, scale: 2, nullable: true })
  DienTichSan?: number | null;

  @Column({ name: 'SoTang', type: 'int', nullable: true })
  SoTang?: number | null;

  @Column({ name: 'ChieuCao', type: 'decimal', precision: 10, scale: 2, nullable: true })
  ChieuCao?: number | null;

  @Column({ name: 'NgayNop', type: 'date', nullable: true })
  NgayNop?: Date | null;

  @Column({ name: 'NgayHenTra', type: 'date', nullable: true })
  NgayHenTra?: Date | null;

  @Column({ name: 'CanBoTiepNhan', type: 'varchar', length: 150, nullable: true })
  CanBoTiepNhan?: string | null;

  @Column({ name: 'CanBoThamDinh', type: 'varchar', length: 150, nullable: true })
  CanBoThamDinh?: string | null;

  @Column({ name: 'SoGiayPhep', type: 'varchar', length: 100, nullable: true })
  SoGiayPhep?: string | null;

  @Column({ name: 'NgayCapPhep', type: 'date', nullable: true })
  NgayCapPhep?: Date | null;

  @Column({ name: 'ThoiHanPhep', type: 'varchar', length: 100, nullable: true })
  ThoiHanPhep?: string | null;

  @Column({ name: 'GhiChu', type: 'text', nullable: true })
  GhiChu?: string | null;
}
