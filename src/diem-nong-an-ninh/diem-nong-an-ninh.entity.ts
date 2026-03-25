import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'dashboard_xp', name: 'DiemNongAnNinh' })
export class DiemNongAnNinh {
  @PrimaryGeneratedColumn({ name: 'MaDiem' })
  MaDiem: number;

  @Column({ name: 'TenDiem', type: 'varchar', length: 150 })
  TenDiem: string;

  @Column({ name: 'DiaDiem', type: 'varchar', length: 255, nullable: true })
  DiaDiem?: string | null;

  @Column({ name: 'ToaDo', type: 'varchar', length: 50, nullable: true })
  ToaDo?: string | null;

  @Column({ name: 'LoaiRuiRo', type: 'varchar', length: 100, nullable: true })
  LoaiRuiRo?: string | null;

  @Column({ name: 'MucDoNghiemTrong', type: 'varchar', length: 20, nullable: true })
  MucDoNghiemTrong?: string | null;

  @Column({ name: 'TinhTrang', type: 'varchar', length: 50, default: 'Đang theo dõi' })
  TinhTrang: string;

  @Column({ name: 'NgayPhatHien', type: 'date' })
  NgayPhatHien: Date;

  @Column({ name: 'BienPhapXuLy', type: 'text', nullable: true })
  BienPhapXuLy?: string | null;

  @Column({ name: 'GhiChu', type: 'text', nullable: true })
  GhiChu?: string | null;

}
