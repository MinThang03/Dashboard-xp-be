import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMissingColumnsInfrastructureAndLaborForms1774600000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Loosen strict constraints to allow frontend full-form CRUD payloads.
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."TheoDoiTratTuXayDung" ALTER COLUMN "MaHoSo" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."HoNgheo" ALTER COLUMN "MaHGD" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."DoiTuongBaoTro" ALTER COLUMN "MaCongDan" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."NguoiCoCong" ALTER COLUMN "MaCongDan" DROP NOT NULL`);

    // 1) HoSoCapPhepXayDung
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."HoSoCapPhepXayDung" ADD COLUMN IF NOT EXISTS "LoaiCongTrinh" VARCHAR(100)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."HoSoCapPhepXayDung" ADD COLUMN IF NOT EXISTS "LoaiGiayPhep" VARCHAR(100)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."HoSoCapPhepXayDung" ADD COLUMN IF NOT EXISTS "CCCD" VARCHAR(30)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."HoSoCapPhepXayDung" ADD COLUMN IF NOT EXISTS "SoDienThoai" VARCHAR(20)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."HoSoCapPhepXayDung" ADD COLUMN IF NOT EXISTS "DiaChi" VARCHAR(255)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."HoSoCapPhepXayDung" ADD COLUMN IF NOT EXISTS "DiaChiCongTrinh" VARCHAR(255)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."HoSoCapPhepXayDung" ADD COLUMN IF NOT EXISTS "MaThua" VARCHAR(50)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."HoSoCapPhepXayDung" ADD COLUMN IF NOT EXISTS "SoTo" VARCHAR(50)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."HoSoCapPhepXayDung" ADD COLUMN IF NOT EXISTS "DienTichXayDung" DECIMAL(18,2)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."HoSoCapPhepXayDung" ADD COLUMN IF NOT EXISTS "DienTichSan" DECIMAL(18,2)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."HoSoCapPhepXayDung" ADD COLUMN IF NOT EXISTS "SoTang" INT`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."HoSoCapPhepXayDung" ADD COLUMN IF NOT EXISTS "ChieuCao" DECIMAL(10,2)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."HoSoCapPhepXayDung" ADD COLUMN IF NOT EXISTS "NgayNop" DATE`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."HoSoCapPhepXayDung" ADD COLUMN IF NOT EXISTS "NgayHenTra" DATE`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."HoSoCapPhepXayDung" ADD COLUMN IF NOT EXISTS "CanBoTiepNhan" VARCHAR(150)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."HoSoCapPhepXayDung" ADD COLUMN IF NOT EXISTS "CanBoThamDinh" VARCHAR(150)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."HoSoCapPhepXayDung" ADD COLUMN IF NOT EXISTS "SoGiayPhep" VARCHAR(100)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."HoSoCapPhepXayDung" ADD COLUMN IF NOT EXISTS "NgayCapPhep" DATE`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."HoSoCapPhepXayDung" ADD COLUMN IF NOT EXISTS "ThoiHanPhep" VARCHAR(100)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."HoSoCapPhepXayDung" ADD COLUMN IF NOT EXISTS "GhiChu" TEXT`);

    // 2) TheoDoiTratTuXayDung
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."TheoDoiTratTuXayDung" ADD COLUMN IF NOT EXISTS "MaKiemTra" VARCHAR(50)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."TheoDoiTratTuXayDung" ADD COLUMN IF NOT EXISTS "DiaChi" VARCHAR(255)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."TheoDoiTratTuXayDung" ADD COLUMN IF NOT EXISTS "MaThua" VARCHAR(50)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."TheoDoiTratTuXayDung" ADD COLUMN IF NOT EXISTS "SoTo" VARCHAR(50)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."TheoDoiTratTuXayDung" ADD COLUMN IF NOT EXISTS "LoaiCongTrinh" VARCHAR(100)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."TheoDoiTratTuXayDung" ADD COLUMN IF NOT EXISTS "ChuDauTu" VARCHAR(150)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."TheoDoiTratTuXayDung" ADD COLUMN IF NOT EXISTS "CCCD" VARCHAR(30)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."TheoDoiTratTuXayDung" ADD COLUMN IF NOT EXISTS "SoDienThoai" VARCHAR(20)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."TheoDoiTratTuXayDung" ADD COLUMN IF NOT EXISTS "SoGiayPhep" VARCHAR(100)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."TheoDoiTratTuXayDung" ADD COLUMN IF NOT EXISTS "NgayCapPhep" DATE`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."TheoDoiTratTuXayDung" ADD COLUMN IF NOT EXISTS "TinhTrangGiayPhep" VARCHAR(100)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."TheoDoiTratTuXayDung" ADD COLUMN IF NOT EXISTS "NoiDungKiemTra" TEXT`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."TheoDoiTratTuXayDung" ADD COLUMN IF NOT EXISTS "CanBoKiemTra" VARCHAR(150)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."TheoDoiTratTuXayDung" ADD COLUMN IF NOT EXISTS "KetQuaKiemTra" VARCHAR(100)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."TheoDoiTratTuXayDung" ADD COLUMN IF NOT EXISTS "LoaiViPham" VARCHAR(150)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."TheoDoiTratTuXayDung" ADD COLUMN IF NOT EXISTS "MucDo" VARCHAR(50)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."TheoDoiTratTuXayDung" ADD COLUMN IF NOT EXISTS "BienPhapXuLy" TEXT`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."TheoDoiTratTuXayDung" ADD COLUMN IF NOT EXISTS "ThoiHanKhacPhuc" DATE`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."TheoDoiTratTuXayDung" ADD COLUMN IF NOT EXISTS "TrangThaiXuLy" VARCHAR(100)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."TheoDoiTratTuXayDung" ADD COLUMN IF NOT EXISTS "GhiChu" TEXT`);

    // 3) HaTangDoThi
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."HaTangDoThi" ADD COLUMN IF NOT EXISTS "TenHangMuc" VARCHAR(200)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."HaTangDoThi" ADD COLUMN IF NOT EXISTS "ViTri" VARCHAR(255)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."HaTangDoThi" ADD COLUMN IF NOT EXISTS "ChieuDai" DECIMAL(18,2)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."HaTangDoThi" ADD COLUMN IF NOT EXISTS "KichThuoc" VARCHAR(100)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."HaTangDoThi" ADD COLUMN IF NOT EXISTS "NamXayDung" INT`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."HaTangDoThi" ADD COLUMN IF NOT EXISTS "LanSuaChua" DATE`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."HaTangDoThi" ADD COLUMN IF NOT EXISTS "GhiChu" TEXT`);

    // 4) XayDungTraiPhep
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."XayDungTraiPhep" ADD COLUMN IF NOT EXISTS "MaVuViec" VARCHAR(50)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."XayDungTraiPhep" ADD COLUMN IF NOT EXISTS "DiaChi" VARCHAR(255)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."XayDungTraiPhep" ADD COLUMN IF NOT EXISTS "MaThua" VARCHAR(50)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."XayDungTraiPhep" ADD COLUMN IF NOT EXISTS "SoTo" VARCHAR(50)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."XayDungTraiPhep" ADD COLUMN IF NOT EXISTS "ChuCongTrinh" VARCHAR(150)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."XayDungTraiPhep" ADD COLUMN IF NOT EXISTS "CCCD" VARCHAR(30)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."XayDungTraiPhep" ADD COLUMN IF NOT EXISTS "SoDienThoai" VARCHAR(20)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."XayDungTraiPhep" ADD COLUMN IF NOT EXISTS "LoaiViPham" VARCHAR(150)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."XayDungTraiPhep" ADD COLUMN IF NOT EXISTS "MoTaViPham" TEXT`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."XayDungTraiPhep" ADD COLUMN IF NOT EXISTS "DienTichViPham" DECIMAL(18,2)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."XayDungTraiPhep" ADD COLUMN IF NOT EXISTS "NguoiPhatHien" VARCHAR(150)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."XayDungTraiPhep" ADD COLUMN IF NOT EXISTS "BienPhapXuLy" TEXT`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."XayDungTraiPhep" ADD COLUMN IF NOT EXISTS "SoTien" DECIMAL(18,2)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."XayDungTraiPhep" ADD COLUMN IF NOT EXISTS "SoQuyetDinhXP" VARCHAR(100)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."XayDungTraiPhep" ADD COLUMN IF NOT EXISTS "NgayQD" DATE`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."XayDungTraiPhep" ADD COLUMN IF NOT EXISTS "ThoiHanThaoGo" DATE`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."XayDungTraiPhep" ADD COLUMN IF NOT EXISTS "DaCuongChe" BOOLEAN DEFAULT FALSE`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."XayDungTraiPhep" ADD COLUMN IF NOT EXISTS "NgayCuongChe" DATE`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."XayDungTraiPhep" ADD COLUMN IF NOT EXISTS "KetQuaXuLy" TEXT`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."XayDungTraiPhep" ADD COLUMN IF NOT EXISTS "GhiChu" TEXT`);

    // 5) CongTrinh (nha-o-cong-trinh)
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."CongTrinh" ADD COLUMN IF NOT EXISTS "LoaiCongTrinh" VARCHAR(100)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."CongTrinh" ADD COLUMN IF NOT EXISTS "PhanLoai" VARCHAR(100)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."CongTrinh" ADD COLUMN IF NOT EXISTS "DiaChi" VARCHAR(255)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."CongTrinh" ADD COLUMN IF NOT EXISTS "MaThua" VARCHAR(50)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."CongTrinh" ADD COLUMN IF NOT EXISTS "SoTo" VARCHAR(50)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."CongTrinh" ADD COLUMN IF NOT EXISTS "DienTichSan" DECIMAL(18,2)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."CongTrinh" ADD COLUMN IF NOT EXISTS "SoTang" INT`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."CongTrinh" ADD COLUMN IF NOT EXISTS "NamXayDung" INT`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."CongTrinh" ADD COLUMN IF NOT EXISTS "ChuSoHuu" VARCHAR(150)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."CongTrinh" ADD COLUMN IF NOT EXISTS "CCCD" VARCHAR(30)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."CongTrinh" ADD COLUMN IF NOT EXISTS "SoDienThoai" VARCHAR(20)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."CongTrinh" ADD COLUMN IF NOT EXISTS "TinhTrangKienTruc" VARCHAR(100)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."CongTrinh" ADD COLUMN IF NOT EXISTS "TinhTrangPhapLy" VARCHAR(100)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."CongTrinh" ADD COLUMN IF NOT EXISTS "SoGiayPhepXD" VARCHAR(100)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."CongTrinh" ADD COLUMN IF NOT EXISTS "NgayKiemTra" DATE`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."CongTrinh" ADD COLUMN IF NOT EXISTS "NguoiKiemTra" VARCHAR(150)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."CongTrinh" ADD COLUMN IF NOT EXISTS "KetQuaKiemTra" VARCHAR(100)`);

    // 6) HoNgheo
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."HoNgheo" ADD COLUMN IF NOT EXISTS "SoHoKhau" VARCHAR(50)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."HoNgheo" ADD COLUMN IF NOT EXISTS "ChuHo" VARCHAR(150)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."HoNgheo" ADD COLUMN IF NOT EXISTS "CCCD" VARCHAR(30)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."HoNgheo" ADD COLUMN IF NOT EXISTS "NgaySinh" DATE`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."HoNgheo" ADD COLUMN IF NOT EXISTS "GioiTinh" VARCHAR(10)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."HoNgheo" ADD COLUMN IF NOT EXISTS "DiaChi" VARCHAR(255)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."HoNgheo" ADD COLUMN IF NOT EXISTS "SoThanhVien" INT`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."HoNgheo" ADD COLUMN IF NOT EXISTS "MucDoNgheo" VARCHAR(50)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."HoNgheo" ADD COLUMN IF NOT EXISTS "NamDanhGia" INT`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."HoNgheo" ADD COLUMN IF NOT EXISTS "LyDoNgheo" TEXT`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."HoNgheo" ADD COLUMN IF NOT EXISTS "DangHuongChinhSach" BOOLEAN DEFAULT FALSE`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."HoNgheo" ADD COLUMN IF NOT EXISTS "ChinhSachHuong" TEXT`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."HoNgheo" ADD COLUMN IF NOT EXISTS "GhiChu" TEXT`);

    // 7) DoiTuongBaoTro
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."DoiTuongBaoTro" ADD COLUMN IF NOT EXISTS "CCCD" VARCHAR(30)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."DoiTuongBaoTro" ADD COLUMN IF NOT EXISTS "HoTen" VARCHAR(150)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."DoiTuongBaoTro" ADD COLUMN IF NOT EXISTS "NgaySinh" DATE`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."DoiTuongBaoTro" ADD COLUMN IF NOT EXISTS "GioiTinh" VARCHAR(10)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."DoiTuongBaoTro" ADD COLUMN IF NOT EXISTS "DiaChi" VARCHAR(255)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."DoiTuongBaoTro" ADD COLUMN IF NOT EXISTS "MucTroCap" DECIMAL(18,0)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."DoiTuongBaoTro" ADD COLUMN IF NOT EXISTS "NgayBatDau" DATE`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."DoiTuongBaoTro" ADD COLUMN IF NOT EXISTS "TinhTrang" VARCHAR(50)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."DoiTuongBaoTro" ADD COLUMN IF NOT EXISTS "NguoiGiamHo" VARCHAR(150)`);

    // 8) NguoiCoCong
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."NguoiCoCong" ADD COLUMN IF NOT EXISTS "CCCD" VARCHAR(30)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."NguoiCoCong" ADD COLUMN IF NOT EXISTS "HoTen" VARCHAR(150)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."NguoiCoCong" ADD COLUMN IF NOT EXISTS "NgaySinh" DATE`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."NguoiCoCong" ADD COLUMN IF NOT EXISTS "GioiTinh" VARCHAR(10)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."NguoiCoCong" ADD COLUMN IF NOT EXISTS "DiaChi" VARCHAR(255)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."NguoiCoCong" ADD COLUMN IF NOT EXISTS "LoaiDoiTuong" VARCHAR(100)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."NguoiCoCong" ADD COLUMN IF NOT EXISTS "HangThuongBinh" VARCHAR(50)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."NguoiCoCong" ADD COLUMN IF NOT EXISTS "TyLeMatSucLaoDong" DECIMAL(5,2)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."NguoiCoCong" ADD COLUMN IF NOT EXISTS "DanhHieu" VARCHAR(100)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."NguoiCoCong" ADD COLUMN IF NOT EXISTS "MucHuongHangThang" DECIMAL(18,0)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."NguoiCoCong" ADD COLUMN IF NOT EXISTS "NgayHuong" DATE`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."NguoiCoCong" ADD COLUMN IF NOT EXISTS "TinhTrang" VARCHAR(50)`);

    // 9) ViecLam
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."ViecLam" ADD COLUMN IF NOT EXISTS "HoTen" VARCHAR(150)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."ViecLam" ADD COLUMN IF NOT EXISTS "NgaySinh" DATE`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."ViecLam" ADD COLUMN IF NOT EXISTS "GioiTinh" VARCHAR(10)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."ViecLam" ADD COLUMN IF NOT EXISTS "CCCD" VARCHAR(30)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."ViecLam" ADD COLUMN IF NOT EXISTS "NgheNghiep" VARCHAR(100)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."ViecLam" ADD COLUMN IF NOT EXISTS "TrinhDo" VARCHAR(100)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."ViecLam" ADD COLUMN IF NOT EXISTS "KinhNghiem" TEXT`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."ViecLam" ADD COLUMN IF NOT EXISTS "NgheNghiepMongMuon" VARCHAR(100)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."ViecLam" ADD COLUMN IF NOT EXISTS "MucLuongMongMuon" DECIMAL(18,0)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."ViecLam" ADD COLUMN IF NOT EXISTS "LyDoThatNghiep" TEXT`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."ViecLam" ADD COLUMN IF NOT EXISTS "DangKyBHTN" BOOLEAN DEFAULT FALSE`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."ViecLam" ADD COLUMN IF NOT EXISTS "SoThangHuongBHTN" INT`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."ViecLam" ADD COLUMN IF NOT EXISTS "MucHuongBHTN" DECIMAL(18,0)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Keep down migration conservative due to live-data risk on newly added columns.
    // Only restore strict constraints that were relaxed.
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."TheoDoiTratTuXayDung" ALTER COLUMN "MaHoSo" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."HoNgheo" ALTER COLUMN "MaHGD" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."DoiTuongBaoTro" ALTER COLUMN "MaCongDan" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."NguoiCoCong" ALTER COLUMN "MaCongDan" SET NOT NULL`);
  }
}
