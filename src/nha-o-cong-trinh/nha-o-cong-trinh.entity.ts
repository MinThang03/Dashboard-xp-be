import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'dashboard_xp', name: 'CongTrinh' })
export class NhaOCongTrinh {
  @PrimaryGeneratedColumn({ name: 'MaCongTrinh' })
  MaCongTrinh: number;

  @Column({ name: 'TenCongTrinh', type: 'varchar', length: 200 })
  TenCongTrinh: string;

  @Column({ name: 'DiaDiem', type: 'varchar', length: 255, nullable: true })
  DiaDiem?: string | null;

  @Column({ name: 'MaLoaiCT', type: 'int', nullable: true })
  MaLoaiCT?: number | null;

  @Column({ name: 'ChuDauTu', type: 'varchar', length: 150, nullable: true })
  ChuDauTu?: string | null;

  @Column({ name: 'DienTich', type: 'decimal', precision: 18, scale: 2, nullable: true })
  DienTich?: number | null;

  @Column({ name: 'TongMucDauTu', type: 'decimal', precision: 18, scale: 0, nullable: true })
  TongMucDauTu?: number | null;

  @Column({ name: 'NgayKhoiCong', type: 'date', nullable: true })
  NgayKhoiCong?: Date | null;

  @Column({ name: 'NgayHoanThanh', type: 'date', nullable: true })
  NgayHoanThanh?: Date | null;

  @Column({ name: 'TinhTrang', type: 'varchar', length: 50, nullable: true })
  TinhTrang?: string | null;

  @Column({ name: 'GhiChu', type: 'text', nullable: true })
  GhiChu?: string | null;

  @Column({ name: 'MaXaPhuong', type: 'int', nullable: true })
  MaXaPhuong?: number | null;

  @Column({ name: 'LoaiCongTrinh', type: 'varchar', length: 100, nullable: true })
  LoaiCongTrinh?: string | null;

  @Column({ name: 'PhanLoai', type: 'varchar', length: 100, nullable: true })
  PhanLoai?: string | null;

  @Column({ name: 'DiaChi', type: 'varchar', length: 255, nullable: true })
  DiaChi?: string | null;

  @Column({ name: 'MaThua', type: 'varchar', length: 50, nullable: true })
  MaThua?: string | null;

  @Column({ name: 'SoTo', type: 'varchar', length: 50, nullable: true })
  SoTo?: string | null;

  @Column({ name: 'DienTichSan', type: 'decimal', precision: 18, scale: 2, nullable: true })
  DienTichSan?: number | null;

  @Column({ name: 'SoTang', type: 'int', nullable: true })
  SoTang?: number | null;

  @Column({ name: 'NamXayDung', type: 'int', nullable: true })
  NamXayDung?: number | null;

  @Column({ name: 'ChuSoHuu', type: 'varchar', length: 150, nullable: true })
  ChuSoHuu?: string | null;

  @Column({ name: 'CCCD', type: 'varchar', length: 30, nullable: true })
  CCCD?: string | null;

  @Column({ name: 'SoDienThoai', type: 'varchar', length: 20, nullable: true })
  SoDienThoai?: string | null;

  @Column({ name: 'TinhTrangKienTruc', type: 'varchar', length: 100, nullable: true })
  TinhTrangKienTruc?: string | null;

  @Column({ name: 'TinhTrangPhapLy', type: 'varchar', length: 100, nullable: true })
  TinhTrangPhapLy?: string | null;

  @Column({ name: 'SoGiayPhepXD', type: 'varchar', length: 100, nullable: true })
  SoGiayPhepXD?: string | null;

  @Column({ name: 'NgayKiemTra', type: 'date', nullable: true })
  NgayKiemTra?: Date | null;

  @Column({ name: 'NguoiKiemTra', type: 'varchar', length: 150, nullable: true })
  NguoiKiemTra?: string | null;

  @Column({ name: 'KetQuaKiemTra', type: 'varchar', length: 100, nullable: true })
  KetQuaKiemTra?: string | null;
}
