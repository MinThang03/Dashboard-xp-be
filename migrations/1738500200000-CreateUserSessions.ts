import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserSessions1738500200000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create user_sessions table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."user_sessions" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "user_id" INT NOT NULL,
        "refresh_token_hash" TEXT NOT NULL,
        "user_agent" VARCHAR(500),
        "ip_address" VARCHAR(45),
        "expires_at" TIMESTAMP NOT NULL,
        "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY ("user_id") REFERENCES "dashboard_xp"."NguoiDung"("MaNguoiDung") ON DELETE CASCADE
      )
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_user_sessions_user_id" 
      ON "dashboard_xp"."user_sessions" ("user_id")
    `);

    console.log('✅ User Sessions table created successfully');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."user_sessions" CASCADE`);
  }
}
