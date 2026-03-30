import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'dashboard_xp', name: 'HoSoDiTich' })
export class HoSoDiTich {
  @PrimaryGeneratedColumn({ name: 'MaHoSo' })
  MaHoSo: number;

  @Column({ name: 'MaDiTich', type: 'int', nullable: true })
  MaDiTich?: number | null;

  @Column({ name: 'TenDiTich', type: 'varchar', length: 200, nullable: true })
  TenDiTich?: string | null;

  @Column({ name: 'CapDo', type: 'varchar', length: 50, nullable: true })
  CapDo?: string | null;

  @Column({ name: 'LoaiHoSo', type: 'varchar', length: 100, nullable: true })
  LoaiHoSo?: string | null;

  @Column({ name: 'TrangThai', type: 'varchar', length: 50, default: 'Đã nộp' })
  TrangThai: string;

  @Column({ name: 'NgayNop', type: 'date', nullable: true })
  NgayNop?: Date | null;

  @Column({ name: 'NgayDuyet', type: 'date', nullable: true })
  NgayDuyet?: Date | null;

  @Column({ name: 'NguoiNop', type: 'varchar', length: 150, nullable: true })
  NguoiNop?: string | null;

  @Column({ name: 'TaiLieu', type: 'varchar', length: 200, nullable: true })
  TaiLieu?: string | null;

  @Column({ name: 'NoiDung', type: 'text', nullable: true })
  NoiDung?: string | null;

  @Column({ name: 'NgayLap', type: 'date', nullable: true })
  NgayLap?: Date | null;

  @Column({ name: 'NguoiLap', type: 'int', nullable: true })
  NguoiLap?: number | null;

  @Column({ name: 'GhiChu', type: 'text', nullable: true })
  GhiChu?: string | null;
}
