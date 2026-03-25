import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'dashboard_xp', name: 'LangNghe' })
export class LangNghe {
  @PrimaryGeneratedColumn({ name: 'MaLangNghe' })
  MaLangNghe: number;

  @Column({ name: 'TenLangNghe', type: 'varchar', length: 200 })
  TenLangNghe: string;

  @Column({ name: 'LoaiNghe', type: 'varchar', length: 100, nullable: true })
  LoaiNghe?: string | null;

  @Column({ name: 'DiaChi', type: 'varchar', length: 255, nullable: true })
  DiaChi?: string | null;

  @Column({ name: 'SoHoNghe', type: 'int' })
  SoHoNghe: number;

  @Column({ name: 'SanPhamChinh', type: 'varchar', length: 200, nullable: true })
  SanPhamChinh?: string | null;

  @Column({ name: 'TrangThai', type: 'boolean' })
  TrangThai: boolean;

  @Column({ name: 'NgayTao', type: 'timestamp' })
  NgayTao: Date;

}
