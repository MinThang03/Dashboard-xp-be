import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateChungThucModule1738500900000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // ================================================================
    // CHỨNG THỰC GIẤY TỜ
    // ================================================================
    
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."ChungThuc" (
        "MaChungThuc" SERIAL PRIMARY KEY,
        "SoChungThuc" VARCHAR(50) NOT NULL,
        "LoaiGiayTo" VARCHAR(100) NOT NULL,
        "NguoiYeuCau" VARCHAR(150) NOT NULL,
        "CCCD" VARCHAR(20),
        "NgayYeuCau" DATE DEFAULT CURRENT_DATE,
        "NgayHoanThanh" DATE,
        "TrangThai" VARCHAR(50) DEFAULT 'Đang xử lý',
        "NguoiXuLy" INT,
        "PhiDichVu" DECIMAL(18,0) DEFAULT 0,
        "GhiChu" TEXT,
        "NgayTao" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY ("NguoiXuLy") REFERENCES "dashboard_xp"."NguoiDung"("MaNguoiDung")
      )
    `);

    await queryRunner.query(`
      INSERT INTO "dashboard_xp"."ChungThuc" 
      ("SoChungThuc", "LoaiGiayTo", "NguoiYeuCau", "CCCD", "NgayYeuCau", "TrangThai", "PhiDichVu", "GhiChu")
      VALUES 
      ('CT001/2024', 'Bản sao từ bản chính', 'Nguyễn Văn A', '001234567890', '2024-01-15', 'Hoàn thành', 20000, 'Chứng thực bằng cấp'),
      ('CT002/2024', 'Chữ ký', 'Trần Thị B', '001234567891', '2024-01-20', 'Đang xử lý', 50000, 'Chứng thực hợp đồng'),
      ('CT003/2024', 'Bản dịch', 'Lê Văn C', '001234567892', '2024-01-25', 'Đang xử lý', 100000, 'Dịch và chứng thực giấy tờ nước ngoài')
      ON CONFLICT DO NOTHING
    `);

    console.log('✅ ChungThuc table created successfully');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."ChungThuc" CASCADE`);
  }
}
