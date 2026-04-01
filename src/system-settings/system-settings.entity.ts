import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ schema: 'dashboard_xp', name: 'CaiDatHeThong' })
export class SystemSettings {
  @PrimaryGeneratedColumn({ name: 'MaCaiDat' })
  id: number;

  @Column({ name: 'TenHeThong', type: 'varchar', length: 200 })
  systemName: string;

  @Column({ name: 'EmailQuanTri', type: 'varchar', length: 120, nullable: true })
  adminEmail?: string | null;

  @Column({ name: 'HanXuLyMacDinh', type: 'int', default: 15 })
  defaultExpiryDays: number;

  @Column({ name: 'CanhBaoTreHan', type: 'int', default: 3 })
  overdueWarningDays: number;

  @Column({ name: 'ThongBao', type: 'boolean', default: true })
  notificationsEnabled: boolean;

  @Column({ name: 'TuDongCapNhat', type: 'boolean', default: true })
  autoUpdateEnabled: boolean;

  @Column({ name: 'ChuKyCapNhat', type: 'int', default: 5 })
  autoUpdateInterval: number;

  @Column({ name: 'AvatarUrl', type: 'varchar', length: 500, nullable: true })
  avatarUrl?: string | null;

  @UpdateDateColumn({ name: 'NgayCapNhat' })
  updatedAt: Date;
}
