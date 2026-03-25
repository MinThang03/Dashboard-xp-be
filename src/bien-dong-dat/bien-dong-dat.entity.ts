import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'dashboard_xp', name: 'BienDongDat' })
export class BienDongDat {
  @PrimaryGeneratedColumn({ name: 'MaBienDong' })
  MaBienDong: number;

  @Column({ name: 'MaThua', type: 'varchar', length: 20 })
  MaThua: string;

  @Column({ name: 'LoaiBienDong', type: 'varchar', length: 50 })
  LoaiBienDong: string;

  @Column({ name: 'NgayBienDong', type: 'date' })
  NgayBienDong: Date;

  @Column({ name: 'DienTichCu', type: 'decimal', precision: 18, scale: 2, nullable: true })
  DienTichCu?: number | null;

  @Column({ name: 'DienTichMoi', type: 'decimal', precision: 18, scale: 2, nullable: true })
  DienTichMoi?: number | null;

  @Column({ name: 'MaLoaiDatCu', type: 'varchar', length: 20, nullable: true })
  MaLoaiDatCu?: string | null;

  @Column({ name: 'MaLoaiDatMoi', type: 'varchar', length: 20, nullable: true })
  MaLoaiDatMoi?: string | null;

  @Column({ name: 'LyDo', type: 'text', nullable: true })
  LyDo?: string | null;

  @Column({ name: 'NguoiThucHien', type: 'int', nullable: true })
  NguoiThucHien?: number | null;

}
