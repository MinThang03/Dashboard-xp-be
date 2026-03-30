import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'dashboard_xp', name: 'RuiRoQuyHoach' })
export class RuiRoQuyHoach {
  @PrimaryGeneratedColumn({ name: 'MaRuiRo' })
  MaRuiRo: number;

  @Column({ name: 'MaPhanTich', type: 'varchar', length: 50, nullable: true })
  MaPhanTich?: string | null;

  @Column({ name: 'MaQuyHoach', type: 'int', nullable: true })
  MaQuyHoach?: number | null;

  @Column({ name: 'KhuVuc', type: 'varchar', length: 255, nullable: true })
  KhuVuc?: string | null;

  @Column({ name: 'DiaChi', type: 'varchar', length: 255, nullable: true })
  DiaChi?: string | null;

  @Column({ name: 'MaThua', type: 'varchar', length: 50, nullable: true })
  MaThua?: string | null;

  @Column({ name: 'SoTo', type: 'varchar', length: 50, nullable: true })
  SoTo?: string | null;

  @Column({ name: 'LoaiRuiRo', type: 'varchar', length: 100, nullable: true })
  LoaiRuiRo?: string | null;

  @Column({ name: 'MoTaRuiRo', type: 'text', nullable: true })
  MoTaRuiRo?: string | null;

  @Column({ name: 'MucDoNghiemTrong', type: 'varchar', length: 20, nullable: true })
  MucDoRuiRo?: string | null;

  @Column({ name: 'XacSuat', type: 'int', nullable: true })
  XacSuat?: number | null;

  @Column({ name: 'DoTinCayAI', type: 'int', nullable: true })
  DoTinCayAI?: number | null;

  @Column({ name: 'NguyenNhan', type: 'text', nullable: true })
  NguyenNhan?: string | null;

  @Column({ name: 'BienPhapXuLy', type: 'text', nullable: true })
  KhuyenNghiAI?: string | null;

  @Column({ name: 'TrangThai', type: 'varchar', length: 50, default: 'Đang theo dõi' })
  TrangThai: string;

  @Column({ name: 'NgayPhatHien', type: 'date', nullable: true })
  NgayPhanTich?: Date | null;

  @Column({ name: 'NgayCapNhat', type: 'date', nullable: true })
  NgayCapNhat?: Date | null;

  @Column({ name: 'NguoiPhatHien', type: 'int', nullable: true })
  NguoiPhatHien?: number | null;

  @Column({ name: 'NgayXuLyXong', type: 'date', nullable: true })
  NgayXuLyXong?: Date | null;

  @Column({ name: 'GhiChu', type: 'text', nullable: true })
  GhiChu?: string | null;
}
