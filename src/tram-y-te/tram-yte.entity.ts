import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'dashboard_xp', name: 'TramYTe' })
export class TramYTe {
  @PrimaryGeneratedColumn({ name: 'MaTram' })
  MaTram: number;

  @Column({ name: 'TenTram', type: 'varchar', length: 150 })
  TenTram: string;

  @Column({ name: 'DiaChi', type: 'varchar', length: 255, nullable: true })
  DiaChi?: string | null;

  @Column({ name: 'SoDienThoai', type: 'varchar', length: 20, nullable: true })
  SoDienThoai?: string | null;

  @Column({ name: 'SoNhanVien', type: 'int' })
  SoNhanVien: number;

  @Column({ name: 'SoLuotKhamThang', type: 'int' })
  SoLuotKhamThang: number;

  @Column({ name: 'TrangThai', type: 'boolean' })
  TrangThai: boolean;

  @Column({ name: 'GhiChu', type: 'text', nullable: true })
  GhiChu?: string | null;

  @Column({ name: 'NgayTao', type: 'timestamp' })
  NgayTao: Date;

}
