import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'dashboard_xp', name: 'TheoDoiTratTuXayDung' })
export class TheoDoiTratTuXayDung {
  @PrimaryGeneratedColumn({ name: 'MaTheoDoi' })
  MaTheoDoi: number;

  @Column({ name: 'MaHoSo', type: 'int', nullable: true })
  MaHoSo?: number | null;

  @Column({ name: 'NgayKiemTra', type: 'date', nullable: true })
  NgayKiemTra?: Date | null;

  @Column({ name: 'TinhTrang', type: 'varchar', length: 50, nullable: true })
  TinhTrang?: string | null;

  @Column({ name: 'NhanXet', type: 'text', nullable: true })
  NhanXet?: string | null;

  @Column({ name: 'HinhAnh', type: 'varchar', length: 500, nullable: true })
  HinhAnh?: string | null;

  @Column({ name: 'MaKiemTra', type: 'varchar', length: 50, nullable: true })
  MaKiemTra?: string | null;

  @Column({ name: 'DiaChi', type: 'varchar', length: 255, nullable: true })
  DiaChi?: string | null;

  @Column({ name: 'MaThua', type: 'varchar', length: 50, nullable: true })
  MaThua?: string | null;

  @Column({ name: 'SoTo', type: 'varchar', length: 50, nullable: true })
  SoTo?: string | null;

  @Column({ name: 'LoaiCongTrinh', type: 'varchar', length: 100, nullable: true })
  LoaiCongTrinh?: string | null;

  @Column({ name: 'ChuDauTu', type: 'varchar', length: 150, nullable: true })
  ChuDauTu?: string | null;

  @Column({ name: 'CCCD', type: 'varchar', length: 30, nullable: true })
  CCCD?: string | null;

  @Column({ name: 'SoDienThoai', type: 'varchar', length: 20, nullable: true })
  SoDienThoai?: string | null;

  @Column({ name: 'SoGiayPhep', type: 'varchar', length: 100, nullable: true })
  SoGiayPhep?: string | null;

  @Column({ name: 'NgayCapPhep', type: 'date', nullable: true })
  NgayCapPhep?: Date | null;

  @Column({ name: 'TinhTrangGiayPhep', type: 'varchar', length: 100, nullable: true })
  TinhTrangGiayPhep?: string | null;

  @Column({ name: 'NoiDungKiemTra', type: 'text', nullable: true })
  NoiDungKiemTra?: string | null;

  @Column({ name: 'CanBoKiemTra', type: 'varchar', length: 150, nullable: true })
  CanBoKiemTra?: string | null;

  @Column({ name: 'KetQuaKiemTra', type: 'varchar', length: 100, nullable: true })
  KetQuaKiemTra?: string | null;

  @Column({ name: 'LoaiViPham', type: 'varchar', length: 150, nullable: true })
  LoaiViPham?: string | null;

  @Column({ name: 'MucDo', type: 'varchar', length: 50, nullable: true })
  MucDo?: string | null;

  @Column({ name: 'BienPhapXuLy', type: 'text', nullable: true })
  BienPhapXuLy?: string | null;

  @Column({ name: 'ThoiHanKhacPhuc', type: 'date', nullable: true })
  ThoiHanKhacPhuc?: Date | null;

  @Column({ name: 'TrangThaiXuLy', type: 'varchar', length: 100, nullable: true })
  TrangThaiXuLy?: string | null;

  @Column({ name: 'GhiChu', type: 'text', nullable: true })
  GhiChu?: string | null;
}
