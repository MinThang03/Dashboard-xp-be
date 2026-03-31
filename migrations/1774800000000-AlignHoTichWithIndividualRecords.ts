import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlignHoTichWithIndividualRecords1774800000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE IF EXISTS dashboard_xp."HoTich"
      ADD COLUMN IF NOT EXISTS "ho_ten_ca_nhan" varchar(150),
      ADD COLUMN IF NOT EXISTS "ngay_sinh" date,
      ADD COLUMN IF NOT EXISTS "gioi_tinh" varchar(10),
      ADD COLUMN IF NOT EXISTS "so_cccd" varchar(20),
      ADD COLUMN IF NOT EXISTS "dia_chi_thuong_tru" varchar(255),
      ADD COLUMN IF NOT EXISTS "loai_su_kien_ho_tich" varchar(80),
      ADD COLUMN IF NOT EXISTS "ngay_dang_ky" date,
      ADD COLUMN IF NOT EXISTS "noi_dang_ky" varchar(255);
    `);

    await queryRunner.query(`
      UPDATE dashboard_xp."HoTich"
      SET
        "ho_ten_ca_nhan" = COALESCE("ho_ten_ca_nhan", "ten_chu_ho"),
        "ngay_sinh" = COALESCE("ngay_sinh", "ngay_sinh_chu_ho"),
        "gioi_tinh" = COALESCE("gioi_tinh", "gioi_tinh_chu_ho"),
        "dia_chi_thuong_tru" = COALESCE("dia_chi_thuong_tru", "dia_chi_ho_tich"),
        "ngay_dang_ky" = COALESCE("ngay_dang_ky", "ngay_lap_ho_tich")
      WHERE true;
    `);
  }

  public async down(): Promise<void> {
    // Keep columns to avoid destructive rollback in production data.
  }
}
