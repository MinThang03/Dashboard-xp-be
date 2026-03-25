import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'dashboard_xp', name: 'BaoCao' })
export class BaoCao {
  @PrimaryGeneratedColumn({ name: 'MaBaoCao' })
  MaBaoCao: number;

  @Column({ name: 'TieuDe', type: 'varchar', length: 200 })
  TieuDe: string;

  @Column({ name: 'LoaiBaoCao', type: 'varchar', length: 100, nullable: true })
  LoaiBaoCao?: string;

  @Column({ name: 'MaLinhVuc', type: 'int', nullable: true })
  MaLinhVuc?: number;

  @Column({ name: 'NoiDung', type: 'text', nullable: true })
  NoiDung?: string;

  @Column({ name: 'NgayLap', type: 'date', nullable: true })
  NgayLap?: Date;

  @Column({ name: 'NguoiLap', type: 'int', nullable: true })
  NguoiLap?: number;

  @Column({ name: 'NguoiLapText', type: 'varchar', length: 150, nullable: true })
  NguoiLapText?: string;

  @Column({ name: 'TrangThai', type: 'varchar', length: 50, nullable: true })
  TrangThai?: string;

  @Column({ name: 'FileDinhKem', type: 'varchar', length: 500, nullable: true })
  FileDinhKem?: string;

  @Column({ name: 'GhiChu', type: 'text', nullable: true })
  GhiChu?: string;

  @Column({ name: 'SoLieuThongKe', type: 'jsonb', nullable: true })
  SoLieuThongKe?: any;

  @Column({ name: 'ThangNam', type: 'varchar', length: 7, nullable: true })
  ThangNam?: string;

  @Column({ name: 'NgayTao', type: 'timestamp', nullable: true })
  NgayTao?: Date;
}
