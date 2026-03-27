import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlignPhanAnhConstraintsWithFrontend1774700000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DO $$
      DECLARE c RECORD;
      BEGIN
        FOR c IN
          SELECT conname
          FROM pg_constraint
          WHERE conrelid = 'dashboard_xp."PhanAnh"'::regclass
            AND contype = 'c'
            AND (
              pg_get_constraintdef(oid) LIKE '%"TrangThai"%'
              OR pg_get_constraintdef(oid) LIKE '%"MucDoUuTien"%'
            )
        LOOP
          EXECUTE format('ALTER TABLE "dashboard_xp"."PhanAnh" DROP CONSTRAINT %I', c.conname);
        END LOOP;
      END $$;
    `);

    await queryRunner.query(`
      ALTER TABLE "dashboard_xp"."PhanAnh"
      ADD CONSTRAINT "CK_PhanAnh_TrangThai_Allowed"
      CHECK ("TrangThai" IN ('Mới', 'Đang xử lý', 'Đã xử lý', 'Đã đóng', 'Từ chối'))
    `);

    await queryRunner.query(`
      ALTER TABLE "dashboard_xp"."PhanAnh"
      ADD CONSTRAINT "CK_PhanAnh_MucDoUuTien_Allowed"
      CHECK ("MucDoUuTien" IS NULL OR "MucDoUuTien" IN ('Thường', 'Khẩn cấp', 'Cao'))
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."PhanAnh" DROP CONSTRAINT IF EXISTS "CK_PhanAnh_TrangThai_Allowed"`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."PhanAnh" DROP CONSTRAINT IF EXISTS "CK_PhanAnh_MucDoUuTien_Allowed"`);

    await queryRunner.query(`
      ALTER TABLE "dashboard_xp"."PhanAnh"
      ADD CONSTRAINT "CK_PhanAnh_TrangThai_Legacy"
      CHECK ("TrangThai" IN ('Mới', 'Đang xử lý', 'Đã xử lý', 'Đã đóng'))
    `);

    await queryRunner.query(`
      ALTER TABLE "dashboard_xp"."PhanAnh"
      ADD CONSTRAINT "CK_PhanAnh_MucDoUuTien_Legacy"
      CHECK ("MucDoUuTien" IS NULL OR "MucDoUuTien" IN ('Thường', 'Khẩn cấp'))
    `);
  }
}
