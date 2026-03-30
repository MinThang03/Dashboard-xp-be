import { Entity, Column } from 'typeorm';

@Entity({ schema: 'dashboard_xp', name: 'ThuaDat' })
export class ThuaDat {
  @Column({ name: 'MaThua', type: 'varchar', length: 20, primary: true })
  MaThua: string;

  @Column({ name: 'SoThua', type: 'varchar', length: 20 })
  SoThua: string;

  @Column({ name: 'SoToBanDo', type: 'varchar', length: 20, nullable: true })
  SoToBanDo?: string | null;

  @Column({ name: 'DienTich', type: 'decimal', precision: 18, scale: 2 })
  DienTich: number;

  @Column({ name: 'MaLoaiDat', type: 'varchar', length: 20, nullable: true })
  MaLoaiDat?: string | null;

  @Column({ name: 'ChuSoHuu', type: 'varchar', length: 150, nullable: true })
  ChuSoHuu?: string | null;

  @Column({ name: 'ToaDo', type: 'varchar', length: 100, nullable: true })
  ToaDo?: string | null;

  @Column({ name: 'TrangThai', type: 'varchar', length: 50, default: 'Đang sử dụng' })
  TrangThai: string;

  @Column({ name: 'GhiChu', type: 'text', nullable: true })
  GhiChu?: string | null;

  @Column({ name: 'LoaiBanGhi', type: 'varchar', length: 50, nullable: true })
  LoaiBanGhi?: string | null;

  @Column({ name: 'MaHoSo', type: 'varchar', length: 50, nullable: true })
  MaHoSo?: string | null;

  @Column({ name: 'SoTo', type: 'varchar', length: 50, nullable: true })
  SoTo?: string | null;

  @Column({ name: 'LoaiDat', type: 'varchar', length: 120, nullable: true })
  LoaiDat?: string | null;

  @Column({ name: 'MucDichSuDung', type: 'text', nullable: true })
  MucDichSuDung?: string | null;

  @Column({ name: 'CCCD', type: 'varchar', length: 30, nullable: true })
  CCCD?: string | null;

  @Column({ name: 'DiaChiThuaDat', type: 'varchar', length: 255, nullable: true })
  DiaChiThuaDat?: string | null;

  @Column({ name: 'ToaDoX', type: 'decimal', precision: 11, scale: 6, nullable: true })
  ToaDoX?: number | null;

  @Column({ name: 'ToaDoY', type: 'decimal', precision: 11, scale: 6, nullable: true })
  ToaDoY?: number | null;

  @Column({ name: 'NguonGocSuDung', type: 'text', nullable: true })
  NguonGocSuDung?: string | null;

  @Column({ name: 'ThoiHanSuDung', type: 'varchar', length: 120, nullable: true })
  ThoiHanSuDung?: string | null;

  @Column({ name: 'SoSoDo', type: 'varchar', length: 100, nullable: true })
  SoSoDo?: string | null;

  @Column({ name: 'NgayCapSoDo', type: 'date', nullable: true })
  NgayCapSoDo?: Date | null;

  @Column({ name: 'NgayNhapLieu', type: 'date', nullable: true })
  NgayNhapLieu?: Date | null;

  @Column({ name: 'CanBoNhapLieu', type: 'varchar', length: 150, nullable: true })
  CanBoNhapLieu?: string | null;

  @Column({ name: 'SoDienThoai', type: 'varchar', length: 20, nullable: true })
  SoDienThoai?: string | null;

  @Column({ name: 'NgayNop', type: 'date', nullable: true })
  NgayNop?: Date | null;

  @Column({ name: 'NgayHenTra', type: 'date', nullable: true })
  NgayHenTra?: Date | null;

  @Column({ name: 'GiaiDoan', type: 'varchar', length: 120, nullable: true })
  GiaiDoan?: string | null;

  @Column({ name: 'CanBoTiepNhan', type: 'varchar', length: 150, nullable: true })
  CanBoTiepNhan?: string | null;

  @Column({ name: 'CanBoThamDinh', type: 'varchar', length: 150, nullable: true })
  CanBoThamDinh?: string | null;

  @Column({ name: 'NgayCap', type: 'date', nullable: true })
  NgayCap?: Date | null;

  @Column({ name: 'TienDo', type: 'int', nullable: true })
  TienDo?: number | null;

  @Column({ name: 'TrangThaiPhapLy', type: 'varchar', length: 120, nullable: true })
  TrangThaiPhapLy?: string | null;

  @Column({ name: 'LoThoBan', type: 'varchar', length: 120, nullable: true })
  LoThoBan?: string | null;

  @Column({ name: 'HanCheSuDung', type: 'text', nullable: true })
  HanCheSuDung?: string | null;

}
