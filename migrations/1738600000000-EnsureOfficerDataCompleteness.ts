import { MigrationInterface, QueryRunner } from 'typeorm';

export class EnsureOfficerDataCompleteness1738600000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS "dashboard_xp"`);

    const additions: Record<string, string[]> = {
      ChungThuc: [
        '"CCCD" VARCHAR(20)',
        '"PhiDichVu" DECIMAL(18,2) DEFAULT 0',
        '"NgayHoanThanh" DATE',
      ],
      HoSoTTHC: [
        '"Email" VARCHAR(100)',
        '"KetQua" TEXT',
        '"PhiDichVu" DECIMAL(18,2) DEFAULT 0',
      ],
      VanBan: [
        '"TrichYeu" VARCHAR(500)',
        '"LoaiVanBan" VARCHAR(50)',
        '"LoaiVB" VARCHAR(100)',
        '"CoQuanBanHanh" VARCHAR(200)',
        '"NgayBanHanh" DATE',
        '"NgayDen" DATE',
        '"FileDinhKem" VARCHAR(500)',
      ],
      BaoCao: [
        '"LoaiBaoCao" VARCHAR(100)',
        '"ThangNam" VARCHAR(7)',
        '"FileDinhKem" VARCHAR(500)',
      ],
      LichSuXuLyHoSo: [
        '"TrangThaiCu" VARCHAR(20)',
        '"TrangThaiMoi" VARCHAR(20)',
        '"GhiChu" TEXT',
        '"IPTruyCap" VARCHAR(50)',
      ],
      TramYTe: [
        '"SoNhanVien" INT DEFAULT 0',
        '"SoLuotKhamThang" INT DEFAULT 0',
      ],
      DichBenh: [
        '"KhuVuc" VARCHAR(150)',
        '"SoCaNhiem" INT DEFAULT 0',
        '"SoCaKhoi" INT DEFAULT 0',
      ],
      TiemChung_DoiTuong: [
        '"LieuThu" INT',
        '"PhanUng" TEXT',
      ],
      PhieuKham: [
        '"TrieuChung" TEXT',
        '"ChanDoan" TEXT',
        '"DonThuoc" TEXT',
        '"ChiPhi" DECIMAL(18,2) DEFAULT 0',
      ],
      HoSoCapGCN: [
        '"SoGCN" VARCHAR(50)',
        '"NgayCap" DATE',
        '"MaBienBanThamDinh" INT',
      ],
      BienBanThamDinhDatDai: [
        '"KetLuan" TEXT',
        '"TaiLieuDinhKem" VARCHAR(500)',
        '"NgayThamDinh" DATE',
      ],
      HoSoTranhChapDatDai: [
        '"BenA" VARCHAR(150)',
        '"BenB" VARCHAR(150)',
        '"DienTichTranh" DECIMAL(18,2)',
        '"KetQuaGiaiQuyet" TEXT',
        '"SoQuyetDinh" VARCHAR(50)',
        '"TaiLieuLienQuan" VARCHAR(500)',
      ],
      LichSuBienDongDatDai: ['"TaiLieuDinhKem" VARCHAR(500)'],
      ViPhamHanhChinh: [
        '"MucPhat" DECIMAL(18,2)',
        '"SoBienBan" VARCHAR(50)',
        '"SoQuyetDinh" VARCHAR(50)',
      ],
      PhanAnhNguoiDan: [
        '"KetQuaPhanHoi" TEXT',
        '"TaiLieuMinhChung" VARCHAR(500)',
      ],
      TheoDoiTratTuXayDung: [
        '"NgayKiemTra" DATE',
        '"NhatKyKiemTra" TEXT',
      ],
      HaTangDoThi: [
        '"NgayBaoTriGanNhat" DATE',
        '"TinhTrangVanHanh" VARCHAR(100)',
      ],
      XayDungTraiPhep: [
        '"MocXuLy" TIMESTAMP',
        '"SoQuyetDinhXuLy" VARCHAR(50)',
        '"BienPhapXuLy" TEXT',
      ],
      HoNgheo: [
        '"KyRaSoat" VARCHAR(20)',
        '"LichSuChuyenNhom" TEXT',
      ],
      DoiTuongBaoTro: [
        '"KyChiTra" VARCHAR(20)',
        '"QuaTrinhHuongTroCap" TEXT',
      ],
      NguoiCoCong: [
        '"HoSoMinhChung" VARCHAR(500)',
        '"CheDoChiTra" TEXT',
      ],
      NguoiTimViec: [
        '"NgayGioiThieu" DATE',
        '"KetQuaGioiThieu" TEXT',
      ],
      GiaiNgan: [
        '"DotGiaiNgan" VARCHAR(20)',
        '"SoTienGiaiNgan" DECIMAL(18,2) DEFAULT 0',
        '"TrangThaiGiaiNgan" VARCHAR(50)',
      ],
      PhanTichTaiChinh_AI: [
        '"DuBaoThu" DECIMAL(18,2)',
        '"DuBaoChi" DECIMAL(18,2)',
        '"CanhBaoRuiRo" TEXT',
      ],
      ChiSoAQI_TheoNgay: [
        '"PM25" DECIMAL(10,2)',
        '"PM10" DECIMAL(10,2)',
        '"NO2" DECIMAL(10,2)',
        '"SO2" DECIMAL(10,2)',
        '"O3" DECIMAL(10,2)',
      ],
      RacThai: [
        '"TuyenThuGom" VARCHAR(150)',
        '"ThoiGianThuGom" TIME',
      ],
      BaoCaoONhiem: ['"FileDinhKem" VARCHAR(500)'],
      DiTich: ['"KeHoachTuBo" TEXT'],
      LeHoi: [
        '"ChiPhiToChuc" DECIMAL(18,2)',
        '"DanhGiaSauSuKien" TEXT',
      ],
      LangNghe: [
        '"SanLuongThang" INT DEFAULT 0',
        '"ChungNhan" VARCHAR(100)',
      ],
      SanPhamOCOP: [
        '"SanLuongThang" INT DEFAULT 0',
        '"ChungNhan" VARCHAR(100)',
      ],
      CoSoKinhDoanhDuLich: [
        '"TinhTrangCapPhep" VARCHAR(100)',
        '"DieuKienKinhDoanh" TEXT',
      ],
    };

    for (const [tableName, columns] of Object.entries(additions)) {
      for (const columnDef of columns) {
        await queryRunner.query(`
          DO $$
          BEGIN
            IF EXISTS (
              SELECT 1
              FROM information_schema.tables
              WHERE table_schema = 'dashboard_xp'
                AND table_name = '${tableName}'
            ) THEN
              EXECUTE 'ALTER TABLE "dashboard_xp"."${tableName}" ADD COLUMN IF NOT EXISTS ${columnDef}';
            END IF;
          END
          $$;
        `);
      }
    }
  }

  public async down(): Promise<void> {
    // Intentionally no-op to avoid dropping possibly populated business columns.
  }
}