import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedMockDataPart21738500700000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // ================================================================
    // SEED DATA MODULE 4: QUỐC PHÒNG - AN NINH
    // ================================================================

    // Seed CanBoQuocPhong
    await queryRunner.query(`
      INSERT INTO "dashboard_xp"."CanBoQuocPhong"
        ("HoTen", "CapBac", "ChucVu", "DonVi", "SoDienThoai")
      VALUES
        ('Thượng tá Trần Văn A', 'Thượng tá', 'Chỉ huy trưởng', 'Công an Xã', '0901111111'),
        ('Hạ sĩ Nguyễn Thị B', 'Hạ sĩ', 'Cán bộ dân cư', 'Công an Xã', '0902222222'),
        ('Trung úy Lê Minh C', 'Trung úy', 'Đội trưởng', 'Công an Xã', '0903333333'),
        ('Trung sĩ Phạm Văn D', 'Trung sĩ', 'Chiến sĩ', 'Công an Xã', '0904444444')
      ON CONFLICT DO NOTHING
    `);

    // Seed TamTruTamVang
    await queryRunner.query(`
      INSERT INTO "dashboard_xp"."TamTruTamVang"
        ("HoTenNguoiKhaiBao", "CCCD", "DiaChiThuongTru", "DiaChiTamTru", "LoaiDangKy", "TuNgay", "DenNgay", "TinhTrangHoSo", "NgayKhaiBao", "MaCanBo")
      VALUES
        ('Nguyễn Văn X', '001234567890', 'Hà Nội', 'Xã A, Phường 1', 'Tạm trú', '2024-01-01', '2024-03-01', 'Đã duyệt', '2023-12-20', 1),
        ('Trần Thị Y', '001234567891', 'Hồ Chí Minh', 'Xã A, Phường 2', 'Tạm vắng', '2024-01-15', '2024-02-15', 'Chờ duyệt', '2024-01-10', 2),
        ('Lê Minh Z', '001234567892', 'Cần Thơ', 'Xã A, Phường 1', 'Tạm trú', '2024-01-20', '2024-04-20', 'Đã duyệt', '2024-01-15', 1),
        ('Phạm Văn K', '001234567893', 'Đà Nẵng', 'Xã A, Phường 3', 'Tạm trú', '2024-01-25', '2024-06-25', 'Đang xử lý', '2024-01-20', 3)
      ON CONFLICT DO NOTHING
    `);

    // Seed KhuDanCu
    await queryRunner.query(`
      INSERT INTO "dashboard_xp"."KhuDanCu"
        ("TenKhuDanCu", "DiaChi", "SoHoDan", "SoDanSo")
      VALUES
        ('Khu dân cư A1', 'Phường 1, Xã A', 45, 156),
        ('Khu dân cư B2', 'Phường 2, Xã A', 38, 134),
        ('Khu dân cư C3', 'Phường 3, Xã A', 52, 185),
        ('Khu dân cư D4', 'Phường 4, Xã A', 41, 142)
      ON CONFLICT DO NOTHING
    `);

    // Seed TinhHinhANTT
    await queryRunner.query(`
      INSERT INTO "dashboard_xp"."TinhHinhANTT"
        ("MaKhuDanCu", "MoTa", "MucDoNguyCo", "ThoiGianBaoCao", "SoSuKien", "SoNguoiBiHai")
      VALUES
        (1, 'Tình hình bình yên, không có sự cố', 'Thấp', '2024-01-25', 0, 0),
        (2, 'Phát hiện một vụ trộm cắp nhỏ', 'Trung bình', '2024-01-25', 1, 1),
        (3, 'An toàn, giao thông trật tự tốt', 'Thấp', '2024-01-25', 0, 0),
        (4, 'Có tranh chấp đất đai giữa 2 hộ dân', 'Trung bình', '2024-01-26', 1, 0)
      ON CONFLICT DO NOTHING
    `);

    // Seed PhoiHopLucLuong
    await queryRunner.query(`
      INSERT INTO "dashboard_xp"."PhoiHopLucLuong"
        ("DonViPhoiHop", "NoiDungPhoiHop", "ThoiGian", "KetQua")
      VALUES
        ('Công an Huyện', 'Tuần tra, kiểm soát trật tự', '2024-01-20', 'Phát hiện 1 vi phạm giao thông'),
        ('Quân sự Huyện', 'Kiểm tra công tác quốc phòng', '2024-01-22', 'Bình thường'),
        ('Thanh tra Huyện', 'Kiểm tra hành chính', '2024-01-24', 'Không phát hiện vi phạm'),
        ('Bộ chỉ huy quân sự', 'Diễn tập phòng chống thiên tai', '2024-01-28', 'Thành công')
      ON CONFLICT DO NOTHING
    `);

    // Seed ViPhamHanhChinh
    await queryRunner.query(`
      INSERT INTO "dashboard_xp"."ViPhamHanhChinh"
        ("HoTenNguoiViPham", "HanhViViPham", "HinhThucXuLy", "TrangThaiXuLy", "NgayViPham", "MucPhat", "MaCanBo", "GhiChu")
      VALUES
        ('Phạm Văn D', 'Rửa xe trên đường công cộng', 'Phạt hành chính', 'Đã xử lý', '2024-01-15', 500000, 1, 'Đã nộp phạt'),
        ('Hoàng Thị E', 'Đăng ký thay đổi chủ nhân không kịp thời', 'Cảnh cáo', 'Đang xử lý', '2024-01-18', 0, 2, 'Đang hoàn thiện hồ sơ'),
        ('Võ Minh F', 'Để chó không rọ mõm ở chỗ công cộng', 'Cảnh cáo', 'Đã xử lý', '2024-01-22', 300000, 1, 'Đã nộp phạt'),
        ('Lý Văn G', 'Gây ồn ào sau 22h', 'Nhắc nhở', 'Đã xử lý', '2024-01-25', 200000, 3, 'Cam kết không tái phạm')
      ON CONFLICT DO NOTHING
    `);

    // ================================================================
    // SEED DATA MODULE 5: XÂY DỰNG - HẠ TẦNG
    // ================================================================

    // Seed CanBoXayDung
    await queryRunner.query(`
      INSERT INTO "dashboard_xp"."CanBoXayDung"
        ("HoTen", "ChucVu", "SoDienThoai")
      VALUES
        ('Nguyễn Văn Xây', 'Trưởng phòng', '0901234567'),
        ('Trần Thị Dựng', 'Chuyên viên', '0912345678'),
        ('Lê Văn Công', 'Chuyên viên', '0923456789'),
        ('Phạm Thị Trình', 'Nhân viên', '0934567890')
      ON CONFLICT DO NOTHING
    `);

    // Seed DonViHanhChinh
    await queryRunner.query(`
      INSERT INTO "dashboard_xp"."DonViHanhChinh"
        ("MaDVHC", "TenDVHC", "Cap")
      VALUES
        ('QH001', 'Quận 1', 2),
        ('QH002', 'Quận 2', 2),
        ('XP001', 'Phường 1', 3),
        ('XP002', 'Phường 2', 3),
        ('XP003', 'Phường 3', 3)
      ON CONFLICT ("MaDVHC") DO NOTHING
    `);

    // Seed QuanHuyen
    await queryRunner.query(`
      INSERT INTO "dashboard_xp"."QuanHuyen"
        ("TenQuanHuyen", "MaDVHC")
      VALUES
        ('Quận 1', 'QH001'),
        ('Quận 2', 'QH002')
      ON CONFLICT DO NOTHING
    `);

    // Seed XaPhuong
    await queryRunner.query(`
      INSERT INTO "dashboard_xp"."XaPhuong"
        ("TenXaPhuong", "MaQuanHuyen", "DanSo", "DienTich", "MaDVHC")
      VALUES
        ('Phường 1', 1, 5000, 2.5, 'XP001'),
        ('Phường 2', 1, 4500, 2.0, 'XP002'),
        ('Phường 3', 2, 6000, 3.0, 'XP003')
      ON CONFLICT DO NOTHING
    `);

    // Seed HaTangDoThi
    await queryRunner.query(`
      INSERT INTO "dashboard_xp"."HaTangDoThi"
        ("TenHaTang", "LoaiHaTang", "TinhTrang", "NgayCapNhat")
      VALUES
        ('Đường Nguyễn Trãi', 'Đường giao thông', 'Tốt', '2024-01-15'),
        ('Cầu Phường 1', 'Cầu', 'Bình thường', '2024-01-10'),
        ('Hệ thống thoát nước Phường 2', 'Hệ thống cấp thoát nước', 'Xuống cấp', '2024-01-20'),
        ('Công viên Trung tâm', 'Công viên', 'Tốt', '2024-01-25'),
        ('Điện chiếu sáng đường phố', 'Hệ thống điện', 'Bình thường', '2024-01-18'),
        ('Hệ thống cấp nước', 'Hệ thống cấp thoát nước', 'Tốt', '2024-01-12')
      ON CONFLICT DO NOTHING
    `);

    // Seed BaoHongHaTang
    await queryRunner.query(`
      INSERT INTO "dashboard_xp"."BaoHongHaTang"
        ("MaHaTang", "MoTa", "NgayPhatHien", "TrangThai", "ChiPhiDuKien")
      VALUES
        (3, 'Tắc nghẽn hệ thống thoát nước', '2024-01-20', 'Chờ sửa chữa', 50000000),
        (2, 'Nứt mặt cầu', '2024-01-22', 'Đang sửa chữa', 150000000),
        (5, 'Một số đèn chiếu sáng hỏng', '2024-01-25', 'Chờ sửa chữa', 10000000)
      ON CONFLICT DO NOTHING
    `);

    // ================================================================
    // SEED DATA MODULE 6: DÂN CƯ - LAO ĐỘNG
    // ================================================================

    // Seed HoGiaDinh (requires XaPhuong)
    await queryRunner.query(`
      INSERT INTO "dashboard_xp"."HoGiaDinh"
        ("SoHoKhau", "ChuHo", "DiaChi", "SoThanhVien", "MaXaPhuong")
      VALUES
        ('HK-001-2024', 'Nguyễn Văn An', 'Số 123, Phường 1', 4, 1),
        ('HK-002-2024', 'Trần Thị Bình', 'Số 456, Phường 1', 3, 1),
        ('HK-003-2024', 'Lê Văn Cường', 'Số 789, Phường 2', 5, 2),
        ('HK-004-2024', 'Phạm Thị Dung', 'Số 234, Phường 2', 2, 2),
        ('HK-005-2024', 'Hoàng Văn Em', 'Số 567, Phường 3', 6, 3),
        ('HK-006-2024', 'Vũ Thị Hoa', 'Số 890, Phường 3', 3, 3)
      ON CONFLICT ("SoHoKhau") DO NOTHING
    `);

    // Seed BienDongDanCu
    await queryRunner.query(`
      INSERT INTO "dashboard_xp"."BienDongDanCu"
        ("LoaiBienDong", "SoLuong", "ThoiGian", "GhiChu")
      VALUES
        ('Sinh', 15, '2024-01-31', 'Số trẻ sinh trong tháng 1'),
        ('Tử', 3, '2024-01-31', 'Số người tử vong trong tháng 1'),
        ('Nhập cư', 8, '2024-01-31', 'Số người nhập cư trong tháng 1'),
        ('Xuất cư', 5, '2024-01-31', 'Số người xuất cư trong tháng 1'),
        ('Kết hôn', 6, '2024-01-31', 'Số cặp đôi kết hôn'),
        ('Ly hôn', 2, '2024-01-31', 'Số cặp đôi ly hôn')
      ON CONFLICT DO NOTHING
    `);

    // Seed ViecLam
    await queryRunner.query(`
      INSERT INTO "dashboard_xp"."ViecLam"
        ("TenCongViec", "NhaTuyenDung", "DiaDiem", "SoLuongCanTuyen", "MucLuong", "YeuCau", 
         "NgayDangTin", "NgayHetHan", "TrangThai", "GhiChu")
      VALUES
        ('Nhân viên bán hàng', 'Công ty TNHH ABC', 'Phường 1', 3, 8000000, 'Tốt nghiệp THPT, chăm chỉ', '2024-01-10', '2024-02-10', 'Đang tuyển', 'Ưu tiên có kinh nghiệm'),
        ('Thợ may', 'Xưởng may Đức Thành', 'Phường 3', 5, 7000000, 'Có kỹ năng may cơ bản', '2024-01-15', '2024-02-15', 'Đang tuyển', 'Có đào tạo nghề'),
        ('Công nhân xây dựng', 'Công ty Xây dựng XYZ', 'Phường 2', 10, 9000000, 'Sức khỏe tốt', '2024-01-20', '2024-03-20', 'Đang tuyển', 'Lương theo năng suất'),
        ('Giáo viên mầm non', 'Trường Mầm non Tư thục ABC', 'Phường 1', 2, 10000000, 'Tốt nghiệp sư phạm mầm non', '2024-01-25', '2024-02-25', 'Đang tuyển', 'Yêu thích trẻ em'),
        ('Lái xe tải', 'Công ty Vận tải DEF', 'Phường 3', 4, 12000000, 'Có bằng lái B2 trở lên', '2024-01-28', '2024-02-28', 'Đang tuyển', 'Đi tỉnh'),
        ('Nhân viên kế toán', 'Công ty Thương mại GHI', 'Phường 2', 1, 11000000, 'Tốt nghiệp kế toán, có kinh nghiệm', '2024-01-30', '2024-03-01', 'Đang tuyển', 'Ưu tiên có chứng chỉ kế toán trưởng')
      ON CONFLICT DO NOTHING
    `);

    // Seed CanBoTBXH
    await queryRunner.query(`
      INSERT INTO "dashboard_xp"."CanBoTBXH"
        ("HoTen", "ChucVu", "SoDienThoai")
      VALUES
        ('Nguyễn Thị Xã', 'Trưởng phòng Lao động - Thương binh và Xã hội', '0901234567'),
        ('Trần Văn Hội', 'Chuyên viên', '0912345678'),
        ('Lê Thị Lao', 'Chuyên viên', '0923456789'),
        ('Phạm Văn Động', 'Nhân viên', '0934567890')
      ON CONFLICT DO NOTHING
    `);

    console.log('✅ Mock data seeded successfully (Part 2)');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Clean up seeded data
    await queryRunner.query(
      `DELETE FROM "dashboard_xp"."CanBoTBXH" WHERE "SoDienThoai" IN ('0901234567', '0912345678', '0923456789', '0934567890')`,
    );
    await queryRunner.query(
      `DELETE FROM "dashboard_xp"."ViecLam" WHERE "TenCongViec" IN ('Nhân viên bán hàng', 'Thợ may', 'Công nhân xây dựng')`,
    );
    await queryRunner.query(
      `DELETE FROM "dashboard_xp"."BienDongDanCu" WHERE "LoaiBienDong" IN ('Sinh', 'Tử', 'Nhập cư')`,
    );
    await queryRunner.query(
      `DELETE FROM "dashboard_xp"."HoGiaDinh" WHERE "SoHoKhau" LIKE 'HK-%'`,
    );
    await queryRunner.query(
      `DELETE FROM "dashboard_xp"."BaoHongHaTang" WHERE "MaHaTang" IN (2, 3, 5)`,
    );
    await queryRunner.query(
      `DELETE FROM "dashboard_xp"."HaTangDoThi" WHERE "TenHaTang" LIKE 'Đường%' OR "TenHaTang" LIKE 'Cầu%'`,
    );
    await queryRunner.query(
      `DELETE FROM "dashboard_xp"."XaPhuong" WHERE "TenXaPhuong" LIKE 'Phường%'`,
    );
    await queryRunner.query(
      `DELETE FROM "dashboard_xp"."QuanHuyen" WHERE "TenQuanHuyen" LIKE 'Quận%'`,
    );
    await queryRunner.query(
      `DELETE FROM "dashboard_xp"."DonViHanhChinh" WHERE "MaDVHC" LIKE 'QH%' OR "MaDVHC" LIKE 'XP%'`,
    );
    await queryRunner.query(
      `DELETE FROM "dashboard_xp"."CanBoXayDung" WHERE "SoDienThoai" IN ('0901234567', '0912345678', '0923456789', '0934567890')`,
    );
    await queryRunner.query(
      `DELETE FROM "dashboard_xp"."ViPhamHanhChinh" WHERE "HoTenNguoiViPham" IN ('Phạm Văn D', 'Hoàng Thị E', 'Võ Minh F', 'Lý Văn G')`,
    );
    await queryRunner.query(
      `DELETE FROM "dashboard_xp"."PhoiHopLucLuong" WHERE "DonViPhoiHop" IN ('Công an Huyện', 'Quân sự Huyện')`,
    );
    await queryRunner.query(
      `DELETE FROM "dashboard_xp"."TinhHinhANTT" WHERE "MaKhuDanCu" IN (1, 2, 3, 4)`,
    );
    await queryRunner.query(
      `DELETE FROM "dashboard_xp"."KhuDanCu" WHERE "TenKhuDanCu" LIKE 'Khu dân cư%'`,
    );
    await queryRunner.query(
      `DELETE FROM "dashboard_xp"."TamTruTamVang" WHERE "HoTenNguoiKhaiBao" IN ('Nguyễn Văn X', 'Trần Thị Y', 'Lê Minh Z', 'Phạm Văn K')`,
    );
    await queryRunner.query(
      `DELETE FROM "dashboard_xp"."CanBoQuocPhong" WHERE "SoDienThoai" IN ('0901111111', '0902222222', '0903333333', '0904444444')`,
    );
  }
}
