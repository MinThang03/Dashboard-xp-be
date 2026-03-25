import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAllRemainingTables1738500300000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // ================================================================
    // BẢNG CÒN THIẾU CỦA MODULE 1: HÀNH CHÍNH TƯ PHÁP
    // ================================================================

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."LoaiQuyetDinh" (
        "MaLoaiQD" SERIAL PRIMARY KEY,
        "TenLoaiQD" VARCHAR(100) NOT NULL
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."QuyetDinh" (
        "MaQD" SERIAL PRIMARY KEY,
        "SoQuyetDinh" VARCHAR(50) UNIQUE NOT NULL,
        "TieuDe" VARCHAR(200) NOT NULL,
        "MaLoaiQD" INT,
        "NgayBanHanh" DATE DEFAULT CURRENT_DATE,
        "NguoiKy" INT,
        "NoiDung" TEXT,
        "FileDinhKem" VARCHAR(500),
        "TrangThai" VARCHAR(50) DEFAULT 'Đã ban hành',
        "GhiChu" TEXT,
        FOREIGN KEY ("MaLoaiQD") REFERENCES "dashboard_xp"."LoaiQuyetDinh"("MaLoaiQD"),
        FOREIGN KEY ("NguoiKy") REFERENCES "dashboard_xp"."NguoiDung"("MaNguoiDung")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."ChiTiet_TuPhap" (
        "MaHoSo" VARCHAR(20) PRIMARY KEY,
        "LoaiGiayTo" VARCHAR(100),
        "SoGiayKhai" VARCHAR(50),
        "NgayNop" DATE,
        "DiaDiemDangKy" VARCHAR(200),
        "GhiChu" TEXT,
        FOREIGN KEY ("MaHoSo") REFERENCES "dashboard_xp"."HoSoNghiepVu"("MaHoSo")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."YeuCauBoSungTaiLieu" (
        "MaYeuCau" SERIAL PRIMARY KEY,
        "MaHoSo" VARCHAR(20) NOT NULL,
        "MaTaiLieuCanBoSung" VARCHAR(200) NOT NULL,
        "NoiDungYeuCau" TEXT,
        "ThoiHanBoSung" DATE,
        "TrangThai" VARCHAR(50) DEFAULT 'Chờ bổ sung',
        "NguoiYeuCau" INT,
        "NgayYeuCau" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY ("MaHoSo") REFERENCES "dashboard_xp"."HoSoNghiepVu"("MaHoSo"),
        FOREIGN KEY ("NguoiYeuCau") REFERENCES "dashboard_xp"."NguoiDung"("MaNguoiDung"),
        CHECK ("TrangThai" IN ('Chờ bổ sung', 'Đã bổ sung', 'Đã hủy'))
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."DanhGiaHoSo" (
        "MaDanhGia" SERIAL PRIMARY KEY,
        "MaHoSo" VARCHAR(20) NOT NULL,
        "DiemDanhGia" INT CHECK ("DiemDanhGia" BETWEEN 1 AND 5),
        "NhanXet" TEXT,
        "MaLanhDao" INT,
        "NgayDanhGia" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY ("MaHoSo") REFERENCES "dashboard_xp"."HoSoNghiepVu"("MaHoSo"),
        FOREIGN KEY ("MaLanhDao") REFERENCES "dashboard_xp"."LanhDao"("MaLanhDao")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."DanhGiaDichVu" (
        "MaDanhGia" SERIAL PRIMARY KEY,
        "MaHoSo" VARCHAR(20) NOT NULL,
        "MaCongDan" INT NOT NULL,
        "DiemDanhGia" INT CHECK ("DiemDanhGia" BETWEEN 1 AND 5),
        "NhanXet" TEXT,
        "NgayDanhGia" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "PhanHoiTuHeThong" TEXT,
        FOREIGN KEY ("MaHoSo") REFERENCES "dashboard_xp"."HoSoNghiepVu"("MaHoSo"),
        FOREIGN KEY ("MaCongDan") REFERENCES "dashboard_xp"."CongDan"("MaCongDan")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."KhoTriThuc" (
        "MaTriThuc" SERIAL PRIMARY KEY,
        "TieuDe" VARCHAR(200) NOT NULL,
        "NoiDung" TEXT NOT NULL,
        "MaLinhVuc" INT,
        "LoaiTaiLieu" VARCHAR(50),
        "TuKhoa" TEXT,
        "LuotXem" INT DEFAULT 0,
        "TrangThai" BOOLEAN DEFAULT true,
        "NgayTao" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "NguoiTao" INT,
        "NgayCapNhat" TIMESTAMP,
        "NguoiCapNhat" INT,
        FOREIGN KEY ("MaLinhVuc") REFERENCES "dashboard_xp"."LinhVuc"("MaLinhVuc"),
        FOREIGN KEY ("NguoiTao") REFERENCES "dashboard_xp"."NguoiDung"("MaNguoiDung"),
        FOREIGN KEY ("NguoiCapNhat") REFERENCES "dashboard_xp"."NguoiDung"("MaNguoiDung")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."LichSuTraCuuAI" (
        "MaTraCuu" SERIAL PRIMARY KEY,
        "MaNguoiDung" INT NOT NULL,
        "CauHoi" TEXT NOT NULL,
        "CauTraLoi" TEXT NOT NULL,
        "MaLinhVuc" INT,
        "ThoiGian" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "DanhGia" INT CHECK ("DanhGia" IS NULL OR "DanhGia" BETWEEN 1 AND 5),
        FOREIGN KEY ("MaNguoiDung") REFERENCES "dashboard_xp"."NguoiDung"("MaNguoiDung"),
        FOREIGN KEY ("MaLinhVuc") REFERENCES "dashboard_xp"."LinhVuc"("MaLinhVuc")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."PhanTichPhanAnh" (
        "MaPhanTich" SERIAL PRIMARY KEY,
        "MaPhanAnh" INT NOT NULL,
        "NoiDungPhanTich" TEXT,
        "MucDoUuTien" VARCHAR(20),
        "NgayPhanTich" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "TrangThai" VARCHAR(50) DEFAULT 'Đã phân tích',
        FOREIGN KEY ("MaPhanAnh") REFERENCES "dashboard_xp"."PhanAnh"("MaPhanAnh"),
        CHECK ("MucDoUuTien" IS NULL OR "MucDoUuTien" IN ('Cao', 'Trung bình', 'Thấp'))
      )
    `);

    // ================================================================
    // MODULE 2: Y TẾ - GIÁO DỤC (các bảng còn thiếu)
    // ================================================================

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."TiemChung_DoiTuong" (
        "MaTC_DoiTuong" SERIAL PRIMARY KEY,
        "MaTiemChung" INT NOT NULL,
        "MaCongDan" INT,
        "HoTen" VARCHAR(150) NOT NULL,
        "NgaySinh" DATE,
        "NgayTiem" DATE DEFAULT CURRENT_DATE,
        "LieuThu" INT DEFAULT 1,
        "TrangThai" VARCHAR(50) DEFAULT 'Đã tiêm',
        "PhanUng" TEXT,
        "GhiChu" TEXT,
        FOREIGN KEY ("MaTiemChung") REFERENCES "dashboard_xp"."TiemChung"("MaTiemChung"),
        FOREIGN KEY ("MaCongDan") REFERENCES "dashboard_xp"."CongDan"("MaCongDan")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."PhieuKham" (
        "MaPhieuKham" SERIAL PRIMARY KEY,
        "MaCongDan" INT,
        "HoTenBenhNhan" VARCHAR(150) NOT NULL,
        "NgayKham" DATE DEFAULT CURRENT_DATE,
        "TrieuChung" TEXT,
        "ChanDoan" TEXT,
        "DonThuoc" TEXT,
        "ChiPhi" DECIMAL(18,0) DEFAULT 0,
        "MaTram" INT,
        "BacSiXuLy" INT,
        "TrangThai" VARCHAR(50) DEFAULT 'Đã khám',
        "GhiChu" TEXT,
        FOREIGN KEY ("MaCongDan") REFERENCES "dashboard_xp"."CongDan"("MaCongDan"),
        FOREIGN KEY ("MaTram") REFERENCES "dashboard_xp"."TramYTe"("MaTram"),
        FOREIGN KEY ("BacSiXuLy") REFERENCES "dashboard_xp"."NguoiDung"("MaNguoiDung")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."NhanVienYTe" (
        "MaNhanVien" SERIAL PRIMARY KEY,
        "HoTen" VARCHAR(150) NOT NULL,
        "NgaySinh" DATE,
        "GioiTinh" VARCHAR(10),
        "ChucDanh" VARCHAR(50),
        "ChuyenMon" VARCHAR(100),
        "SoDienThoai" VARCHAR(20),
        "TrangThaiLamViec" VARCHAR(50) DEFAULT 'Đang làm việc',
        "MaTram" INT,
        "GhiChu" TEXT,
        FOREIGN KEY ("MaTram") REFERENCES "dashboard_xp"."TramYTe"("MaTram")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."LuotKham" (
        "MaLuotKham" SERIAL PRIMARY KEY,
        "MaTram" INT NOT NULL,
        "NgayKham" DATE DEFAULT CURRENT_DATE,
        "LoaiKham" VARCHAR(50),
        "SoLuongBenhNhan" INT DEFAULT 0,
        "GhiChu" TEXT,
        FOREIGN KEY ("MaTram") REFERENCES "dashboard_xp"."TramYTe"("MaTram")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."ThietBiYTe" (
        "MaThietBi" SERIAL PRIMARY KEY,
        "TenThietBi" VARCHAR(150) NOT NULL,
        "LoaiThietBi" VARCHAR(50),
        "NgayMua" DATE,
        "TinhTrang" VARCHAR(50) DEFAULT 'Tốt',
        "MaTram" INT,
        "GhiChu" TEXT,
        FOREIGN KEY ("MaTram") REFERENCES "dashboard_xp"."TramYTe"("MaTram")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."BaoTriThietBi" (
        "MaBaoTri" SERIAL PRIMARY KEY,
        "MaThietBi" INT NOT NULL,
        "NgayBaoTri" DATE DEFAULT CURRENT_DATE,
        "NoiDung" TEXT,
        "TrangThai" VARCHAR(50) DEFAULT 'Hoàn thành',
        "GhiChu" TEXT,
        FOREIGN KEY ("MaThietBi") REFERENCES "dashboard_xp"."ThietBiYTe"("MaThietBi")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."LopHoc" (
        "MaLop" SERIAL PRIMARY KEY,
        "TenLop" VARCHAR(50) NOT NULL,
        "Khoi" VARCHAR(20),
        "MaCoSo" INT NOT NULL,
        "GiaoVienChuNhiem" VARCHAR(150),
        "SoHocSinh" INT DEFAULT 0,
        "GhiChu" TEXT,
        FOREIGN KEY ("MaCoSo") REFERENCES "dashboard_xp"."CoSoGiaoDuc"("MaCoSo")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."DiemDanhLop" (
        "MaDiemDanh" SERIAL PRIMARY KEY,
        "MaLop" INT NOT NULL,
        "Ngay" DATE DEFAULT CURRENT_DATE,
        "SoHocSinhCoMat" INT DEFAULT 0,
        "SoHocSinhVangMat" INT DEFAULT 0,
        "GhiChu" TEXT,
        FOREIGN KEY ("MaLop") REFERENCES "dashboard_xp"."LopHoc"("MaLop"),
        UNIQUE ("MaLop", "Ngay")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."GiaoDucTongHop" (
        "MaTongHop" SERIAL PRIMARY KEY,
        "TenTruong" VARCHAR(200),
        "CapHoc" VARCHAR(50),
        "DiaChi" VARCHAR(255),
        "TenLop" VARCHAR(50),
        "Khoi" VARCHAR(20),
        "GiaoVien" VARCHAR(150),
        "ChuyenMon" VARCHAR(100),
        "TongSoHocSinh" INT DEFAULT 0,
        "BienDongHocSinh" VARCHAR(50),
        "LyDoBienDong" TEXT,
        "PhongHoc" VARCHAR(50),
        "TrangThietBi" TEXT,
        "TinhTrangCoSoVatChat" VARCHAR(100),
        "TinhTrangSucKhoe" VARCHAR(100),
        "HoatDongYTe" TEXT,
        "NgayCapNhat" DATE
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."ChiTiet_YTeGiaoDuc" (
        "MaHoSo" VARCHAR(20) PRIMARY KEY,
        "LoaiDichVu" VARCHAR(100),
        "MaTram" INT,
        "MaCoSo" INT,
        "NgayHenKham" DATE,
        "KetQuaKham" TEXT,
        "GhiChu" TEXT,
        FOREIGN KEY ("MaHoSo") REFERENCES "dashboard_xp"."HoSoNghiepVu"("MaHoSo"),
        FOREIGN KEY ("MaTram") REFERENCES "dashboard_xp"."TramYTe"("MaTram"),
        FOREIGN KEY ("MaCoSo") REFERENCES "dashboard_xp"."CoSoGiaoDuc"("MaCoSo")
      )
    `);

    // ================================================================
    // MODULE 3: KINH TẾ - THƯƠNG MẠI
    // ================================================================

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."ChoDiemKinhDoanh" (
        "MaCho" SERIAL PRIMARY KEY,
        "TenCho" VARCHAR(150) NOT NULL,
        "DiaChi" VARCHAR(255),
        "LoaiHinh" VARCHAR(50),
        "SoLo" INT DEFAULT 0,
        "TongDienTich" DECIMAL(18,2),
        "TrangThai" VARCHAR(50) DEFAULT 'Đang hoạt động',
        "NguoiQuanLy" VARCHAR(150),
        "SoDienThoai" VARCHAR(20),
        "GhiChu" TEXT,
        "NgayTao" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."LoSapCho" (
        "MaLo" SERIAL PRIMARY KEY,
        "MaCho" INT NOT NULL,
        "SoLo" VARCHAR(20) NOT NULL,
        "DienTich" DECIMAL(18,2),
        "TrangThai" VARCHAR(50) DEFAULT 'Còn trống',
        FOREIGN KEY ("MaCho") REFERENCES "dashboard_xp"."ChoDiemKinhDoanh"("MaCho")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."HoKinhDoanh" (
        "MaHoKD" SERIAL PRIMARY KEY,
        "TenHoKD" VARCHAR(150) NOT NULL,
        "ChuHo" VARCHAR(150),
        "DiaChi" VARCHAR(255),
        "SoDienThoai" VARCHAR(20),
        "LoaiHinhKD" VARCHAR(100),
        "TrangThai" VARCHAR(50) DEFAULT 'Đang hoạt động',
        "NgayDangKy" DATE
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."ThueLePhi" (
        "MaThue" SERIAL PRIMARY KEY,
        "MaHoKD" INT NOT NULL,
        "TenKhoanThu" VARCHAR(150) NOT NULL,
        "SoTien" DECIMAL(18,0) NOT NULL,
        "KyThanhToan" VARCHAR(20),
        "TrangThai" VARCHAR(50) DEFAULT 'Chưa thanh toán',
        FOREIGN KEY ("MaHoKD") REFERENCES "dashboard_xp"."HoKinhDoanh"("MaHoKD")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."NoThue" (
        "MaNo" SERIAL PRIMARY KEY,
        "MaHoKD" INT NOT NULL,
        "SoTienNo" DECIMAL(18,0) NOT NULL,
        "TrangThai" VARCHAR(50) DEFAULT 'Chưa thanh toán',
        FOREIGN KEY ("MaHoKD") REFERENCES "dashboard_xp"."HoKinhDoanh"("MaHoKD")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."BienDongHoKinhDoanh" (
        "MaBienDong" SERIAL PRIMARY KEY,
        "MaHoKD" INT NOT NULL,
        "LoaiBienDong" VARCHAR(50),
        "NgayBienDong" DATE DEFAULT CURRENT_DATE,
        "GhiChu" TEXT,
        FOREIGN KEY ("MaHoKD") REFERENCES "dashboard_xp"."HoKinhDoanh"("MaHoKD")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."HoKDTrongCho" (
        "Ma" SERIAL PRIMARY KEY,
        "MaHoKD" INT NOT NULL,
        "MaLo" INT NOT NULL,
        "NgayBatDau" DATE DEFAULT CURRENT_DATE,
        FOREIGN KEY ("MaHoKD") REFERENCES "dashboard_xp"."HoKinhDoanh"("MaHoKD"),
        FOREIGN KEY ("MaLo") REFERENCES "dashboard_xp"."LoSapCho"("MaLo")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."CanBoKinhTe" (
        "MaCanBo" SERIAL PRIMARY KEY,
        "HoTen" VARCHAR(150) NOT NULL,
        "ChucVu" VARCHAR(50),
        "SoDienThoai" VARCHAR(15)
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."CanhBaoRuiRoKinhTe" (
        "MaCanhBao" SERIAL PRIMARY KEY,
        "NoiDung" TEXT NOT NULL,
        "MucDo" VARCHAR(20),
        "ThoiGian" DATE
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."BaoCaoKinhTe" (
        "MaBaoCao" SERIAL PRIMARY KEY,
        "TieuDe" VARCHAR(200) NOT NULL,
        "NoiDung" TEXT,
        "ThoiGian" DATE
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."ThuPhi" (
        "MaThuPhi" SERIAL PRIMARY KEY,
        "TenKhoanThu" VARCHAR(200) NOT NULL,
        "DoiTuongNop" VARCHAR(150),
        "SoTien" DECIMAL(18,0) NOT NULL,
        "NgayThu" DATE DEFAULT CURRENT_DATE,
        "LoaiPhi" VARCHAR(50),
        "MaLinhVuc" INT,
        "NguoiThu" INT,
        "TrangThai" VARCHAR(50) DEFAULT 'Đã thu',
        "GhiChu" TEXT,
        FOREIGN KEY ("MaLinhVuc") REFERENCES "dashboard_xp"."LinhVuc"("MaLinhVuc"),
        FOREIGN KEY ("NguoiThu") REFERENCES "dashboard_xp"."NguoiDung"("MaNguoiDung")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."ToChuc" (
        "MaTC" SERIAL PRIMARY KEY,
        "TenToChuc" VARCHAR(200) NOT NULL,
        "DiaChi" VARCHAR(255),
        "SoDienThoai" VARCHAR(20),
        "NguoiDaiDien" INT,
        "LoaiToChuc" VARCHAR(50),
        "GhiChu" TEXT,
        FOREIGN KEY ("NguoiDaiDien") REFERENCES "dashboard_xp"."CongDan"("MaCongDan")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."ChiTiet_KinhTe" (
        "MaHoSo" VARCHAR(20) PRIMARY KEY,
        "MaHoKD" INT,
        "LoaiGiayPhep" VARCHAR(100),
        "NgayCapPhep" DATE,
        "NgayHetHan" DATE,
        "TrangThai" VARCHAR(50) DEFAULT 'Còn hiệu lực',
        "GhiChu" TEXT,
        FOREIGN KEY ("MaHoSo") REFERENCES "dashboard_xp"."HoSoNghiepVu"("MaHoSo"),
        FOREIGN KEY ("MaHoKD") REFERENCES "dashboard_xp"."HoKinhDoanh"("MaHoKD")
      )
    `);

    // ================================================================
    // MODULE 4: QUỐC PHÒNG - AN NINH
    // ================================================================

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."CanBoQuocPhong" (
        "MaCanBo" SERIAL PRIMARY KEY,
        "HoTen" VARCHAR(150) NOT NULL,
        "CapBac" VARCHAR(50),
        "ChucVu" VARCHAR(50),
        "DonVi" VARCHAR(150),
        "SoDienThoai" VARCHAR(20),
        "NgayTao" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."TamTruTamVang" (
        "MaHoSo" SERIAL PRIMARY KEY,
        "HoTenNguoiKhaiBao" VARCHAR(150) NOT NULL,
        "CCCD" VARCHAR(20),
        "DiaChiThuongTru" VARCHAR(255),
        "DiaChiTamTru" VARCHAR(255),
        "LoaiDangKy" VARCHAR(20),
        "TuNgay" DATE,
        "DenNgay" DATE,
        "TinhTrangHoSo" VARCHAR(50) DEFAULT 'Chờ duyệt',
        "NgayKhaiBao" DATE DEFAULT CURRENT_DATE,
        "MaCanBo" INT,
        FOREIGN KEY ("MaCanBo") REFERENCES "dashboard_xp"."CanBoQuocPhong"("MaCanBo")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."KhuDanCu" (
        "MaKhuDanCu" SERIAL PRIMARY KEY,
        "TenKhuDanCu" VARCHAR(150) NOT NULL,
        "DiaChi" VARCHAR(255),
        "SoHoDan" INT DEFAULT 0,
        "SoDanSo" INT DEFAULT 0,
        "NgayTao" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."TinhHinhANTT" (
        "MaANTT" SERIAL PRIMARY KEY,
        "MaKhuDanCu" INT NOT NULL,
        "MoTa" TEXT,
        "MucDoNguyCo" VARCHAR(20),
        "ThoiGianBaoCao" DATE DEFAULT CURRENT_DATE,
        "SoSuKien" INT DEFAULT 0,
        "SoNguoiBiHai" INT DEFAULT 0,
        FOREIGN KEY ("MaKhuDanCu") REFERENCES "dashboard_xp"."KhuDanCu"("MaKhuDanCu")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."PhoiHopLucLuong" (
        "MaPhoiHop" SERIAL PRIMARY KEY,
        "DonViPhoiHop" VARCHAR(150) NOT NULL,
        "NoiDungPhoiHop" TEXT,
        "ThoiGian" DATE DEFAULT CURRENT_DATE,
        "KetQua" TEXT,
        "NgayTao" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."ViPhamHanhChinh" (
        "MaViPham" SERIAL PRIMARY KEY,
        "HoTenNguoiViPham" VARCHAR(150) NOT NULL,
        "HanhViViPham" TEXT NOT NULL,
        "HinhThucXuLy" VARCHAR(100),
        "TrangThaiXuLy" VARCHAR(50) DEFAULT 'Chờ xử lý',
        "NgayViPham" DATE DEFAULT CURRENT_DATE,
        "MucPhat" DECIMAL(18,0) DEFAULT 0,
        "MaCanBo" INT,
        "GhiChu" TEXT,
        FOREIGN KEY ("MaCanBo") REFERENCES "dashboard_xp"."CanBoQuocPhong"("MaCanBo")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."PhanAnhNguoiDan" (
        "MaPhanAnh" SERIAL PRIMARY KEY,
        "HoTenNguoiGui" VARCHAR(150) NOT NULL,
        "SoDienThoai" VARCHAR(20),
        "DiaChi" VARCHAR(255),
        "NoiDungPhanAnh" TEXT NOT NULL,
        "HinhThucGui" VARCHAR(50),
        "PhanLoai" VARCHAR(100),
        "TrangThaiXuLy" VARCHAR(50) DEFAULT 'Chờ xử lý',
        "NgayGui" DATE DEFAULT CURRENT_DATE,
        "NgayPhanHoi" DATE,
        "KetQuaXuLy" TEXT,
        "MaCanBo" INT,
        "GhiChu" TEXT,
        FOREIGN KEY ("MaCanBo") REFERENCES "dashboard_xp"."CanBoQuocPhong"("MaCanBo")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."ChiTiet_AnNinhQP" (
        "MaHoSo" VARCHAR(20) PRIMARY KEY,
        "LoaiHoSo" VARCHAR(100),
        "DiaDiem" VARCHAR(255),
        "NgayDangKy" DATE,
        "ThoiHan" DATE,
        "TrangThai" VARCHAR(50) DEFAULT 'Đã duyệt',
        "GhiChu" TEXT,
        FOREIGN KEY ("MaHoSo") REFERENCES "dashboard_xp"."HoSoNghiepVu"("MaHoSo")
      )
    `);

    // ================================================================
    // MODULE 5: XÂY DỰNG - HẠ TẦNG
    // ================================================================

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."CanBoXayDung" (
        "MaCanBo" SERIAL PRIMARY KEY,
        "HoTen" VARCHAR(150) NOT NULL,
        "ChucVu" VARCHAR(50),
        "SoDienThoai" VARCHAR(15)
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."HoSoCapPhepXayDung" (
        "MaHoSo" SERIAL PRIMARY KEY,
        "TenCongTrinh" VARCHAR(200) NOT NULL,
        "DiaDiem" VARCHAR(255),
        "ChuDauTu" VARCHAR(150),
        "DienTich" DECIMAL(18,2),
        "NgayNopHoSo" DATE DEFAULT CURRENT_DATE,
        "TrangThai" VARCHAR(50) DEFAULT 'Chờ duyệt',
        "MaCanBo" INT,
        FOREIGN KEY ("MaCanBo") REFERENCES "dashboard_xp"."CanBoXayDung"("MaCanBo")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."TheoDoiTratTuXayDung" (
        "MaTheoDoi" SERIAL PRIMARY KEY,
        "MaHoSo" INT NOT NULL,
        "NgayKiemTra" DATE DEFAULT CURRENT_DATE,
        "TinhTrang" VARCHAR(50),
        "NhanXet" TEXT,
        "HinhAnh" VARCHAR(500),
        FOREIGN KEY ("MaHoSo") REFERENCES "dashboard_xp"."HoSoCapPhepXayDung"("MaHoSo")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."XayDungTraiPhep" (
        "MaViPham" SERIAL PRIMARY KEY,
        "DiaDiem" VARCHAR(255) NOT NULL,
        "ChuSoHuu" VARCHAR(150),
        "DienTich" DECIMAL(18,2),
        "NgayPhatHien" DATE DEFAULT CURRENT_DATE,
        "TrangThai" VARCHAR(50) DEFAULT 'Đã phát hiện',
        "MaCanBo" INT,
        FOREIGN KEY ("MaCanBo") REFERENCES "dashboard_xp"."CanBoXayDung"("MaCanBo")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."HaTangDoThi" (
        "MaHaTang" SERIAL PRIMARY KEY,
        "TenHaTang" VARCHAR(150) NOT NULL,
        "LoaiHaTang" VARCHAR(50),
        "TinhTrang" VARCHAR(50) DEFAULT 'Bình thường',
        "NgayCapNhat" DATE
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."BaoHongHaTang" (
        "MaBaoHong" SERIAL PRIMARY KEY,
        "MaHaTang" INT NOT NULL,
        "MoTa" TEXT,
        "NgayPhatHien" DATE DEFAULT CURRENT_DATE,
        "TrangThai" VARCHAR(50) DEFAULT 'Chờ sửa chữa',
        "ChiPhiDuKien" DECIMAL(18,0),
        FOREIGN KEY ("MaHaTang") REFERENCES "dashboard_xp"."HaTangDoThi"("MaHaTang")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."BaoCaoXayDung" (
        "MaBaoCao" SERIAL PRIMARY KEY,
        "TieuDe" VARCHAR(200) NOT NULL,
        "NoiDung" TEXT,
        "ThoiGian" DATE
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."DonViHanhChinh" (
        "MaDVHC" VARCHAR(20) PRIMARY KEY,
        "TenDVHC" VARCHAR(150) NOT NULL,
        "Cap" INT NOT NULL
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."QuanHuyen" (
        "MaQuanHuyen" SERIAL PRIMARY KEY,
        "TenQuanHuyen" VARCHAR(150) NOT NULL,
        "MaDVHC" VARCHAR(20),
        FOREIGN KEY ("MaDVHC") REFERENCES "dashboard_xp"."DonViHanhChinh"("MaDVHC")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."XaPhuong" (
        "MaXaPhuong" SERIAL PRIMARY KEY,
        "TenXaPhuong" VARCHAR(150) NOT NULL,
        "MaQuanHuyen" INT,
        "DanSo" INT DEFAULT 0,
        "DienTich" DECIMAL(18,2),
        "MaDVHC" VARCHAR(20),
        FOREIGN KEY ("MaQuanHuyen") REFERENCES "dashboard_xp"."QuanHuyen"("MaQuanHuyen"),
        FOREIGN KEY ("MaDVHC") REFERENCES "dashboard_xp"."DonViHanhChinh"("MaDVHC")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."TuyenDuong" (
        "MaTuyenDuong" SERIAL PRIMARY KEY,
        "TenTuyenDuong" VARCHAR(150) NOT NULL,
        "ChieuDai" DECIMAL(18,2),
        "TinhTrang" VARCHAR(50) DEFAULT 'Bình thường',
        "MaXaPhuong" INT,
        FOREIGN KEY ("MaXaPhuong") REFERENCES "dashboard_xp"."XaPhuong"("MaXaPhuong")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."LoaiCongTrinh" (
        "MaLoaiCT" SERIAL PRIMARY KEY,
        "TenLoaiCT" VARCHAR(100) NOT NULL
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."CongTrinh" (
        "MaCongTrinh" SERIAL PRIMARY KEY,
        "TenCongTrinh" VARCHAR(200) NOT NULL,
        "DiaDiem" VARCHAR(255),
        "MaLoaiCT" INT,
        "ChuDauTu" VARCHAR(150),
        "DienTich" DECIMAL(18,2),
        "TongMucDauTu" DECIMAL(18,0),
        "NgayKhoiCong" DATE,
        "NgayHoanThanh" DATE,
        "TinhTrang" VARCHAR(50) DEFAULT 'Đang thi công',
        "GhiChu" TEXT,
        "MaXaPhuong" INT,
        FOREIGN KEY ("MaLoaiCT") REFERENCES "dashboard_xp"."LoaiCongTrinh"("MaLoaiCT"),
        FOREIGN KEY ("MaXaPhuong") REFERENCES "dashboard_xp"."XaPhuong"("MaXaPhuong")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."LoaiGiayPhep" (
        "MaLoaiGP" SERIAL PRIMARY KEY,
        "TenLoaiGP" VARCHAR(100) NOT NULL
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."GiayPhep" (
        "MaGiayPhep" SERIAL PRIMARY KEY,
        "SoGiayPhep" VARCHAR(50) UNIQUE NOT NULL,
        "MaLoaiGP" INT,
        "NgayCap" DATE DEFAULT CURRENT_DATE,
        "NgayHetHan" DATE,
        "NguoiDuocCap" VARCHAR(150),
        "NoiDung" TEXT,
        "TrangThai" VARCHAR(50) DEFAULT 'Còn hiệu lực',
        "MaHoSo" VARCHAR(20),
        FOREIGN KEY ("MaLoaiGP") REFERENCES "dashboard_xp"."LoaiGiayPhep"("MaLoaiGP"),
        FOREIGN KEY ("MaHoSo") REFERENCES "dashboard_xp"."HoSoNghiepVu"("MaHoSo")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."DangKyThiCong" (
        "MaDKTC" SERIAL PRIMARY KEY,
        "MaCongTrinh" INT NOT NULL,
        "NgayDangKy" DATE DEFAULT CURRENT_DATE,
        "DonViThiCong" VARCHAR(200),
        "GiamSatThiCong" VARCHAR(200),
        "TrangThai" VARCHAR(50) DEFAULT 'Đã đăng ký',
        FOREIGN KEY ("MaCongTrinh") REFERENCES "dashboard_xp"."CongTrinh"("MaCongTrinh")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."ChiTiet_XayDung" (
        "MaHoSo" VARCHAR(20) PRIMARY KEY,
        "LoaiCongTrinh" VARCHAR(100),
        "DienTichXayDung" DECIMAL(18,2),
        "SoTang" INT,
        "ChieuCao" DECIMAL(18,2),
        "ThoiGianThiCong" INT,
        "GhiChu" TEXT,
        FOREIGN KEY ("MaHoSo") REFERENCES "dashboard_xp"."HoSoNghiepVu"("MaHoSo")
      )
    `);

    console.log('✅ All remaining tables created successfully (Part 1)');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop tables in reverse order (respecting foreign key dependencies)
    
    // Module 5
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."ChiTiet_XayDung" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."DangKyThiCong" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."GiayPhep" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."LoaiGiayPhep" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."CongTrinh" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."LoaiCongTrinh" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."TuyenDuong" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."XaPhuong" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."QuanHuyen" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."DonViHanhChinh" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."BaoCaoXayDung" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."BaoHongHaTang" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."HaTangDoThi" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."XayDungTraiPhep" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."TheoDoiTratTuXayDung" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."HoSoCapPhepXayDung" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."CanBoXayDung" CASCADE`);

    // Module 4
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."ChiTiet_AnNinhQP" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."PhanAnhNguoiDan" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."ViPhamHanhChinh" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."PhoiHopLucLuong" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."TinhHinhANTT" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."KhuDanCu" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."TamTruTamVang" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."CanBoQuocPhong" CASCADE`);

    // Module 3
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."ChiTiet_KinhTe" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."ToChuc" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."ThuPhi" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."BaoCaoKinhTe" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."CanhBaoRuiRoKinhTe" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."CanBoKinhTe" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."HoKDTrongCho" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."BienDongHoKinhDoanh" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."NoThue" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."ThueLePhi" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."HoKinhDoanh" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."LoSapCho" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."ChoDiemKinhDoanh" CASCADE`);

    // Module 2
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."ChiTiet_YTeGiaoDuc" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."GiaoDucTongHop" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."DiemDanhLop" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."LopHoc" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."BaoTriThietBi" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."ThietBiYTe" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."LuotKham" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."NhanVienYTe" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."PhieuKham" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."TiemChung_DoiTuong" CASCADE`);

    // Module 1
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."PhanTichPhanAnh" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."LichSuTraCuuAI" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."KhoTriThuc" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."DanhGiaDichVu" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."DanhGiaHoSo" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."YeuCauBoSungTaiLieu" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."ChiTiet_TuPhap" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."QuyetDinh" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "dashboard_xp"."LoaiQuyetDinh" CASCADE`);
  }
}
