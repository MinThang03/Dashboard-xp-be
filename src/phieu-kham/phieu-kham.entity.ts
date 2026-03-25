import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'dashboard_xp', name: 'PhieuKham' })
export class PhieuKham {
  @PrimaryGeneratedColumn({ name: 'MaPhieuKham' })
  MaPhieuKham: number;

  @Column({ name: 'MaCongDan', type: 'int', nullable: true })
  MaCongDan?: number | null;

  @Column({ name: 'HoTenBenhNhan', type: 'varchar', length: 150 })
  HoTenBenhNhan: string;

  @Column({ name: 'NgayKham', type: 'date', nullable: true })
  NgayKham?: Date | null;

  @Column({ name: 'TrieuChung', type: 'text', nullable: true })
  TrieuChung?: string | null;

  @Column({ name: 'ChanDoan', type: 'text', nullable: true })
  ChanDoan?: string | null;

  @Column({ name: 'DonThuoc', type: 'text', nullable: true })
  DonThuoc?: string | null;

  @Column({ name: 'ChiPhi', type: 'decimal', precision: 18, scale: 0, default: 0 })
  ChiPhi: number;

  @Column({ name: 'MaTram', type: 'int', nullable: true })
  MaTram?: number | null;

  @Column({ name: 'BacSiXuLy', type: 'int', nullable: true })
  BacSiXuLy?: number | null;

  @Column({ name: 'TrangThai', type: 'varchar', length: 50, nullable: true })
  TrangThai?: string | null;

  @Column({ name: 'GhiChu', type: 'text', nullable: true })
  GhiChu?: string | null;

  @Column({ name: 'MaPhieu', type: 'varchar', length: 50, nullable: true })
  MaPhieu?: string | null;

  @Column({ name: 'TenBenhNhan', type: 'varchar', length: 150, nullable: true })
  TenBenhNhan?: string | null;

  @Column({ name: 'NgaySinh', type: 'date', nullable: true })
  NgaySinh?: Date | null;

  @Column({ name: 'GioiTinh', type: 'varchar', length: 10, nullable: true })
  GioiTinh?: string | null;

  @Column({ name: 'CCCD', type: 'varchar', length: 20, nullable: true })
  CCCD?: string | null;

  @Column({ name: 'SoDienThoai', type: 'varchar', length: 20, nullable: true })
  SoDienThoai?: string | null;

  @Column({ name: 'DiaChi', type: 'varchar', length: 255, nullable: true })
  DiaChi?: string | null;

  @Column({ name: 'MaBHYT', type: 'varchar', length: 30, nullable: true })
  MaBHYT?: string | null;

  @Column({ name: 'NhietDo', type: 'decimal', precision: 4, scale: 1, nullable: true })
  NhietDo?: number | null;

  @Column({ name: 'HuyetAp', type: 'varchar', length: 20, nullable: true })
  HuyetAp?: string | null;

  @Column({ name: 'NhipTim', type: 'int', nullable: true })
  NhipTim?: number | null;

  @Column({ name: 'CanNang', type: 'decimal', precision: 5, scale: 1, nullable: true })
  CanNang?: number | null;

  @Column({ name: 'ChieuCao', type: 'decimal', precision: 5, scale: 1, nullable: true })
  ChieuCao?: number | null;

  @Column({ name: 'PhuongPhapDieuTri', type: 'text', nullable: true })
  PhuongPhapDieuTri?: string | null;

  @Column({ name: 'BacSiKham', type: 'varchar', length: 150, nullable: true })
  BacSiKham?: string | null;

  @Column({ name: 'MaTrangThai', type: 'varchar', length: 30, nullable: true })
  MaTrangThai?: string | null;

  @Column({ name: 'NgayTaiKham', type: 'date', nullable: true })
  NgayTaiKham?: Date | null;

  @Column({ name: 'PhiKham', type: 'decimal', precision: 18, scale: 0, nullable: true })
  PhiKham?: number | null;

  @Column({ name: 'BHYTChiTra', type: 'decimal', precision: 18, scale: 0, nullable: true })
  BHYTChiTra?: number | null;
}
