import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'dashboard_xp', name: 'HoTroDoanhNghiep' })
export class HoTroDoanhNghiep {
  @PrimaryGeneratedColumn({ name: 'MaHoTro' })
  MaHoTro: number;

  @Column({ name: 'MaYC', type: 'varchar', length: 50, nullable: true })
  MaYC?: string | null;

  @Column({ name: 'TenDoanhNghiep', type: 'varchar', length: 200 })
  TenDoanhNghiep: string;

  @Column({ name: 'LoaiDoanhNghiep', type: 'varchar', length: 100, nullable: true })
  LoaiDoanhNghiep?: string | null;

  @Column({ name: 'LinhVuc', type: 'varchar', length: 120, nullable: true })
  LinhVuc?: string | null;

  @Column({ name: 'NguoiDaiDien', type: 'varchar', length: 150, nullable: true })
  NguoiDaiDien?: string | null;

  @Column({ name: 'DienThoai', type: 'varchar', length: 20, nullable: true })
  DienThoai?: string | null;

  @Column({ name: 'Email', type: 'varchar', length: 100, nullable: true })
  Email?: string | null;

  @Column({ name: 'DiaChi', type: 'varchar', length: 255, nullable: true })
  DiaChi?: string | null;

  @Column({ name: 'LoaiHoTro', type: 'varchar', length: 120, nullable: true })
  LoaiHoTro?: string | null;

  @Column({ name: 'NoiDungYeuCau', type: 'text', nullable: true })
  NoiDungYeuCau?: string | null;

  @Column({ name: 'NgayTiepNhan', type: 'date', nullable: true })
  NgayTiepNhan?: Date | null;

  @Column({ name: 'NgayHenTra', type: 'date', nullable: true })
  NgayHenTra?: Date | null;

  @Column({ name: 'NgayHoanThanh', type: 'date', nullable: true })
  NgayHoanThanh?: Date | null;

  @Column({ name: 'CanBoXuLy', type: 'varchar', length: 150, nullable: true })
  CanBoXuLy?: string | null;

  @Column({ name: 'TrangThai', type: 'varchar', length: 50, default: 'Chờ xử lý' })
  TrangThai: string;

  @Column({ name: 'KetQuaXuLy', type: 'text', nullable: true })
  KetQuaXuLy?: string | null;

  @Column({ name: 'GiaTriHoTro', type: 'decimal', precision: 18, scale: 2, nullable: true })
  GiaTriHoTro?: number | null;

  @Column({ name: 'DanhGia', type: 'int', nullable: true })
  DanhGia?: number | null;

  @Column({ name: 'GhiChu', type: 'text', nullable: true })
  GhiChu?: string | null;
}
