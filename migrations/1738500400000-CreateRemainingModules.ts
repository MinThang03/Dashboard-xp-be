import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRemainingModules1738500400000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // ================================================================
    // MODULE 6: DÂN CƯ - LAO ĐỘNG
    // ================================================================

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."BienDongDanCu" (
        "MaBienDong" SERIAL PRIMARY KEY,
        "LoaiBienDong" VARCHAR(50) NOT NULL,
        "SoLuong" INT DEFAULT 0,
        "ThoiGian" DATE DEFAULT CURRENT_DATE,
        "GhiChu" TEXT,
        "NgayTao" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."HoGiaDinh" (
        "MaHGD" SERIAL PRIMARY KEY,
        "SoHoKhau" VARCHAR(20) UNIQUE NOT NULL,
        "ChuHo" VARCHAR(150) NOT NULL,
        "DiaChi" VARCHAR(255),
        "SoThanhVien" INT DEFAULT 0,
        "MaXaPhuong" INT,
        "NgayTao" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY ("MaXaPhuong") REFERENCES "dashboard_xp"."XaPhuong"("MaXaPhuong")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."ThanhVienHo" (
        "MaTVH" SERIAL PRIMARY KEY,
        "MaHGD" INT NOT NULL,
        "MaCongDan" INT NOT NULL,
        "QuanHe" VARCHAR(50),
        "NgheNghiep" VARCHAR(100),
        "ThuNhap" DECIMAL(18,0),
        "GhiChu" TEXT,
        FOREIGN KEY ("MaHGD") REFERENCES "dashboard_xp"."HoGiaDinh"("MaHGD"),
        FOREIGN KEY ("MaCongDan") REFERENCES "dashboard_xp"."CongDan"("MaCongDan"),
        UNIQUE ("MaHGD", "MaCongDan")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."HoNgheo" (
        "MaHoNgheo" SERIAL PRIMARY KEY,
        "MaHGD" INT UNIQUE NOT NULL,
        "CapDoNgheo" VARCHAR(50),
        "ThuNhapBinhQuan" DECIMAL(18,0),
        "LyDo" TEXT,
        "TrangThai" VARCHAR(50) DEFAULT 'Đang hỗ trợ',
        "NamXetDuyet" INT,
        "NgayCapNhat" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY ("MaHGD") REFERENCES "dashboard_xp"."HoGiaDinh"("MaHGD"),
        CHECK ("CapDoNgheo" IS NULL OR "CapDoNgheo" IN ('Hộ nghèo', 'Cận nghèo'))
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."DoiTuongBaoTro" (
        "MaDoiTuong" SERIAL PRIMARY KEY,
        "MaCongDan" INT UNIQUE NOT NULL,
        "LoaiDoiTuong" VARCHAR(100) NOT NULL,
        "MucTroCapThang" DECIMAL(18,0),
        "TuNgay" DATE,
        "DenNgay" DATE,
        "TrangThai" VARCHAR(50) DEFAULT 'Đang hỗ trợ',
        "GhiChu" TEXT,
        FOREIGN KEY ("MaCongDan") REFERENCES "dashboard_xp"."CongDan"("MaCongDan")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."TroCapXaHoi" (
        "MaTroCap" SERIAL PRIMARY KEY,
        "MaDoiTuong" INT NOT NULL,
        "ThangNam" VARCHAR(7) NOT NULL,
        "SoTien" DECIMAL(18,0) NOT NULL,
        "NgayTraCap" DATE,
        "TrangThai" VARCHAR(50) DEFAULT 'Đã chi trả',
        FOREIGN KEY ("MaDoiTuong") REFERENCES "dashboard_xp"."DoiTuongBaoTro"("MaDoiTuong")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."NguoiCoCong" (
        "MaNCC" SERIAL PRIMARY KEY,
        "MaCongDan" INT UNIQUE NOT NULL,
        "LoaiCongHien" VARCHAR(100) NOT NULL,
        "ChungNhan" VARCHAR(100),
        "NgayPhongTang" DATE,
        "MucHuong" DECIMAL(18,0),
        "TrangThai" VARCHAR(50) DEFAULT 'Đang hưởng',
        "GhiChu" TEXT,
        "NgayDangKy" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY ("MaCongDan") REFERENCES "dashboard_xp"."CongDan"("MaCongDan"),
        CHECK ("LoaiCongHien" IN ('Liệt sĩ', 'Thương binh', 'Bệnh binh', 'Người có công khác'))
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."CheDoUuDai" (
        "MaCheDo" SERIAL PRIMARY KEY,
        "MaNCC" INT NOT NULL,
        "TenCheDo" VARCHAR(200) NOT NULL,
        "MucHuong" DECIMAL(18,0),
        "ThangNam" VARCHAR(7) NOT NULL,
        "TrangThai" VARCHAR(50) DEFAULT 'Đã chi trả',
        FOREIGN KEY ("MaNCC") REFERENCES "dashboard_xp"."NguoiCoCong"("MaNCC")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."QuaTangThamHoi" (
        "MaQuaTang" SERIAL PRIMARY KEY,
        "MaNCC" INT NOT NULL,
        "DipTang" VARCHAR(100) NOT NULL,
        "GiaTriQuaTang" DECIMAL(18,0),
        "NgayTang" DATE DEFAULT CURRENT_DATE,
        FOREIGN KEY ("MaNCC") REFERENCES "dashboard_xp"."NguoiCoCong"("MaNCC")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."CanBoTBXH" (
        "MaCanBo" SERIAL PRIMARY KEY,
        "HoTen" VARCHAR(150) NOT NULL,
        "ChucVu" VARCHAR(50),
        "SoDienThoai" VARCHAR(20)
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."RaSoatHoNgheo" (
        "MaRaSoat" SERIAL PRIMARY KEY,
        "MaHoNgheo" INT NOT NULL,
        "NamRaSoat" INT NOT NULL,
        "KetQuaRaSoat" VARCHAR(50),
        "NgayRaSoat" DATE DEFAULT CURRENT_DATE,
        "CanBoThucHien" INT,
        "NhanXet" TEXT,
        FOREIGN KEY ("MaHoNgheo") REFERENCES "dashboard_xp"."HoNgheo"("MaHoNgheo"),
        FOREIGN KEY ("CanBoThucHien") REFERENCES "dashboard_xp"."CanBoTBXH"("MaCanBo")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."HuongChinhSachHoNgheo" (
        "MaHuong" SERIAL PRIMARY KEY,
        "MaHoNgheo" INT NOT NULL,
        "TenChinhSach" VARCHAR(200) NOT NULL,
        "GiaTriHoTro" DECIMAL(18,0),
        "NgayNhan" DATE,
        "GhiChu" TEXT,
        FOREIGN KEY ("MaHoNgheo") REFERENCES "dashboard_xp"."HoNgheo"("MaHoNgheo")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."ViecLam" (
        "MaViecLam" SERIAL PRIMARY KEY,
        "TenCongViec" VARCHAR(200) NOT NULL,
        "NhaTuyenDung" VARCHAR(200),
        "DiaDiem" VARCHAR(255),
        "SoLuongCanTuyen" INT DEFAULT 1,
        "MucLuong" DECIMAL(18,0),
        "YeuCau" TEXT,
        "NgayDangTin" DATE DEFAULT CURRENT_DATE,
        "NgayHetHan" DATE,
        "TrangThai" VARCHAR(50) DEFAULT 'Đang tuyển',
        "GhiChu" TEXT
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."NguoiTimViec" (
        "MaNTV" SERIAL PRIMARY KEY,
        "MaCongDan" INT NOT NULL,
        "TrinhDo" VARCHAR(100),
        "KinhNghiem" TEXT,
        "KyNang" TEXT,
        "NgheNghiepMongMuon" VARCHAR(100),
        "MucLuongMongMuon" DECIMAL(18,0),
        "TrangThai" VARCHAR(50) DEFAULT 'Đang tìm việc',
        "NgayDangKy" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY ("MaCongDan") REFERENCES "dashboard_xp"."CongDan"("MaCongDan")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."NguonLaoDong" (
        "MaNLD" SERIAL PRIMARY KEY,
        "TongSoLaoDong" INT DEFAULT 0,
        "LDCoViecLam" INT DEFAULT 0,
        "LDThatNghiep" INT DEFAULT 0,
        "ThangNam" VARCHAR(7) NOT NULL
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."GioiThieuViecLam" (
        "MaGioiThieu" SERIAL PRIMARY KEY,
        "MaNTV" INT NOT NULL,
        "MaViecLam" INT NOT NULL,
        "NgayGioiThieu" DATE DEFAULT CURRENT_DATE,
        "KetQua" VARCHAR(50),
        FOREIGN KEY ("MaNTV") REFERENCES "dashboard_xp"."NguoiTimViec"("MaNTV"),
        FOREIGN KEY ("MaViecLam") REFERENCES "dashboard_xp"."ViecLam"("MaViecLam")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."HoTroThatNghiep" (
        "MaHoTro" SERIAL PRIMARY KEY,
        "MaNTV" INT NOT NULL,
        "LoaiHoTro" VARCHAR(100) NOT NULL,
        "SoTien" DECIMAL(18,0),
        "NgayNhan" DATE,
        FOREIGN KEY ("MaNTV") REFERENCES "dashboard_xp"."NguoiTimViec"("MaNTV")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."KhaoSatNhuCauHocNghe" (
        "MaKhaoSat" SERIAL PRIMARY KEY,
        "MaCongDan" INT NOT NULL,
        "NgheNghiepMongMuon" VARCHAR(100),
        "ThoiGianMongMuon" VARCHAR(50),
        "GhiChu" TEXT,
        FOREIGN KEY ("MaCongDan") REFERENCES "dashboard_xp"."CongDan"("MaCongDan")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."LopDaoTaoNghe" (
        "MaLop" SERIAL PRIMARY KEY,
        "TenNghe" VARCHAR(150) NOT NULL,
        "SoHocVien" INT DEFAULT 0,
        "ThoiGian" VARCHAR(100)
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."TheoDoiSauDaoTao" (
        "MaTheoDoi" SERIAL PRIMARY KEY,
        "MaLop" INT NOT NULL,
        "MaCongDan" INT NOT NULL,
        "TinhTrangViecLam" VARCHAR(100),
        "NgayCapNhat" DATE DEFAULT CURRENT_DATE,
        FOREIGN KEY ("MaLop") REFERENCES "dashboard_xp"."LopDaoTaoNghe"("MaLop"),
        FOREIGN KEY ("MaCongDan") REFERENCES "dashboard_xp"."CongDan"("MaCongDan")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."ChiTiet_LaoDong" (
        "MaHoSo" VARCHAR(20) PRIMARY KEY,
        "LoaiDichVu" VARCHAR(100),
        "MaNTV" INT,
        "MaViecLam" INT,
        "MaDoiTuong" INT,
        "NgayHenPhongVan" DATE,
        "KetQua" TEXT,
        "GhiChu" TEXT,
        FOREIGN KEY ("MaHoSo") REFERENCES "dashboard_xp"."HoSoNghiepVu"("MaHoSo"),
        FOREIGN KEY ("MaNTV") REFERENCES "dashboard_xp"."NguoiTimViec"("MaNTV"),
        FOREIGN KEY ("MaViecLam") REFERENCES "dashboard_xp"."ViecLam"("MaViecLam"),
        FOREIGN KEY ("MaDoiTuong") REFERENCES "dashboard_xp"."DoiTuongBaoTro"("MaDoiTuong")
      )
    `);

    // ================================================================
    // MODULE 7: TÀI CHÍNH - NGÂN SÁCH (NganSach already created in previous migration)
    // ================================================================

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."DuToanNganSach" (
        "MaDuToan" SERIAL PRIMARY KEY,
        "TenDuToan" VARCHAR(200) NOT NULL,
        "Nam" INT NOT NULL,
        "MaLinhVuc" INT,
        "SoTienDuToan" DECIMAL(18,0) NOT NULL,
        "TrangThai" VARCHAR(50) DEFAULT 'Đã duyệt',
        "NgayLap" DATE DEFAULT CURRENT_DATE,
        "NguoiLap" INT,
        "NgayDuyet" DATE,
        "NguoiDuyet" INT,
        "GhiChu" TEXT,
        FOREIGN KEY ("MaLinhVuc") REFERENCES "dashboard_xp"."LinhVuc"("MaLinhVuc"),
        FOREIGN KEY ("NguoiLap") REFERENCES "dashboard_xp"."NguoiDung"("MaNguoiDung"),
        FOREIGN KEY ("NguoiDuyet") REFERENCES "dashboard_xp"."LanhDao"("MaLanhDao")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."GiaiNgan" (
        "MaGiaiNgan" SERIAL PRIMARY KEY,
        "MaDuToan" INT NOT NULL,
        "SoTien" DECIMAL(18,0) NOT NULL,
        "NgayGiaiNgan" DATE DEFAULT CURRENT_DATE,
        "NoiDung" TEXT,
        "NguoiDuyet" INT,
        "TrangThai" VARCHAR(50) DEFAULT 'Đã giải ngân',
        "GhiChu" TEXT,
        FOREIGN KEY ("MaDuToan") REFERENCES "dashboard_xp"."DuToanNganSach"("MaDuToan"),
        FOREIGN KEY ("NguoiDuyet") REFERENCES "dashboard_xp"."LanhDao"("MaLanhDao"),
        CHECK ("SoTien" > 0)
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."MucLucNganSach" (
        "MaMucLuc" VARCHAR(20) PRIMARY KEY,
        "TenMucLuc" VARCHAR(200) NOT NULL,
        "MaMucLucCha" VARCHAR(20),
        "Cap" INT DEFAULT 1,
        "ThuTu" INT DEFAULT 0,
        "TrangThai" BOOLEAN DEFAULT true,
        FOREIGN KEY ("MaMucLucCha") REFERENCES "dashboard_xp"."MucLucNganSach"("MaMucLuc")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."DuToanChiTiet" (
        "MaChiTiet" SERIAL PRIMARY KEY,
        "MaDuToan" INT NOT NULL,
        "MaMucLuc" VARCHAR(20),
        "NoiDung" TEXT NOT NULL,
        "SoTien" DECIMAL(18,0) NOT NULL,
        "GhiChu" TEXT,
        FOREIGN KEY ("MaDuToan") REFERENCES "dashboard_xp"."DuToanNganSach"("MaDuToan"),
        FOREIGN KEY ("MaMucLuc") REFERENCES "dashboard_xp"."MucLucNganSach"("MaMucLuc")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."PhieuNganSach" (
        "MaPhieu" VARCHAR(20) PRIMARY KEY,
        "LoaiPhieu" VARCHAR(20) NOT NULL,
        "SoTien" DECIMAL(18,0) NOT NULL,
        "NgayLap" DATE DEFAULT CURRENT_DATE,
        "NoiDung" TEXT NOT NULL,
        "NguoiNhan" VARCHAR(150),
        "NguoiLap" INT,
        "NguoiDuyet" INT,
        "TrangThai" VARCHAR(50) DEFAULT 'Đã duyệt',
        "MaDuToan" INT,
        "MaLinhVuc" INT,
        "GhiChu" TEXT,
        FOREIGN KEY ("NguoiLap") REFERENCES "dashboard_xp"."NguoiDung"("MaNguoiDung"),
        FOREIGN KEY ("NguoiDuyet") REFERENCES "dashboard_xp"."LanhDao"("MaLanhDao"),
        FOREIGN KEY ("MaDuToan") REFERENCES "dashboard_xp"."DuToanNganSach"("MaDuToan"),
        FOREIGN KEY ("MaLinhVuc") REFERENCES "dashboard_xp"."LinhVuc"("MaLinhVuc"),
        CHECK ("LoaiPhieu" IN ('Thu', 'Chi')),
        CHECK ("SoTien" > 0)
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."PhanTichTaiChinh_AI" (
        "MaPhanTich" SERIAL PRIMARY KEY,
        "ThangNam" VARCHAR(7) NOT NULL,
        "TongThu" DECIMAL(18,0) DEFAULT 0,
        "TongChi" DECIMAL(18,0) DEFAULT 0,
        "ConLai" DECIMAL(18,0) DEFAULT 0,
        "NhanXetAI" TEXT,
        "CanhBao" TEXT,
        "NgayPhanTich" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."CauHinhCanhBaoNganSach" (
        "MaCauHinh" SERIAL PRIMARY KEY,
        "MaLinhVuc" INT,
        "NguyenMocCanhBao" FLOAT DEFAULT 0.8,
        "TrangThai" BOOLEAN DEFAULT true,
        FOREIGN KEY ("MaLinhVuc") REFERENCES "dashboard_xp"."LinhVuc"("MaLinhVuc"),
        CHECK ("NguyenMocCanhBao" BETWEEN 0 AND 1)
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."TaiSanCong" (
        "MaTaiSan" SERIAL PRIMARY KEY,
        "TenTaiSan" VARCHAR(200) NOT NULL,
        "LoaiTaiSan" VARCHAR(50),
        "NgayMua" DATE,
        "GiaTri" DECIMAL(18,0),
        "TinhTrang" VARCHAR(50) DEFAULT 'Đang sử dụng',
        "ViTri" VARCHAR(255),
        "NguoiQuanLy" INT,
        "NgayBaoTri" DATE,
        "LanBaoTriKeTiep" DATE,
        "MaLinhVuc" INT,
        "GhiChu" TEXT,
        "NgayTao" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY ("NguoiQuanLy") REFERENCES "dashboard_xp"."NguoiDung"("MaNguoiDung"),
        FOREIGN KEY ("MaLinhVuc") REFERENCES "dashboard_xp"."LinhVuc"("MaLinhVuc")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."ChiTiet_TaiChinh" (
        "MaHoSo" VARCHAR(20) PRIMARY KEY,
        "LoaiGiaoDich" VARCHAR(50),
        "SoTien" DECIMAL(18,0) NOT NULL,
        "MaDuToan" INT,
        "MucDich" TEXT,
        "TrangThai" VARCHAR(50) DEFAULT 'Đã thanh toán',
        "GhiChu" TEXT,
        FOREIGN KEY ("MaHoSo") REFERENCES "dashboard_xp"."HoSoNghiepVu"("MaHoSo"),
        FOREIGN KEY ("MaDuToan") REFERENCES "dashboard_xp"."DuToanNganSach"("MaDuToan"),
        CHECK ("SoTien" > 0)
      )
    `);

    console.log('✅ Remaining modules created successfully (Part 2)');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop Module 7
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."ChiTiet_TaiChinh" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."TaiSanCong" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."CauHinhCanhBaoNganSach" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."PhanTichTaiChinh_AI" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."PhieuNganSach" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."DuToanChiTiet" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."MucLucNganSach" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."GiaiNgan" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."DuToanNganSach" CASCADE`);

    // Drop Module 6
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."ChiTiet_LaoDong" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."TheoDoiSauDaoTao" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."LopDaoTaoNghe" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."KhaoSatNhuCauHocNghe" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."HoTroThatNghiep" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."GioiThieuViecLam" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."NguonLaoDong" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."NguoiTimViec" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."ViecLam" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."HuongChinhSachHoNgheo" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."RaSoatHoNgheo" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."CanBoTBXH" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."QuaTangThamHoi" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."CheDoUuDai" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."NguoiCoCong" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."TroCapXaHoi" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."DoiTuongBaoTro" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."HoNgheo" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."ThanhVienHo" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."HoGiaDinh" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."BienDongDanCu" CASCADE`);
  }
}
