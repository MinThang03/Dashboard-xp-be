import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'dashboard_xp', name: 'NganSach' })
export class NganSach {
  @PrimaryGeneratedColumn({ name: 'MaNganSach' })
  MaNganSach: number;

  @Column({ name: 'Nam', type: 'int' })
  Nam: number;

  @Column({ name: 'MaLinhVuc', type: 'int', nullable: true })
  MaLinhVuc?: number | null;

  @Column({ name: 'TongDuToan', type: 'decimal', precision: 18 })
  TongDuToan: number;

  @Column({ name: 'DaGiaiNgan', type: 'decimal', precision: 18 })
  DaGiaiNgan: number;

  @Column({ name: 'ConLai', type: 'decimal', precision: 18 })
  ConLai: number;

  @Column({ name: 'TrangThai', type: 'varchar', length: 50, default: 'Đang thực hiện' })
  TrangThai: string;

  @Column({ name: 'NgayTao', type: 'timestamp' })
  NgayTao: Date;

  @Column({ name: 'LoaiBanGhi', type: 'varchar', length: 50, nullable: true })
  LoaiBanGhi?: string | null;

  @Column({ name: 'MaHoSo', type: 'varchar', length: 50, nullable: true })
  MaHoSo?: string | null;

  @Column({ name: 'TenNghiepVu', type: 'varchar', length: 255, nullable: true })
  TenNghiepVu?: string | null;

  @Column({ name: 'MoTa', type: 'text', nullable: true })
  MoTa?: string | null;

  @Column({ name: 'GhiChu', type: 'text', nullable: true })
  GhiChu?: string | null;

  @Column({ name: 'NgayCapNhat', type: 'date', nullable: true })
  NgayCapNhat?: Date | null;

  @Column({ name: 'MaThu', type: 'varchar', length: 50, nullable: true })
  MaThu?: string | null;

  @Column({ name: 'LoaiThu', type: 'varchar', length: 120, nullable: true })
  LoaiThu?: string | null;

  @Column({ name: 'NguonThu', type: 'varchar', length: 255, nullable: true })
  NguonThu?: string | null;

  @Column({ name: 'SoTien', type: 'decimal', precision: 18, scale: 2, nullable: true })
  SoTien?: number | null;

  @Column({ name: 'SoTienKeHoach', type: 'decimal', precision: 18, scale: 2, nullable: true })
  SoTienKeHoach?: number | null;

  @Column({ name: 'NguoiNop', type: 'varchar', length: 150, nullable: true })
  NguoiNop?: string | null;

  @Column({ name: 'DiaChi', type: 'varchar', length: 255, nullable: true })
  DiaChi?: string | null;

  @Column({ name: 'NgayThu', type: 'date', nullable: true })
  NgayThu?: Date | null;

  @Column({ name: 'NguoiThu', type: 'varchar', length: 150, nullable: true })
  NguoiThu?: string | null;

  @Column({ name: 'PhuongThuc', type: 'varchar', length: 80, nullable: true })
  PhuongThuc?: string | null;

  @Column({ name: 'SoBienLai', type: 'varchar', length: 100, nullable: true })
  SoBienLai?: string | null;

  @Column({ name: 'MaChi', type: 'varchar', length: 50, nullable: true })
  MaChi?: string | null;

  @Column({ name: 'LoaiChi', type: 'varchar', length: 120, nullable: true })
  LoaiChi?: string | null;

  @Column({ name: 'HangMucChi', type: 'varchar', length: 255, nullable: true })
  HangMucChi?: string | null;

  @Column({ name: 'DuToan', type: 'decimal', precision: 18, scale: 2, nullable: true })
  DuToan?: number | null;

  @Column({ name: 'NguoiNhan', type: 'varchar', length: 150, nullable: true })
  NguoiNhan?: string | null;

  @Column({ name: 'DonViNhan', type: 'varchar', length: 150, nullable: true })
  DonViNhan?: string | null;

  @Column({ name: 'NgayChi', type: 'date', nullable: true })
  NgayChi?: Date | null;

  @Column({ name: 'NguoiDuyetText', type: 'varchar', length: 150, nullable: true })
  NguoiDuyetText?: string | null;

  @Column({ name: 'SoChungTu', type: 'varchar', length: 100, nullable: true })
  SoChungTu?: string | null;

  @Column({ name: 'MaDuAn', type: 'varchar', length: 50, nullable: true })
  MaDuAn?: string | null;

  @Column({ name: 'TenDuAn', type: 'varchar', length: 255, nullable: true })
  TenDuAn?: string | null;

  @Column({ name: 'LoaiDuAn', type: 'varchar', length: 120, nullable: true })
  LoaiDuAn?: string | null;

  @Column({ name: 'DonViThucHien', type: 'varchar', length: 150, nullable: true })
  DonViThucHien?: string | null;

  @Column({ name: 'TongKeHoach', type: 'decimal', precision: 18, scale: 2, nullable: true })
  TongKeHoach?: number | null;

  @Column({ name: 'TienDo', type: 'int', nullable: true })
  TienDo?: number | null;

  @Column({ name: 'NgayBatDau', type: 'date', nullable: true })
  NgayBatDau?: Date | null;

  @Column({ name: 'NgayKetThuc', type: 'date', nullable: true })
  NgayKetThuc?: Date | null;

  @Column({ name: 'SoDotGiaiNgan', type: 'int', nullable: true })
  SoDotGiaiNgan?: number | null;

  @Column({ name: 'TenBaoCao', type: 'varchar', length: 255, nullable: true })
  TenBaoCao?: string | null;

  @Column({ name: 'LoaiBaoCao', type: 'varchar', length: 120, nullable: true })
  LoaiBaoCao?: string | null;

  @Column({ name: 'KyBaoCao', type: 'varchar', length: 120, nullable: true })
  KyBaoCao?: string | null;

  @Column({ name: 'NgayLap', type: 'date', nullable: true })
  NgayLap?: Date | null;

  @Column({ name: 'NguoiLap', type: 'varchar', length: 150, nullable: true })
  NguoiLap?: string | null;

  @Column({ name: 'TongThu', type: 'decimal', precision: 18, scale: 2, nullable: true })
  TongThu?: number | null;

  @Column({ name: 'TongChi', type: 'decimal', precision: 18, scale: 2, nullable: true })
  TongChi?: number | null;

  @Column({ name: 'TonQuy', type: 'decimal', precision: 18, scale: 2, nullable: true })
  TonQuy?: number | null;

}
