import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'dashboard_xp', name: 'ThuPhiLePhi' })
export class ThuPhi {
  @PrimaryGeneratedColumn({ name: 'MaThuPhi' })
  MaThuPhi: number;

  @Column({ name: 'MaPhieuThu', type: 'varchar', length: 50, nullable: true })
  MaPhieuThu?: string | null;

  @Column({ name: 'LoaiPhi', type: 'varchar', length: 150 })
  LoaiPhi: string;

  @Column({ name: 'MoTa', type: 'text', nullable: true })
  MoTa?: string | null;

  @Column({ name: 'DonGia', type: 'decimal', precision: 18, scale: 2, nullable: true })
  DonGia?: number | null;

  @Column({ name: 'SoLuong', type: 'int', nullable: true })
  SoLuong?: number | null;

  @Column({ name: 'ThanhTien', type: 'decimal', precision: 18, scale: 2, nullable: true })
  ThanhTien?: number | null;

  @Column({ name: 'TenNguoiNop', type: 'varchar', length: 150, nullable: true })
  TenNguoiNop?: string | null;

  @Column({ name: 'CCCDNguoiNop', type: 'varchar', length: 20, nullable: true })
  CCCDNguoiNop?: string | null;

  @Column({ name: 'DiaChiNguoiNop', type: 'varchar', length: 255, nullable: true })
  DiaChiNguoiNop?: string | null;

  @Column({ name: 'NgayThu', type: 'date', nullable: true })
  NgayThu?: Date | null;

  @Column({ name: 'NguoiThu', type: 'varchar', length: 150, nullable: true })
  NguoiThu?: string | null;

  @Column({ name: 'TrangThai', type: 'varchar', length: 50, default: 'Đã thu' })
  TrangThai: string;

  @Column({ name: 'GhiChu', type: 'text', nullable: true })
  GhiChu?: string | null;
}
