import { Entity, Column } from 'typeorm';

@Entity({ schema: 'dashboard_xp', name: 'ThuaDat' })
export class ThuaDat {
  @Column({ name: 'MaThua', type: 'varchar', length: 20, primary: true })
  MaThua: string;

  @Column({ name: 'SoThua', type: 'varchar', length: 20 })
  SoThua: string;

  @Column({ name: 'SoToBanDo', type: 'varchar', length: 20, nullable: true })
  SoToBanDo?: string | null;

  @Column({ name: 'DienTich', type: 'decimal', precision: 18, scale: 2 })
  DienTich: number;

  @Column({ name: 'MaLoaiDat', type: 'varchar', length: 20, nullable: true })
  MaLoaiDat?: string | null;

  @Column({ name: 'ChuSoHuu', type: 'varchar', length: 150, nullable: true })
  ChuSoHuu?: string | null;

  @Column({ name: 'ToaDo', type: 'varchar', length: 100, nullable: true })
  ToaDo?: string | null;

  @Column({ name: 'TrangThai', type: 'varchar', length: 50, default: 'Đang sử dụng' })
  TrangThai: string;

  @Column({ name: 'GhiChu', type: 'text', nullable: true })
  GhiChu?: string | null;

}
