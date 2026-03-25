import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddKinhTeAnNinhColumnsAndTables1738500950000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE SCHEMA IF NOT EXISTS "dashboard_xp"');

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."HoKinhDoanh" (
        "MaHoKD" SERIAL PRIMARY KEY,
        "SoGCN" VARCHAR(50),
        "TenHoKD" VARCHAR(200) NOT NULL,
        "ChuHo" VARCHAR(150),
        "CCCD" VARCHAR(20),
        "NgaySinh" DATE,
        "DiaChi" VARCHAR(255),
        "DiaChiKinhDoanh" VARCHAR(255),
        "DienThoai" VARCHAR(20),
        "Email" VARCHAR(100),
        "NganhNghe" VARCHAR(150),
        "MaNganhNghe" VARCHAR(20),
        "VonKinhDoanh" DECIMAL(18,2),
        "DoanhThuNam" DECIMAL(18,2),
        "SoLaoDong" INT,
        "NgayDangKy" DATE,
        "NgayHetHan" DATE,
        "TrangThai" VARCHAR(50) DEFAULT 'Hoạt động',
        "LanCapPhep" INT,
        "DienTichKD" DECIMAL(10,2),
        "LoaiHinhKD" VARCHAR(100),
        "GhiChu" TEXT
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."ChoDiemKinhDoanh" (
        "MaCho" SERIAL PRIMARY KEY,
        "MaDiemKD" VARCHAR(50),
        "TenDiemKD" VARCHAR(200) NOT NULL,
        "LoaiHinh" VARCHAR(100),
        "DiaChi" VARCHAR(255),
        "DienTich" DECIMAL(12,2),
        "SoGianHang" INT,
        "SoGianDangKinhDoanh" INT,
        "SoGianTrong" INT,
        "DoanhThuThang" DECIMAL(18,2),
        "ThuPhiThang" DECIMAL(18,2),
        "BanQuanLy" VARCHAR(150),
        "SoDienThoai" VARCHAR(20),
        "NgayThanhLap" DATE,
        "TrangThai" VARCHAR(50) DEFAULT 'Hoạt động',
        "GiayPhep" VARCHAR(100),
        "NgayCapPhep" DATE,
        "NgayHetHan" DATE,
        "CoSoHaTang" VARCHAR(100),
        "AnNinhTratTu" VARCHAR(100),
        "VeSinhMoiTruong" VARCHAR(100),
        "GhiChu" TEXT
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."ThuPhiLePhi" (
        "MaThuPhi" SERIAL PRIMARY KEY,
        "MaPhieuThu" VARCHAR(50),
        "LoaiPhi" VARCHAR(150) NOT NULL,
        "MoTa" TEXT,
        "DonGia" DECIMAL(18,2),
        "SoLuong" INT,
        "ThanhTien" DECIMAL(18,2),
        "TenNguoiNop" VARCHAR(150),
        "CCCDNguoiNop" VARCHAR(20),
        "DiaChiNguoiNop" VARCHAR(255),
        "NgayThu" DATE,
        "NguoiThu" VARCHAR(150),
        "TrangThai" VARCHAR(50) DEFAULT 'Đã thu',
        "GhiChu" TEXT
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."HoTroDoanhNghiep" (
        "MaHoTro" SERIAL PRIMARY KEY,
        "MaYC" VARCHAR(50),
        "TenDoanhNghiep" VARCHAR(200) NOT NULL,
        "LoaiDoanhNghiep" VARCHAR(100),
        "LinhVuc" VARCHAR(120),
        "NguoiDaiDien" VARCHAR(150),
        "DienThoai" VARCHAR(20),
        "Email" VARCHAR(100),
        "DiaChi" VARCHAR(255),
        "LoaiHoTro" VARCHAR(120),
        "NoiDungYeuCau" TEXT,
        "NgayTiepNhan" DATE,
        "NgayHenTra" DATE,
        "NgayHoanThanh" DATE,
        "CanBoXuLy" VARCHAR(150),
        "TrangThai" VARCHAR(50) DEFAULT 'Chờ xử lý',
        "KetQuaXuLy" TEXT,
        "GiaTriHoTro" DECIMAL(18,2),
        "DanhGia" INT,
        "GhiChu" TEXT
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."ThongKeKinhTe" (
        "MaBaoCao" SERIAL PRIMARY KEY,
        "MaBC" VARCHAR(50),
        "KyBaoCao" VARCHAR(100),
        "LoaiKy" VARCHAR(30),
        "NgayBaoCao" DATE,
        "NguoiLap" VARCHAR(150),
        "TongHoKinhDoanh" INT,
        "TongDoanhThu" DECIMAL(18,2),
        "TongThuNganSach" DECIMAL(18,2),
        "TangTruong" DECIMAL(8,2),
        "SoLuongLaoDong" INT,
        "SoHoMoi" INT,
        "SoHoNgung" INT,
        "TrangThai" VARCHAR(50) DEFAULT 'Chờ duyệt'
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."PhanAnh" (
        "MaPhanAnh" SERIAL PRIMARY KEY,
        "TieuDe" VARCHAR(255) NOT NULL,
        "NoiDung" TEXT NOT NULL,
        "TenNguoiPhanAnh" VARCHAR(150),
        "SoDienThoai" VARCHAR(20),
        "DiaChi" VARCHAR(255),
        "TenLinhVuc" VARCHAR(120),
        "ToaDo" VARCHAR(120),
        "MucDoUuTien" VARCHAR(30) DEFAULT 'Thường',
        "TrangThai" VARCHAR(50) DEFAULT 'Mới',
        "TenCanBoXuLy" VARCHAR(150),
        "NgayTao" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "KetQuaXuLy" TEXT,
        "DiemDanhGia" INT
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "dashboard_xp"."AnNinhTratTu" (
        "MaSuKien" SERIAL PRIMARY KEY,
        "MaSK" VARCHAR(50),
        "NoiDung" TEXT NOT NULL,
        "KhuVuc" VARCHAR(150),
        "MucDo" VARCHAR(30),
        "LoaiViPham" VARCHAR(120),
        "NgayPhatSinh" DATE,
        "TrangThai" VARCHAR(50) DEFAULT 'Đang xử lý',
        "CanBo" VARCHAR(150)
      )
    `);

    await queryRunner.query('ALTER TABLE "dashboard_xp"."TamTruTamVang" ADD COLUMN IF NOT EXISTS "MaDangKy" VARCHAR(50)');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."TamTruTamVang" ADD COLUMN IF NOT EXISTS "HoTen" VARCHAR(150)');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."TamTruTamVang" ADD COLUMN IF NOT EXISTS "NgaySinh" DATE');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."TamTruTamVang" ADD COLUMN IF NOT EXISTS "GioiTinh" VARCHAR(10)');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."TamTruTamVang" ADD COLUMN IF NOT EXISTS "QueQuan" VARCHAR(150)');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."TamTruTamVang" ADD COLUMN IF NOT EXISTS "ChuHo" VARCHAR(150)');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."TamTruTamVang" ADD COLUMN IF NOT EXISTS "QuanHeVoiChuHo" VARCHAR(80)');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."TamTruTamVang" ADD COLUMN IF NOT EXISTS "SoDienThoai" VARCHAR(20)');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."TamTruTamVang" ADD COLUMN IF NOT EXISTS "NgayDangKy" DATE');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."TamTruTamVang" ADD COLUMN IF NOT EXISTS "NgayHetHan" DATE');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."TamTruTamVang" ADD COLUMN IF NOT EXISTS "LyDo" TEXT');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."TamTruTamVang" ADD COLUMN IF NOT EXISTS "TrangThai" VARCHAR(50)');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."TamTruTamVang" ADD COLUMN IF NOT EXISTS "CanBoXuLy" VARCHAR(100)');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."TamTruTamVang" ADD COLUMN IF NOT EXISTS "GhiChu" TEXT');

    await queryRunner.query('ALTER TABLE "dashboard_xp"."ViPham" ADD COLUMN IF NOT EXISTS "SoBienBan" VARCHAR(50)');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."ViPham" ADD COLUMN IF NOT EXISTS "NgayLap" DATE');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."ViPham" ADD COLUMN IF NOT EXISTS "DoiTuong" VARCHAR(150)');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."ViPham" ADD COLUMN IF NOT EXISTS "NoiDungViPham" TEXT');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."ViPham" ADD COLUMN IF NOT EXISTS "DiaChiViPham" VARCHAR(255)');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."ViPham" ADD COLUMN IF NOT EXISTS "CanCuPhapLy" VARCHAR(255)');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."ViPham" ADD COLUMN IF NOT EXISTS "BieuMauXuLy" VARCHAR(255)');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."ViPham" ADD COLUMN IF NOT EXISTS "ThoiHanKhacPhuc" DATE');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."ViPham" ADD COLUMN IF NOT EXISTS "CanBoLap" VARCHAR(150)');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."ViPham" ADD COLUMN IF NOT EXISTS "NguoiKy" VARCHAR(150)');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."ViPham" ADD COLUMN IF NOT EXISTS "NgayXuLy" DATE');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."ViPham" ADD COLUMN IF NOT EXISTS "DaNopPhat" BOOLEAN');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."ViPham" ADD COLUMN IF NOT EXISTS "NgayNopPhat" DATE');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."ViPham" ADD COLUMN IF NOT EXISTS "TaiPham" BOOLEAN');

    await queryRunner.query('ALTER TABLE "dashboard_xp"."DiemNongAnNinh" ADD COLUMN IF NOT EXISTS "MaDN" VARCHAR(50)');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."DiemNongAnNinh" ADD COLUMN IF NOT EXISTS "TenDiaDiem" VARCHAR(200)');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."DiemNongAnNinh" ADD COLUMN IF NOT EXISTS "ToaDoLat" DECIMAL(10,6)');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."DiemNongAnNinh" ADD COLUMN IF NOT EXISTS "ToaDoLng" DECIMAL(10,6)');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."DiemNongAnNinh" ADD COLUMN IF NOT EXISTS "LoaiDiaDiem" VARCHAR(120)');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."DiemNongAnNinh" ADD COLUMN IF NOT EXISTS "LoaiViPham" VARCHAR(120)');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."DiemNongAnNinh" ADD COLUMN IF NOT EXISTS "MucDo" VARCHAR(30)');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."DiemNongAnNinh" ADD COLUMN IF NOT EXISTS "SoDoiTuong" INT');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."DiemNongAnNinh" ADD COLUMN IF NOT EXISTS "NgayCapNhat" DATE');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."DiemNongAnNinh" ADD COLUMN IF NOT EXISTS "CanBoTheoDoi" VARCHAR(150)');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."DiemNongAnNinh" ADD COLUMN IF NOT EXISTS "SoDienThoai" VARCHAR(20)');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."DiemNongAnNinh" ADD COLUMN IF NOT EXISTS "MoTa" TEXT');
    await queryRunner.query('ALTER TABLE "dashboard_xp"."DiemNongAnNinh" ADD COLUMN IF NOT EXISTS "TrangThai" VARCHAR(50)');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS "dashboard_xp"."AnNinhTratTu"');
    await queryRunner.query('DROP TABLE IF EXISTS "dashboard_xp"."PhanAnh"');
    await queryRunner.query('DROP TABLE IF EXISTS "dashboard_xp"."ThongKeKinhTe"');
    await queryRunner.query('DROP TABLE IF EXISTS "dashboard_xp"."HoTroDoanhNghiep"');
    await queryRunner.query('DROP TABLE IF EXISTS "dashboard_xp"."ThuPhiLePhi"');
    await queryRunner.query('DROP TABLE IF EXISTS "dashboard_xp"."ChoDiemKinhDoanh"');
    await queryRunner.query('DROP TABLE IF EXISTS "dashboard_xp"."HoKinhDoanh"');
  }
}
