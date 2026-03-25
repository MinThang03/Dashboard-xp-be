import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMissingColumnsKinhTePhanAnh1738500960000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE SCHEMA IF NOT EXISTS "dashboard_xp"');

    await queryRunner.query('ALTER TABLE "dashboard_xp"."HoKinhDoanh" ADD COLUMN IF NOT EXISTS "SoGCN" VARCHAR(50)');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."HoKinhDoanh" ADD COLUMN IF NOT EXISTS "ChuHo" VARCHAR(150)');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."HoKinhDoanh" ADD COLUMN IF NOT EXISTS "CCCD" VARCHAR(20)');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."HoKinhDoanh" ADD COLUMN IF NOT EXISTS "NgaySinh" DATE');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."HoKinhDoanh" ADD COLUMN IF NOT EXISTS "DiaChi" VARCHAR(255)');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."HoKinhDoanh" ADD COLUMN IF NOT EXISTS "DiaChiKinhDoanh" VARCHAR(255)');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."HoKinhDoanh" ADD COLUMN IF NOT EXISTS "DienThoai" VARCHAR(20)');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."HoKinhDoanh" ADD COLUMN IF NOT EXISTS "Email" VARCHAR(100)');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."HoKinhDoanh" ADD COLUMN IF NOT EXISTS "NganhNghe" VARCHAR(150)');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."HoKinhDoanh" ADD COLUMN IF NOT EXISTS "MaNganhNghe" VARCHAR(20)');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."HoKinhDoanh" ADD COLUMN IF NOT EXISTS "VonKinhDoanh" DECIMAL(18,2)');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."HoKinhDoanh" ADD COLUMN IF NOT EXISTS "DoanhThuNam" DECIMAL(18,2)');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."HoKinhDoanh" ADD COLUMN IF NOT EXISTS "SoLaoDong" INT');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."HoKinhDoanh" ADD COLUMN IF NOT EXISTS "NgayDangKy" DATE');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."HoKinhDoanh" ADD COLUMN IF NOT EXISTS "NgayHetHan" DATE');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."HoKinhDoanh" ADD COLUMN IF NOT EXISTS "LanCapPhep" INT');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."HoKinhDoanh" ADD COLUMN IF NOT EXISTS "DienTichKD" DECIMAL(10,2)');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."HoKinhDoanh" ADD COLUMN IF NOT EXISTS "LoaiHinhKD" VARCHAR(100)');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."HoKinhDoanh" ADD COLUMN IF NOT EXISTS "GhiChu" TEXT');

    await queryRunner.query('ALTER TABLE "dashboard_xp"."ChoDiemKinhDoanh" ADD COLUMN IF NOT EXISTS "MaDiemKD" VARCHAR(50)');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."ChoDiemKinhDoanh" ADD COLUMN IF NOT EXISTS "LoaiHinh" VARCHAR(100)');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."ChoDiemKinhDoanh" ADD COLUMN IF NOT EXISTS "DiaChi" VARCHAR(255)');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."ChoDiemKinhDoanh" ADD COLUMN IF NOT EXISTS "DienTich" DECIMAL(12,2)');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."ChoDiemKinhDoanh" ADD COLUMN IF NOT EXISTS "SoGianHang" INT');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."ChoDiemKinhDoanh" ADD COLUMN IF NOT EXISTS "SoGianDangKinhDoanh" INT');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."ChoDiemKinhDoanh" ADD COLUMN IF NOT EXISTS "SoGianTrong" INT');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."ChoDiemKinhDoanh" ADD COLUMN IF NOT EXISTS "DoanhThuThang" DECIMAL(18,2)');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."ChoDiemKinhDoanh" ADD COLUMN IF NOT EXISTS "ThuPhiThang" DECIMAL(18,2)');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."ChoDiemKinhDoanh" ADD COLUMN IF NOT EXISTS "BanQuanLy" VARCHAR(150)');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."ChoDiemKinhDoanh" ADD COLUMN IF NOT EXISTS "SoDienThoai" VARCHAR(20)');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."ChoDiemKinhDoanh" ADD COLUMN IF NOT EXISTS "NgayThanhLap" DATE');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."ChoDiemKinhDoanh" ADD COLUMN IF NOT EXISTS "GiayPhep" VARCHAR(100)');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."ChoDiemKinhDoanh" ADD COLUMN IF NOT EXISTS "NgayCapPhep" DATE');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."ChoDiemKinhDoanh" ADD COLUMN IF NOT EXISTS "NgayHetHan" DATE');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."ChoDiemKinhDoanh" ADD COLUMN IF NOT EXISTS "CoSoHaTang" VARCHAR(100)');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."ChoDiemKinhDoanh" ADD COLUMN IF NOT EXISTS "AnNinhTratTu" VARCHAR(100)');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."ChoDiemKinhDoanh" ADD COLUMN IF NOT EXISTS "VeSinhMoiTruong" VARCHAR(100)');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."ChoDiemKinhDoanh" ADD COLUMN IF NOT EXISTS "GhiChu" TEXT');

    await queryRunner.query('ALTER TABLE "dashboard_xp"."PhanAnh" ADD COLUMN IF NOT EXISTS "TenNguoiPhanAnh" VARCHAR(150)');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."PhanAnh" ADD COLUMN IF NOT EXISTS "SoDienThoai" VARCHAR(20)');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."PhanAnh" ADD COLUMN IF NOT EXISTS "DiaChi" VARCHAR(255)');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."PhanAnh" ADD COLUMN IF NOT EXISTS "TenLinhVuc" VARCHAR(120)');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."PhanAnh" ADD COLUMN IF NOT EXISTS "ToaDo" VARCHAR(120)');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."PhanAnh" ADD COLUMN IF NOT EXISTS "TenCanBoXuLy" VARCHAR(150)');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."PhanAnh" ADD COLUMN IF NOT EXISTS "NgayTao" TIMESTAMP DEFAULT CURRENT_TIMESTAMP');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."PhanAnh" ADD COLUMN IF NOT EXISTS "KetQuaXuLy" TEXT');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."PhanAnh" ADD COLUMN IF NOT EXISTS "DiemDanhGia" INT');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // No-op to avoid accidental data loss on existing tables.
  }
}
