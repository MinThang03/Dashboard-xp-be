import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'dashboard_xp', name: 'RacThai' })
export class RacThai {
  @PrimaryGeneratedColumn({ name: 'MaDiem' })
  MaDiem: number;

  @Column({ name: 'TenDiem', type: 'varchar', length: 150 })
  TenDiem: string;

  @Column({ name: 'DiaChi', type: 'varchar', length: 255, nullable: true })
  DiaChi?: string | null;

  @Column({ name: 'ToaDo', type: 'varchar', length: 50, nullable: true })
  ToaDo?: string | null;

  @Column({ name: 'LoaiRac', type: 'varchar', length: 50, nullable: true })
  LoaiRac?: string | null;

  @Column({ name: 'KhoiLuongThang', type: 'decimal', precision: 18, scale: 2 })
  KhoiLuongThang: number;

  @Column({ name: 'TinhTrang', type: 'varchar', length: 50, default: 'Bình thường' })
  TinhTrang: string;

  @Column({ name: 'NgayCapNhat', type: 'timestamp' })
  NgayCapNhat: Date;

  @Column({ name: 'GhiChu', type: 'text', nullable: true })
  GhiChu?: string | null;

}
