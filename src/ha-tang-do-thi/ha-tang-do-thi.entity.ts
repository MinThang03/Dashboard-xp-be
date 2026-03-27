import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'dashboard_xp', name: 'HaTangDoThi' })
export class HaTangDoThi {
  @PrimaryGeneratedColumn({ name: 'MaHaTang' })
  MaHaTang: number;

  @Column({ name: 'TenHaTang', type: 'varchar', length: 150 })
  TenHaTang: string;

  @Column({ name: 'LoaiHaTang', type: 'varchar', length: 50, nullable: true })
  LoaiHaTang?: string | null;

  @Column({ name: 'TinhTrang', type: 'varchar', length: 50, nullable: true })
  TinhTrang?: string | null;

  @Column({ name: 'NgayCapNhat', type: 'date', nullable: true })
  NgayCapNhat?: Date | null;

  @Column({ name: 'TenHangMuc', type: 'varchar', length: 200, nullable: true })
  TenHangMuc?: string | null;

  @Column({ name: 'ViTri', type: 'varchar', length: 255, nullable: true })
  ViTri?: string | null;

  @Column({ name: 'ChieuDai', type: 'decimal', precision: 18, scale: 2, nullable: true })
  ChieuDai?: number | null;

  @Column({ name: 'KichThuoc', type: 'varchar', length: 100, nullable: true })
  KichThuoc?: string | null;

  @Column({ name: 'NamXayDung', type: 'int', nullable: true })
  NamXayDung?: number | null;

  @Column({ name: 'LanSuaChua', type: 'date', nullable: true })
  LanSuaChua?: Date | null;

  @Column({ name: 'GhiChu', type: 'text', nullable: true })
  GhiChu?: string | null;
}
