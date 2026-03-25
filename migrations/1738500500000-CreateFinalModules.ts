import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFinalModules1738500500000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // ================================================================
    // MODULE 8: ĐỊA CHÍNH - QUY HOẠCH (LoaiDat, ThuaDat, BienDongDat already created)
    // ================================================================

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."LoaiQuyHoach" (
        "MaLoaiQH" SERIAL PRIMARY KEY,
        "TenLoaiQH" VARCHAR(100) NOT NULL
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."QuyHoach" (
        "MaQuyHoach" SERIAL PRIMARY KEY,
        "TenQuyHoach" VARCHAR(200) NOT NULL,
        "MaLoaiQH" INT,
        "DiaChi" VARCHAR(255),
        "DienTich" DECIMAL(18,2),
        "ThoiGianThucHien" VARCHAR(100),
        "TrangThai" VARCHAR(50) DEFAULT 'Đang thực hiện',
        "FileBanDo" VARCHAR(500),
        "MoTa" TEXT,
        "NgayPheDuyet" DATE,
        FOREIGN KEY ("MaLoaiQH") REFERENCES "dashboard_xp"."LoaiQuyHoach"("MaLoaiQH")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."RuiRoQuyHoach" (
        "MaRuiRo" SERIAL PRIMARY KEY,
        "MaQuyHoach" INT NOT NULL,
        "MoTaRuiRo" TEXT NOT NULL,
        "MucDoNghiemTrong" VARCHAR(20),
        "NgayPhatHien" DATE DEFAULT CURRENT_DATE,
        "TrangThai" VARCHAR(50) DEFAULT 'Đang xử lý',
        "BienPhapXuLy" TEXT,
        "NguoiPhatHien" INT,
        "NgayXuLyXong" DATE,
        "GhiChu" TEXT,
        FOREIGN KEY ("MaQuyHoach") REFERENCES "dashboard_xp"."QuyHoach"("MaQuyHoach"),
        FOREIGN KEY ("NguoiPhatHien") REFERENCES "dashboard_xp"."NguoiDung"("MaNguoiDung")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."HoSoTranhChapDatDai" (
        "MaHoSo" VARCHAR(20) PRIMARY KEY,
        "TenVuViec" VARCHAR(200) NOT NULL,
        "BenA" VARCHAR(150) NOT NULL,
        "BenB" VARCHAR(150) NOT NULL,
        "DiaDiem" VARCHAR(255),
        "DienTichTranh" DECIMAL(18,2),
        "NgayNopDon" DATE DEFAULT CURRENT_DATE,
        "TrangThai" VARCHAR(50) DEFAULT 'Đang giải quyết',
        "KetQuaGiaiQuyet" TEXT,
        "NgayKetThuc" DATE,
        "CanBoXuLy" INT,
        "NguoiKyQuyetDinh" INT,
        "SoQuyetDinh" VARCHAR(50),
        "NgayKyQuyetDinh" DATE,
        "TaiLieuLienQuan" VARCHAR(500),
        "GhiChu" TEXT,
        "NgayTao" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY ("CanBoXuLy") REFERENCES "dashboard_xp"."CanBo"("MaCanBo"),
        FOREIGN KEY ("NguoiKyQuyetDinh") REFERENCES "dashboard_xp"."LanhDao"("MaLanhDao")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."LichSuBienDongDatDai" (
        "MaBienDong" SERIAL PRIMARY KEY,
        "MaThua" VARCHAR(20) NOT NULL,
        "LoaiBienDong" VARCHAR(50) NOT NULL,
        "NgayBienDong" DATE DEFAULT CURRENT_DATE,
        "DienTichCu" DECIMAL(18,2),
        "DienTichMoi" DECIMAL(18,2),
        "ChuSoHuuCu" VARCHAR(150),
        "ChuSoHuuMoi" VARCHAR(150),
        "LyDo" TEXT,
        "NguoiThucHien" INT,
        "TaiLieuDinhKem" VARCHAR(500),
        "GhiChu" TEXT,
        FOREIGN KEY ("MaThua") REFERENCES "dashboard_xp"."ThuaDat"("MaThua"),
        FOREIGN KEY ("NguoiThucHien") REFERENCES "dashboard_xp"."NguoiDung"("MaNguoiDung")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."HoSoCapGCN" (
        "MaHoSo" VARCHAR(20) PRIMARY KEY,
        "MaThua" VARCHAR(20) NOT NULL,
        "NguoiDeNghi" VARCHAR(150) NOT NULL,
        "NgayNop" DATE DEFAULT CURRENT_DATE,
        "TrangThai" VARCHAR(50) DEFAULT 'Đang xử lý',
        "SoGCN" VARCHAR(50),
        "NgayCap" DATE,
        "NguoiXuLy" INT,
        "GhiChu" TEXT,
        FOREIGN KEY ("MaThua") REFERENCES "dashboard_xp"."ThuaDat"("MaThua"),
        FOREIGN KEY ("NguoiXuLy") REFERENCES "dashboard_xp"."CanBo"("MaCanBo")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."BienBanThamDinhDatDai" (
        "MaBienBan" SERIAL PRIMARY KEY,
        "MaHoSo" VARCHAR(20) NOT NULL,
        "NgayThamDinh" DATE DEFAULT CURRENT_DATE,
        "KetLuan" TEXT,
        "NguoiThamDinh" INT,
        "TaiLieuDinhKem" VARCHAR(500),
        "GhiChu" TEXT,
        FOREIGN KEY ("MaHoSo") REFERENCES "dashboard_xp"."HoSoCapGCN"("MaHoSo"),
        FOREIGN KEY ("NguoiThamDinh") REFERENCES "dashboard_xp"."CanBo"("MaCanBo")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."RuiRoQuyHoach_AI" (
        "MaRuiRo" SERIAL PRIMARY KEY,
        "MaQuyHoach" INT NOT NULL,
        "PhanTichAI" TEXT,
        "DiemRuiRo" FLOAT DEFAULT 0,
        "NgayPhanTich" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "DeXuat" TEXT,
        FOREIGN KEY ("MaQuyHoach") REFERENCES "dashboard_xp"."QuyHoach"("MaQuyHoach"),
        CHECK ("DiemRuiRo" >= 0 AND "DiemRuiRo" <= 100)
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."ChiTiet_DiaChinh" (
        "MaHoSo" VARCHAR(20) PRIMARY KEY,
        "LoaiDichVu" VARCHAR(100),
        "MaThua" VARCHAR(20),
        "DienTich" DECIMAL(18,2),
        "LoaiDat" VARCHAR(50),
        "MucDichSuDung" TEXT,
        "ThoiHanSuDung" VARCHAR(50),
        "PhiDichVu" DECIMAL(18,0),
        "TrangThai" VARCHAR(50) DEFAULT 'Đã thanh toán',
        "GhiChu" TEXT,
        FOREIGN KEY ("MaHoSo") REFERENCES "dashboard_xp"."HoSoNghiepVu"("MaHoSo"),
        FOREIGN KEY ("MaThua") REFERENCES "dashboard_xp"."ThuaDat"("MaThua")
      )
    `);

    // ================================================================
    // MODULE 9: MÔI TRƯỜNG
    // ================================================================

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."TramQuanTracMT" (
        "MaTram" SERIAL PRIMARY KEY,
        "TenTram" VARCHAR(150) NOT NULL,
        "DiaChi" VARCHAR(255),
        "ToaDo" VARCHAR(50),
        "LoaiTram" VARCHAR(50),
        "TrangThai" VARCHAR(50) DEFAULT 'Hoạt động',
        "NgayLapDat" DATE,
        "GhiChu" TEXT
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."ChiSoAQI_TheoNgay" (
        "MaChiSo" SERIAL PRIMARY KEY,
        "MaTram" INT NOT NULL,
        "Ngay" DATE DEFAULT CURRENT_DATE,
        "ChiSoAQI" INT,
        "MucDo" VARCHAR(50),
        "PM25" DECIMAL(18,2),
        "PM10" DECIMAL(18,2),
        "GhiChu" TEXT,
        FOREIGN KEY ("MaTram") REFERENCES "dashboard_xp"."TramQuanTracMT"("MaTram")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."DonViThuGomRac" (
        "MaDonVi" SERIAL PRIMARY KEY,
        "TenDonVi" VARCHAR(150) NOT NULL,
        "DiaChi" VARCHAR(255),
        "SoDienThoai" VARCHAR(20),
        "NguoiDaiDien" VARCHAR(150),
        "TrangThai" VARCHAR(50) DEFAULT 'Đang hoạt động'
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."DiemThuGomRac" (
        "MaDiem" SERIAL PRIMARY KEY,
        "TenDiem" VARCHAR(150) NOT NULL,
        "DiaChi" VARCHAR(255),
        "ToaDo" VARCHAR(50),
        "LoaiDiem" VARCHAR(50),
        "TrangThai" VARCHAR(50) DEFAULT 'Hoạt động',
        "GhiChu" TEXT
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."PhieuThuGomRac" (
        "MaPhieu" SERIAL PRIMARY KEY,
        "MaDiem" INT NOT NULL,
        "MaDonVi" INT NOT NULL,
        "NgayThuGom" DATE DEFAULT CURRENT_DATE,
        "KhoiLuong" DECIMAL(18,2),
        "LoaiRac" VARCHAR(50),
        "GhiChu" TEXT,
        FOREIGN KEY ("MaDiem") REFERENCES "dashboard_xp"."DiemThuGomRac"("MaDiem"),
        FOREIGN KEY ("MaDonVi") REFERENCES "dashboard_xp"."DonViThuGomRac"("MaDonVi")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."CoSoSanXuat_MoiTruong" (
        "MaCoSo" SERIAL PRIMARY KEY,
        "TenCoSo" VARCHAR(200) NOT NULL,
        "DiaChi" VARCHAR(255),
        "LoaiHinh" VARCHAR(100),
        "ChuCoSo" VARCHAR(150),
        "SoDienThoai" VARCHAR(20),
        "TrangThai" VARCHAR(50) DEFAULT 'Đang hoạt động',
        "NgayCapPhep" DATE,
        "GhiChu" TEXT
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."KetQuaKiemTraMoiTruong" (
        "MaKetQua" SERIAL PRIMARY KEY,
        "MaCoSo" INT NOT NULL,
        "NgayKiemTra" DATE DEFAULT CURRENT_DATE,
        "NoiDungKiemTra" TEXT,
        "KetLuan" TEXT,
        "BienPhapXuLy" TEXT,
        "NguoiKiemTra" INT,
        "TrangThai" VARCHAR(50) DEFAULT 'Đã kiểm tra',
        FOREIGN KEY ("MaCoSo") REFERENCES "dashboard_xp"."CoSoSanXuat_MoiTruong"("MaCoSo"),
        FOREIGN KEY ("NguoiKiemTra") REFERENCES "dashboard_xp"."NguoiDung"("MaNguoiDung")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."ThuPhiVeSinh" (
        "MaPhieu" VARCHAR(20) PRIMARY KEY,
        "HoTen" VARCHAR(150) NOT NULL,
        "DiaChi" VARCHAR(255),
        "ThangNam" VARCHAR(7) NOT NULL,
        "SoTien" DECIMAL(18,0) NOT NULL,
        "NgayThu" DATE,
        "TrangThai" VARCHAR(50) DEFAULT 'Chưa thu',
        "GhiChu" TEXT,
        CHECK ("SoTien" > 0)
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."DiemNongMoiTruong" (
        "MaDiem" SERIAL PRIMARY KEY,
        "TenDiem" VARCHAR(150) NOT NULL,
        "DiaChi" VARCHAR(255),
        "ToaDo" VARCHAR(50),
        "LoaiONhiem" VARCHAR(50),
        "MucDoNghiemTrong" VARCHAR(20),
        "TrangThai" VARCHAR(50) DEFAULT 'Đang theo dõi',
        "BienPhapXuLy" TEXT,
        "NgayPhatHien" DATE DEFAULT CURRENT_DATE
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."ChiTiet_MoiTruong" (
        "MaHoSo" VARCHAR(20) PRIMARY KEY,
        "LoaiDichVu" VARCHAR(100),
        "MaCoSo" INT,
        "MaDiem" INT,
        "NoiDungYeuCau" TEXT,
        "KetQua" TEXT,
        "PhiDichVu" DECIMAL(18,0),
        "TrangThai" VARCHAR(50) DEFAULT 'Đã xử lý',
        "GhiChu" TEXT,
        FOREIGN KEY ("MaHoSo") REFERENCES "dashboard_xp"."HoSoNghiepVu"("MaHoSo"),
        FOREIGN KEY ("MaCoSo") REFERENCES "dashboard_xp"."CoSoSanXuat_MoiTruong"("MaCoSo"),
        FOREIGN KEY ("MaDiem") REFERENCES "dashboard_xp"."DiemNongMoiTruong"("MaDiem")
      )
    `);

    // ================================================================
    // MODULE 10: VĂN HÓA - DU LỊCH
    // ================================================================

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."BaoCao" (
        "MaBaoCao" SERIAL PRIMARY KEY,
        "TieuDe" VARCHAR(200) NOT NULL,
        "LoaiBaoCao" VARCHAR(100),
        "MaLinhVuc" INT,
        "NoiDung" TEXT,
        "NgayLap" DATE DEFAULT CURRENT_DATE,
        "NguoiLap" INT,
        "TrangThai" VARCHAR(50) DEFAULT 'Đã hoàn thành',
        "FileDinhKem" VARCHAR(500),
        "GhiChu" TEXT,
        "ThangNam" VARCHAR(7),
        "NgayTao" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY ("MaLinhVuc") REFERENCES "dashboard_xp"."LinhVuc"("MaLinhVuc"),
        FOREIGN KEY ("NguoiLap") REFERENCES "dashboard_xp"."NguoiDung"("MaNguoiDung")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."HoSoDiTich" (
        "MaHoSo" SERIAL PRIMARY KEY,
        "MaDiTich" INT NOT NULL,
        "LoaiHoSo" VARCHAR(100),
        "NoiDung" TEXT,
        "NgayLap" DATE DEFAULT CURRENT_DATE,
        "NguoiLap" INT,
        FOREIGN KEY ("MaDiTich") REFERENCES "dashboard_xp"."DiTich"("MaDiTich"),
        FOREIGN KEY ("NguoiLap") REFERENCES "dashboard_xp"."NguoiDung"("MaNguoiDung")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."CoSoKinhDoanhDuLich" (
        "MaCoSo" SERIAL PRIMARY KEY,
        "TenCoSo" VARCHAR(200) NOT NULL,
        "DiaChi" VARCHAR(255),
        "LoaiHinh" VARCHAR(50),
        "ChuCoSo" VARCHAR(150),
        "SoDienThoai" VARCHAR(20),
        "TrangThai" VARCHAR(50) DEFAULT 'Đang hoạt động',
        "NgayCapPhep" DATE
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."NoiDungSoHoaDiTich" (
        "MaNoiDung" SERIAL PRIMARY KEY,
        "MaDiTich" INT NOT NULL,
        "TenNoiDung" VARCHAR(200) NOT NULL,
        "LoaiNoiDung" VARCHAR(50),
        "DuongDanFile" VARCHAR(500),
        "MoTa" TEXT,
        "NgayTao" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "NguoiTao" INT,
        FOREIGN KEY ("MaDiTich") REFERENCES "dashboard_xp"."DiTich"("MaDiTich"),
        FOREIGN KEY ("NguoiTao") REFERENCES "dashboard_xp"."NguoiDung"("MaNguoiDung")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."BaiThuyetMinh" (
        "MaBai" SERIAL PRIMARY KEY,
        "MaDiTich" INT NOT NULL,
        "TieuDe" VARCHAR(200) NOT NULL,
        "NoiDung" TEXT,
        "NgonNgu" VARCHAR(20) DEFAULT 'vi',
        "FileAmThanh" VARCHAR(500),
        "TrangThai" BOOLEAN DEFAULT true,
        FOREIGN KEY ("MaDiTich") REFERENCES "dashboard_xp"."DiTich"("MaDiTich")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."SanPhamOCOP" (
        "MaSanPham" SERIAL PRIMARY KEY,
        "TenSanPham" VARCHAR(200) NOT NULL,
        "MaLangNghe" INT,
        "MoTa" TEXT,
        "XepHang" VARCHAR(20),
        "GiaBan" DECIMAL(18,0),
        "TrangThai" VARCHAR(50) DEFAULT 'Đang bán',
        "HinhAnh" VARCHAR(500),
        "NgayXepHang" DATE,
        "GhiChu" TEXT,
        FOREIGN KEY ("MaLangNghe") REFERENCES "dashboard_xp"."LangNghe"("MaLangNghe")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."KeHoachLeHoi" (
        "MaKeHoach" SERIAL PRIMARY KEY,
        "MaLeHoi" INT NOT NULL,
        "NoiDung" TEXT NOT NULL,
        "DuKinhPhi" DECIMAL(18,0),
        "NguoiPhuTrach" INT,
        "TrangThai" VARCHAR(50) DEFAULT 'Đã lập',
        "NgayLap" DATE DEFAULT CURRENT_DATE,
        "GhiChu" TEXT,
        FOREIGN KEY ("MaLeHoi") REFERENCES "dashboard_xp"."LeHoi"("MaLeHoi"),
        FOREIGN KEY ("NguoiPhuTrach") REFERENCES "dashboard_xp"."NguoiDung"("MaNguoiDung")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."ChiTiet_VanHoa" (
        "MaHoSo" VARCHAR(20) PRIMARY KEY,
        "LoaiDichVu" VARCHAR(100),
        "MaDiTich" INT,
        "MaLeHoi" INT,
        "MaCoSo" INT,
        "NoiDungDichVu" TEXT,
        "PhiDichVu" DECIMAL(18,0),
        "TrangThai" VARCHAR(50) DEFAULT 'Đã xử lý',
        "GhiChu" TEXT,
        FOREIGN KEY ("MaHoSo") REFERENCES "dashboard_xp"."HoSoNghiepVu"("MaHoSo"),
        FOREIGN KEY ("MaDiTich") REFERENCES "dashboard_xp"."DiTich"("MaDiTich"),
        FOREIGN KEY ("MaLeHoi") REFERENCES "dashboard_xp"."LeHoi"("MaLeHoi"),
        FOREIGN KEY ("MaCoSo") REFERENCES "dashboard_xp"."CoSoKinhDoanhDuLich"("MaCoSo")
      )
    `);

    // ================================================================
    // Create Views
    // ================================================================

    await queryRunner.query(`
      CREATE OR REPLACE VIEW "dashboard_xp"."vw_PhanAnh_BanDo" AS
      SELECT
        pa."MaPhanAnh",
        pa."TieuDe",
        pa."NoiDung",
        pa."ToaDo",
        pa."DiaDiem",
        pa."TrangThai",
        pa."MucDoUuTien",
        pa."NgayTao",
        lv."TenLinhVuc",
        cd."HoTen",
        cd."SoCCCD"
      FROM "dashboard_xp"."PhanAnh" pa
      LEFT JOIN "dashboard_xp"."LinhVuc" lv ON pa."MaLinhVuc" = lv."MaLinhVuc"
      LEFT JOIN "dashboard_xp"."CongDan" cd ON pa."MaCongDan" = cd."MaCongDan"
      WHERE pa."ToaDo" IS NOT NULL AND pa."ToaDo" != ''
    `);

    console.log('✅ Final modules and views created successfully!');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop view
    await queryRunner.query(`DROP VIEW IF EXISTS "dashboard_xp"."vw_PhanAnh_BanDo" CASCADE`);

    // Drop Module 10
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."ChiTiet_VanHoa" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."KeHoachLeHoi" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."SanPhamOCOP" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."BaiThuyetMinh" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."NoiDungSoHoaDiTich" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."CoSoKinhDoanhDuLich" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."HoSoDiTich" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."BaoCao" CASCADE`);

    // Drop Module 9
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."ChiTiet_MoiTruong" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."DiemNongMoiTruong" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."ThuPhiVeSinh" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."KetQuaKiemTraMoiTruong" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."CoSoSanXuat_MoiTruong" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."PhieuThuGomRac" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."DiemThuGomRac" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."DonViThuGomRac" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."ChiSoAQI_TheoNgay" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."TramQuanTracMT" CASCADE`);

    // Drop Module 8
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."ChiTiet_DiaChinh" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."RuiRoQuyHoach_AI" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."BienBanThamDinhDatDai" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."HoSoCapGCN" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."LichSuBienDongDatDai" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."HoSoTranhChapDatDai" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."RuiRoQuyHoach" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."QuyHoach" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."LoaiQuyHoach" CASCADE`);
  }
}
