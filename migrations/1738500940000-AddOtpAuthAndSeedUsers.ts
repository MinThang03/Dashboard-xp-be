import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOtpAuthAndSeedUsers1738500940000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS "dashboard_xp"`);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."VaiTro" (
        "MaVaiTro" SERIAL PRIMARY KEY,
        "TenVaiTro" VARCHAR(50) UNIQUE NOT NULL,
        "MaCode" VARCHAR(20) UNIQUE NOT NULL,
        "MoTa" VARCHAR(255),
        "ThuTuHienThi" INT DEFAULT 0,
        "TrangThai" BOOLEAN DEFAULT true,
        "NgayTao" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await queryRunner.query(`
      INSERT INTO "dashboard_xp"."VaiTro" ("TenVaiTro", "MaCode", "ThuTuHienThi") VALUES
      ('Quan tri he thong', 'ADMIN', 1),
      ('Lanh dao', 'LANHDAO', 2),
      ('Can bo chuyen mon', 'CANBO', 3),
      ('Cong dan', 'CONGDAN', 4)
      ON CONFLICT ("MaCode") DO NOTHING
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."NguoiDung" (
        "MaNguoiDung" SERIAL PRIMARY KEY,
        "TenDangNhap" VARCHAR(50) UNIQUE NOT NULL,
        "MatKhau" VARCHAR(255) NOT NULL,
        "HoVaTen" VARCHAR(100) NOT NULL,
        "Email" VARCHAR(100),
        "EmailVerificationOtp" VARCHAR(6),
        "OtpExpiresAt" TIMESTAMP,
        "EmailVerifiedAt" TIMESTAMP,
        "SoDienThoai" VARCHAR(20),
        "AnhDaiDien" VARCHAR(500),
        "MaVaiTro" INT NOT NULL,
        "TrangThai" BOOLEAN DEFAULT true,
        "NgayTao" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "NgayCapNhat" TIMESTAMP DEFAULT NULL,
        "NguoiTao" INT,
        "IsDeleted" BOOLEAN DEFAULT false,
        FOREIGN KEY ("MaVaiTro") REFERENCES "dashboard_xp"."VaiTro"("MaVaiTro"),
        FOREIGN KEY ("NguoiTao") REFERENCES "dashboard_xp"."NguoiDung"("MaNguoiDung")
      )
    `);

    await queryRunner.query(`
      ALTER TABLE "dashboard_xp"."NguoiDung"
      ADD COLUMN IF NOT EXISTS "EmailVerificationOtp" VARCHAR(6)
    `);
    await queryRunner.query(`
      ALTER TABLE "dashboard_xp"."NguoiDung"
      ADD COLUMN IF NOT EXISTS "OtpExpiresAt" TIMESTAMP
    `);
    await queryRunner.query(`
      ALTER TABLE "dashboard_xp"."NguoiDung"
      ADD COLUMN IF NOT EXISTS "EmailVerifiedAt" TIMESTAMP
    `);

    await queryRunner.query(`
      INSERT INTO "dashboard_xp"."NguoiDung" (
        "TenDangNhap", "MatKhau", "HoVaTen", "Email", "MaVaiTro", "TrangThai", "EmailVerifiedAt"
      ) VALUES
      (
        'admin',
        '$2b$10$QF8LYvl.EXsZgQ8HcLXSG.DGx6oJoKyOR5dRfGgkaspuD3tSLWRZq',
        'Quan tri he thong',
        'admin@dashboardxp.local',
        (SELECT "MaVaiTro" FROM "dashboard_xp"."VaiTro" WHERE "MaCode" = 'ADMIN' LIMIT 1),
        true,
        CURRENT_TIMESTAMP
      ),
      (
        'leader',
        '$2b$10$p47zV5JEo8jugHNNUh/IYeX5t4HiH9wQoLlSGGHrwJ0gGad8SgNQa',
        'Lanh dao phuong',
        'leader@dashboardxp.local',
        (SELECT "MaVaiTro" FROM "dashboard_xp"."VaiTro" WHERE "MaCode" = 'LANHDAO' LIMIT 1),
        true,
        CURRENT_TIMESTAMP
      ),
      (
        'officer',
        '$2b$10$p47zV5JEo8jugHNNUh/IYeX5t4HiH9wQoLlSGGHrwJ0gGad8SgNQa',
        'Can bo chuyen mon',
        'officer@dashboardxp.local',
        (SELECT "MaVaiTro" FROM "dashboard_xp"."VaiTro" WHERE "MaCode" = 'CANBO' LIMIT 1),
        true,
        CURRENT_TIMESTAMP
      ),
      (
        'citizen',
        '$2b$10$p47zV5JEo8jugHNNUh/IYeX5t4HiH9wQoLlSGGHrwJ0gGad8SgNQa',
        'Cong dan mau',
        'citizen@dashboardxp.local',
        (SELECT "MaVaiTro" FROM "dashboard_xp"."VaiTro" WHERE "MaCode" = 'CONGDAN' LIMIT 1),
        true,
        CURRENT_TIMESTAMP
      )
      ON CONFLICT ("TenDangNhap") DO NOTHING
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM "dashboard_xp"."NguoiDung"
      WHERE "TenDangNhap" IN ('admin', 'leader', 'officer', 'citizen')
    `);
  }
}
