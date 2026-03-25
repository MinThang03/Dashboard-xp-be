import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateHoKhauModule1738500910000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // ================================================================
    // HỘ KHẨU
    // ================================================================
    
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."HoKhau" (
        "MaHoKhau" VARCHAR(20) PRIMARY KEY,
        "SoHoKhau" VARCHAR(50) NOT NULL,
        "ChuHo" VARCHAR(150) NOT NULL,
        "DiaChiThuongTru" VARCHAR(255) NOT NULL,
        "NgayDangKy" DATE DEFAULT CURRENT_DATE,
        "LoaiHoKhau" VARCHAR(50) DEFAULT 'Thường trú',
        "SoThanhVien" INT DEFAULT 1,
        "TrangThai" VARCHAR(50) DEFAULT 'Hoạt động',
        "GhiChu" TEXT,
        "NgayTao" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."ThanhVienHoKhau" (
        "MaThanhVien" SERIAL PRIMARY KEY,
        "MaHoKhau" VARCHAR(20) NOT NULL,
        "HoTen" VARCHAR(150) NOT NULL,
        "NgaySinh" DATE,
        "GioiTinh" VARCHAR(10),
        "CCCD" VARCHAR(20),
        "QuanHeChuHo" VARCHAR(50),
        "NgheNghiep" VARCHAR(100),
        "NoiLamViec" VARCHAR(200),
        "GhiChu" TEXT,
        FOREIGN KEY ("MaHoKhau") REFERENCES "dashboard_xp"."HoKhau"("MaHoKhau") ON DELETE CASCADE
      )
    `);

    await queryRunner.query(`
      INSERT INTO "dashboard_xp"."HoKhau" 
      ("MaHoKhau", "SoHoKhau", "ChuHo", "DiaChiThuongTru", "NgayDangKy", "LoaiHoKhau", "SoThanhVien", "TrangThai")
      VALUES 
      ('HK001', 'HK-2024-001', 'Nguyễn Văn A', '123 Đường ABC, Phường 1', '2024-01-01', 'Thường trú', 4, 'Hoạt động'),
      ('HK002', 'HK-2024-002', 'Trần Thị B', '456 Đường XYZ, Phường 2', '2024-01-10', 'Thường trú', 3, 'Hoạt động'),
      ('HK003', 'HK-2024-003', 'Lê Văn C', '789 Đường DEF, Phường 1', '2024-01-15', 'Tạm trú', 2, 'Hoạt động')
      ON CONFLICT DO NOTHING
    `);

    await queryRunner.query(`
      INSERT INTO "dashboard_xp"."ThanhVienHoKhau" 
      ("MaHoKhau", "HoTen", "NgaySinh", "GioiTinh", "CCCD", "QuanHeChuHo", "NgheNghiep")
      VALUES 
      ('HK001', 'Nguyễn Văn A', '1980-05-15', 'Nam', '001234567890', 'Chủ hộ', 'Giáo viên'),
      ('HK001', 'Nguyễn Thị D', '1985-08-20', 'Nữ', '001234567891', 'Vợ', 'Kế toán'),
      ('HK001', 'Nguyễn Văn E', '2010-03-10', 'Nam', '', 'Con', 'Học sinh'),
      ('HK001', 'Nguyễn Thị F', '2015-12-25', 'Nữ', '', 'Con', 'Học sinh'),
      ('HK002', 'Trần Thị B', '1990-07-12', 'Nữ', '001234567892', 'Chủ hộ', 'Bác sĩ'),
      ('HK002', 'Trần Văn G', '2012-09-05', 'Nam', '', 'Con', 'Học sinh'),
      ('HK002', 'Trần Thị H', '2018-11-30', 'Nữ', '', 'Con', 'Mầm non')
      ON CONFLICT DO NOTHING
    `);

    console.log('✅ HoKhau tables created successfully');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."ThanhVienHoKhau" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."HoKhau" CASCADE`);
  }
}
