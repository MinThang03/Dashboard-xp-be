import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'TamTruTamVang', schema: 'dashboard_xp' })
export class TamTruTamVang {
  @PrimaryGeneratedColumn()
  MaHoSo: number;

  @Column({ type: 'varchar', length: 150 })
  HoTenNguoiKhaiBao: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  CCCD: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  DiaChiThuongTru: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  DiaChiTamTru: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  LoaiDangKy: string;

  @Column({ type: 'date', nullable: true })
  TuNgay: Date;

  @Column({ type: 'date', nullable: true })
  DenNgay: Date;

  @Column({ type: 'varchar', length: 50, default: 'Chờ duyệt' })
  TinhTrangHoSo: string;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  NgayKhaiBao: Date;

  @Column({ type: 'int', nullable: true })
  MaCanBo: number;
}
