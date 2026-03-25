import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'dashboard_xp', name: 'DichBenh' })
export class DichBenh {
  @PrimaryGeneratedColumn({ name: 'MaDich' })
  MaDich: number;

  @Column({ name: 'TenDich', type: 'varchar', length: 100 })
  TenDich: string;

  @Column({ name: 'KhuVuc', type: 'varchar', length: 150, nullable: true })
  KhuVuc?: string | null;

  @Column({ name: 'SoCaNhiem', type: 'int' })
  SoCaNhiem: number;

  @Column({ name: 'SoCaKhoi', type: 'int' })
  SoCaKhoi: number;

  @Column({ name: 'NgayBatDau', type: 'date', nullable: true })
  NgayBatDau?: Date | null;

  @Column({ name: 'NgayKetThuc', type: 'date', nullable: true })
  NgayKetThuc?: Date | null;

  @Column({ name: 'MucDo', type: 'varchar', length: 20, nullable: true })
  MucDo?: string | null;

  @Column({ name: 'TrangThai', type: 'varchar', length: 50, default: 'Đang theo dõi' })
  TrangThai: string;

  @Column({ name: 'GhiChu', type: 'text', nullable: true })
  GhiChu?: string | null;

  @Column({ name: 'NgayCapNhat', type: 'timestamp' })
  NgayCapNhat: Date;

  @Column({ name: 'MaCa', type: 'varchar', length: 50, nullable: true })
  MaCa?: string | null;

  @Column({ name: 'LoaiBenh', type: 'varchar', length: 50, nullable: true })
  LoaiBenh?: string | null;

  @Column({ name: 'MaDonViBenh', type: 'varchar', length: 30, nullable: true })
  MaDonViBenh?: string | null;

  @Column({ name: 'MaBenhNhan', type: 'varchar', length: 50, nullable: true })
  MaBenhNhan?: string | null;

  @Column({ name: 'TenBenhNhan', type: 'varchar', length: 150, nullable: true })
  TenBenhNhan?: string | null;

  @Column({ name: 'GioiTinh', type: 'varchar', length: 10, nullable: true })
  GioiTinh?: string | null;

  @Column({ name: 'NamSinh', type: 'int', nullable: true })
  NamSinh?: number | null;

  @Column({ name: 'DiaChi', type: 'varchar', length: 255, nullable: true })
  DiaChi?: string | null;

  @Column({ name: 'SoDienThoai', type: 'varchar', length: 20, nullable: true })
  SoDienThoai?: string | null;

  @Column({ name: 'NgayKhoiPhat', type: 'date', nullable: true })
  NgayKhoiPhat?: Date | null;

  @Column({ name: 'NgayPhatHien', type: 'date', nullable: true })
  NgayPhatHien?: Date | null;

  @Column({ name: 'NgayBaoCao', type: 'date', nullable: true })
  NgayBaoCao?: Date | null;

  @Column({ name: 'TrieuChung', type: 'text', nullable: true })
  TrieuChung?: string | null;

  @Column({ name: 'TrangThaiDieuTri', type: 'varchar', length: 50, nullable: true })
  TrangThaiDieuTri?: string | null;

  @Column({ name: 'NoiDieuTri', type: 'varchar', length: 150, nullable: true })
  NoiDieuTri?: string | null;

  @Column({ name: 'NguoiTiepXuc', type: 'int', nullable: true })
  NguoiTiepXuc?: number | null;

  @Column({ name: 'KhuVucPhatHien', type: 'varchar', length: 150, nullable: true })
  KhuVucPhatHien?: string | null;

  @Column({ name: 'ToaDo', type: 'varchar', length: 100, nullable: true })
  ToaDo?: string | null;

  @Column({ name: 'BienPhapXuLy', type: 'text', nullable: true })
  BienPhapXuLy?: string | null;

  @Column({ name: 'NguoiBaoCao', type: 'varchar', length: 150, nullable: true })
  NguoiBaoCao?: string | null;

}
