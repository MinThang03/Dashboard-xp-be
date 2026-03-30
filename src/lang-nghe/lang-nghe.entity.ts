import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'dashboard_xp', name: 'LangNghe' })
export class LangNghe {
  @PrimaryGeneratedColumn({ name: 'MaLangNghe' })
  MaLangNghe: number;

  @Column({ name: 'TenLangNghe', type: 'varchar', length: 200 })
  TenLangNghe: string;

  @Column({ name: 'MaLN', type: 'varchar', length: 50, nullable: true })
  MaLN?: string | null;

  @Column({ name: 'LoaiNghe', type: 'varchar', length: 100, nullable: true })
  LoaiNghe?: string | null;

  @Column({ name: 'LoaiNgheNghiep', type: 'varchar', length: 100, nullable: true })
  LoaiNgheNghiep?: string | null;

  @Column({ name: 'DiaChi', type: 'varchar', length: 255, nullable: true })
  DiaChi?: string | null;

  @Column({ name: 'DienTich', type: 'decimal', precision: 18, scale: 2, nullable: true })
  DienTich?: number | null;

  @Column({ name: 'SoHoNghe', type: 'int' })
  SoHoNghe: number;

  @Column({ name: 'SoNgheNhan', type: 'int', nullable: true })
  SoNgheNhan?: number | null;

  @Column({ name: 'SoLaoDong', type: 'int', nullable: true })
  SoLaoDong?: number | null;

  @Column({ name: 'DoanhThuNam', type: 'decimal', precision: 18, scale: 2, nullable: true })
  DoanhThuNam?: number | null;

  @Column({ name: 'NamThanhLap', type: 'int', nullable: true })
  NamThanhLap?: number | null;

  @Column({ name: 'DanhHieu', type: 'varchar', length: 255, nullable: true })
  DanhHieu?: string | null;

  @Column({ name: 'NamCongNhan', type: 'int', nullable: true })
  NamCongNhan?: number | null;

  @Column({ name: 'SanPhamChinh', type: 'varchar', length: 200, nullable: true })
  SanPhamChinh?: string | null;

  @Column({ name: 'ThiTruong', type: 'varchar', length: 200, nullable: true })
  ThiTruong?: string | null;

  @Column({ name: 'HoTro', type: 'text', nullable: true })
  HoTro?: string | null;

  @Column({ name: 'MoTa', type: 'text', nullable: true })
  MoTa?: string | null;

  @Column({ name: 'LienHe', type: 'varchar', length: 150, nullable: true })
  LienHe?: string | null;

  @Column({ name: 'DienThoai', type: 'varchar', length: 20, nullable: true })
  DienThoai?: string | null;

  @Column({ name: 'TinhTrang', type: 'varchar', length: 50, nullable: true })
  TinhTrang?: string | null;

  @Column({ name: 'TrangThai', type: 'boolean' })
  TrangThai: boolean;

  @Column({ name: 'SanLuongThang', type: 'int', default: 0 })
  SanLuongThang: number;

  @Column({ name: 'ChungNhan', type: 'varchar', length: 100, nullable: true })
  ChungNhan?: string | null;

  @Column({ name: 'GhiChu', type: 'text', nullable: true })
  GhiChu?: string | null;

  @Column({ name: 'NgayTao', type: 'timestamp' })
  NgayTao: Date;

}
