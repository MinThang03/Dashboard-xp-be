import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFinanceAndLandFormColumns1774800000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // NganSach - support Thu/Chi/GiaiNgan/BaoCaoTaiChinh forms
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."NganSach" ADD COLUMN IF NOT EXISTS "LoaiBanGhi" VARCHAR(50)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."NganSach" ADD COLUMN IF NOT EXISTS "MaHoSo" VARCHAR(50)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."NganSach" ADD COLUMN IF NOT EXISTS "TenNghiepVu" VARCHAR(255)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."NganSach" ADD COLUMN IF NOT EXISTS "MoTa" TEXT`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."NganSach" ADD COLUMN IF NOT EXISTS "GhiChu" TEXT`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."NganSach" ADD COLUMN IF NOT EXISTS "NgayCapNhat" DATE`);

    await queryRunner.query(`ALTER TABLE "dashboard_xp"."NganSach" ADD COLUMN IF NOT EXISTS "MaThu" VARCHAR(50)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."NganSach" ADD COLUMN IF NOT EXISTS "LoaiThu" VARCHAR(120)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."NganSach" ADD COLUMN IF NOT EXISTS "NguonThu" VARCHAR(255)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."NganSach" ADD COLUMN IF NOT EXISTS "SoTien" DECIMAL(18,2)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."NganSach" ADD COLUMN IF NOT EXISTS "SoTienKeHoach" DECIMAL(18,2)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."NganSach" ADD COLUMN IF NOT EXISTS "NguoiNop" VARCHAR(150)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."NganSach" ADD COLUMN IF NOT EXISTS "DiaChi" VARCHAR(255)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."NganSach" ADD COLUMN IF NOT EXISTS "NgayThu" DATE`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."NganSach" ADD COLUMN IF NOT EXISTS "NguoiThu" VARCHAR(150)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."NganSach" ADD COLUMN IF NOT EXISTS "PhuongThuc" VARCHAR(80)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."NganSach" ADD COLUMN IF NOT EXISTS "SoBienLai" VARCHAR(100)`);

    await queryRunner.query(`ALTER TABLE "dashboard_xp"."NganSach" ADD COLUMN IF NOT EXISTS "MaChi" VARCHAR(50)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."NganSach" ADD COLUMN IF NOT EXISTS "LoaiChi" VARCHAR(120)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."NganSach" ADD COLUMN IF NOT EXISTS "HangMucChi" VARCHAR(255)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."NganSach" ADD COLUMN IF NOT EXISTS "DuToan" DECIMAL(18,2)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."NganSach" ADD COLUMN IF NOT EXISTS "NguoiNhan" VARCHAR(150)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."NganSach" ADD COLUMN IF NOT EXISTS "DonViNhan" VARCHAR(150)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."NganSach" ADD COLUMN IF NOT EXISTS "NgayChi" DATE`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."NganSach" ADD COLUMN IF NOT EXISTS "NguoiDuyetText" VARCHAR(150)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."NganSach" ADD COLUMN IF NOT EXISTS "SoChungTu" VARCHAR(100)`);

    await queryRunner.query(`ALTER TABLE "dashboard_xp"."NganSach" ADD COLUMN IF NOT EXISTS "MaDuAn" VARCHAR(50)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."NganSach" ADD COLUMN IF NOT EXISTS "TenDuAn" VARCHAR(255)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."NganSach" ADD COLUMN IF NOT EXISTS "LoaiDuAn" VARCHAR(120)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."NganSach" ADD COLUMN IF NOT EXISTS "DonViThucHien" VARCHAR(150)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."NganSach" ADD COLUMN IF NOT EXISTS "TongKeHoach" DECIMAL(18,2)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."NganSach" ADD COLUMN IF NOT EXISTS "TienDo" INT`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."NganSach" ADD COLUMN IF NOT EXISTS "NgayBatDau" DATE`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."NganSach" ADD COLUMN IF NOT EXISTS "NgayKetThuc" DATE`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."NganSach" ADD COLUMN IF NOT EXISTS "SoDotGiaiNgan" INT`);

    await queryRunner.query(`ALTER TABLE "dashboard_xp"."NganSach" ADD COLUMN IF NOT EXISTS "TenBaoCao" VARCHAR(255)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."NganSach" ADD COLUMN IF NOT EXISTS "LoaiBaoCao" VARCHAR(120)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."NganSach" ADD COLUMN IF NOT EXISTS "KyBaoCao" VARCHAR(120)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."NganSach" ADD COLUMN IF NOT EXISTS "NgayLap" DATE`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."NganSach" ADD COLUMN IF NOT EXISTS "NguoiLap" VARCHAR(150)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."NganSach" ADD COLUMN IF NOT EXISTS "TongThu" DECIMAL(18,2)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."NganSach" ADD COLUMN IF NOT EXISTS "TongChi" DECIMAL(18,2)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."NganSach" ADD COLUMN IF NOT EXISTS "TonQuy" DECIMAL(18,2)`);

    // ThuaDat - support DiaChinh/CapSoDo/TraCuuDat forms
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."ThuaDat" ADD COLUMN IF NOT EXISTS "LoaiBanGhi" VARCHAR(50)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."ThuaDat" ADD COLUMN IF NOT EXISTS "MaHoSo" VARCHAR(50)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."ThuaDat" ADD COLUMN IF NOT EXISTS "SoTo" VARCHAR(50)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."ThuaDat" ADD COLUMN IF NOT EXISTS "LoaiDat" VARCHAR(120)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."ThuaDat" ADD COLUMN IF NOT EXISTS "MucDichSuDung" TEXT`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."ThuaDat" ADD COLUMN IF NOT EXISTS "CCCD" VARCHAR(30)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."ThuaDat" ADD COLUMN IF NOT EXISTS "DiaChiThuaDat" VARCHAR(255)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."ThuaDat" ADD COLUMN IF NOT EXISTS "ToaDoX" DECIMAL(11,6)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."ThuaDat" ADD COLUMN IF NOT EXISTS "ToaDoY" DECIMAL(11,6)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."ThuaDat" ADD COLUMN IF NOT EXISTS "NguonGocSuDung" TEXT`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."ThuaDat" ADD COLUMN IF NOT EXISTS "ThoiHanSuDung" VARCHAR(120)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."ThuaDat" ADD COLUMN IF NOT EXISTS "SoSoDo" VARCHAR(100)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."ThuaDat" ADD COLUMN IF NOT EXISTS "NgayCapSoDo" DATE`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."ThuaDat" ADD COLUMN IF NOT EXISTS "NgayNhapLieu" DATE`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."ThuaDat" ADD COLUMN IF NOT EXISTS "CanBoNhapLieu" VARCHAR(150)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."ThuaDat" ADD COLUMN IF NOT EXISTS "SoDienThoai" VARCHAR(20)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."ThuaDat" ADD COLUMN IF NOT EXISTS "NgayNop" DATE`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."ThuaDat" ADD COLUMN IF NOT EXISTS "NgayHenTra" DATE`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."ThuaDat" ADD COLUMN IF NOT EXISTS "GiaiDoan" VARCHAR(120)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."ThuaDat" ADD COLUMN IF NOT EXISTS "CanBoTiepNhan" VARCHAR(150)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."ThuaDat" ADD COLUMN IF NOT EXISTS "CanBoThamDinh" VARCHAR(150)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."ThuaDat" ADD COLUMN IF NOT EXISTS "NgayCap" DATE`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."ThuaDat" ADD COLUMN IF NOT EXISTS "TienDo" INT`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."ThuaDat" ADD COLUMN IF NOT EXISTS "TrangThaiPhapLy" VARCHAR(120)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."ThuaDat" ADD COLUMN IF NOT EXISTS "LoThoBan" VARCHAR(120)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."ThuaDat" ADD COLUMN IF NOT EXISTS "HanCheSuDung" TEXT`);

    // BienDongDat - support BienDongDat/ThamDinhThucDia/TranhChap forms
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."BienDongDat" ADD COLUMN IF NOT EXISTS "LoaiBanGhi" VARCHAR(50)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."BienDongDat" ADD COLUMN IF NOT EXISTS "MaBienDongText" VARCHAR(50)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."BienDongDat" ADD COLUMN IF NOT EXISTS "SoTo" VARCHAR(50)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."BienDongDat" ADD COLUMN IF NOT EXISTS "LoaiDatCu" VARCHAR(120)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."BienDongDat" ADD COLUMN IF NOT EXISTS "LoaiDatMoi" VARCHAR(120)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."BienDongDat" ADD COLUMN IF NOT EXISTS "ChuSoHuuCu" VARCHAR(150)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."BienDongDat" ADD COLUMN IF NOT EXISTS "ChuSoHuuMoi" VARCHAR(150)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."BienDongDat" ADD COLUMN IF NOT EXISTS "CCCDCu" VARCHAR(30)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."BienDongDat" ADD COLUMN IF NOT EXISTS "CCCDMoi" VARCHAR(30)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."BienDongDat" ADD COLUMN IF NOT EXISTS "CanBoXuLy" VARCHAR(150)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."BienDongDat" ADD COLUMN IF NOT EXISTS "NgayDeNghi" DATE`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."BienDongDat" ADD COLUMN IF NOT EXISTS "NgayDuyet" DATE`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."BienDongDat" ADD COLUMN IF NOT EXISTS "TrangThai" VARCHAR(120)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."BienDongDat" ADD COLUMN IF NOT EXISTS "GhiChu" TEXT`);

    await queryRunner.query(`ALTER TABLE "dashboard_xp"."BienDongDat" ADD COLUMN IF NOT EXISTS "MaHoSo" VARCHAR(50)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."BienDongDat" ADD COLUMN IF NOT EXISTS "LoaiThamDinh" VARCHAR(120)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."BienDongDat" ADD COLUMN IF NOT EXISTS "NgayThamDinh" DATE`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."BienDongDat" ADD COLUMN IF NOT EXISTS "CanBoThamDinh" VARCHAR(150)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."BienDongDat" ADD COLUMN IF NOT EXISTS "DonViThamDinh" VARCHAR(150)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."BienDongDat" ADD COLUMN IF NOT EXISTS "DienTichHoSo" DECIMAL(18,2)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."BienDongDat" ADD COLUMN IF NOT EXISTS "DienTichThucTe" DECIMAL(18,2)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."BienDongDat" ADD COLUMN IF NOT EXISTS "KetQuaThamDinh" VARCHAR(120)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."BienDongDat" ADD COLUMN IF NOT EXISTS "MoTaSaiLech" TEXT`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."BienDongDat" ADD COLUMN IF NOT EXISTS "HinhAnhChungCu" INT`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."BienDongDat" ADD COLUMN IF NOT EXISTS "DeXuatXuLy" TEXT`);

    await queryRunner.query(`ALTER TABLE "dashboard_xp"."BienDongDat" ADD COLUMN IF NOT EXISTS "MaVu" VARCHAR(50)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."BienDongDat" ADD COLUMN IF NOT EXISTS "LoaiTranhChap" VARCHAR(150)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."BienDongDat" ADD COLUMN IF NOT EXISTS "DiaChiThuaDat" VARCHAR(255)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."BienDongDat" ADD COLUMN IF NOT EXISTS "DienTichTranhChap" DECIMAL(18,2)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."BienDongDat" ADD COLUMN IF NOT EXISTS "BenKhieuNai" VARCHAR(150)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."BienDongDat" ADD COLUMN IF NOT EXISTS "CCCDKhieuNai" VARCHAR(30)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."BienDongDat" ADD COLUMN IF NOT EXISTS "SDTKhieuNai" VARCHAR(20)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."BienDongDat" ADD COLUMN IF NOT EXISTS "BenBiKhieuNai" VARCHAR(150)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."BienDongDat" ADD COLUMN IF NOT EXISTS "CCCDBiKhieuNai" VARCHAR(30)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."BienDongDat" ADD COLUMN IF NOT EXISTS "NgayKhieuNai" DATE`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."BienDongDat" ADD COLUMN IF NOT EXISTS "NoiDung" TEXT`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."BienDongDat" ADD COLUMN IF NOT EXISTS "MucDo" VARCHAR(80)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."BienDongDat" ADD COLUMN IF NOT EXISTS "CanBoThuLy" VARCHAR(150)`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."BienDongDat" ADD COLUMN IF NOT EXISTS "PhuongAnGiaiQuyet" TEXT`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."BienDongDat" ADD COLUMN IF NOT EXISTS "NgayGiaiQuyet" DATE`);
    await queryRunner.query(`ALTER TABLE "dashboard_xp"."BienDongDat" ADD COLUMN IF NOT EXISTS "KetQuaGiaiQuyet" TEXT`);
  }

  public async down(): Promise<void> {
    // Intentionally left empty to avoid accidental data loss in existing environments.
  }
}