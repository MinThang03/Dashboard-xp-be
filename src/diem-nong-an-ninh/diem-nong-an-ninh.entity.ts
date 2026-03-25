import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'dashboard_xp', name: 'DiemNongAnNinh' })
export class DiemNongAnNinh {
  @PrimaryGeneratedColumn({ name: 'MaDiem' })
  MaDiem: number;

  @Column({ name: 'MaDN', type: 'varchar', length: 50, nullable: true })
  MaDN?: string | null;

  @Column({ name: 'TenDiaDiem', type: 'varchar', length: 200, nullable: true })
  TenDiaDiem?: string | null;

  @Column({ name: 'TenDiem', type: 'varchar', length: 150 })
  TenDiem: string;

  @Column({ name: 'DiaDiem', type: 'varchar', length: 255, nullable: true })
  DiaDiem?: string | null;

  @Column({ name: 'ToaDo', type: 'varchar', length: 50, nullable: true })
  ToaDo?: string | null;

  @Column({ name: 'ToaDoLat', type: 'decimal', precision: 10, scale: 6, nullable: true })
  ToaDoLat?: number | null;

  @Column({ name: 'ToaDoLng', type: 'decimal', precision: 10, scale: 6, nullable: true })
  ToaDoLng?: number | null;

  @Column({ name: 'LoaiDiaDiem', type: 'varchar', length: 120, nullable: true })
  LoaiDiaDiem?: string | null;

  @Column({ name: 'LoaiViPham', type: 'varchar', length: 120, nullable: true })
  LoaiViPham?: string | null;

  @Column({ name: 'MucDo', type: 'varchar', length: 30, nullable: true })
  MucDo?: string | null;

  @Column({ name: 'SoDoiTuong', type: 'int', nullable: true })
  SoDoiTuong?: number | null;

  @Column({ name: 'NgayCapNhat', type: 'date', nullable: true })
  NgayCapNhat?: Date | null;

  @Column({ name: 'CanBoTheoDoi', type: 'varchar', length: 150, nullable: true })
  CanBoTheoDoi?: string | null;

  @Column({ name: 'SoDienThoai', type: 'varchar', length: 20, nullable: true })
  SoDienThoai?: string | null;

  @Column({ name: 'MoTa', type: 'text', nullable: true })
  MoTa?: string | null;

  @Column({ name: 'LoaiRuiRo', type: 'varchar', length: 100, nullable: true })
  LoaiRuiRo?: string | null;

  @Column({ name: 'MucDoNghiemTrong', type: 'varchar', length: 20, nullable: true })
  MucDoNghiemTrong?: string | null;

  @Column({ name: 'TinhTrang', type: 'varchar', length: 50, default: 'Đang theo dõi' })
  TinhTrang: string;

  @Column({ name: 'TrangThai', type: 'varchar', length: 50, nullable: true })
  TrangThai?: string | null;

  @Column({ name: 'NgayPhatHien', type: 'date' })
  NgayPhatHien: Date;

  @Column({ name: 'BienPhapXuLy', type: 'text', nullable: true })
  BienPhapXuLy?: string | null;

  @Column({ name: 'GhiChu', type: 'text', nullable: true })
  GhiChu?: string | null;

}
