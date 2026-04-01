import { Column, CreateDateColumn, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity({ schema: 'dashboard_xp', name: 'TinNhanNguoiDung' })
export class UserMessage {
  @PrimaryGeneratedColumn({ name: 'MaTinNhan' })
  id: number;

  @Column({ name: 'MaNguoiDung', type: 'int' })
  userId: number;

  @Column({ name: 'NguoiGui', length: 150 })
  fromName: string;

  @Column({ name: 'TieuDe', length: 200 })
  title: string;

  @Column({ name: 'TomTat', length: 300, nullable: true })
  preview: string;

  @Column({ name: 'NoiDung', type: 'text', nullable: true })
  body: string;

  @Column({ name: 'DaDoc', type: 'boolean', default: false })
  isRead: boolean;

  @CreateDateColumn({ name: 'NgayTao' })
  createdAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'MaNguoiDung' })
  user: User;
}
