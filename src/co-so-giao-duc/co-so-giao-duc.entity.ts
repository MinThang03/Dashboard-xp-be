import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'dashboard_xp', name: 'CoSoGiaoDuc' })
export class CoSoGiaoDuc {
  @PrimaryGeneratedColumn({ name: 'MaCoSo' })
  MaCoSo: number;

  @Column({ name: 'TenCoSo', type: 'varchar', length: 200 })
  TenCoSo: string;

  @Column({ name: 'LoaiHinh', type: 'varchar', length: 50, nullable: true })
  LoaiHinh?: string | null;

  @Column({ name: 'DiaChi', type: 'varchar', length: 255, nullable: true })
  DiaChi?: string | null;

  @Column({ name: 'SoDienThoai', type: 'varchar', length: 20, nullable: true })
  SoDienThoai?: string | null;

  @Column({ name: 'SoHocSinh', type: 'int' })
  SoHocSinh: number;

  @Column({ name: 'SoGiaoVien', type: 'int' })
  SoGiaoVien: number;

  @Column({ name: 'TrangThai', type: 'boolean' })
  TrangThai: boolean;

  @Column({ name: 'GhiChu', type: 'text', nullable: true })
  GhiChu?: string | null;

  @Column({ name: 'NgayTao', type: 'timestamp' })
  NgayTao: Date;

  @Column({ name: 'MaTruong', type: 'varchar', length: 50, nullable: true })
  MaTruong?: string | null;

  @Column({ name: 'TenTruong', type: 'varchar', length: 200, nullable: true })
  TenTruong?: string | null;

  @Column({ name: 'LoaiTruong', type: 'varchar', length: 50, nullable: true })
  LoaiTruong?: string | null;

  @Column({ name: 'DienThoai', type: 'varchar', length: 20, nullable: true })
  DienThoai?: string | null;

  @Column({ name: 'Email', type: 'varchar', length: 150, nullable: true })
  Email?: string | null;

  @Column({ name: 'HieuTruong', type: 'varchar', length: 150, nullable: true })
  HieuTruong?: string | null;

  @Column({ name: 'NamThanhLap', type: 'int', nullable: true })
  NamThanhLap?: number | null;

  @Column({ name: 'DienTich', type: 'decimal', precision: 12, scale: 2, nullable: true })
  DienTich?: number | null;

  @Column({ name: 'SoPhongHoc', type: 'int', nullable: true })
  SoPhongHoc?: number | null;

  @Column({ name: 'SoPhongChucNang', type: 'int', nullable: true })
  SoPhongChucNang?: number | null;

  @Column({ name: 'TrangThietBi', type: 'varchar', length: 100, nullable: true })
  TrangThietBi?: string | null;

  @Column({ name: 'TinhTrangCoSo', type: 'varchar', length: 100, nullable: true })
  TinhTrangCoSo?: string | null;

  @Column({ name: 'DatChuan', type: 'boolean', nullable: true })
  DatChuan?: boolean | null;

  @Column({ name: 'XepLoai', type: 'varchar', length: 150, nullable: true })
  XepLoai?: string | null;

  @Column({ name: 'NgayCapNhat', type: 'date', nullable: true })
  NgayCapNhat?: Date | null;

}
