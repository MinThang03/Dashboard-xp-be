import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'dashboard_xp', name: 'DoiTuongBaoTro' })
export class BaoTroXaHoi {
  @PrimaryGeneratedColumn({ name: 'MaDoiTuong' })
  MaDoiTuong: number;

  @Column({ name: 'MaCongDan', type: 'int', nullable: true })
  MaCongDan?: number | null;

  @Column({ name: 'LoaiDoiTuong', type: 'varchar', length: 100 })
  LoaiDoiTuong: string;

  @Column({ name: 'MucTroCapThang', type: 'decimal', precision: 18, scale: 0, nullable: true })
  MucTroCapThang?: number | null;

  @Column({ name: 'TuNgay', type: 'date', nullable: true })
  TuNgay?: Date | null;

  @Column({ name: 'DenNgay', type: 'date', nullable: true })
  DenNgay?: Date | null;

  @Column({ name: 'TrangThai', type: 'varchar', length: 50, nullable: true })
  TrangThai?: string | null;

  @Column({ name: 'GhiChu', type: 'text', nullable: true })
  GhiChu?: string | null;

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

  @Column({ name: 'MucTroCap', type: 'decimal', precision: 18, scale: 0, nullable: true })
  MucTroCap?: number | null;

  @Column({ name: 'NgayBatDau', type: 'date', nullable: true })
  NgayBatDau?: Date | null;

  @Column({ name: 'TinhTrang', type: 'varchar', length: 50, nullable: true })
  TinhTrang?: string | null;

  @Column({ name: 'NguoiGiamHo', type: 'varchar', length: 150, nullable: true })
  NguoiGiamHo?: string | null;
}
