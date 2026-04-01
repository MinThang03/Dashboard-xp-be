import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAdminTables1739000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "dashboard_xp"."VaiTro"
      ADD COLUMN IF NOT EXISTS "DanhSachQuyen" JSONB DEFAULT '[]'
    `);

    await queryRunner.query(`
      ALTER TABLE "dashboard_xp"."NguoiDung"
      ADD COLUMN IF NOT EXISTS "PhongBan" VARCHAR(150)
    `);

    await queryRunner.query(`
      ALTER TABLE "dashboard_xp"."XaPhuong"
      ADD COLUMN IF NOT EXISTS "DiaChi" VARCHAR(255)
    `);

    await queryRunner.query(`
      ALTER TABLE "dashboard_xp"."XaPhuong"
      ADD COLUMN IF NOT EXISTS "SoDienThoai" VARCHAR(20)
    `);

    await queryRunner.query(`
      ALTER TABLE "dashboard_xp"."XaPhuong"
      ADD COLUMN IF NOT EXISTS "Email" VARCHAR(100)
    `);

    await queryRunner.query(`
      ALTER TABLE "dashboard_xp"."XaPhuong"
      ADD COLUMN IF NOT EXISTS "ChuTich" VARCHAR(150)
    `);

    await queryRunner.query(`
      ALTER TABLE "dashboard_xp"."XaPhuong"
      ADD COLUMN IF NOT EXISTS "TrangThai" BOOLEAN DEFAULT true
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."CaiDatHeThong" (
        "MaCaiDat" SERIAL PRIMARY KEY,
        "TenHeThong" VARCHAR(200) NOT NULL,
        "EmailQuanTri" VARCHAR(120),
        "HanXuLyMacDinh" INT DEFAULT 15,
        "CanhBaoTreHan" INT DEFAULT 3,
        "ThongBao" BOOLEAN DEFAULT true,
        "TuDongCapNhat" BOOLEAN DEFAULT true,
        "ChuKyCapNhat" INT DEFAULT 5,
        "AvatarUrl" VARCHAR(500),
        "NgayCapNhat" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."CaiDatHeThong"`);

    await queryRunner.query(`
      ALTER TABLE "dashboard_xp"."XaPhuong"
      DROP COLUMN IF EXISTS "TrangThai"
    `);

    await queryRunner.query(`
      ALTER TABLE "dashboard_xp"."XaPhuong"
      DROP COLUMN IF EXISTS "ChuTich"
    `);

    await queryRunner.query(`
      ALTER TABLE "dashboard_xp"."XaPhuong"
      DROP COLUMN IF EXISTS "Email"
    `);

    await queryRunner.query(`
      ALTER TABLE "dashboard_xp"."XaPhuong"
      DROP COLUMN IF EXISTS "SoDienThoai"
    `);

    await queryRunner.query(`
      ALTER TABLE "dashboard_xp"."XaPhuong"
      DROP COLUMN IF EXISTS "DiaChi"
    `);

    await queryRunner.query(`
      ALTER TABLE "dashboard_xp"."VaiTro"
      DROP COLUMN IF EXISTS "DanhSachQuyen"
    `);

    await queryRunner.query(`
      ALTER TABLE "dashboard_xp"."NguoiDung"
      DROP COLUMN IF EXISTS "PhongBan"
    `);
  }
}
