import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'dashboard_xp', name: 'BaoCaoONhiem' })
export class BaoCaoONhiem {
  @PrimaryGeneratedColumn({ name: 'MaBaoCao' })
  MaBaoCao: number;

  @Column({ name: 'LoaiONhiem', type: 'varchar', length: 50 })
  LoaiONhiem: string;

  @Column({ name: 'KhuVuc', type: 'varchar', length: 150, nullable: true })
  KhuVuc?: string | null;

  @Column({ name: 'MucDo', type: 'varchar', length: 20, nullable: true })
  MucDo?: string | null;

  @Column({ name: 'NgayBaoCao', type: 'date' })
  NgayBaoCao: Date;

  @Column({ name: 'NoiDung', type: 'text', nullable: true })
  NoiDung?: string | null;

  @Column({ name: 'TrangThai', type: 'varchar', length: 50, default: 'Chờ xử lý' })
  TrangThai: string;

  @Column({ name: 'NguoiBaoCao', type: 'int', nullable: true })
  NguoiBaoCao?: number | null;

}
