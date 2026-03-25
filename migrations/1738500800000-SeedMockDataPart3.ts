import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedMockDataPart31738500800000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // ================================================================
    // SEED DATA MODULE 7: TÀI CHÍNH - NGÂN SÁCH
    // ================================================================

    // Seed MucLucNganSach
    await queryRunner.query(`
      INSERT INTO "dashboard_xp"."MucLucNganSach"
        ("MaMucLuc", "TenMucLuc", "MaMucLucCha", "Cap", "ThuTu", "TrangThai")
      VALUES
        ('ML01', 'Chi thường xuyên', NULL, 1, 1, true),
        ('ML0101', 'Chi quản lý hành chính', 'ML01', 2, 1, true),
        ('ML0102', 'Chi sự nghiệp', 'ML01', 2, 2, true),
        ('ML02', 'Chi đầu tư phát triển', NULL, 1, 2, true),
        ('ML0201', 'Chi xây dựng cơ bản', 'ML02', 2, 1, true),
        ('ML0202', 'Chi mua sắm tài sản', 'ML02', 2, 2, true)
      ON CONFLICT ("MaMucLuc") DO NOTHING
    `);

    // Seed TaiSanCong (depends on LinhVuc which exists)
    await queryRunner.query(`
      INSERT INTO "dashboard_xp"."TaiSanCong"
        ("TenTaiSan", "LoaiTaiSan", "NgayMua", "GiaTri", "TinhTrang", "ViTri", "MaLinhVuc", "GhiChu")
      VALUES
        ('Máy tính Dell Latitude 5420', 'Thiết bị văn phòng', '2023-01-15', 18000000, 'Đang sử dụng', 'Phòng Hành chính', 1, 'Máy tính văn phòng'),
        ('Máy in HP LaserJet Pro', 'Thiết bị văn phòng', '2023-02-20', 8000000, 'Đang sử dụng', 'Phòng Hành chính', 1, 'Máy in laser'),
        ('Xe ô tô công vụ Toyota Innova', 'Phương tiện', '2022-05-10', 750000000, 'Đang sử dụng', 'Gara xã', 1, 'Xe 7 chỗ'),
        ('Bộ bàn ghế phòng họp', 'Nội thất', '2021-08-15', 35000000, 'Đang sử dụng', 'Phòng họp', 1, 'Bàn họp 20 người'),
        ('Điều hòa Daikin 24000BTU', 'Thiết bị điện', '2023-06-01', 15000000, 'Đang sử dụng', 'Phòng làm việc', 1, 'Điều hòa 2 chiều'),
        ('Máy chiếu Epson EB-X06', 'Thiết bị văn phòng', '2023-03-10', 12000000, 'Đang sử dụng', 'Phòng họp', 1, 'Máy chiếu HD')
      ON CONFLICT DO NOTHING
    `);

    // ================================================================
    // SEED DATA MODULE 8: ĐỊA CHÍNH - QUY HOẠCH
    // ================================================================

    // Seed LoaiQuyHoach
    await queryRunner.query(`
      INSERT INTO "dashboard_xp"."LoaiQuyHoach"
        ("TenLoaiQH")
      VALUES
        ('Quy hoạch đô thị'),
        ('Quy hoạch nông thôn'),
        ('Quy hoạch giao thông'),
        ('Quy hoạch công nghiệp')
      ON CONFLICT DO NOTHING
    `);

    // Seed QuyHoach
    await queryRunner.query(`
      INSERT INTO "dashboard_xp"."QuyHoach"
        ("TenQuyHoach", "MaLoaiQH", "DiaChi", "DienTich", "ThoiGianThucHien", "TrangThai", "MoTa", "NgayPheDuyet")
      VALUES
        ('Quy hoạch phát triển khu dân cư mới Phường 1', 1, 'Phường 1', 15.5, '2024-2026', 'Đang thực hiện', 'Xây dựng khu dân cư 500 hộ', '2024-01-10'),
        ('Quy hoạch đường giao thông nội bộ', 3, 'Phường 2', 5.2, '2024-2025', 'Đang thiết kế', 'Mở rộng đường nội bộ', '2024-01-15'),
        ('Quy hoạch khu công nghiệp nhỏ', 4, 'Phường 3', 20.0, '2025-2028', 'Đang lập hồ sơ', 'Khu công nghiệp sạch', NULL),
        ('Quy hoạch nâng cấp chợ truyền thống', 2, 'Phường 1', 2.8, '2024', 'Hoàn thành', 'Nâng cấp chợ hiện đại', '2023-12-20')
      ON CONFLICT DO NOTHING
    `);

    // Seed ThuaDat (depends on LoaiDat which should exist from previous migration)
    await queryRunner.query(`
      INSERT INTO "dashboard_xp"."ThuaDat"
        ("MaThua", "SoThua", "SoToBanDo", "DienTich", "MaLoaiDat", "ChuSoHuu", "ToaDo", "TrangThai", "GhiChu")
      VALUES
        ('TD-001', '123', 'TB-01', 250.00, 'ODT', 'Nguyễn Văn An', '10.762622,106.660172', 'Đang sử dụng', 'Nhà ở đô thị'),
        ('TD-002', '124', 'TB-01', 180.00, 'ODT', 'Trần Thị Bình', '10.762722,106.660272', 'Đang sử dụng', 'Nhà ở riêng lẻ'),
        ('TD-003', '125', 'TB-02', 500.00, 'NKH', 'Lê Văn Cường', '10.762822,106.660372', 'Đang sử dụng', 'Đất trồng cây lâu năm'),
        ('TD-004', '126', 'TB-02', 1200.00, 'NKH', 'Hợp tác xã nông nghiệp', '10.762922,106.660472', 'Đang sử dụng', 'Đất trồng lúa'),
        ('TD-005', '127', 'TB-03', 300.00, 'TSC', 'Công ty TNHH ABC', '10.763022,106.660572', 'Đang sử dụng', 'Đất kinh doanh'),
        ('TD-006', '128', 'TB-03', 450.00, 'SKK', 'Công ty XYZ', '10.763122,106.660672', 'Đang sử dụng', 'Đất kho bãi')
      ON CONFLICT ("MaThua") DO NOTHING
    `);

    // ================================================================
    // SEED DATA MODULE 9: MÔI TRƯỜNG
    // ================================================================

    // Seed TramQuanTracMT
    await queryRunner.query(`
      INSERT INTO "dashboard_xp"."TramQuanTracMT"
        ("TenTram", "DiaChi", "ToaDo", "LoaiTram", "TrangThai", "NgayLapDat", "GhiChu")
      VALUES
        ('Trạm quan trắc Trung tâm', 'Phường 1, trung tâm xã', '10.762622,106.660172', 'Trạm tự động', 'Hoạt động', '2023-01-15', 'Quan trắc không khí 24/7'),
        ('Trạm quan trắc Khu công nghiệp', 'Phường 3, gần KCN', '10.762722,106.660272', 'Trạm tự động', 'Hoạt động', '2023-03-20', 'Quan trắc môi trường công nghiệp'),
        ('Trạm quan trắc Khu dân cư', 'Phường 2', '10.762822,106.660372', 'Trạm thủ công', 'Hoạt động', '2023-06-10', 'Đo định kỳ hàng tuần'),
        ('Trạm quan trắc Nước mặt', 'Sông Phường 4', '10.762922,106.660472', 'Trạm thủ công', 'Hoạt động', '2023-04-25', 'Quan trắc chất lượng nước')
      ON CONFLICT DO NOTHING
    `);

    // Seed DonViThuGomRac
    await queryRunner.query(`
      INSERT INTO "dashboard_xp"."DonViThuGomRac"
        ("TenDonVi", "DiaChi", "SoDienThoai", "NguoiDaiDien", "TrangThai")
      VALUES
        ('Công ty TNHH Môi trường Xanh', 'Phường 1', '0901234567', 'Nguyễn Văn A', 'Đang hoạt động'),
        ('HTX Dịch vụ môi trường', 'Phường 2', '0912345678', 'Trần Thị B', 'Đang hoạt động'),
        ('Công ty CP Vệ sinh đô thị', 'Phường 3', '0923456789', 'Lê Văn C', 'Đang hoạt động')
      ON CONFLICT DO NOTHING
    `);

    // Seed DiemThuGomRac
    await queryRunner.query(`
      INSERT INTO "dashboard_xp"."DiemThuGomRac"
        ("TenDiem", "DiaChi", "ToaDo", "LoaiDiem", "TrangThai", "GhiChu")
      VALUES
        ('Điểm thu gom Chợ Trung tâm', 'Chợ Trung tâm, Phường 1', '10.762622,106.660172', 'Điểm tập trung', 'Hoạt động', 'Thu gom 2 lần/ngày'),
        ('Điểm thu gom Khu dân cư A1', 'Khu dân cư A1, Phường 1', '10.762722,106.660272', 'Thùng rác công cộng', 'Hoạt động', 'Thùng rác 660L'),
        ('Điểm thu gom Khu dân cư B2', 'Khu dân cư B2, Phường 2', '10.762822,106.660372', 'Thùng rác công cộng', 'Hoạt động', 'Thùng rác 660L'),
        ('Điểm thu gom Chợ Phường 2', 'Chợ Phường 2', '10.762922,106.660472', 'Điểm tập trung', 'Hoạt động', 'Thu gom 1 lần/ngày'),
        ('Điểm thu gom Công viên', 'Công viên trung tâm', '10.763022,106.660572', 'Thùng rác công cộng', 'Hoạt động', 'Phân loại rác tại nguồn'),
        ('Điểm thu gom Khu công nghiệp', 'KCN nhỏ, Phường 3', '10.763122,106.660672', 'Điểm tập trung', 'Hoạt động', 'Rác thải công nghiệp')
      ON CONFLICT DO NOTHING
    `);

    // Seed DiemNongMoiTruong
    await queryRunner.query(`
      INSERT INTO "dashboard_xp"."DiemNongMoiTruong"
        ("TenDiem", "DiaChi", "ToaDo", "LoaiONhiem", "MucDoNghiemTrong", "TrangThai", "BienPhapXuLy", "NgayPhatHien")
      VALUES
        ('Bãi rác tự phát Phường 2', 'Cuối đường Lê Lợi, Phường 2', '10.762622,106.660172', 'Ô nhiễm rác thải', 'Cao', 'Đang xử lý', 'Dọn dẹp, lắp biển cảnh báo', '2024-01-10'),
        ('Kênh thoát nước ô nhiễm', 'Kênh sau chợ Phường 1', '10.762722,106.660272', 'Ô nhiễm nước', 'Trung bình', 'Đang theo dõi', 'Nạo vét kênh, xử lý nước thải', '2024-01-15'),
        ('Khu vực đốt rác', 'Gần khu dân cư C3', '10.762822,106.660372', 'Ô nhiễm không khí', 'Trung bình', 'Đã xử lý', 'Xử phạt, tuyên truyền', '2024-01-05'),
        ('Ao nước tù đọng', 'Khu đất trống Phường 3', '10.762922,106.660472', 'Ô nhiễm nước', 'Thấp', 'Đang theo dõi', 'Lấp ao, san lấp mặt bằng', '2024-01-20')
      ON CONFLICT DO NOTHING
    `);

    // ================================================================
    // SEED DATA MODULE 10: VĂN HÓA - DU LỊCH
    // ================================================================

    // Seed DiTich (already has 1 record from previous migration, add more)
    await queryRunner.query(`
      INSERT INTO "dashboard_xp"."DiTich"
        ("TenDiTich", "LoaiDiTich", "DiaChi", "ToaDo", "CapXepHang", "TinhTrang", "MoTa")
      VALUES
        ('Chùa cổ Phường 1', 'Di tích tôn giáo', 'Phường 1', '10.762622,106.660172', 'Cấp quốc gia', 'Tốt', 'Chùa được xây dựng từ thế kỷ 17'),
        ('Nhà thờ họ Nguyễn', 'Di tích kiến trúc', 'Phường 2', '10.762722,106.660272', 'Cấp tỉnh', 'Tốt', 'Nhà thờ họ cổ 200 năm tuổi'),
        ('Đền thờ liệt sĩ', 'Di tích lịch sử', 'Phường 3', '10.762822,106.660372', 'Cấp huyện', 'Đang tu bổ', 'Đền thờ các anh hùng liệt sĩ'),
        ('Cây đa cổ thụ', 'Di tích thiên nhiên', 'Phường 1', '10.762922,106.660472', 'Cấp xã', 'Tốt', 'Cây đa hơn 300 năm tuổi')
      ON CONFLICT DO NOTHING
    `);

    // Seed LangNghe
    await queryRunner.query(`
      INSERT INTO "dashboard_xp"."LangNghe"
        ("TenLangNghe", "LoaiNghe", "DiaChi", "SoHoNghe", "SanPhamChinh", "TrangThai")
      VALUES
        ('Làng nghề mây tre đan', 'Mây tre đan', 'Phường 2', 35, 'Giỏ, rổ, thúng', true),
        ('Làng nghề gốm sứ', 'Gốm sứ', 'Phường 3', 28, 'Chén, bát, lọ hoa', true),
        ('Làng nghề dệt chiếu', 'Dệt', 'Phường 1', 42, 'Chiếu cói', true),
        ('Làng nghề bánh tráng', 'Chế biến thực phẩm', 'Phường 4', 18, 'Bánh tráng các loại', true)
      ON CONFLICT DO NOTHING
    `);

    // Seed LeHoi
    await queryRunner.query(`
      INSERT INTO "dashboard_xp"."LeHoi"
        ("TenLeHoi", "ThoiGianToChuc", "DiaDiem", "SoLuongKhach", "MoTa", "TrangThai")
      VALUES
        ('Lễ hội đền làng', '2024-03-15', 'Đình làng cổ, Phường 1', 5000, 'Lễ hội truyền thống hàng năm', 'Đang chuẩn bị'),
        ('Hội chợ làng nghề', '2024-04-20', 'Sân vận động xã', 3000, 'Trưng bày sản phẩm làng nghề', 'Đang lập kế hoạch'),
        ('Tết Nguyên Đán', '2024-02-10', 'Toàn xã', 10000, 'Tết cổ truyền dân tộc', 'Đã tổ chức'),
        ('Ngày hội văn hóa thể thao', '2024-05-01', 'Sân vận động xã', 2000, 'Giao lưu văn hóa thể thao', 'Đang chuẩn bị')
      ON CONFLICT DO NOTHING
    `);

    // Seed CoSoKinhDoanhDuLich
    await queryRunner.query(`
      INSERT INTO "dashboard_xp"."CoSoKinhDoanhDuLich"
        ("TenCoSo", "DiaChi", "LoaiHinh", "ChuCoSo", "SoDienThoai", "TrangThai", "NgayCapPhep")
      VALUES
        ('Nhà nghỉ Hòa Bình', 'Số 123, Phường 1', 'Nhà nghỉ', 'Nguyễn Văn Hòa', '0901234567', 'Đang hoạt động', '2023-01-15'),
        ('Nhà hàng Món Ngon', 'Số 456, Phường 2', 'Nhà hàng', 'Trần Thị Ngon', '0912345678', 'Đang hoạt động', '2023-03-20'),
        ('Homestay Xanh', 'Số 789, Phường 3', 'Homestay', 'Lê Văn Xanh', '0923456789', 'Đang hoạt động', '2023-05-10'),
        ('Quán cà phê Sáng', 'Số 234, Phường 1', 'Quán cà phê', 'Phạm Văn Sáng', '0934567890', 'Đang hoạt động', '2023-07-15')
      ON CONFLICT DO NOTHING
    `);

    // Seed SanPhamOCOP
    await queryRunner.query(`
      INSERT INTO "dashboard_xp"."SanPhamOCOP"
        ("TenSanPham", "MaLangNghe", "MoTa", "XepHang", "GiaBan", "TrangThai", "NgayXepHang", "GhiChu")
      VALUES
        ('Giỏ tre trúc thủ công cao cấp', 1, 'Giỏ đan thủ công tinh xảo', '4 sao', 250000, 'Đang bán', '2023-06-15', 'Sản phẩm OCOP 4 sao'),
        ('Bát gốm sứ hoa văn cổ', 2, 'Bát gốm vẽ tay hoa văn truyền thống', '3 sao', 150000, 'Đang bán', '2023-07-20', 'Sản phẩm OCOP 3 sao'),
        ('Chiếu cói Việt Nam', 3, 'Chiếu cói dệt thủ công', '3 sao', 180000, 'Đang bán', '2023-08-10', 'Chiếu mát, bền đẹp'),
        ('Bánh tráng cuộn khô bò', 4, 'Bánh tráng đặc sản', '4 sao', 120000, 'Đang bán', '2023-09-05', 'Đặc sản địa phương')
      ON CONFLICT DO NOTHING
    `);

    console.log('✅ Mock data seeded successfully (Part 3 - Final)');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Clean up all seeded data
    await queryRunner.query(
      `DELETE FROM "dashboard_xp"."SanPhamOCOP" WHERE "TenSanPham" LIKE '%OCOP%' OR "TenSanPham" LIKE 'Giỏ tre%'`,
    );
    await queryRunner.query(
      `DELETE FROM "dashboard_xp"."CoSoKinhDoanhDuLich" WHERE "TenCoSo" IN ('Nhà nghỉ Hòa Bình', 'Nhà hàng Món Ngon')`,
    );
    await queryRunner.query(
      `DELETE FROM "dashboard_xp"."LeHoi" WHERE "TenLeHoi" IN ('Lễ hội đền làng', 'Hội chợ làng nghề')`,
    );
    await queryRunner.query(
      `DELETE FROM "dashboard_xp"."LangNghe" WHERE "TenLangNghe" LIKE 'Làng nghề%'`,
    );
    await queryRunner.query(
      `DELETE FROM "dashboard_xp"."DiTich" WHERE "TenDiTich" IN ('Chùa cổ Phường 1', 'Nhà thờ họ Nguyễn')`,
    );
    await queryRunner.query(
      `DELETE FROM "dashboard_xp"."DiemNongMoiTruong" WHERE "TenDiem" LIKE 'Bãi rác%' OR "TenDiem" LIKE 'Kênh%'`,
    );
    await queryRunner.query(
      `DELETE FROM "dashboard_xp"."DiemThuGomRac" WHERE "TenDiem" LIKE 'Điểm thu gom%'`,
    );
    await queryRunner.query(
      `DELETE FROM "dashboard_xp"."DonViThuGomRac" WHERE "TenDonVi" LIKE '%Môi trường%'`,
    );
    await queryRunner.query(
      `DELETE FROM "dashboard_xp"."TramQuanTracMT" WHERE "TenTram" LIKE 'Trạm quan trắc%'`,
    );
    await queryRunner.query(
      `DELETE FROM "dashboard_xp"."ThuaDat" WHERE "MaThua" LIKE 'TD-%'`,
    );
    await queryRunner.query(
      `DELETE FROM "dashboard_xp"."QuyHoach" WHERE "TenQuyHoach" LIKE 'Quy hoạch%'`,
    );
    await queryRunner.query(
      `DELETE FROM "dashboard_xp"."LoaiQuyHoach" WHERE "TenLoaiQH" LIKE 'Quy hoạch%'`,
    );
    await queryRunner.query(
      `DELETE FROM "dashboard_xp"."TaiSanCong" WHERE "TenTaiSan" LIKE 'Máy%' OR "TenTaiSan" LIKE 'Xe%'`,
    );
    await queryRunner.query(
      `DELETE FROM "dashboard_xp"."MucLucNganSach" WHERE "MaMucLuc" LIKE 'ML%'`,
    );
  }
}
