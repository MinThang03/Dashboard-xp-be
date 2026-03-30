import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'dashboard_xp', name: 'BienDongDat' })
export class BienDongDat {
  @PrimaryGeneratedColumn({ name: 'MaBienDong' })
  MaBienDong: number;

  @Column({ name: 'MaThua', type: 'varchar', length: 20 })
  MaThua: string;

  @Column({ name: 'LoaiBienDong', type: 'varchar', length: 50 })
  LoaiBienDong: string;

  @Column({ name: 'NgayBienDong', type: 'date' })
  NgayBienDong: Date;

  @Column({ name: 'DienTichCu', type: 'decimal', precision: 18, scale: 2, nullable: true })
  DienTichCu?: number | null;

  @Column({ name: 'DienTichMoi', type: 'decimal', precision: 18, scale: 2, nullable: true })
  DienTichMoi?: number | null;

  @Column({ name: 'MaLoaiDatCu', type: 'varchar', length: 20, nullable: true })
  MaLoaiDatCu?: string | null;

  @Column({ name: 'MaLoaiDatMoi', type: 'varchar', length: 20, nullable: true })
  MaLoaiDatMoi?: string | null;

  @Column({ name: 'LyDo', type: 'text', nullable: true })
  LyDo?: string | null;

  @Column({ name: 'NguoiThucHien', type: 'int', nullable: true })
  NguoiThucHien?: number | null;

  @Column({ name: 'LoaiBanGhi', type: 'varchar', length: 50, nullable: true })
  LoaiBanGhi?: string | null;

  @Column({ name: 'MaBienDongText', type: 'varchar', length: 50, nullable: true })
  MaBienDongText?: string | null;

  @Column({ name: 'SoTo', type: 'varchar', length: 50, nullable: true })
  SoTo?: string | null;

  @Column({ name: 'LoaiDatCu', type: 'varchar', length: 120, nullable: true })
  LoaiDatCu?: string | null;

  @Column({ name: 'LoaiDatMoi', type: 'varchar', length: 120, nullable: true })
  LoaiDatMoi?: string | null;

  @Column({ name: 'ChuSoHuuCu', type: 'varchar', length: 150, nullable: true })
  ChuSoHuuCu?: string | null;

  @Column({ name: 'ChuSoHuuMoi', type: 'varchar', length: 150, nullable: true })
  ChuSoHuuMoi?: string | null;

  @Column({ name: 'CCCDCu', type: 'varchar', length: 30, nullable: true })
  CCCDCu?: string | null;

  @Column({ name: 'CCCDMoi', type: 'varchar', length: 30, nullable: true })
  CCCDMoi?: string | null;

  @Column({ name: 'CanBoXuLy', type: 'varchar', length: 150, nullable: true })
  CanBoXuLy?: string | null;

  @Column({ name: 'NgayDeNghi', type: 'date', nullable: true })
  NgayDeNghi?: Date | null;

  @Column({ name: 'NgayDuyet', type: 'date', nullable: true })
  NgayDuyet?: Date | null;

  @Column({ name: 'TrangThai', type: 'varchar', length: 120, nullable: true })
  TrangThai?: string | null;

  @Column({ name: 'GhiChu', type: 'text', nullable: true })
  GhiChu?: string | null;

  @Column({ name: 'MaHoSo', type: 'varchar', length: 50, nullable: true })
  MaHoSo?: string | null;

  @Column({ name: 'LoaiThamDinh', type: 'varchar', length: 120, nullable: true })
  LoaiThamDinh?: string | null;

  @Column({ name: 'NgayThamDinh', type: 'date', nullable: true })
  NgayThamDinh?: Date | null;

  @Column({ name: 'CanBoThamDinh', type: 'varchar', length: 150, nullable: true })
  CanBoThamDinh?: string | null;

  @Column({ name: 'DonViThamDinh', type: 'varchar', length: 150, nullable: true })
  DonViThamDinh?: string | null;

  @Column({ name: 'DienTichHoSo', type: 'decimal', precision: 18, scale: 2, nullable: true })
  DienTichHoSo?: number | null;

  @Column({ name: 'DienTichThucTe', type: 'decimal', precision: 18, scale: 2, nullable: true })
  DienTichThucTe?: number | null;

  @Column({ name: 'KetQuaThamDinh', type: 'varchar', length: 120, nullable: true })
  KetQuaThamDinh?: string | null;

  @Column({ name: 'MoTaSaiLech', type: 'text', nullable: true })
  MoTaSaiLech?: string | null;

  @Column({ name: 'HinhAnhChungCu', type: 'int', nullable: true })
  HinhAnhChungCu?: number | null;

  @Column({ name: 'DeXuatXuLy', type: 'text', nullable: true })
  DeXuatXuLy?: string | null;

  @Column({ name: 'MaVu', type: 'varchar', length: 50, nullable: true })
  MaVu?: string | null;

  @Column({ name: 'LoaiTranhChap', type: 'varchar', length: 150, nullable: true })
  LoaiTranhChap?: string | null;

  @Column({ name: 'DiaChiThuaDat', type: 'varchar', length: 255, nullable: true })
  DiaChiThuaDat?: string | null;

  @Column({ name: 'DienTichTranhChap', type: 'decimal', precision: 18, scale: 2, nullable: true })
  DienTichTranhChap?: number | null;

  @Column({ name: 'BenKhieuNai', type: 'varchar', length: 150, nullable: true })
  BenKhieuNai?: string | null;

  @Column({ name: 'CCCDKhieuNai', type: 'varchar', length: 30, nullable: true })
  CCCDKhieuNai?: string | null;

  @Column({ name: 'SDTKhieuNai', type: 'varchar', length: 20, nullable: true })
  SDTKhieuNai?: string | null;

  @Column({ name: 'BenBiKhieuNai', type: 'varchar', length: 150, nullable: true })
  BenBiKhieuNai?: string | null;

  @Column({ name: 'CCCDBiKhieuNai', type: 'varchar', length: 30, nullable: true })
  CCCDBiKhieuNai?: string | null;

  @Column({ name: 'NgayKhieuNai', type: 'date', nullable: true })
  NgayKhieuNai?: Date | null;

  @Column({ name: 'NoiDung', type: 'text', nullable: true })
  NoiDung?: string | null;

  @Column({ name: 'MucDo', type: 'varchar', length: 80, nullable: true })
  MucDo?: string | null;

  @Column({ name: 'CanBoThuLy', type: 'varchar', length: 150, nullable: true })
  CanBoThuLy?: string | null;

  @Column({ name: 'PhuongAnGiaiQuyet', type: 'text', nullable: true })
  PhuongAnGiaiQuyet?: string | null;

  @Column({ name: 'NgayGiaiQuyet', type: 'date', nullable: true })
  NgayGiaiQuyet?: Date | null;

  @Column({ name: 'KetQuaGiaiQuyet', type: 'text', nullable: true })
  KetQuaGiaiQuyet?: string | null;

}
