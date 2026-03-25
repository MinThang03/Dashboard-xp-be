import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'dashboard_xp', name: 'DiTich' })
export class DiTich {
  @PrimaryGeneratedColumn({ name: 'MaDiTich' })
  MaDiTich: number;

  @Column({ name: 'TenDiTich', type: 'varchar', length: 200 })
  TenDiTich: string;

  @Column({ name: 'LoaiDiTich', type: 'varchar', length: 50, nullable: true })
  LoaiDiTich?: string | null;

  @Column({ name: 'DiaChi', type: 'varchar', length: 255, nullable: true })
  DiaChi?: string | null;

  @Column({ name: 'ToaDo', type: 'varchar', length: 50, nullable: true })
  ToaDo?: string | null;

  @Column({ name: 'CapXepHang', type: 'varchar', length: 50, nullable: true })
  CapXepHang?: string | null;

  @Column({ name: 'TinhTrang', type: 'varchar', length: 50, default: 'Tốt' })
  TinhTrang: string;

  @Column({ name: 'MoTa', type: 'text', nullable: true })
  MoTa?: string | null;

  @Column({ name: 'NgayTao', type: 'timestamp' })
  NgayTao: Date;

}
