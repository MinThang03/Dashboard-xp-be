import { Column, CreateDateColumn, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity({ schema: 'dashboard_xp', name: 'ThongBaoNguoiDung' })
export class UserNotification {
  @PrimaryGeneratedColumn({ name: 'MaThongBao' })
  id: number;

  @Column({ name: 'MaNguoiDung', type: 'int' })
  userId: number;

  @Column({ name: 'Loai', length: 30 })
  type: string;

  @Column({ name: 'TieuDe', length: 200 })
  title: string;

  @Column({ name: 'NoiDung', type: 'text', nullable: true })
  content: string;

  @Column({ name: 'Meta', type: 'jsonb', nullable: true })
  meta: Record<string, any> | null;

  @Column({ name: 'DaDoc', type: 'boolean', default: false })
  isRead: boolean;

  @CreateDateColumn({ name: 'NgayTao' })
  createdAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'MaNguoiDung' })
  user: User;
}
