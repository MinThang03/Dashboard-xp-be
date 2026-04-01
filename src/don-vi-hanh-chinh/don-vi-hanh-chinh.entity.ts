import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ schema: 'dashboard_xp', name: 'DonViHanhChinh' })
export class DonViHanhChinh {
  @PrimaryColumn({ name: 'MaDVHC', type: 'varchar', length: 20 })
  code: string;

  @Column({ name: 'TenDVHC', type: 'varchar', length: 150 })
  name: string;

  @Column({ name: 'Cap', type: 'int' })
  level: number;
}
