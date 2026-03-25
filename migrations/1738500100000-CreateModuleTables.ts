import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateModuleTables1738500100000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // ================================================================
    // MODULE 1. HÀNH CHÍNH TƯ PHÁP
    // ================================================================

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."HoTich" (
        "id" SERIAL PRIMARY KEY,
        "so_ho_tich" VARCHAR(30) UNIQUE NOT NULL,
        "ten_chu_ho" VARCHAR(150) NOT NULL,
        "ngay_sinh_chu_ho" DATE,
        "gioi_tinh_chu_ho" VARCHAR(10),
        "dia_chi_ho_tich" VARCHAR(255) NOT NULL,
        "so_thanh_vien_ho_tich" INT DEFAULT 0,
        "ngay_lap_ho_tich" DATE DEFAULT CURRENT_DATE,
        "ghi_chu" TEXT,
        "trang_thai" BOOLEAN DEFAULT true,
        "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "idx_so_ho_tich" ON "dashboard_xp"."HoTich"("so_ho_tich")
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."ThanhVienHoTich" (
        "id" SERIAL PRIMARY KEY,
        "id_ho_tich" INT NOT NULL,
        "so_cccd" VARCHAR(20) UNIQUE,
        "ho_ten" VARCHAR(150) NOT NULL,
        "ngay_sinh" DATE,
        "gioi_tinh" VARCHAR(10),
        "quan_he_voi_chu_ho" VARCHAR(50),
        "trang_thai" BOOLEAN DEFAULT true,
        "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY ("id_ho_tich") REFERENCES "dashboard_xp"."HoTich"("id") ON DELETE CASCADE
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."VanBan" (
        "MaVanBan" SERIAL PRIMARY KEY,
        "SoKyHieu" VARCHAR(50) NOT NULL,
        "TrichYeu" VARCHAR(500) NOT NULL,
        "LoaiVanBan" VARCHAR(50) NOT NULL,
        "LoaiVB" VARCHAR(100),
        "CoQuanBanHanh" VARCHAR(200),
        "NgayBanHanh" DATE,
        "NgayDen" DATE,
        "MaLinhVuc" INT,
        "NguoiXuLy" INT,
        "TrangThai" VARCHAR(50) DEFAULT 'Mới',
        "FileDinhKem" VARCHAR(500),
        "GhiChu" TEXT,
        "NgayTao" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY ("MaLinhVuc") REFERENCES "dashboard_xp"."LinhVuc"("MaLinhVuc"),
        FOREIGN KEY ("NguoiXuLy") REFERENCES "dashboard_xp"."NguoiDung"("MaNguoiDung")
      )
    `);

    // ================================================================
    // MODULE 2. Y TẾ - GIÁO DỤC
    // ================================================================

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."TramYTe" (
        "MaTram" SERIAL PRIMARY KEY,
        "TenTram" VARCHAR(150) NOT NULL,
        "DiaChi" VARCHAR(255),
        "SoDienThoai" VARCHAR(20),
        "SoNhanVien" INT DEFAULT 0,
        "SoLuotKhamThang" INT DEFAULT 0,
        "TrangThai" BOOLEAN DEFAULT true,
        "GhiChu" TEXT,
        "NgayTao" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await queryRunner.query(`
      INSERT INTO "dashboard_xp"."TramYTe" ("TenTram", "DiaChi", "SoDienThoai", "SoNhanVien", "SoLuotKhamThang", "GhiChu") 
      VALUES ('Trạm Y tế Phường 1', 'Phường 1', '0900000000', 0, 0, 'Seed mặc định')
      ON CONFLICT DO NOTHING
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."DichBenh" (
        "MaDich" SERIAL PRIMARY KEY,
        "TenDich" VARCHAR(100) NOT NULL,
        "KhuVuc" VARCHAR(150),
        "SoCaNhiem" INT DEFAULT 0,
        "SoCaKhoi" INT DEFAULT 0,
        "NgayBatDau" DATE,
        "NgayKetThuc" DATE,
        "MucDo" VARCHAR(20),
        "TrangThai" VARCHAR(50) DEFAULT 'Đang theo dõi',
        "GhiChu" TEXT,
        "NgayCapNhat" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."TiemChung" (
        "MaTiemChung" SERIAL PRIMARY KEY,
        "TenDot" VARCHAR(150) NOT NULL,
        "LoaiVacxin" VARCHAR(100),
        "NgayBatDau" DATE,
        "NgayKetThuc" DATE,
        "SoLuongDaTiem" INT DEFAULT 0,
        "SoLuongKeHoach" INT,
        "MaTram" INT,
        "TrangThai" VARCHAR(50) DEFAULT 'Đang triển khai',
        "GhiChu" TEXT,
        "NgayTao" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY ("MaTram") REFERENCES "dashboard_xp"."TramYTe"("MaTram")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."CoSoGiaoDuc" (
        "MaCoSo" SERIAL PRIMARY KEY,
        "TenCoSo" VARCHAR(200) NOT NULL,
        "LoaiHinh" VARCHAR(50),
        "DiaChi" VARCHAR(255),
        "SoDienThoai" VARCHAR(20),
        "SoHocSinh" INT DEFAULT 0,
        "SoGiaoVien" INT DEFAULT 0,
        "TrangThai" BOOLEAN DEFAULT true,
        "GhiChu" TEXT,
        "NgayTao" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // ================================================================
    // MODULE 3. TÀI CHÍNH - NGÂN SÁCH
    // ================================================================

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."NganSach" (
        "MaNganSach" SERIAL PRIMARY KEY,
        "Nam" INT NOT NULL,
        "MaLinhVuc" INT,
        "TongDuToan" DECIMAL(18,0) DEFAULT 0,
        "DaGiaiNgan" DECIMAL(18,0) DEFAULT 0,
        "ConLai" DECIMAL(18,0) DEFAULT 0,
        "TrangThai" VARCHAR(50) DEFAULT 'Đang thực hiện',
        "NgayTao" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY ("MaLinhVuc") REFERENCES "dashboard_xp"."LinhVuc"("MaLinhVuc")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."GhiChuNganSach" (
        "MaGhiChu" SERIAL PRIMARY KEY,
        "MaNganSach" INT NOT NULL,
        "NoiDungGhiChu" TEXT NOT NULL,
        "NgayGhiChu" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "NguoiGhiChu" INT,
        FOREIGN KEY ("MaNganSach") REFERENCES "dashboard_xp"."NganSach"("MaNganSach"),
        FOREIGN KEY ("NguoiGhiChu") REFERENCES "dashboard_xp"."NguoiDung"("MaNguoiDung")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."PhieuThu" (
        "MaPhieuThu" VARCHAR(20) PRIMARY KEY,
        "TenKhoanThu" VARCHAR(200) NOT NULL,
        "SoTien" DECIMAL(18,0) NOT NULL,
        "NgayThu" DATE DEFAULT CURRENT_DATE,
        "NguoiNop" VARCHAR(100),
        "LoaiThu" VARCHAR(50),
        "MaLinhVuc" INT,
        "GhiChu" TEXT,
        "TrangThai" VARCHAR(50) DEFAULT 'Đã thu',
        FOREIGN KEY ("MaLinhVuc") REFERENCES "dashboard_xp"."LinhVuc"("MaLinhVuc"),
        CHECK ("SoTien" > 0)
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."PhieuChi" (
        "MaPhieuChi" VARCHAR(20) PRIMARY KEY,
        "TenKhoanChi" VARCHAR(200) NOT NULL,
        "SoTien" DECIMAL(18,0) NOT NULL,
        "NgayChi" DATE DEFAULT CURRENT_DATE,
        "NguoiNhan" VARCHAR(100),
        "LoaiChi" VARCHAR(50),
        "MaNganSach" INT,
        "MaLinhVuc" INT,
        "GhiChu" TEXT,
        "TrangThai" VARCHAR(50) DEFAULT 'Đã chi',
        "NguoiDuyet" INT,
        FOREIGN KEY ("MaNganSach") REFERENCES "dashboard_xp"."NganSach"("MaNganSach"),
        FOREIGN KEY ("MaLinhVuc") REFERENCES "dashboard_xp"."LinhVuc"("MaLinhVuc"),
        FOREIGN KEY ("NguoiDuyet") REFERENCES "dashboard_xp"."LanhDao"("MaLanhDao"),
        CHECK ("SoTien" > 0)
      )
    `);

    // ================================================================
    // MODULE 4. ĐỊA CHÍNH - QUY HOẠCH
    // ================================================================

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."LoaiDat" (
        "MaLoaiDat" VARCHAR(20) PRIMARY KEY,
        "TenLoai" VARCHAR(100) NOT NULL,
        "MoTa" TEXT,
        "MauHienThi" VARCHAR(20)
      )
    `);

    await queryRunner.query(`
      INSERT INTO "dashboard_xp"."LoaiDat" ("MaLoaiDat", "TenLoai", "MoTa", "MauHienThi") VALUES
      ('ODT', 'Đất ở đô thị', 'Đất ở trong đô thị', '#e74c3c'),
      ('ONT', 'Đất ở nông thôn', 'Đất ở tại khu vực nông thôn', '#3498db'),
      ('NKH', 'Đất nông nghiệp khác', 'Đất trồng cây lâu năm, nuôi trồng thủy sản', '#2ecc71'),
      ('TSC', 'Đất thương mại dịch vụ', 'Đất cho hoạt động kinh doanh, thương mại', '#f39c12'),
      ('SKK', 'Đất sản xuất kinh doanh khác', 'Đất công nghiệp, kho bãi', '#9b59b6')
      ON CONFLICT ("MaLoaiDat") DO NOTHING
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."ThuaDat" (
        "MaThua" VARCHAR(20) PRIMARY KEY,
        "SoThua" VARCHAR(20) NOT NULL,
        "SoToBanDo" VARCHAR(20),
        "DienTich" DECIMAL(18,2) NOT NULL,
        "MaLoaiDat" VARCHAR(20),
        "ChuSoHuu" VARCHAR(150),
        "ToaDo" VARCHAR(100),
        "TrangThai" VARCHAR(50) DEFAULT 'Đang sử dụng',
        "GhiChu" TEXT,
        FOREIGN KEY ("MaLoaiDat") REFERENCES "dashboard_xp"."LoaiDat"("MaLoaiDat"),
        CHECK ("DienTich" > 0)
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."BienDongDat" (
        "MaBienDong" SERIAL PRIMARY KEY,
        "MaThua" VARCHAR(20) NOT NULL,
        "LoaiBienDong" VARCHAR(50) NOT NULL,
        "NgayBienDong" DATE DEFAULT CURRENT_DATE,
        "DienTichCu" DECIMAL(18,2),
        "DienTichMoi" DECIMAL(18,2),
        "MaLoaiDatCu" VARCHAR(20),
        "MaLoaiDatMoi" VARCHAR(20),
        "LyDo" TEXT,
        "NguoiThucHien" INT,
        FOREIGN KEY ("MaThua") REFERENCES "dashboard_xp"."ThuaDat"("MaThua"),
        FOREIGN KEY ("MaLoaiDatCu") REFERENCES "dashboard_xp"."LoaiDat"("MaLoaiDat"),
        FOREIGN KEY ("MaLoaiDatMoi") REFERENCES "dashboard_xp"."LoaiDat"("MaLoaiDat"),
        FOREIGN KEY ("NguoiThucHien") REFERENCES "dashboard_xp"."NguoiDung"("MaNguoiDung")
      )
    `);

    // ================================================================
    // MODULE 5. MÔI TRƯỜNG
    // ================================================================

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."RacThai" (
        "MaDiem" SERIAL PRIMARY KEY,
        "TenDiem" VARCHAR(150) NOT NULL,
        "DiaChi" VARCHAR(255),
        "ToaDo" VARCHAR(50),
        "LoaiRac" VARCHAR(50),
        "KhoiLuongThang" DECIMAL(18,2) DEFAULT 0,
        "TinhTrang" VARCHAR(50) DEFAULT 'Bình thường',
        "NgayCapNhat" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "GhiChu" TEXT
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."BaoCaoONhiem" (
        "MaBaoCao" SERIAL PRIMARY KEY,
        "LoaiONhiem" VARCHAR(50) NOT NULL,
        "KhuVuc" VARCHAR(150),
        "MucDo" VARCHAR(20),
        "NgayBaoCao" DATE DEFAULT CURRENT_DATE,
        "NoiDung" TEXT,
        "TrangThai" VARCHAR(50) DEFAULT 'Chờ xử lý',
        "NguoiBaoCao" INT,
        FOREIGN KEY ("NguoiBaoCao") REFERENCES "dashboard_xp"."NguoiDung"("MaNguoiDung")
      )
    `);

    // ================================================================
    // MODULE 6. VĂN HÓA - DU LỊCH
    // ================================================================

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."DiTich" (
        "MaDiTich" SERIAL PRIMARY KEY,
        "TenDiTich" VARCHAR(200) NOT NULL,
        "LoaiDiTich" VARCHAR(50),
        "DiaChi" VARCHAR(255),
        "ToaDo" VARCHAR(50),
        "CapXepHang" VARCHAR(50),
        "TinhTrang" VARCHAR(50) DEFAULT 'Tốt',
        "MoTa" TEXT,
        "NgayTao" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await queryRunner.query(`
      INSERT INTO "dashboard_xp"."DiTich" ("TenDiTich", "LoaiDiTich", "DiaChi", "CapXepHang", "MoTa") 
      VALUES ('Đình làng cổ', 'Di tích kiến trúc', 'Trung tâm xã', 'Cấp tỉnh', 'Đình làng được xây dựng từ thế kỷ 18')
      ON CONFLICT DO NOTHING
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."LangNghe" (
        "MaLangNghe" SERIAL PRIMARY KEY,
        "TenLangNghe" VARCHAR(200) NOT NULL,
        "LoaiNghe" VARCHAR(100),
        "DiaChi" VARCHAR(255),
        "SoHoNghe" INT DEFAULT 0,
        "SanPhamChinh" VARCHAR(200),
        "TrangThai" BOOLEAN DEFAULT true,
        "NgayTao" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."LeHoi" (
        "MaLeHoi" SERIAL PRIMARY KEY,
        "TenLeHoi" VARCHAR(200) NOT NULL,
        "ThoiGianToChuc" DATE,
        "DiaDiem" VARCHAR(255),
        "SoLuongKhach" INT DEFAULT 0,
        "MoTa" TEXT,
        "TrangThai" VARCHAR(50) DEFAULT 'Đã tổ chức',
        "NgayTao" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // ================================================================
    // MODULE 7. AN NINH - TRẬT TỰ
    // ================================================================

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."ViPham" (
        "MaViPham" SERIAL PRIMARY KEY,
        "TenViPham" VARCHAR(200) NOT NULL,
        "LoaiViPham" VARCHAR(50),
        "DiaDiem" VARCHAR(255),
        "NgayViPham" DATE DEFAULT CURRENT_DATE,
        "NguoiViPham" VARCHAR(150),
        "MucPhat" DECIMAL(18,0),
        "TrangThai" VARCHAR(50) DEFAULT 'Đã xử lý',
        "GhiChu" TEXT,
        "NguoiLap" INT,
        FOREIGN KEY ("NguoiLap") REFERENCES "dashboard_xp"."NguoiDung"("MaNguoiDung")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."DiemNongAnNinh" (
        "MaDiem" SERIAL PRIMARY KEY,
        "TenDiem" VARCHAR(150) NOT NULL,
        "DiaDiem" VARCHAR(255),
        "ToaDo" VARCHAR(50),
        "LoaiRuiRo" VARCHAR(100),
        "MucDoNghiemTrong" VARCHAR(20),
        "TinhTrang" VARCHAR(50) DEFAULT 'Đang theo dõi',
        "NgayPhatHien" DATE DEFAULT CURRENT_DATE,
        "BienPhapXuLy" TEXT,
        "GhiChu" TEXT
      )
    `);

    // ================================================================
    // KPI & THỐNG KÊ
    // ================================================================

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."KPI_CanBo_Thang" (
        "ThangNam" VARCHAR(7) NOT NULL CHECK ("ThangNam" LIKE '____-__'),
        "MaCanBo" INT NOT NULL,
        "TongHoSoXuLy" INT DEFAULT 0,
        "HoSoDungHan" INT DEFAULT 0,
        "HoSoTreHan" INT DEFAULT 0,
        "TyLeDungHan" FLOAT DEFAULT 0 CHECK ("TyLeDungHan" BETWEEN 0 AND 1),
        "DiemDanhGia" FLOAT DEFAULT 0 CHECK ("DiemDanhGia" >= 0 AND "DiemDanhGia" <= 100),
        "SoPhanAnh" INT DEFAULT 0,
        "SoPhanAnhDaXuLy" INT DEFAULT 0,
        PRIMARY KEY ("ThangNam", "MaCanBo"),
        FOREIGN KEY ("MaCanBo") REFERENCES "dashboard_xp"."CanBo"("MaCanBo")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."Fact_HoSo_TheoNgay" (
        "Ngay" DATE NOT NULL,
        "MaLinhVuc" INT NOT NULL,
        "TongHoSo" INT DEFAULT 0,
        "HoSoDungHan" INT DEFAULT 0,
        "HoSoTreHan" INT DEFAULT 0,
        "HoSoHoanThanh" INT DEFAULT 0,
        "TongDoanhThu" DECIMAL(18,0) DEFAULT 0,
        PRIMARY KEY ("Ngay", "MaLinhVuc"),
        FOREIGN KEY ("MaLinhVuc") REFERENCES "dashboard_xp"."LinhVuc"("MaLinhVuc"),
        CHECK ("HoSoDungHan" + "HoSoTreHan" <= "TongHoSo")
      )
    `);

    console.log('✅ Module Tables created successfully');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."Fact_HoSo_TheoNgay" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."KPI_CanBo_Thang" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."DiemNongAnNinh" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."ViPham" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."LeHoi" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."LangNghe" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."DiTich" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."BaoCaoONhiem" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."RacThai" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."BienDongDat" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."ThuaDat" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."LoaiDat" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."PhieuChi" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."PhieuThu" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."GhiChuNganSach" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."NganSach" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."CoSoGiaoDuc" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."TiemChung" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."DichBenh" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."TramYTe" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."VanBan" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."ThanhVienHoTich" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."HoTich" CASCADE`);
  }
}
