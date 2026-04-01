import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'dashboard_xp', name: 'VaiTro' })
export class VaiTro {
  @PrimaryGeneratedColumn({ name: 'MaVaiTro' })
  id: number;

  @Column({ name: 'TenVaiTro', length: 50 })
  name: string;

  @Column({ name: 'MaCode', length: 20 })
  code: string;

  @Column({ name: 'MoTa', length: 255, nullable: true })
  description?: string | null;

  @Column({ name: 'ThuTuHienThi', type: 'int', default: 0 })
  order: number;

  @Column({ name: 'TrangThai', type: 'boolean', default: true })
  isActive: boolean;

  @Column({ name: 'DanhSachQuyen', type: 'jsonb', nullable: true })
  permissions?: string[] | null;

  @CreateDateColumn({ name: 'NgayTao' })
  createdAt: Date;
}
