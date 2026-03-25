import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'dashboard_xp', name: 'ThongKeKinhTe' })
export class ThongKeKinhTe {
  @PrimaryGeneratedColumn({ name: 'MaBaoCao' })
  MaBaoCao: number;

  @Column({ name: 'MaBC', type: 'varchar', length: 50, nullable: true })
  MaBC?: string | null;

  @Column({ name: 'KyBaoCao', type: 'varchar', length: 100, nullable: true })
  KyBaoCao?: string | null;

  @Column({ name: 'LoaiKy', type: 'varchar', length: 30, nullable: true })
  LoaiKy?: string | null;

  @Column({ name: 'NgayBaoCao', type: 'date', nullable: true })
  NgayBaoCao?: Date | null;

  @Column({ name: 'NguoiLap', type: 'varchar', length: 150, nullable: true })
  NguoiLap?: string | null;

  @Column({ name: 'TongHoKinhDoanh', type: 'int', nullable: true })
  TongHoKinhDoanh?: number | null;

  @Column({ name: 'TongDoanhThu', type: 'decimal', precision: 18, scale: 2, nullable: true })
  TongDoanhThu?: number | null;

  @Column({ name: 'TongThuNganSach', type: 'decimal', precision: 18, scale: 2, nullable: true })
  TongThuNganSach?: number | null;

  @Column({ name: 'TangTruong', type: 'decimal', precision: 8, scale: 2, nullable: true })
  TangTruong?: number | null;

  @Column({ name: 'SoLuongLaoDong', type: 'int', nullable: true })
  SoLuongLaoDong?: number | null;

  @Column({ name: 'SoHoMoi', type: 'int', nullable: true })
  SoHoMoi?: number | null;

  @Column({ name: 'SoHoNgung', type: 'int', nullable: true })
  SoHoNgung?: number | null;

  @Column({ name: 'TrangThai', type: 'varchar', length: 50, default: 'Chờ duyệt' })
  TrangThai: string;
}
