import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMissingColumnsDiaChinhVanHoaForms1774800000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS "dashboard_xp"`);

    const alterQueries = [
      // DiTich
      `ALTER TABLE "dashboard_xp"."DiTich" ADD COLUMN IF NOT EXISTS "NamXayDung" INT`,
      `ALTER TABLE "dashboard_xp"."DiTich" ADD COLUMN IF NOT EXISTS "LuotKhachThang" INT DEFAULT 0`,
      `ALTER TABLE "dashboard_xp"."DiTich" ADD COLUMN IF NOT EXISTS "NgayCapNhat" DATE`,
      `ALTER TABLE "dashboard_xp"."DiTich" ADD COLUMN IF NOT EXISTS "KeHoachTuBo" TEXT`,

      // HoSoDiTich
      `ALTER TABLE "dashboard_xp"."HoSoDiTich" ADD COLUMN IF NOT EXISTS "TenDiTich" VARCHAR(200)`,
      `ALTER TABLE "dashboard_xp"."HoSoDiTich" ADD COLUMN IF NOT EXISTS "CapDo" VARCHAR(50)`,
      `ALTER TABLE "dashboard_xp"."HoSoDiTich" ADD COLUMN IF NOT EXISTS "TrangThai" VARCHAR(50) DEFAULT 'Đã nộp'`,
      `ALTER TABLE "dashboard_xp"."HoSoDiTich" ADD COLUMN IF NOT EXISTS "NgayNop" DATE`,
      `ALTER TABLE "dashboard_xp"."HoSoDiTich" ADD COLUMN IF NOT EXISTS "NgayDuyet" DATE`,
      `ALTER TABLE "dashboard_xp"."HoSoDiTich" ADD COLUMN IF NOT EXISTS "NguoiNop" VARCHAR(150)`,
      `ALTER TABLE "dashboard_xp"."HoSoDiTich" ADD COLUMN IF NOT EXISTS "TaiLieu" VARCHAR(200)`,
      `ALTER TABLE "dashboard_xp"."HoSoDiTich" ADD COLUMN IF NOT EXISTS "GhiChu" TEXT`,

      // LeHoi
      `ALTER TABLE "dashboard_xp"."LeHoi" ADD COLUMN IF NOT EXISTS "LoaiLeHoi" VARCHAR(100)`,
      `ALTER TABLE "dashboard_xp"."LeHoi" ADD COLUMN IF NOT EXISTS "SoLuongDuKien" INT DEFAULT 0`,
      `ALTER TABLE "dashboard_xp"."LeHoi" ADD COLUMN IF NOT EXISTS "NguoiChuTri" VARCHAR(150)`,
      `ALTER TABLE "dashboard_xp"."LeHoi" ADD COLUMN IF NOT EXISTS "ChiPhiToChuc" DECIMAL(18,2) DEFAULT 0`,
      `ALTER TABLE "dashboard_xp"."LeHoi" ADD COLUMN IF NOT EXISTS "DanhGiaSauSuKien" TEXT`,

      // LangNghe
      `ALTER TABLE "dashboard_xp"."LangNghe" ADD COLUMN IF NOT EXISTS "MaLN" VARCHAR(50)`,
      `ALTER TABLE "dashboard_xp"."LangNghe" ADD COLUMN IF NOT EXISTS "LoaiNgheNghiep" VARCHAR(100)`,
      `ALTER TABLE "dashboard_xp"."LangNghe" ADD COLUMN IF NOT EXISTS "DienTich" DECIMAL(18,2)`,
      `ALTER TABLE "dashboard_xp"."LangNghe" ADD COLUMN IF NOT EXISTS "SoNgheNhan" INT DEFAULT 0`,
      `ALTER TABLE "dashboard_xp"."LangNghe" ADD COLUMN IF NOT EXISTS "SoLaoDong" INT DEFAULT 0`,
      `ALTER TABLE "dashboard_xp"."LangNghe" ADD COLUMN IF NOT EXISTS "DoanhThuNam" DECIMAL(18,2) DEFAULT 0`,
      `ALTER TABLE "dashboard_xp"."LangNghe" ADD COLUMN IF NOT EXISTS "NamThanhLap" INT`,
      `ALTER TABLE "dashboard_xp"."LangNghe" ADD COLUMN IF NOT EXISTS "DanhHieu" VARCHAR(255)`,
      `ALTER TABLE "dashboard_xp"."LangNghe" ADD COLUMN IF NOT EXISTS "NamCongNhan" INT`,
      `ALTER TABLE "dashboard_xp"."LangNghe" ADD COLUMN IF NOT EXISTS "ThiTruong" VARCHAR(200)`,
      `ALTER TABLE "dashboard_xp"."LangNghe" ADD COLUMN IF NOT EXISTS "HoTro" TEXT`,
      `ALTER TABLE "dashboard_xp"."LangNghe" ADD COLUMN IF NOT EXISTS "MoTa" TEXT`,
      `ALTER TABLE "dashboard_xp"."LangNghe" ADD COLUMN IF NOT EXISTS "LienHe" VARCHAR(150)`,
      `ALTER TABLE "dashboard_xp"."LangNghe" ADD COLUMN IF NOT EXISTS "DienThoai" VARCHAR(20)`,
      `ALTER TABLE "dashboard_xp"."LangNghe" ADD COLUMN IF NOT EXISTS "TinhTrang" VARCHAR(50)`,
      `ALTER TABLE "dashboard_xp"."LangNghe" ADD COLUMN IF NOT EXISTS "SanLuongThang" INT DEFAULT 0`,
      `ALTER TABLE "dashboard_xp"."LangNghe" ADD COLUMN IF NOT EXISTS "ChungNhan" VARCHAR(100)`,
      `ALTER TABLE "dashboard_xp"."LangNghe" ADD COLUMN IF NOT EXISTS "GhiChu" TEXT`,

      // CoSoKinhDoanhDuLich
      `ALTER TABLE "dashboard_xp"."CoSoKinhDoanhDuLich" ADD COLUMN IF NOT EXISTS "MaCoSoCode" VARCHAR(50)`,
      `ALTER TABLE "dashboard_xp"."CoSoKinhDoanhDuLich" ADD COLUMN IF NOT EXISTS "PhanLoai" VARCHAR(100)`,
      `ALTER TABLE "dashboard_xp"."CoSoKinhDoanhDuLich" ADD COLUMN IF NOT EXISTS "Email" VARCHAR(150)`,
      `ALTER TABLE "dashboard_xp"."CoSoKinhDoanhDuLich" ADD COLUMN IF NOT EXISTS "SoPhong" INT DEFAULT 0`,
      `ALTER TABLE "dashboard_xp"."CoSoKinhDoanhDuLich" ADD COLUMN IF NOT EXISTS "SucChua" INT DEFAULT 0`,
      `ALTER TABLE "dashboard_xp"."CoSoKinhDoanhDuLich" ADD COLUMN IF NOT EXISTS "SaoXepHang" INT DEFAULT 0`,
      `ALTER TABLE "dashboard_xp"."CoSoKinhDoanhDuLich" ADD COLUMN IF NOT EXISTS "GiayCN" VARCHAR(100)`,
      `ALTER TABLE "dashboard_xp"."CoSoKinhDoanhDuLich" ADD COLUMN IF NOT EXISTS "NgayHetHan" DATE`,
      `ALTER TABLE "dashboard_xp"."CoSoKinhDoanhDuLich" ADD COLUMN IF NOT EXISTS "DoanhThuThang" DECIMAL(18,2) DEFAULT 0`,
      `ALTER TABLE "dashboard_xp"."CoSoKinhDoanhDuLich" ADD COLUMN IF NOT EXISTS "LuotKhachThang" INT DEFAULT 0`,
      `ALTER TABLE "dashboard_xp"."CoSoKinhDoanhDuLich" ADD COLUMN IF NOT EXISTS "DanhGiaTB" DECIMAL(4,2) DEFAULT 0`,
      `ALTER TABLE "dashboard_xp"."CoSoKinhDoanhDuLich" ADD COLUMN IF NOT EXISTS "TienIch" TEXT`,
      `ALTER TABLE "dashboard_xp"."CoSoKinhDoanhDuLich" ADD COLUMN IF NOT EXISTS "TinhTrangCapPhep" VARCHAR(100)`,
      `ALTER TABLE "dashboard_xp"."CoSoKinhDoanhDuLich" ADD COLUMN IF NOT EXISTS "DieuKienKinhDoanh" TEXT`,
      `ALTER TABLE "dashboard_xp"."CoSoKinhDoanhDuLich" ADD COLUMN IF NOT EXISTS "GhiChu" TEXT`,

      // RuiRoQuyHoach
      `ALTER TABLE "dashboard_xp"."RuiRoQuyHoach" ADD COLUMN IF NOT EXISTS "MaPhanTich" VARCHAR(50)`,
      `ALTER TABLE "dashboard_xp"."RuiRoQuyHoach" ADD COLUMN IF NOT EXISTS "KhuVuc" VARCHAR(255)`,
      `ALTER TABLE "dashboard_xp"."RuiRoQuyHoach" ADD COLUMN IF NOT EXISTS "DiaChi" VARCHAR(255)`,
      `ALTER TABLE "dashboard_xp"."RuiRoQuyHoach" ADD COLUMN IF NOT EXISTS "MaThua" VARCHAR(50)`,
      `ALTER TABLE "dashboard_xp"."RuiRoQuyHoach" ADD COLUMN IF NOT EXISTS "SoTo" VARCHAR(50)`,
      `ALTER TABLE "dashboard_xp"."RuiRoQuyHoach" ADD COLUMN IF NOT EXISTS "LoaiRuiRo" VARCHAR(100)`,
      `ALTER TABLE "dashboard_xp"."RuiRoQuyHoach" ADD COLUMN IF NOT EXISTS "XacSuat" INT`,
      `ALTER TABLE "dashboard_xp"."RuiRoQuyHoach" ADD COLUMN IF NOT EXISTS "DoTinCayAI" INT`,
      `ALTER TABLE "dashboard_xp"."RuiRoQuyHoach" ADD COLUMN IF NOT EXISTS "NguyenNhan" TEXT`,
      `ALTER TABLE "dashboard_xp"."RuiRoQuyHoach" ADD COLUMN IF NOT EXISTS "NgayCapNhat" DATE`,
    ];

    for (const query of alterQueries) {
      await queryRunner.query(query);
    }

    // Loosen constraints to support frontend forms that do not require linked planning/heritage IDs.
    await queryRunner.query(`
      DO $$
      BEGIN
        IF EXISTS (
          SELECT 1
          FROM information_schema.columns
          WHERE table_schema = 'dashboard_xp'
            AND table_name = 'HoSoDiTich'
            AND column_name = 'MaDiTich'
            AND is_nullable = 'NO'
        ) THEN
          ALTER TABLE "dashboard_xp"."HoSoDiTich" ALTER COLUMN "MaDiTich" DROP NOT NULL;
        END IF;
      END
      $$;
    `);

    await queryRunner.query(`
      DO $$
      BEGIN
        IF EXISTS (
          SELECT 1
          FROM information_schema.columns
          WHERE table_schema = 'dashboard_xp'
            AND table_name = 'RuiRoQuyHoach'
            AND column_name = 'MaQuyHoach'
            AND is_nullable = 'NO'
        ) THEN
          ALTER TABLE "dashboard_xp"."RuiRoQuyHoach" ALTER COLUMN "MaQuyHoach" DROP NOT NULL;
        END IF;
      END
      $$;
    `);

    await queryRunner.query(`
      DO $$
      BEGIN
        IF EXISTS (
          SELECT 1
          FROM information_schema.columns
          WHERE table_schema = 'dashboard_xp'
            AND table_name = 'RuiRoQuyHoach'
            AND column_name = 'MoTaRuiRo'
            AND is_nullable = 'NO'
        ) THEN
          ALTER TABLE "dashboard_xp"."RuiRoQuyHoach" ALTER COLUMN "MoTaRuiRo" DROP NOT NULL;
        END IF;
      END
      $$;
    `);

    await queryRunner.query(`
      UPDATE "dashboard_xp"."RuiRoQuyHoach"
      SET "MaPhanTich" = CONCAT('RRQH', LPAD("MaRuiRo"::text, 3, '0'))
      WHERE "MaPhanTich" IS NULL OR TRIM("MaPhanTich") = '';
    `);
  }

  public async down(): Promise<void> {
    // Intentionally no-op to avoid dropping columns that may already hold production data.
  }
}
