import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'dashboard_xp', name: 'ViPham' })
export class ViPham {
  @PrimaryGeneratedColumn({ name: 'MaViPham' })
  MaViPham: number;

  @Column({ name: 'SoBienBan', type: 'varchar', length: 50, nullable: true })
  SoBienBan?: string | null;

  @Column({ name: 'TenViPham', type: 'varchar', length: 200, nullable: true })
  TenViPham?: string | null;

  @Column({ name: 'LoaiViPham', type: 'varchar', length: 50, nullable: true })
  LoaiViPham?: string | null;

  @Column({ name: 'DiaDiem', type: 'varchar', length: 255, nullable: true })
  DiaDiem?: string | null;

  @Column({ name: 'NgayViPham', type: 'date', nullable: true })
  NgayViPham?: Date | null;

  @Column({ name: 'NgayLap', type: 'date', nullable: true })
  NgayLap?: Date | null;

  @Column({ name: 'NguoiViPham', type: 'varchar', length: 150, nullable: true })
  NguoiViPham?: string | null;

  @Column({ name: 'DoiTuong', type: 'varchar', length: 150, nullable: true })
  DoiTuong?: string | null;

  @Column({ name: 'NoiDungViPham', type: 'text', nullable: true })
  NoiDungViPham?: string | null;

  @Column({ name: 'DiaChiViPham', type: 'varchar', length: 255, nullable: true })
  DiaChiViPham?: string | null;

  @Column({ name: 'CanCuPhapLy', type: 'varchar', length: 255, nullable: true })
  CanCuPhapLy?: string | null;

  @Column({ name: 'MucPhat', type: 'decimal', precision: 18, nullable: true })
  MucPhat?: number | null;

  @Column({ name: 'BieuMauXuLy', type: 'varchar', length: 255, nullable: true })
  BieuMauXuLy?: string | null;

  @Column({ name: 'ThoiHanKhacPhuc', type: 'date', nullable: true })
  ThoiHanKhacPhuc?: Date | null;

  @Column({ name: 'CanBoLap', type: 'varchar', length: 150, nullable: true })
  CanBoLap?: string | null;

  @Column({ name: 'NguoiKy', type: 'varchar', length: 150, nullable: true })
  NguoiKy?: string | null;

  @Column({ name: 'NgayXuLy', type: 'date', nullable: true })
  NgayXuLy?: Date | null;

  @Column({ name: 'DaNopPhat', type: 'boolean', nullable: true })
  DaNopPhat?: boolean | null;

  @Column({ name: 'NgayNopPhat', type: 'date', nullable: true })
  NgayNopPhat?: Date | null;

  @Column({ name: 'TaiPham', type: 'boolean', nullable: true })
  TaiPham?: boolean | null;

  @Column({ name: 'TrangThai', type: 'varchar', length: 50, default: 'Đã xử lý' })
  TrangThai: string;

  @Column({ name: 'GhiChu', type: 'text', nullable: true })
  GhiChu?: string | null;

  @Column({ name: 'NguoiLap', type: 'int', nullable: true })
  NguoiLap?: number | null;

}
