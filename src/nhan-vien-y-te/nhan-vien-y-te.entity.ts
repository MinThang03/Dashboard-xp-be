import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'dashboard_xp', name: 'NhanVienYTe' })
export class NhanVienYTe {
  @PrimaryGeneratedColumn({ name: 'MaNhanVien' })
  MaNhanVien: number;

  @Column({ name: 'HoTen', type: 'varchar', length: 150 })
  HoTen: string;

  @Column({ name: 'NgaySinh', type: 'date', nullable: true })
  NgaySinh?: Date | null;

  @Column({ name: 'GioiTinh', type: 'varchar', length: 10, nullable: true })
  GioiTinh?: string | null;

  @Column({ name: 'ChucDanh', type: 'varchar', length: 50, nullable: true })
  ChucDanh?: string | null;

  @Column({ name: 'ChuyenMon', type: 'varchar', length: 100, nullable: true })
  ChuyenMon?: string | null;

  @Column({ name: 'SoDienThoai', type: 'varchar', length: 20, nullable: true })
  SoDienThoai?: string | null;

  @Column({ name: 'TrangThaiLamViec', type: 'varchar', length: 50, default: 'Đang làm việc' })
  TrangThaiLamViec: string;

  @Column({ name: 'MaTram', type: 'int', nullable: true })
  MaTram?: number | null;

  @Column({ name: 'GhiChu', type: 'text', nullable: true })
  GhiChu?: string | null;
}
