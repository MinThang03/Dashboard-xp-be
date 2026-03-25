import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateHoSoTTHCModule1738500930000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // ================================================================
    // HỒ SƠ THỦ TỤC HÀNH CHÍNH
    // ================================================================
    
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."LoaiThuTuc" (
        "MaLoaiThuTuc" SERIAL PRIMARY KEY,
        "TenThuTuc" VARCHAR(200) NOT NULL,
        "LinhVuc" VARCHAR(100),
        "ThoiGianXuLy" INT DEFAULT 3,
        "PhiDichVu" DECIMAL(18,0) DEFAULT 0,
        "MoTa" TEXT
      )
    `);

    await queryRunner.query(`
      INSERT INTO "dashboard_xp"."LoaiThuTuc" 
      ("TenThuTuc", "LinhVuc", "ThoiGianXuLy", "PhiDichVu", "MoTa")
      VALUES 
      ('Cấp giấy chứng nhận hộ tịch', 'Hộ tịch', 3, 50000, 'Cấp giấy khai sinh, khai tử, kết hôn'),
      ('Cấp CCCD', 'Công an', 7, 0, 'Cấp căn cước công dân'),
      ('Đăng ký kinh doanh', 'Kinh tế', 5, 100000, 'Cấp giấy phép kinh doanh hộ cá thể'),
      ('Cấp giấy phép xây dựng', 'Xây dựng', 15, 200000, 'Cấp phép xây dựng nhà ở'),
      ('Đăng ký tạm trú', 'Hộ khẩu', 1, 20000, 'Đăng ký tạm trú tại địa phương')
      ON CONFLICT DO NOTHING
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."HoSoTTHC" (
        "MaHoSo" VARCHAR(20) PRIMARY KEY,
        "SoHoSo" VARCHAR(50) NOT NULL,
        "MaLoaiThuTuc" INT NOT NULL,
        "NguoiNop" VARCHAR(150) NOT NULL,
        "SoDienThoai" VARCHAR(20),
        "Email" VARCHAR(100),
        "NgayNop" DATE DEFAULT CURRENT_DATE,
        "NgayHenTra" DATE,
        "NgayHoanThanh" DATE,
        "TrangThai" VARCHAR(50) DEFAULT 'Đã tiếp nhận',
        "CanBoXuLy" INT,
        "KetQua" TEXT,
        "GhiChu" TEXT,
        "NgayTao" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY ("MaLoaiThuTuc") REFERENCES "dashboard_xp"."LoaiThuTuc"("MaLoaiThuTuc"),
        FOREIGN KEY ("CanBoXuLy") REFERENCES "dashboard_xp"."NguoiDung"("MaNguoiDung"),
        CHECK ("TrangThai" IN ('Đã tiếp nhận', 'Đang xử lý', 'Chờ bổ sung', 'Hoàn thành', 'Từ chối'))
      )
    `);

    await queryRunner.query(`
      INSERT INTO "dashboard_xp"."HoSoTTHC" 
      ("MaHoSo", "SoHoSo", "MaLoaiThuTuc", "NguoiNop", "SoDienThoai", "NgayNop", "NgayHenTra", "TrangThai")
      VALUES 
      ('HS001', 'HS-2024-001', 1, 'Nguyễn Văn A', '0901234567', '2024-01-10', '2024-01-13', 'Hoàn thành'),
      ('HS002', 'HS-2024-002', 2, 'Trần Thị B', '0912345678', '2024-01-15', '2024-01-22', 'Đang xử lý'),
      ('HS003', 'HS-2024-003', 3, 'Lê Văn C', '0923456789', '2024-01-20', '2024-01-25', 'Đang xử lý'),
      ('HS004', 'HS-2024-004', 4, 'Phạm Thị D', '0934567890', '2024-01-25', '2024-02-09', 'Đã tiếp nhận'),
      ('HS005', 'HS-2024-005', 5, 'Hoàng Văn E', '0945678901', '2024-01-28', '2024-01-29', 'Hoàn thành')
      ON CONFLICT DO NOTHING
    `);

    console.log('✅ HoSoTTHC tables created successfully');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."HoSoTTHC" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."LoaiThuTuc" CASCADE`);
  }
}
