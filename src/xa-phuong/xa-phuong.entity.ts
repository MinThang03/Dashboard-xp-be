import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'dashboard_xp', name: 'XaPhuong' })
export class XaPhuong {
  @PrimaryGeneratedColumn({ name: 'MaXaPhuong' })
  id: number;

  @Column({ name: 'TenXaPhuong', type: 'varchar', length: 150 })
  name: string;

  @Column({ name: 'MaQuanHuyen', type: 'int', nullable: true })
  districtId?: number | null;

  @Column({ name: 'DanSo', type: 'int', default: 0 })
  population: number;

  @Column({ name: 'DienTich', type: 'decimal', precision: 18, scale: 2, nullable: true })
  area?: number | null;

  @Column({ name: 'MaDVHC', type: 'varchar', length: 20, nullable: true })
  dvhcCode?: string | null;

  @Column({ name: 'DiaChi', type: 'varchar', length: 255, nullable: true })
  address?: string | null;

  @Column({ name: 'SoDienThoai', type: 'varchar', length: 20, nullable: true })
  phone?: string | null;

  @Column({ name: 'Email', type: 'varchar', length: 100, nullable: true })
  email?: string | null;

  @Column({ name: 'ChuTich', type: 'varchar', length: 150, nullable: true })
  mayor?: string | null;

  @Column({ name: 'TrangThai', type: 'boolean', default: true })
  isActive: boolean;
}
