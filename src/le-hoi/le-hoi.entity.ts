import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'dashboard_xp', name: 'LeHoi' })
export class LeHoi {
  @PrimaryGeneratedColumn({ name: 'MaLeHoi' })
  MaLeHoi: number;

  @Column({ name: 'TenLeHoi', type: 'varchar', length: 200 })
  TenLeHoi: string;

  @Column({ name: 'ThoiGianToChuc', type: 'date', nullable: true })
  ThoiGianToChuc?: Date | null;

  @Column({ name: 'DiaDiem', type: 'varchar', length: 255, nullable: true })
  DiaDiem?: string | null;

  @Column({ name: 'SoLuongKhach', type: 'int' })
  SoLuongKhach: number;

  @Column({ name: 'MoTa', type: 'text', nullable: true })
  MoTa?: string | null;

  @Column({ name: 'TrangThai', type: 'varchar', length: 50, default: 'Đã tổ chức' })
  TrangThai: string;

  @Column({ name: 'NgayTao', type: 'timestamp' })
  NgayTao: Date;

}
