import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'dashboard_xp', name: 'XayDungTraiPhep' })
export class XayDungTraiPhep {
  @PrimaryGeneratedColumn({ name: 'MaViPham' })
  MaViPham: number;

  @Column({ name: 'DiaDiem', type: 'varchar', length: 255 })
  DiaDiem: string;

  @Column({ name: 'ChuSoHuu', type: 'varchar', length: 150, nullable: true })
  ChuSoHuu?: string | null;

  @Column({ name: 'DienTich', type: 'decimal', precision: 18, scale: 2, nullable: true })
  DienTich?: number | null;

  @Column({ name: 'NgayPhatHien', type: 'date', nullable: true })
  NgayPhatHien?: Date | null;

  @Column({ name: 'TrangThai', type: 'varchar', length: 50, nullable: true })
  TrangThai?: string | null;

  @Column({ name: 'MaCanBo', type: 'int', nullable: true })
  MaCanBo?: number | null;

  @Column({ name: 'MaVuViec', type: 'varchar', length: 50, nullable: true })
  MaVuViec?: string | null;

  @Column({ name: 'DiaChi', type: 'varchar', length: 255, nullable: true })
  DiaChi?: string | null;

  @Column({ name: 'MaThua', type: 'varchar', length: 50, nullable: true })
  MaThua?: string | null;

  @Column({ name: 'SoTo', type: 'varchar', length: 50, nullable: true })
  SoTo?: string | null;

  @Column({ name: 'ChuCongTrinh', type: 'varchar', length: 150, nullable: true })
  ChuCongTrinh?: string | null;

  @Column({ name: 'CCCD', type: 'varchar', length: 30, nullable: true })
  CCCD?: string | null;

  @Column({ name: 'SoDienThoai', type: 'varchar', length: 20, nullable: true })
  SoDienThoai?: string | null;

  @Column({ name: 'LoaiViPham', type: 'varchar', length: 150, nullable: true })
  LoaiViPham?: string | null;

  @Column({ name: 'MoTaViPham', type: 'text', nullable: true })
  MoTaViPham?: string | null;

  @Column({ name: 'DienTichViPham', type: 'decimal', precision: 18, scale: 2, nullable: true })
  DienTichViPham?: number | null;

  @Column({ name: 'NguoiPhatHien', type: 'varchar', length: 150, nullable: true })
  NguoiPhatHien?: string | null;

  @Column({ name: 'BienPhapXuLy', type: 'text', nullable: true })
  BienPhapXuLy?: string | null;

  @Column({ name: 'SoTien', type: 'decimal', precision: 18, scale: 2, nullable: true })
  SoTien?: number | null;

  @Column({ name: 'SoQuyetDinhXP', type: 'varchar', length: 100, nullable: true })
  SoQuyetDinhXP?: string | null;

  @Column({ name: 'NgayQD', type: 'date', nullable: true })
  NgayQD?: Date | null;

  @Column({ name: 'ThoiHanThaoGo', type: 'date', nullable: true })
  ThoiHanThaoGo?: Date | null;

  @Column({ name: 'DaCuongChe', type: 'boolean', default: false })
  DaCuongChe?: boolean | null;

  @Column({ name: 'NgayCuongChe', type: 'date', nullable: true })
  NgayCuongChe?: Date | null;

  @Column({ name: 'KetQuaXuLy', type: 'text', nullable: true })
  KetQuaXuLy?: string | null;

  @Column({ name: 'GhiChu', type: 'text', nullable: true })
  GhiChu?: string | null;
}
