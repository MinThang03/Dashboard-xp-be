import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'dashboard_xp', name: 'TramQuanTracMT' })
export class TramQuanTracMT {
  @PrimaryGeneratedColumn({ name: 'MaTram' })
  MaTram: number;

  @Column({ name: 'TenTram', type: 'varchar', length: 150 })
  TenTram: string;

  @Column({ name: 'DiaChi', type: 'varchar', length: 255, nullable: true })
  DiaChi?: string | null;

  @Column({ name: 'ToaDo', type: 'varchar', length: 50, nullable: true })
  ToaDo?: string | null;

  @Column({ name: 'LoaiTram', type: 'varchar', length: 50, nullable: true })
  LoaiTram?: string | null;

  @Column({ name: 'TrangThai', type: 'varchar', length: 50, default: 'Hoạt động' })
  TrangThai: string;

  @Column({ name: 'NgayLapDat', type: 'date', nullable: true })
  NgayLapDat?: Date | null;

  @Column({ name: 'GhiChu', type: 'text', nullable: true })
  GhiChu?: string | null;
}
