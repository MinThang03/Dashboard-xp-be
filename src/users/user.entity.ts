import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ schema: 'dashboard_xp', name: 'NguoiDung' })
export class User {
  @PrimaryGeneratedColumn({ name: 'MaNguoiDung' })
  id: number;

  @Column({ name: 'TenDangNhap', unique: true, length: 50 })
  username: string;

  @Column({ name: 'MatKhau', length: 255 })
  password: string;

  @Column({ name: 'HoVaTen', length: 100 })
  fullName: string;

  @Column({ name: 'Email', length: 100, nullable: true })
  email: string;

  @Column({ name: 'EmailVerificationOtp', length: 6, nullable: true })
  emailVerificationOtp: string;

  @Column({ name: 'OtpExpiresAt', type: 'timestamp', nullable: true })
  otpExpiresAt: Date;

  @Column({ name: 'EmailVerifiedAt', type: 'timestamp', nullable: true })
  emailVerifiedAt: Date;

  @Column({ name: 'SoDienThoai', length: 20, nullable: true })
  phone: string;

  @Column({ name: 'AnhDaiDien', length: 500, nullable: true })
  avatar: string;

  @Column({ name: 'MaVaiTro', type: 'int' })
  roleId: number;

  @Column({ name: 'TrangThai', type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'NgayTao' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'NgayCapNhat', nullable: true })
  updatedAt: Date;

  @Column({ name: 'NguoiTao', type: 'int', nullable: true })
  createdBy: number;

  @Column({ name: 'IsDeleted', type: 'boolean', default: false })
  isDeleted: boolean;
}
