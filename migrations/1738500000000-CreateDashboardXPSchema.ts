import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDashboardXPSchema1738500000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create schema
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS "dashboard_xp"`);

    // Enable uuid extension if needed
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    // ================================================================
    // 0. QUẢN TRỊ ĐỊNH DANH & PHÂN QUYỀN CỐT LÕI
    // ================================================================

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
      ('Quản trị hệ thống', 'ADMIN', 1),
      ('Lãnh đạo', 'LANHDAO', 2),
      ('Cán bộ chuyên môn', 'CANBO', 3),
      ('Công dân', 'CONGDAN', 4)
      ON CONFLICT ("MaCode") DO NOTHING
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."CapDoQuyen" (
        "MaCapDo" INT PRIMARY KEY,
        "TenCapDo" VARCHAR(50) UNIQUE NOT NULL,
        "MoTa" TEXT,
        "TrangThai" BOOLEAN DEFAULT true
      )
    `);

    await queryRunner.query(`
      INSERT INTO "dashboard_xp"."CapDoQuyen" ("MaCapDo", "TenCapDo", "MoTa") VALUES
      (1, 'Siêu quản trị', 'Toàn quyền hệ thống'),
      (2, 'Quản trị', 'Quản trị cơ bản'),
      (3, 'Quản lý', 'Quản lý nghiệp vụ')
      ON CONFLICT ("MaCapDo") DO NOTHING
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."NguoiDung" (
        "MaNguoiDung" SERIAL PRIMARY KEY,
        "TenDangNhap" VARCHAR(50) UNIQUE NOT NULL,
        "MatKhau" VARCHAR(255) NOT NULL,
        "HoVaTen" VARCHAR(100) NOT NULL,
        "Email" VARCHAR(100),
        "SoDienThoai" VARCHAR(20),
        "AnhDaiDien" VARCHAR(500),
        "MaVaiTro" INT NOT NULL,
        "TrangThai" BOOLEAN DEFAULT true,
        "NgayTao" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "NgayCapNhat" TIMESTAMP DEFAULT NULL,
        "NguoiTao" INT,
        "IsDeleted" BOOLEAN DEFAULT false,
        FOREIGN KEY ("MaVaiTro") REFERENCES "dashboard_xp"."VaiTro"("MaVaiTro"),
        FOREIGN KEY ("NguoiTao") REFERENCES "dashboard_xp"."NguoiDung"("MaNguoiDung"),
        CHECK ("Email" IS NULL OR "Email" LIKE '%@%.%'),
        CHECK ("SoDienThoai" IS NULL OR LENGTH("SoDienThoai") >= 10)
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."QuanTriVien" (
        "MaAdmin" SERIAL PRIMARY KEY,
        "MaNguoiDung" INT UNIQUE NOT NULL,
        "MaCapDo" INT,
        "NgayNhanViec" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "GhiChu" TEXT,
        FOREIGN KEY ("MaNguoiDung") REFERENCES "dashboard_xp"."NguoiDung"("MaNguoiDung"),
        FOREIGN KEY ("MaCapDo") REFERENCES "dashboard_xp"."CapDoQuyen"("MaCapDo")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."CongDan" (
        "MaCongDan" SERIAL PRIMARY KEY,
        "MaNguoiDung" INT UNIQUE,
        "SoCCCD" VARCHAR(20) UNIQUE NOT NULL,
        "HoTen" VARCHAR(100) NOT NULL,
        "NgaySinh" DATE,
        "GioiTinh" VARCHAR(10),
        "DiaChiThuongTru" VARCHAR(255),
        "DiaChiTamTru" VARCHAR(255),
        "ToaDoNha" VARCHAR(50),
        "NgayDangKy" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY ("MaNguoiDung") REFERENCES "dashboard_xp"."NguoiDung"("MaNguoiDung"),
        CHECK ("GioiTinh" IS NULL OR "GioiTinh" IN ('Nam', 'Nữ', 'Khác'))
      )
    `);

    // ================================================================
    // 1. DANH MỤC LĨNH VỰC / PHÒNG BAN / NHÂN SỰ
    // ================================================================

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."LinhVuc" (
        "MaLinhVuc" SERIAL PRIMARY KEY,
        "TenLinhVuc" VARCHAR(100) UNIQUE NOT NULL,
        "MoTa" TEXT,
        "MaCode" VARCHAR(20) UNIQUE,
        "ThuTuHienThi" INT DEFAULT 0,
        "TrangThai" BOOLEAN DEFAULT true,
        "NgayTao" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await queryRunner.query(`
      INSERT INTO "dashboard_xp"."LinhVuc" ("TenLinhVuc", "MaCode", "ThuTuHienThi") VALUES
      ('Hành chính Tư pháp', 'TU_PHAP', 1),
      ('Y tế - Giáo dục', 'Y_TE_GD', 2),
      ('Kinh tế - Thương mại', 'KINH_TE', 3),
      ('Quốc phòng - An ninh', 'AN_NINH', 4),
      ('Xây dựng - Hạ tầng', 'XAY_DUNG', 5),
      ('Dân cư - Lao động', 'LAO_DONG', 6),
      ('Quản lý Tài chính', 'TAI_CHINH', 7),
      ('Địa chính', 'DIA_CHINH', 8),
      ('Quản lý Môi trường', 'MOI_TRUONG', 9),
      ('Văn hóa - Du lịch', 'VAN_HOA', 10)
      ON CONFLICT ("MaCode") DO NOTHING
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."PhongBan" (
        "MaPhongBan" SERIAL PRIMARY KEY,
        "TenPhongBan" VARCHAR(100) UNIQUE NOT NULL,
        "MoTa" TEXT,
        "MaLinhVuc" INT,
        "TruongPhong" INT,
        "NgayThanhLap" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "TrangThai" BOOLEAN DEFAULT true,
        FOREIGN KEY ("MaLinhVuc") REFERENCES "dashboard_xp"."LinhVuc"("MaLinhVuc"),
        FOREIGN KEY ("TruongPhong") REFERENCES "dashboard_xp"."NguoiDung"("MaNguoiDung")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."LanhDao" (
        "MaLanhDao" SERIAL PRIMARY KEY,
        "MaNguoiDung" INT UNIQUE NOT NULL,
        "MaPhongBan" INT,
        "ChucVu" VARCHAR(50) NOT NULL,
        "NhiemKy" VARCHAR(50),
        "NgayBatDau" DATE DEFAULT CURRENT_DATE,
        "NgayKetThuc" DATE,
        "DuocDuyetNganSach" BOOLEAN DEFAULT false,
        "DuocKyQuyetDinh" BOOLEAN DEFAULT true,
        "IsDeleted" BOOLEAN DEFAULT false,
        FOREIGN KEY ("MaNguoiDung") REFERENCES "dashboard_xp"."NguoiDung"("MaNguoiDung"),
        FOREIGN KEY ("MaPhongBan") REFERENCES "dashboard_xp"."PhongBan"("MaPhongBan")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."CanBo" (
        "MaCanBo" SERIAL PRIMARY KEY,
        "MaNguoiDung" INT UNIQUE NOT NULL,
        "MaPhongBan" INT,
        "MaLinhVuc" INT,
        "ChucDanh" VARCHAR(50),
        "DiemKPI" FLOAT DEFAULT 0 CHECK ("DiemKPI" BETWEEN 0 AND 100),
        "NgayBatDau" DATE DEFAULT CURRENT_DATE,
        "IsDeleted" BOOLEAN DEFAULT false,
        FOREIGN KEY ("MaNguoiDung") REFERENCES "dashboard_xp"."NguoiDung"("MaNguoiDung"),
        FOREIGN KEY ("MaPhongBan") REFERENCES "dashboard_xp"."PhongBan"("MaPhongBan"),
        FOREIGN KEY ("MaLinhVuc") REFERENCES "dashboard_xp"."LinhVuc"("MaLinhVuc")
      )
    `);

    // ================================================================
    // 2. NỀN TẢNG HỒ SƠ NGHIỆP VỤ
    // ================================================================

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."TrangThaiHoSo" (
        "MaTrangThai" VARCHAR(20) PRIMARY KEY,
        "TenTrangThai" VARCHAR(50) UNIQUE NOT NULL,
        "MauSac" VARCHAR(20),
        "ThuTuHienThi" INT DEFAULT 0,
        "MoTa" VARCHAR(255)
      )
    `);

    await queryRunner.query(`
      INSERT INTO "dashboard_xp"."TrangThaiHoSo" ("MaTrangThai", "TenTrangThai", "MauSac", "ThuTuHienThi") VALUES
      ('MOI_TAO', 'Mới tạo', '#3498db', 1),
      ('DANG_XU_LY', 'Đang xử lý', '#f39c12', 2),
      ('CHO_DUYET', 'Chờ duyệt', '#9b59b6', 3),
      ('DA_DUYET', 'Đã duyệt', '#2ecc71', 4),
      ('DA_TU_CHOI', 'Đã từ chối', '#e74c3c', 5),
      ('HOAN_THANH', 'Hoàn thành', '#27ae60', 6),
      ('DA_HUY', 'Đã hủy', '#95a5a6', 7)
      ON CONFLICT ("MaTrangThai") DO NOTHING
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."LoaiNghiepVu" (
        "MaLoaiNghiepVu" SERIAL PRIMARY KEY,
        "TenLoai" VARCHAR(100) NOT NULL,
        "MaLinhVuc" INT NOT NULL,
        "ThoiHanXuLy" INT,
        "MoTa" TEXT,
        "TrangThai" BOOLEAN DEFAULT true,
        FOREIGN KEY ("MaLinhVuc") REFERENCES "dashboard_xp"."LinhVuc"("MaLinhVuc")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."HoSoNghiepVu" (
        "MaHoSo" VARCHAR(20) PRIMARY KEY,
        "TenNghiepVu" VARCHAR(200) NOT NULL,
        "MaCongDan" INT NOT NULL,
        "MaLinhVuc" INT NOT NULL,
        "MaLoaiNghiepVu" INT,
        "LoaiHoSo" VARCHAR(50),
        "MaCanBoXuLy" INT,
        "MaLanhDaoDuyet" INT,
        "MaTrangThai" VARCHAR(20) NOT NULL DEFAULT 'MOI_TAO',
        "NgayTao" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "HanXuLy" TIMESTAMP NOT NULL,
        "NgayHoanThanh" TIMESTAMP,
        "LyDoTuChoi" TEXT,
        "GhiChuXuLy" TEXT,
        "MucDoUuTien" INT DEFAULT 2 CHECK ("MucDoUuTien" BETWEEN 1 AND 5),
        FOREIGN KEY ("MaCongDan") REFERENCES "dashboard_xp"."CongDan"("MaCongDan"),
        FOREIGN KEY ("MaLinhVuc") REFERENCES "dashboard_xp"."LinhVuc"("MaLinhVuc"),
        FOREIGN KEY ("MaLoaiNghiepVu") REFERENCES "dashboard_xp"."LoaiNghiepVu"("MaLoaiNghiepVu"),
        FOREIGN KEY ("MaCanBoXuLy") REFERENCES "dashboard_xp"."CanBo"("MaCanBo"),
        FOREIGN KEY ("MaLanhDaoDuyet") REFERENCES "dashboard_xp"."LanhDao"("MaLanhDao"),
        FOREIGN KEY ("MaTrangThai") REFERENCES "dashboard_xp"."TrangThaiHoSo"("MaTrangThai"),
        CHECK ("NgayHoanThanh" IS NULL OR "NgayHoanThanh" >= "NgayTao"),
        CHECK ("HanXuLy" >= "NgayTao")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."LichSuXuLyHoSo" (
        "MaLichSu" SERIAL PRIMARY KEY,
        "MaHoSo" VARCHAR(20) NOT NULL,
        "TrangThaiCu" VARCHAR(20),
        "TrangThaiMoi" VARCHAR(20) NOT NULL,
        "NguoiThucHien" INT NOT NULL,
        "ThoiGian" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "GhiChu" TEXT,
        "IPTruyCap" VARCHAR(50),
        FOREIGN KEY ("MaHoSo") REFERENCES "dashboard_xp"."HoSoNghiepVu"("MaHoSo"),
        FOREIGN KEY ("NguoiThucHien") REFERENCES "dashboard_xp"."NguoiDung"("MaNguoiDung")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."TaiLieuHoSo" (
        "MaTaiLieu" SERIAL PRIMARY KEY,
        "MaHoSo" VARCHAR(20) NOT NULL,
        "TenTaiLieu" VARCHAR(200) NOT NULL,
        "DuongDanFile" VARCHAR(500) NOT NULL,
        "LoaiFile" VARCHAR(20),
        "DungLuong" BIGINT,
        "NgayTai" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "NguoiTai" INT,
        "TrangThai" BOOLEAN DEFAULT true,
        FOREIGN KEY ("MaHoSo") REFERENCES "dashboard_xp"."HoSoNghiepVu"("MaHoSo"),
        FOREIGN KEY ("NguoiTai") REFERENCES "dashboard_xp"."NguoiDung"("MaNguoiDung"),
        CHECK ("DungLuong" > 0)
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."PhanAnh" (
        "MaPhanAnh" SERIAL PRIMARY KEY,
        "MaCongDan" INT NOT NULL,
        "TieuDe" VARCHAR(200) NOT NULL,
        "NoiDung" TEXT NOT NULL,
        "ToaDo" VARCHAR(50) NULL,
        "MaLinhVuc" INT,
        "TrangThai" VARCHAR(50) DEFAULT 'Mới',
        "MucDoUuTien" VARCHAR(20) NULL,
        "DiaDiem" VARCHAR(255) NULL,
        "MaCanBoXuLy" INT,
        "NgayTao" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "NgayXuLy" TIMESTAMP,
        "KetQuaXuLy" TEXT,
        "DiemDanhGia" INT CHECK ("DiemDanhGia" IS NULL OR "DiemDanhGia" BETWEEN 1 AND 5),
        FOREIGN KEY ("MaCongDan") REFERENCES "dashboard_xp"."CongDan"("MaCongDan"),
        FOREIGN KEY ("MaLinhVuc") REFERENCES "dashboard_xp"."LinhVuc"("MaLinhVuc"),
        FOREIGN KEY ("MaCanBoXuLy") REFERENCES "dashboard_xp"."CanBo"("MaCanBo"),
        CHECK ("TrangThai" IN ('Mới', 'Đang xử lý', 'Đã xử lý', 'Đã đóng')),
        CHECK ("MucDoUuTien" IS NULL OR "MucDoUuTien" IN ('Thường', 'Khẩn cấp'))
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."PhanAnh_Tep" (
        "MaTep" SERIAL PRIMARY KEY,
        "MaPhanAnh" INT NOT NULL,
        "TenFile" VARCHAR(255) NOT NULL,
        "DuongDanFile" VARCHAR(500) NOT NULL,
        "LoaiFile" VARCHAR(20) DEFAULT 'IMAGE',
        "DungLuong" BIGINT NULL,
        "NgayTai" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY ("MaPhanAnh") REFERENCES "dashboard_xp"."PhanAnh"("MaPhanAnh") ON DELETE CASCADE
      )
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IX_PhanAnh_Tep_MaPhanAnh" ON "dashboard_xp"."PhanAnh_Tep"("MaPhanAnh")
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "idx_phanAnh_trangThai" ON "dashboard_xp"."PhanAnh"("TrangThai")
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "idx_phanAnh_diaDiem" ON "dashboard_xp"."PhanAnh"("DiaDiem")
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "idx_phanAnh_ngayTao" ON "dashboard_xp"."PhanAnh"("NgayTao")
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "idx_hoSo_maTrangThai" ON "dashboard_xp"."HoSoNghiepVu"("MaTrangThai")
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "idx_hoSo_ngayTao" ON "dashboard_xp"."HoSoNghiepVu"("NgayTao")
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "idx_hoSo_loaiHoSo" ON "dashboard_xp"."HoSoNghiepVu"("LoaiHoSo")
    `);

    console.log('✅ Dashboard XP Schema created successfully');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP SCHEMA IF EXISTS "dashboard_xp" CASCADE`);
  }
}
