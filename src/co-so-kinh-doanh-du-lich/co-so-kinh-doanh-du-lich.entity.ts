import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'dashboard_xp', name: 'CoSoKinhDoanhDuLich' })
export class CoSoKinhDoanhDuLich {
  @PrimaryGeneratedColumn({ name: 'MaCoSo' })
  MaCoSo: number;

  @Column({ name: 'MaCoSoCode', type: 'varchar', length: 50, nullable: true })
  MaCoSoCode?: string | null;

  @Column({ name: 'TenCoSo', type: 'varchar', length: 200 })
  TenCoSo: string;

  @Column({ name: 'LoaiHinh', type: 'varchar', length: 100, nullable: true })
  LoaiHinh?: string | null;

  @Column({ name: 'PhanLoai', type: 'varchar', length: 100, nullable: true })
  PhanLoai?: string | null;

  @Column({ name: 'ChuCoSo', type: 'varchar', length: 150, nullable: true })
  ChuCoSo?: string | null;

  @Column({ name: 'SoDienThoai', type: 'varchar', length: 20, nullable: true })
  SoDienThoai?: string | null;

  @Column({ name: 'Email', type: 'varchar', length: 150, nullable: true })
  Email?: string | null;

  @Column({ name: 'DiaChi', type: 'varchar', length: 255, nullable: true })
  DiaChi?: string | null;

  @Column({ name: 'SoPhong', type: 'int', nullable: true })
  SoPhong?: number | null;

  @Column({ name: 'SucChua', type: 'int', nullable: true })
  SucChua?: number | null;

  @Column({ name: 'SaoXepHang', type: 'int', nullable: true })
  SaoXepHang?: number | null;

  @Column({ name: 'GiayCN', type: 'varchar', length: 100, nullable: true })
  GiayCN?: string | null;

  @Column({ name: 'NgayCapPhep', type: 'date', nullable: true })
  NgayCapPhep?: Date | null;

  @Column({ name: 'NgayHetHan', type: 'date', nullable: true })
  NgayHetHan?: Date | null;

  @Column({ name: 'DoanhThuThang', type: 'decimal', precision: 18, scale: 2, nullable: true })
  DoanhThuThang?: number | null;

  @Column({ name: 'LuotKhachThang', type: 'int', nullable: true })
  LuotKhachThang?: number | null;

  @Column({ name: 'DanhGiaTB', type: 'decimal', precision: 4, scale: 2, nullable: true })
  DanhGiaTB?: number | null;

  @Column({ name: 'TienIch', type: 'text', nullable: true })
  TienIch?: string | null;

  @Column({ name: 'TrangThai', type: 'varchar', length: 50, default: 'Hoạt động' })
  TrangThai: string;

  @Column({ name: 'TinhTrangCapPhep', type: 'varchar', length: 100, nullable: true })
  TinhTrangCapPhep?: string | null;

  @Column({ name: 'DieuKienKinhDoanh', type: 'text', nullable: true })
  DieuKienKinhDoanh?: string | null;

  @Column({ name: 'GhiChu', type: 'text', nullable: true })
  GhiChu?: string | null;
}
