import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'dashboard_xp', name: 'PhanAnh' })
export class PhanAnh {
  @PrimaryGeneratedColumn({ name: 'MaPhanAnh' })
  MaPhanAnh: number;

  @Column({ name: 'MaLinhVuc', type: 'int', nullable: true })
  MaLinhVuc?: number | null;

  @Column({ name: 'MaCongDan', type: 'int', nullable: true })
  MaCongDan?: number | null;

  @Column({ name: 'TieuDe', type: 'varchar', length: 255 })
  TieuDe: string;

  @Column({ name: 'NoiDung', type: 'text' })
  NoiDung: string;

  @Column({ name: 'TenNguoiPhanAnh', type: 'varchar', length: 150, nullable: true })
  TenNguoiPhanAnh?: string | null;

  @Column({ name: 'SoDienThoai', type: 'varchar', length: 20, nullable: true })
  SoDienThoai?: string | null;

  @Column({ name: 'DiaChi', type: 'varchar', length: 255, nullable: true })
  DiaChi?: string | null;

  @Column({ name: 'TenLinhVuc', type: 'varchar', length: 120, nullable: true })
  TenLinhVuc?: string | null;

  @Column({ name: 'ToaDo', type: 'varchar', length: 120, nullable: true })
  ToaDo?: string | null;

  @Column({ name: 'MucDoUuTien', type: 'varchar', length: 30, default: 'Thường' })
  MucDoUuTien: string;

  @Column({ name: 'TrangThai', type: 'varchar', length: 50, default: 'Mới' })
  TrangThai: string;

  @Column({ name: 'TenCanBoXuLy', type: 'varchar', length: 150, nullable: true })
  TenCanBoXuLy?: string | null;

  @Column({ name: 'NgayTao', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  NgayTao: Date;

  @Column({ name: 'KetQuaXuLy', type: 'text', nullable: true })
  KetQuaXuLy?: string | null;

  @Column({ name: 'DiemDanhGia', type: 'int', nullable: true })
  DiemDanhGia?: number | null;
}
