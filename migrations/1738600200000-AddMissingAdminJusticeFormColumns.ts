import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMissingAdminJusticeFormColumns1738600200000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE IF EXISTS dashboard_xp."HoKhau"
      ADD COLUMN IF NOT EXISTS "CCCDChuHo" varchar(20),
      ADD COLUMN IF NOT EXISTS "NgaySinhChuHo" date,
      ADD COLUMN IF NOT EXISTS "GioiTinhChuHo" varchar(10),
      ADD COLUMN IF NOT EXISTS "SoDienThoaiChuHo" varchar(20);
    `);

    await queryRunner.query(`
      ALTER TABLE IF EXISTS dashboard_xp."ThanhVienHoKhau"
      ADD COLUMN IF NOT EXISTS "SoDienThoai" varchar(20);
    `);

    await queryRunner.query(`
      ALTER TABLE IF EXISTS dashboard_xp."ChungThuc"
      ADD COLUMN IF NOT EXISTS "TenNghiepVu" varchar(150),
      ADD COLUMN IF NOT EXISTS "MaTrangThai" varchar(50),
      ADD COLUMN IF NOT EXISTS "TenCanBoXuLy" varchar(150),
      ADD COLUMN IF NOT EXISTS "HanXuLy" date,
      ADD COLUMN IF NOT EXISTS "MucDoUuTien" int DEFAULT 2;
    `);

    await queryRunner.query(`
      ALTER TABLE IF EXISTS dashboard_xp."HoSoTTHC"
      ADD COLUMN IF NOT EXISTS "CCCD" varchar(20),
      ADD COLUMN IF NOT EXISTS "DiaChiLienHe" varchar(255),
      ADD COLUMN IF NOT EXISTS "LinhVuc" varchar(100),
      ADD COLUMN IF NOT EXISTS "TenThuTuc" varchar(200),
      ADD COLUMN IF NOT EXISTS "PhiLePhi" numeric(18,0) DEFAULT 0;
    `);

    await queryRunner.query(`
      ALTER TABLE IF EXISTS dashboard_xp."BaoCao"
      ADD COLUMN IF NOT EXISTS "NguoiLapText" varchar(150),
      ADD COLUMN IF NOT EXISTS "SoLieuThongKe" jsonb;
    `);
  }

  public async down(): Promise<void> {
    // Intentionally no-op to avoid destructive rollback of business columns.
  }
}
