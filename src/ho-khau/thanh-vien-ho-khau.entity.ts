import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'ThanhVienHoKhau', schema: 'dashboard_xp' })
export class ThanhVienHoKhau {
  @PrimaryGeneratedColumn()
  MaThanhVien: number;

  @Column({ type: 'varchar', length: 20 })
  MaHoKhau: string;

  @Column({ type: 'varchar', length: 150 })
  HoTen: string;

  @Column({ type: 'date', nullable: true })
  NgaySinh: Date;

  @Column({ type: 'varchar', length: 10, nullable: true })
  GioiTinh: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  CCCD: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  QuanHeChuHo: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  SoDienThoai: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  NgheNghiep: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  NoiLamViec: string;

  @Column({ type: 'text', nullable: true })
  GhiChu: string;
}
