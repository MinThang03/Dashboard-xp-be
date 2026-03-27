import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'dashboard_xp', name: 'NguoiCoCong' })
export class NguoiCoCong {
  @PrimaryGeneratedColumn({ name: 'MaNCC' })
  MaNCC: number;

  @Column({ name: 'MaCongDan', type: 'int', nullable: true })
  MaCongDan?: number | null;

  @Column({ name: 'LoaiCongHien', type: 'varchar', length: 100 })
  LoaiCongHien: string;

  @Column({ name: 'ChungNhan', type: 'varchar', length: 100, nullable: true })
  ChungNhan?: string | null;

  @Column({ name: 'NgayPhongTang', type: 'date', nullable: true })
  NgayPhongTang?: Date | null;

  @Column({ name: 'MucHuong', type: 'decimal', precision: 18, scale: 0, nullable: true })
  MucHuong?: number | null;

  @Column({ name: 'TrangThai', type: 'varchar', length: 50, nullable: true })
  TrangThai?: string | null;

  @Column({ name: 'GhiChu', type: 'text', nullable: true })
  GhiChu?: string | null;

  @Column({ name: 'NgayDangKy', type: 'timestamp', nullable: true })
  NgayDangKy?: Date | null;

  @Column({ name: 'CCCD', type: 'varchar', length: 30, nullable: true })
  CCCD?: string | null;

  @Column({ name: 'HoTen', type: 'varchar', length: 150, nullable: true })
  HoTen?: string | null;

  @Column({ name: 'NgaySinh', type: 'date', nullable: true })
  NgaySinh?: Date | null;

  @Column({ name: 'GioiTinh', type: 'varchar', length: 10, nullable: true })
  GioiTinh?: string | null;

  @Column({ name: 'DiaChi', type: 'varchar', length: 255, nullable: true })
  DiaChi?: string | null;

  @Column({ name: 'LoaiDoiTuong', type: 'varchar', length: 100, nullable: true })
  LoaiDoiTuong?: string | null;

  @Column({ name: 'HangThuongBinh', type: 'varchar', length: 50, nullable: true })
  HangThuongBinh?: string | null;

  @Column({ name: 'TyLeMatSucLaoDong', type: 'decimal', precision: 5, scale: 2, nullable: true })
  TyLeMatSucLaoDong?: number | null;

  @Column({ name: 'DanhHieu', type: 'varchar', length: 100, nullable: true })
  DanhHieu?: string | null;

  @Column({ name: 'MucHuongHangThang', type: 'decimal', precision: 18, scale: 0, nullable: true })
  MucHuongHangThang?: number | null;

  @Column({ name: 'NgayHuong', type: 'date', nullable: true })
  NgayHuong?: Date | null;

  @Column({ name: 'TinhTrang', type: 'varchar', length: 50, nullable: true })
  TinhTrang?: string | null;
}
