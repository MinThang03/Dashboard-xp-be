import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'dashboard_xp', name: 'ViecLam' })
export class ViecLam {
  @PrimaryGeneratedColumn({ name: 'MaViecLam' })
  MaViecLam: number;

  @Column({ name: 'TenCongViec', type: 'varchar', length: 200 })
  TenCongViec: string;

  @Column({ name: 'NhaTuyenDung', type: 'varchar', length: 200, nullable: true })
  NhaTuyenDung?: string | null;

  @Column({ name: 'DiaDiem', type: 'varchar', length: 255, nullable: true })
  DiaDiem?: string | null;

  @Column({ name: 'SoLuongCanTuyen', type: 'int', nullable: true })
  SoLuongCanTuyen?: number | null;

  @Column({ name: 'MucLuong', type: 'decimal', precision: 18, scale: 0, nullable: true })
  MucLuong?: number | null;

  @Column({ name: 'YeuCau', type: 'text', nullable: true })
  YeuCau?: string | null;

  @Column({ name: 'NgayDangTin', type: 'date', nullable: true })
  NgayDangTin?: Date | null;

  @Column({ name: 'NgayHetHan', type: 'date', nullable: true })
  NgayHetHan?: Date | null;

  @Column({ name: 'TrangThai', type: 'varchar', length: 50, nullable: true })
  TrangThai?: string | null;

  @Column({ name: 'GhiChu', type: 'text', nullable: true })
  GhiChu?: string | null;

  @Column({ name: 'HoTen', type: 'varchar', length: 150, nullable: true })
  HoTen?: string | null;

  @Column({ name: 'NgaySinh', type: 'date', nullable: true })
  NgaySinh?: Date | null;

  @Column({ name: 'GioiTinh', type: 'varchar', length: 10, nullable: true })
  GioiTinh?: string | null;

  @Column({ name: 'CCCD', type: 'varchar', length: 30, nullable: true })
  CCCD?: string | null;

  @Column({ name: 'NgheNghiep', type: 'varchar', length: 100, nullable: true })
  NgheNghiep?: string | null;

  @Column({ name: 'TrinhDo', type: 'varchar', length: 100, nullable: true })
  TrinhDo?: string | null;

  @Column({ name: 'KinhNghiem', type: 'text', nullable: true })
  KinhNghiem?: string | null;

  @Column({ name: 'NgheNghiepMongMuon', type: 'varchar', length: 100, nullable: true })
  NgheNghiepMongMuon?: string | null;

  @Column({ name: 'MucLuongMongMuon', type: 'decimal', precision: 18, scale: 0, nullable: true })
  MucLuongMongMuon?: number | null;

  @Column({ name: 'LyDoThatNghiep', type: 'text', nullable: true })
  LyDoThatNghiep?: string | null;

  @Column({ name: 'DangKyBHTN', type: 'boolean', default: false })
  DangKyBHTN?: boolean | null;

  @Column({ name: 'SoThangHuongBHTN', type: 'int', nullable: true })
  SoThangHuongBHTN?: number | null;

  @Column({ name: 'MucHuongBHTN', type: 'decimal', precision: 18, scale: 0, nullable: true })
  MucHuongBHTN?: number | null;
}
