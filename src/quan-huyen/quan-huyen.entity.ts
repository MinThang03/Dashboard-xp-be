import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'dashboard_xp', name: 'QuanHuyen' })
export class QuanHuyen {
  @PrimaryGeneratedColumn({ name: 'MaQuanHuyen' })
  id: number;

  @Column({ name: 'TenQuanHuyen', type: 'varchar', length: 150 })
  name: string;

  @Column({ name: 'MaDVHC', type: 'varchar', length: 20, nullable: true })
  dvhcCode?: string | null;
}
