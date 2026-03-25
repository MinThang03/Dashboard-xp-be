import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'dashboard_xp', name: 'LopHoc' })
export class LopHoc {
  @PrimaryGeneratedColumn({ name: 'MaLop' })
  MaLop: number;

  @Column({ name: 'TenLop', type: 'varchar', length: 50, nullable: true })
  TenLop?: string | null;

  @Column({ name: 'Khoi', type: 'varchar', length: 20, nullable: true })
  Khoi?: string | null;

  @Column({ name: 'MaCoSo', type: 'int', nullable: true })
  MaCoSo?: number | null;

  @Column({ name: 'GiaoVienChuNhiem', type: 'varchar', length: 150, nullable: true })
  GiaoVienChuNhiem?: string | null;

  @Column({ name: 'SoHocSinh', type: 'int', default: 0 })
  SoHocSinh: number;

  @Column({ name: 'GhiChu', type: 'text', nullable: true })
  GhiChu?: string | null;

  @Column({ name: 'MaLopCode', type: 'varchar', length: 50, nullable: true })
  MaLopCode?: string | null;

  @Column({ name: 'MaTruong', type: 'varchar', length: 50, nullable: true })
  MaTruong?: string | null;

  @Column({ name: 'TenTruong', type: 'varchar', length: 200, nullable: true })
  TenTruong?: string | null;

  @Column({ name: 'LoaiTruong', type: 'varchar', length: 50, nullable: true })
  LoaiTruong?: string | null;

  @Column({ name: 'NamHoc', type: 'varchar', length: 20, nullable: true })
  NamHoc?: string | null;

  @Column({ name: 'HocKy', type: 'int', nullable: true })
  HocKy?: number | null;

  @Column({ name: 'SiSoDauNam', type: 'int', nullable: true })
  SiSoDauNam?: number | null;

  @Column({ name: 'SiSoHienTai', type: 'int', nullable: true })
  SiSoHienTai?: number | null;

  @Column({ name: 'Nam', type: 'int', nullable: true })
  Nam?: number | null;

  @Column({ name: 'Nu', type: 'int', nullable: true })
  Nu?: number | null;

  @Column({ name: 'CoMatHomNay', type: 'int', nullable: true })
  CoMatHomNay?: number | null;

  @Column({ name: 'VangCoPhep', type: 'int', nullable: true })
  VangCoPhep?: number | null;

  @Column({ name: 'VangKhongPhep', type: 'int', nullable: true })
  VangKhongPhep?: number | null;

  @Column({ name: 'TyLeDiHoc', type: 'decimal', precision: 5, scale: 2, nullable: true })
  TyLeDiHoc?: number | null;

  @Column({ name: 'NgayCapNhat', type: 'date', nullable: true })
  NgayCapNhat?: Date | null;
}
