import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity({ schema: 'dashboard_xp', name: 'VanBan' })
export class VanBan {
  @PrimaryGeneratedColumn({ name: 'MaVanBan' })
  MaVanBan: number;

  @Column({ name: 'SoKyHieu', type: 'varchar', length: 50 })
  SoKyHieu: string;

  @Column({ name: 'TrichYeu', type: 'varchar', length: 500 })
  TrichYeu: string;

  @Column({ name: 'LoaiVanBan', type: 'varchar', length: 50 })
  LoaiVanBan: string;

  @Column({ name: 'LoaiVB', type: 'varchar', length: 100, nullable: true })
  LoaiVB?: string;

  @Column({ name: 'CoQuanBanHanh', type: 'varchar', length: 200, nullable: true })
  CoQuanBanHanh?: string;

  @Column({ name: 'NgayBanHanh', type: 'date', nullable: true })
  NgayBanHanh?: Date;

  @Column({ name: 'NgayDen', type: 'date', nullable: true })
  NgayDen?: Date;

  @Column({ name: 'MaLinhVuc', type: 'int', nullable: true })
  MaLinhVuc?: number;

  @Column({ name: 'NguoiXuLy', type: 'int', nullable: true })
  NguoiXuLy?: number;

  @Column({ name: 'TrangThai', type: 'varchar', length: 50, default: 'Mới' })
  TrangThai: string;

  @Column({ name: 'FileDinhKem', type: 'varchar', length: 500, nullable: true })
  FileDinhKem?: string;

  @Column({ name: 'GhiChu', type: 'text', nullable: true })
  GhiChu?: string;

  @CreateDateColumn({ name: 'NgayTao' })
  NgayTao: Date;
}
