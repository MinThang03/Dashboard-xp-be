import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'dashboard_xp', name: 'HoNgheo' })
export class HoNgheo {
  @PrimaryGeneratedColumn({ name: 'MaHoNgheo' })
  MaHoNgheo: number;

  @Column({ name: 'MaHGD', type: 'int', nullable: true })
  MaHGD?: number | null;

  @Column({ name: 'CapDoNgheo', type: 'varchar', length: 50, nullable: true })
  CapDoNgheo?: string | null;

  @Column({ name: 'ThuNhapBinhQuan', type: 'decimal', precision: 18, scale: 0, nullable: true })
  ThuNhapBinhQuan?: number | null;

  @Column({ name: 'LyDo', type: 'text', nullable: true })
  LyDo?: string | null;

  @Column({ name: 'TrangThai', type: 'varchar', length: 50, nullable: true })
  TrangThai?: string | null;

  @Column({ name: 'NamXetDuyet', type: 'int', nullable: true })
  NamXetDuyet?: number | null;

  @Column({ name: 'NgayCapNhat', type: 'timestamp', nullable: true })
  NgayCapNhat?: Date | null;

  @Column({ name: 'SoHoKhau', type: 'varchar', length: 50, nullable: true })
  SoHoKhau?: string | null;

  @Column({ name: 'ChuHo', type: 'varchar', length: 150, nullable: true })
  ChuHo?: string | null;

  @Column({ name: 'CCCD', type: 'varchar', length: 30, nullable: true })
  CCCD?: string | null;

  @Column({ name: 'NgaySinh', type: 'date', nullable: true })
  NgaySinh?: Date | null;

  @Column({ name: 'GioiTinh', type: 'varchar', length: 10, nullable: true })
  GioiTinh?: string | null;

  @Column({ name: 'DiaChi', type: 'varchar', length: 255, nullable: true })
  DiaChi?: string | null;

  @Column({ name: 'SoThanhVien', type: 'int', nullable: true })
  SoThanhVien?: number | null;

  @Column({ name: 'MucDoNgheo', type: 'varchar', length: 50, nullable: true })
  MucDoNgheo?: string | null;

  @Column({ name: 'NamDanhGia', type: 'int', nullable: true })
  NamDanhGia?: number | null;

  @Column({ name: 'LyDoNgheo', type: 'text', nullable: true })
  LyDoNgheo?: string | null;

  @Column({ name: 'DangHuongChinhSach', type: 'boolean', default: false })
  DangHuongChinhSach?: boolean | null;

  @Column({ name: 'ChinhSachHuong', type: 'text', nullable: true })
  ChinhSachHuong?: string | null;

  @Column({ name: 'GhiChu', type: 'text', nullable: true })
  GhiChu?: string | null;
}
