import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'dashboard_xp', name: 'NganSach' })
export class NganSach {
  @PrimaryGeneratedColumn({ name: 'MaNganSach' })
  MaNganSach: number;

  @Column({ name: 'Nam', type: 'int' })
  Nam: number;

  @Column({ name: 'MaLinhVuc', type: 'int', nullable: true })
  MaLinhVuc?: number | null;

  @Column({ name: 'TongDuToan', type: 'decimal', precision: 18 })
  TongDuToan: number;

  @Column({ name: 'DaGiaiNgan', type: 'decimal', precision: 18 })
  DaGiaiNgan: number;

  @Column({ name: 'ConLai', type: 'decimal', precision: 18 })
  ConLai: number;

  @Column({ name: 'TrangThai', type: 'varchar', length: 50, default: 'Đang thực hiện' })
  TrangThai: string;

  @Column({ name: 'NgayTao', type: 'timestamp' })
  NgayTao: Date;

}
