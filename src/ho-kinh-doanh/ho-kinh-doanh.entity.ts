import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'dashboard_xp', name: 'HoKinhDoanh' })
export class HoKinhDoanh {
  @PrimaryGeneratedColumn({ name: 'MaHoKD' })
  MaHoKD: number;

  @Column({ name: 'SoGCN', type: 'varchar', length: 50, nullable: true })
  SoGCN?: string | null;

  @Column({ name: 'TenHoKD', type: 'varchar', length: 200 })
  TenHoKD: string;

  @Column({ name: 'ChuHo', type: 'varchar', length: 150, nullable: true })
  ChuHo?: string | null;

  @Column({ name: 'CCCD', type: 'varchar', length: 20, nullable: true })
  CCCD?: string | null;

  @Column({ name: 'NgaySinh', type: 'date', nullable: true })
  NgaySinh?: Date | null;

  @Column({ name: 'DiaChi', type: 'varchar', length: 255, nullable: true })
  DiaChi?: string | null;

  @Column({ name: 'DiaChiKinhDoanh', type: 'varchar', length: 255, nullable: true })
  DiaChiKinhDoanh?: string | null;

  @Column({ name: 'DienThoai', type: 'varchar', length: 20, nullable: true })
  DienThoai?: string | null;

  @Column({ name: 'Email', type: 'varchar', length: 100, nullable: true })
  Email?: string | null;

  @Column({ name: 'NganhNghe', type: 'varchar', length: 150, nullable: true })
  NganhNghe?: string | null;

  @Column({ name: 'MaNganhNghe', type: 'varchar', length: 20, nullable: true })
  MaNganhNghe?: string | null;

  @Column({ name: 'VonKinhDoanh', type: 'decimal', precision: 18, scale: 2, nullable: true })
  VonKinhDoanh?: number | null;

  @Column({ name: 'DoanhThuNam', type: 'decimal', precision: 18, scale: 2, nullable: true })
  DoanhThuNam?: number | null;

  @Column({ name: 'SoLaoDong', type: 'int', nullable: true })
  SoLaoDong?: number | null;

  @Column({ name: 'NgayDangKy', type: 'date', nullable: true })
  NgayDangKy?: Date | null;

  @Column({ name: 'NgayHetHan', type: 'date', nullable: true })
  NgayHetHan?: Date | null;

  @Column({ name: 'TrangThai', type: 'varchar', length: 50, default: 'Hoạt động' })
  TrangThai: string;

  @Column({ name: 'LanCapPhep', type: 'int', nullable: true })
  LanCapPhep?: number | null;

  @Column({ name: 'DienTichKD', type: 'decimal', precision: 10, scale: 2, nullable: true })
  DienTichKD?: number | null;

  @Column({ name: 'LoaiHinhKD', type: 'varchar', length: 100, nullable: true })
  LoaiHinhKD?: string | null;

  @Column({ name: 'GhiChu', type: 'text', nullable: true })
  GhiChu?: string | null;
}
