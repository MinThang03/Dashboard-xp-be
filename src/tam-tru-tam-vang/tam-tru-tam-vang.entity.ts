import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'TamTruTamVang', schema: 'dashboard_xp' })
export class TamTruTamVang {
  @PrimaryGeneratedColumn()
  MaHoSo: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  MaDangKy?: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  HoTen?: string | null;

  @Column({ type: 'varchar', length: 150 })
  HoTenNguoiKhaiBao: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  CCCD: string;

  @Column({ type: 'date', nullable: true })
  NgaySinh?: Date | null;

  @Column({ type: 'varchar', length: 10, nullable: true })
  GioiTinh?: string | null;

  @Column({ type: 'varchar', length: 150, nullable: true })
  QueQuan?: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  DiaChiThuongTru: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  DiaChiTamTru: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  ChuHo?: string | null;

  @Column({ type: 'varchar', length: 80, nullable: true })
  QuanHeVoiChuHo?: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  SoDienThoai?: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  LoaiDangKy: string;

  @Column({ type: 'date', nullable: true })
  TuNgay: Date;

  @Column({ type: 'date', nullable: true })
  DenNgay: Date;

  @Column({ type: 'date', nullable: true })
  NgayDangKy?: Date | null;

  @Column({ type: 'date', nullable: true })
  NgayHetHan?: Date | null;

  @Column({ type: 'text', nullable: true })
  LyDo?: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  TrangThai?: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  CanBoXuLy?: string | null;

  @Column({ type: 'varchar', length: 50, default: 'Chờ duyệt' })
  TinhTrangHoSo: string;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  NgayKhaiBao: Date;

  @Column({ type: 'text', nullable: true })
  GhiChu?: string | null;

  @Column({ type: 'int', nullable: true })
  MaCanBo: number;
}
