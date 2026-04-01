import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserProfileNotificationsMessages1774900000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "dashboard_xp"."NguoiDung"
      ADD COLUMN IF NOT EXISTS "SoCCCD" VARCHAR(30)
    `);

    await queryRunner.query(`
      ALTER TABLE "dashboard_xp"."NguoiDung"
      ADD COLUMN IF NOT EXISTS "NgaySinh" DATE
    `);

    await queryRunner.query(`
      ALTER TABLE "dashboard_xp"."NguoiDung"
      ADD COLUMN IF NOT EXISTS "NgayBatDauLamViec" DATE
    `);

    await queryRunner.query(`
      ALTER TABLE "dashboard_xp"."NguoiDung"
      ADD COLUMN IF NOT EXISTS "DiaChiThuongTru" VARCHAR(255)
    `);

    await queryRunner.query(`
      ALTER TABLE "dashboard_xp"."NguoiDung"
      ADD COLUMN IF NOT EXISTS "ChucVu" VARCHAR(100)
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."ThongBaoNguoiDung" (
        "MaThongBao" SERIAL PRIMARY KEY,
        "MaNguoiDung" INT NOT NULL,
        "Loai" VARCHAR(30) NOT NULL,
        "TieuDe" VARCHAR(200) NOT NULL,
        "NoiDung" TEXT,
        "Meta" JSONB,
        "DaDoc" BOOLEAN DEFAULT false,
        "NgayTao" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "FK_ThongBaoNguoiDung_User" FOREIGN KEY ("MaNguoiDung")
          REFERENCES "dashboard_xp"."NguoiDung"("MaNguoiDung") ON DELETE CASCADE
      )
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_ThongBaoNguoiDung_User" ON "dashboard_xp"."ThongBaoNguoiDung" ("MaNguoiDung")
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_ThongBaoNguoiDung_DaDoc" ON "dashboard_xp"."ThongBaoNguoiDung" ("DaDoc")
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."TinNhanNguoiDung" (
        "MaTinNhan" SERIAL PRIMARY KEY,
        "MaNguoiDung" INT NOT NULL,
        "NguoiGui" VARCHAR(150) NOT NULL,
        "TieuDe" VARCHAR(200) NOT NULL,
        "TomTat" VARCHAR(300),
        "NoiDung" TEXT,
        "DaDoc" BOOLEAN DEFAULT false,
        "NgayTao" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "FK_TinNhanNguoiDung_User" FOREIGN KEY ("MaNguoiDung")
          REFERENCES "dashboard_xp"."NguoiDung"("MaNguoiDung") ON DELETE CASCADE
      )
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_TinNhanNguoiDung_User" ON "dashboard_xp"."TinNhanNguoiDung" ("MaNguoiDung")
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_TinNhanNguoiDung_DaDoc" ON "dashboard_xp"."TinNhanNguoiDung" ("DaDoc")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."TinNhanNguoiDung"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."ThongBaoNguoiDung"`);

    await queryRunner.query(`
      ALTER TABLE "dashboard_xp"."NguoiDung"
      DROP COLUMN IF EXISTS "ChucVu"
    `);

    await queryRunner.query(`
      ALTER TABLE "dashboard_xp"."NguoiDung"
      DROP COLUMN IF EXISTS "DiaChiThuongTru"
    `);

    await queryRunner.query(`
      ALTER TABLE "dashboard_xp"."NguoiDung"
      DROP COLUMN IF EXISTS "NgayBatDauLamViec"
    `);

    await queryRunner.query(`
      ALTER TABLE "dashboard_xp"."NguoiDung"
      DROP COLUMN IF EXISTS "NgaySinh"
    `);

    await queryRunner.query(`
      ALTER TABLE "dashboard_xp"."NguoiDung"
      DROP COLUMN IF EXISTS "SoCCCD"
    `);
  }
}
