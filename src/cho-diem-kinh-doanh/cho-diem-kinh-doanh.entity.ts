import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'dashboard_xp', name: 'ChoDiemKinhDoanh' })
export class ChoDiemKinhDoanh {
  @PrimaryGeneratedColumn({ name: 'MaCho' })
  MaCho: number;

  @Column({ name: 'TenCho', type: 'varchar', length: 150, nullable: true })
  TenCho?: string | null;

  @Column({ name: 'MaDiemKD', type: 'varchar', length: 50, nullable: true })
  MaDiemKD?: string | null;

  @Column({ name: 'TenDiemKD', type: 'varchar', length: 200 })
  TenDiemKD: string;

  @Column({ name: 'SoLo', type: 'int', nullable: true })
  SoLo?: number | null;

  @Column({ name: 'TongDienTich', type: 'decimal', precision: 18, scale: 2, nullable: true })
  TongDienTich?: number | null;

  @Column({ name: 'NguoiQuanLy', type: 'varchar', length: 150, nullable: true })
  NguoiQuanLy?: string | null;

  @Column({ name: 'LoaiHinh', type: 'varchar', length: 100, nullable: true })
  LoaiHinh?: string | null;

  @Column({ name: 'DiaChi', type: 'varchar', length: 255, nullable: true })
  DiaChi?: string | null;

  @Column({ name: 'DienTich', type: 'decimal', precision: 12, scale: 2, nullable: true })
  DienTich?: number | null;

  @Column({ name: 'SoGianHang', type: 'int', nullable: true })
  SoGianHang?: number | null;

  @Column({ name: 'SoGianDangKinhDoanh', type: 'int', nullable: true })
  SoGianDangKinhDoanh?: number | null;

  @Column({ name: 'SoGianTrong', type: 'int', nullable: true })
  SoGianTrong?: number | null;

  @Column({ name: 'DoanhThuThang', type: 'decimal', precision: 18, scale: 2, nullable: true })
  DoanhThuThang?: number | null;

  @Column({ name: 'ThuPhiThang', type: 'decimal', precision: 18, scale: 2, nullable: true })
  ThuPhiThang?: number | null;

  @Column({ name: 'BanQuanLy', type: 'varchar', length: 150, nullable: true })
  BanQuanLy?: string | null;

  @Column({ name: 'SoDienThoai', type: 'varchar', length: 20, nullable: true })
  SoDienThoai?: string | null;

  @Column({ name: 'NgayThanhLap', type: 'date', nullable: true })
  NgayThanhLap?: Date | null;

  @Column({ name: 'TrangThai', type: 'varchar', length: 50, default: 'Hoạt động' })
  TrangThai: string;

  @Column({ name: 'GiayPhep', type: 'varchar', length: 100, nullable: true })
  GiayPhep?: string | null;

  @Column({ name: 'NgayCapPhep', type: 'date', nullable: true })
  NgayCapPhep?: Date | null;

  @Column({ name: 'NgayHetHan', type: 'date', nullable: true })
  NgayHetHan?: Date | null;

  @Column({ name: 'CoSoHaTang', type: 'varchar', length: 100, nullable: true })
  CoSoHaTang?: string | null;

  @Column({ name: 'AnNinhTratTu', type: 'varchar', length: 100, nullable: true })
  AnNinhTratTu?: string | null;

  @Column({ name: 'VeSinhMoiTruong', type: 'varchar', length: 100, nullable: true })
  VeSinhMoiTruong?: string | null;

  @Column({ name: 'GhiChu', type: 'text', nullable: true })
  GhiChu?: string | null;
}
