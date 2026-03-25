import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixChoAndPhanAnhLegacyConstraints1738500970000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "dashboard_xp"."ChoDiemKinhDoanh" ADD COLUMN IF NOT EXISTS "TenDiemKD" VARCHAR(200)');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."PhanAnh" ADD COLUMN IF NOT EXISTS "MaLinhVuc" INT');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."PhanAnh" ADD COLUMN IF NOT EXISTS "MaCongDan" INT');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."PhanAnh" ALTER COLUMN "MaCongDan" DROP NOT NULL');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."PhanAnh" ALTER COLUMN "MaLinhVuc" DROP NOT NULL');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // no-op
  }
}
