import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'dashboard_xp', name: 'AnNinhTratTu' })
export class AnNinhTratTu {
  @PrimaryGeneratedColumn({ name: 'MaSuKien' })
  MaSuKien: number;

  @Column({ name: 'MaSK', type: 'varchar', length: 50, nullable: true })
  MaSK?: string | null;

  @Column({ name: 'NoiDung', type: 'text' })
  NoiDung: string;

  @Column({ name: 'KhuVuc', type: 'varchar', length: 150, nullable: true })
  KhuVuc?: string | null;

  @Column({ name: 'MucDo', type: 'varchar', length: 30, nullable: true })
  MucDo?: string | null;

  @Column({ name: 'LoaiViPham', type: 'varchar', length: 120, nullable: true })
  LoaiViPham?: string | null;

  @Column({ name: 'NgayPhatSinh', type: 'date', nullable: true })
  NgayPhatSinh?: Date | null;

  @Column({ name: 'TrangThai', type: 'varchar', length: 50, default: 'Đang xử lý' })
  TrangThai: string;

  @Column({ name: 'CanBo', type: 'varchar', length: 150, nullable: true })
  CanBo?: string | null;
}
