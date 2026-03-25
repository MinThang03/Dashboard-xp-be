import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedMockData1738500600000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // ================================================================
    // SEED DATA MODULE 1: HÀNH CHÍNH TƯ PHÁP
    // ================================================================

    // Seed HoTich
    await queryRunner.query(`
      INSERT INTO "dashboard_xp"."HoTich" 
        ("so_ho_tich", "ten_chu_ho", "ngay_sinh_chu_ho", "gioi_tinh_chu_ho", "dia_chi_ho_tich", 
         "so_thanh_vien_ho_tich", "ngay_lap_ho_tich", "ghi_chu", "trang_thai")
      VALUES
        ('HT-2024-001', 'Nguyễn Văn An', '1985-03-15', 'Nam', 'Số 123, Đường Nguyễn Trãi, Phường 1', 4, '2024-01-10', 'Hộ khẩu thường trú', true),
        ('HT-2024-002', 'Trần Thị Bình', '1990-07-20', 'Nữ', 'Số 456, Đường Lê Lợi, Phường 2', 3, '2024-01-15', '', true),
        ('HT-2024-003', 'Lê Văn Cường', '1978-11-05', 'Nam', 'Số 78, Đường Trần Phú, Phường 3', 5, '2024-01-20', 'Hộ đa thế hệ', true),
        ('HT-2024-004', 'Phạm Thị Dung', '1982-06-12', 'Nữ', 'Số 234, Đường Hùng Vương, Phường 1', 2, '2024-01-25', 'Hộ mới tách', true),
        ('HT-2024-005', 'Hoàng Văn Em', '1975-02-28', 'Nam', 'Số 567, Đường Phan Đình Phùng, Phường 4', 6, '2024-02-01', '', true),
        ('HT-2024-006', 'Vũ Thị Hoa', '1988-09-18', 'Nữ', 'Số 89, Đường Hai Bà Trưng, Phường 2', 3, '2024-02-05', 'Hộ tạm trú dài hạn', true)
      ON CONFLICT ("so_ho_tich") DO NOTHING
    `);

    // Seed VanBan
    await queryRunner.query(`
      INSERT INTO "dashboard_xp"."VanBan"
        ("SoKyHieu", "TrichYeu", "LoaiVanBan", "CoQuanBanHanh", "NgayBanHanh", "TrangThai")
      VALUES
        ('123/QĐ-UBND', 'Quyết định về việc phê duyệt kế hoạch phát triển kinh tế xã hội năm 2024', 'Quyết định', 'UBND Xã', '2024-01-15', 'Đã ban hành'),
        ('456/CV-UBND', 'Công văn về tăng cường công tác phòng chống dịch bệnh', 'Công văn', 'UBND Xã', '2024-01-20', 'Đã ban hành'),
        ('789/TB-UBND', 'Thông báo về lịch họp định kỳ tháng 2/2024', 'Thông báo', 'UBND Xã', '2024-01-25', 'Đã ban hành'),
        ('012/HD-UBND', 'Hướng dẫn thực hiện chính sách hỗ trợ hộ nghèo', 'Hướng dẫn', 'UBND Xã', '2024-01-28', 'Đang thực hiện'),
        ('345/KH-UBND', 'Kế hoạch tổ chức Tết Nguyên Đán 2024', 'Kế hoạch', 'UBND Xã', '2024-02-01', 'Đang triển khai'),
        ('678/BC-UBND', 'Báo cáo tình hình kinh tế - xã hội quý I/2024', 'Báo cáo', 'UBND Xã', '2024-02-05', 'Đã trình')
      ON CONFLICT DO NOTHING
    `);

    // ================================================================
    // SEED DATA MODULE 2: Y TẾ - GIÁO DỤC
    // ================================================================

    // Seed NhanVienYTe (depends on TramYTe which should exist from previous migration)
    await queryRunner.query(`
      INSERT INTO "dashboard_xp"."NhanVienYTe"
        ("HoTen", "NgaySinh", "GioiTinh", "ChucDanh", "ChuyenMon", "SoDienThoai", "TrangThaiLamViec", "MaTram", "GhiChu")
      VALUES
        ('Bác sĩ Trần Văn A', '1985-03-15', 'Nam', 'Bác sĩ', 'Nội khoa', '0901234567', 'Đang làm việc', 1, 'Bác sĩ tổng quát'),
        ('Bác sĩ Nguyễn Thị B', '1988-07-22', 'Nữ', 'Bác sĩ', 'Nhi khoa', '0912345678', 'Đang làm việc', 1, 'Chuyên nhi'),
        ('Y tá Võ Minh C', '1992-11-08', 'Nam', 'Y tá', 'Chăm sóc bệnh nhân', '0923456789', 'Đang làm việc', 1, ''),
        ('Y sĩ Lê Thị D', '1990-05-30', 'Nữ', 'Y sĩ', 'Tiêm chủng', '0934567890', 'Đang làm việc', 1, 'Quản lý lịch tiêm chủng'),
        ('Dược sĩ Phạm Văn E', '1987-09-12', 'Nam', 'Dược sĩ', 'Quản lý thuốc', '0945678901', 'Đang làm việc', 1, 'Phụ trách nhà thuốc'),
        ('Y tá Hoàng Thị F', '1991-04-18', 'Nữ', 'Y tá', 'Hộ sinh', '0956789012', 'Đang làm việc', 1, 'Chăm sóc sản phụ')
      ON CONFLICT DO NOTHING
    `);

    // Seed LuotKham
    await queryRunner.query(`
      INSERT INTO "dashboard_xp"."LuotKham"
        ("MaTram", "NgayKham", "LoaiKham", "SoLuongBenhNhan", "GhiChu")
      VALUES
        (1, '2024-01-15', 'Khám tổng quát', 25, 'Khám sức khỏe định kỳ'),
        (1, '2024-01-16', 'Khám nhi', 18, 'Khám trẻ em'),
        (1, '2024-01-17', 'Khám ngoại', 12, 'Khám cấp cứu'),
        (1, '2024-01-18', 'Khám phụ nữ', 20, 'Khám sản phụ khoa'),
        (1, '2024-01-19', 'Khám răng hàm mặt', 15, 'Khám nha khoa'),
        (1, '2024-01-20', 'Khám mắt', 10, 'Khám mắt miễn phí')
      ON CONFLICT DO NOTHING
    `);

    // Seed ThietBiYTe
    await queryRunner.query(`
      INSERT INTO "dashboard_xp"."ThietBiYTe"
        ("TenThietBi", "LoaiThietBi", "NgayMua", "TinhTrang", "MaTram", "GhiChu")
      VALUES
        ('Máy đo huyết áp Omron', 'Thiết bị đo', '2023-06-01', 'Tốt', 1, 'Kỹ thuật số'),
        ('Máy kiểm tra tim ECG', 'Thiết bị chẩn đoán', '2023-01-15', 'Tốt', 1, '12 đầu dò'),
        ('Tủ lạnh bảo quản vaccine', 'Tủ bảo quản', '2022-11-20', 'Tốt', 1, '-20 độ C'),
        ('Máy siêu âm', 'Thiết bị chẩn đoán', '2023-03-10', 'Cần bảo trì', 1, '2D/4D'),
        ('Máy xét nghiệm sinh hóa', 'Thiết bị xét nghiệm', '2023-05-20', 'Tốt', 1, 'Tự động'),
        ('Giường bệnh', 'Nội thất', '2022-01-10', 'Tốt', 1, '10 giường')
      ON CONFLICT DO NOTHING
    `);

    // Seed BaoTriThietBi
    await queryRunner.query(`
      INSERT INTO "dashboard_xp"."BaoTriThietBi"
        ("MaThietBi", "NgayBaoTri", "NoiDung", "TrangThai", "GhiChu")
      VALUES
        (1, '2024-01-10', 'Vệ sinh, hiệu chuẩn', 'Hoàn thành', 'Bảo trì định kỳ'),
        (2, '2024-01-12', 'Kiểm tra pin, hiệu chuẩn điện', 'Hoàn thành', ''),
        (3, '2024-01-08', 'Kiểm tra nhiệt độ, thay dầu', 'Hoàn thành', 'Bảo trì hàng tháng'),
        (4, '2024-01-15', 'Kiểm tra đầu dò, phần mềm', 'Hoàn thành', 'Bảo trì định kỳ')
      ON CONFLICT DO NOTHING
    `);

    // Seed DichBenh
    await queryRunner.query(`
      INSERT INTO "dashboard_xp"."DichBenh"
        ("TenDich", "KhuVuc", "SoCaNhiem", "SoCaKhoi", "NgayBatDau", "NgayKetThuc", "MucDo", "TrangThai", "GhiChu")
      VALUES
        ('Sốt xuất huyết', 'Phường 1, 2', 15, 12, '2024-01-10', '2024-01-25', 'Trung bình', 'Đang kiểm soát', 'Phun thuốc diệt muỗi'),
        ('Cúm A', 'Phường 3', 8, 5, '2024-01-15', '2024-01-30', 'Nhẹ', 'Đang theo dõi', 'Tuyên truyền phòng bệnh'),
        ('Tay chân miệng', 'Các trường mầm non', 20, 18, '2024-01-05', '2024-01-20', 'Trung bình', 'Đã kiểm soát', 'Khử trùng trường học'),
        ('COVID-19', 'Toàn xã', 5, 4, '2024-01-20', NULL, 'Nhẹ', 'Đang theo dõi', 'Ca bệnh nhẹ, cách ly tại nhà')
      ON CONFLICT DO NOTHING
    `);

    // Seed CoSoGiaoDuc
    await queryRunner.query(`
      INSERT INTO "dashboard_xp"."CoSoGiaoDuc"
        ("TenCoSo", "LoaiHinh", "DiaChi", "SoDienThoai", "SoHocSinh", "SoGiaoVien", "TrangThai", "GhiChu")
      VALUES
        ('Trường Tiểu học Phường 1', 'Tiểu học công lập', 'Phường 1', '0901111111', 450, 25, true, 'Trường chuẩn quốc gia'),
        ('Trường Mầm non Phường 2', 'Mầm non công lập', 'Phường 2', '0902222222', 180, 15, true, 'Trường mầm non'),
        ('Trường THCS Trung tâm', 'THCS công lập', 'Phường 3', '0903333333', 520, 35, true, 'Trường THCS'),
        ('Trường Mầm non Tư thục ABC', 'Mầm non tư thục', 'Phường 1', '0904444444', 120, 10, true, 'Chuẩn quốc gia cấp độ 2')
      ON CONFLICT DO NOTHING
    `);

    // Seed LopHoc
    await queryRunner.query(`
      INSERT INTO "dashboard_xp"."LopHoc"
        ("TenLop", "Khoi", "MaCoSo", "GiaoVienChuNhiem", "SoHocSinh", "GhiChu")
      VALUES
        ('1A', 'Khối 1', 1, 'Nguyễn Thị Lan', 35, 'Lớp học năng khiếu'),
        ('2B', 'Khối 2', 1, 'Trần Văn Minh', 38, 'Lớp học bình thường'),
        ('3C', 'Khối 3', 1, 'Lê Thị Hoa', 40, ''),
        ('Lá', 'Lá', 2, 'Phạm Thị Mai', 25, 'Lớp lá nhỏ'),
        ('Chồi', 'Chồi', 2, 'Hoàng Văn Tùng', 22, 'Lớp chồi'),
        ('6A', 'Khối 6', 3, 'Vũ Thị Hương', 42, 'Lớp chuyên Toán')
      ON CONFLICT DO NOTHING
    `);

    // Seed GiaoDucTongHop
    await queryRunner.query(`
      INSERT INTO "dashboard_xp"."GiaoDucTongHop"
        ("TenTruong", "CapHoc", "DiaChi", "TenLop", "Khoi", "GiaoVien", "ChuyenMon", "TongSoHocSinh", 
         "BienDongHocSinh", "LyDoBienDong", "PhongHoc", "TrangThietBi", "TinhTrangCoSoVatChat", 
         "TinhTrangSucKhoe", "HoatDongYTe", "NgayCapNhat")
      VALUES
        ('Trường Tiểu học Phường 1', 'Tiểu học', 'Phường 1', '1A', 'Khối 1', 'Nguyễn Thị Lan', 'Toán', 35, 
         'Tăng', 'Nhập học đầu năm', 'P101', 'Bàn ghế, máy chiếu', 'Tốt', 'Bình thường', 'Không', '2024-01-15'),
        ('Trường Tiểu học Phường 1', 'Tiểu học', 'Phường 1', '2B', 'Khối 2', 'Trần Văn Minh', 'Văn', 38, 
         'Giảm', 'Chuyển trường', 'P102', 'Máy chiếu', 'Xuống cấp', 'Bình thường', 'Sốt nhẹ – sơ cứu', '2024-01-20'),
        ('Trường Mầm non Phường 2', 'Mầm non', 'Phường 2', 'Lá', 'Lá', 'Lê Thị Hoa', 'Mầm non', 25, 
         'Không đổi', 'Ổn định sĩ số', 'MN01', 'Đồ chơi trẻ em', 'Tốt', 'Theo dõi', 'Trầy xước nhẹ – sơ cứu', '2024-01-22'),
        ('Trường Mầm non Phường 2', 'Mầm non', 'Phường 2', 'Chồi', 'Chồi', 'Lê Thị Hoa', 'Mầm non', 22, 
         'Tăng', 'Trẻ mới nhập học', 'MN02', 'Giường ngủ, quạt', 'Tốt', 'Bình thường', 'Khám sức khỏe định kỳ', '2024-01-25')
      ON CONFLICT DO NOTHING
    `);

    // ================================================================
    // SEED DATA MODULE 3: KINH TẾ - THƯƠNG MẠI
    // ================================================================

    // Seed ChoDiemKinhDoanh
    await queryRunner.query(`
      INSERT INTO "dashboard_xp"."ChoDiemKinhDoanh"
        ("TenCho", "DiaChi", "LoaiHinh", "SoLo", "TongDienTich", "TrangThai", "NguoiQuanLy", "SoDienThoai", "GhiChu")
      VALUES
        ('Chợ Trung tâm Xã', 'Phường 1, Trung tâm', 'Chợ truyền thống', 120, 2500.00, 'Đang hoạt động', 'Nguyễn Văn Quản', '0901234567', 'Chợ đầu mối của xã'),
        ('Chợ Phường 2', 'Phường 2', 'Chợ nhỏ', 45, 800.00, 'Đang hoạt động', 'Trần Thị Mai', '0912345678', 'Chợ phục vụ khu dân cư'),
        ('Chợ đêm Phường 3', 'Phường 3', 'Chợ đêm', 60, 1200.00, 'Hoạt động buổi tối', 'Lê Văn Cường', '0923456789', 'Hoạt động từ 18h đến 23h'),
        ('Khu kinh doanh tự do', 'Ven quốc lộ 1', 'Tự do', 30, 600.00, 'Đang hoạt động', 'Phạm Văn Dũng', '0934567890', 'Khu vực kinh doanh dịch vụ')
      ON CONFLICT DO NOTHING
    `);

    // Seed HoKinhDoanh
    await queryRunner.query(`
      INSERT INTO "dashboard_xp"."HoKinhDoanh"
        ("TenHoKD", "ChuHo", "DiaChi", "SoDienThoai", "LoaiHinhKD", "TrangThai", "NgayDangKy")
      VALUES
        ('Quán ăn Ngon', 'Nguyễn Thị Mai', 'Số 123, Phường 1', '0901111111', 'Kinh doanh ăn uống', 'Đang hoạt động', '2023-01-15'),
        ('Tạp hóa Bình An', 'Trần Văn Bình', 'Số 456, Phường 2', '0902222222', 'Kinh doanh tạp hóa', 'Đang hoạt động', '2023-03-20'),
        ('Salon tóc Thời Trang', 'Lê Thị Cúc', 'Số 789, Phường 1', '0903333333', 'Dịch vụ làm đẹp', 'Đang hoạt động', '2023-05-10'),
        ('Xưởng may Đức Thành', 'Phạm Văn Đức', 'Số 234, Phường 3', '0904444444', 'Sản xuất may mặc', 'Đang hoạt động', '2023-07-15'),
        ('Cửa hàng điện tử ABC', 'Hoàng Văn Em', 'Số 567, Phường 2', '0905555555', 'Kinh doanh điện tử', 'Đang hoạt động', '2023-09-01'),
        ('Tiệm sửa xe Phát', 'Vũ Văn Phát', 'Số 890, Phường 1', '0906666666', 'Dịch vụ sửa chữa', 'Tạm dừng', '2023-11-20')
      ON CONFLICT DO NOTHING
    `);

    // Seed CanBoKinhTe
    await queryRunner.query(`
      INSERT INTO "dashboard_xp"."CanBoKinhTe"
        ("HoTen", "ChucVu", "SoDienThoai")
      VALUES
        ('Nguyễn Văn Kinh', 'Trưởng phòng Kinh tế', '0901234567'),
        ('Trần Thị Mai', 'Chuyên viên', '0912345678'),
        ('Lê Văn Cường', 'Chuyên viên', '0923456789'),
        ('Phạm Thị Dung', 'Nhân viên', '0934567890')
      ON CONFLICT DO NOTHING
    `);

    console.log('✅ Mock data seeded successfully (Part 1)');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Clean up seeded data
    await queryRunner.query(
      `DELETE FROM "dashboard_xp"."CanBoKinhTe" WHERE "SoDienThoai" IN ('0901234567', '0912345678', '0923456789', '0934567890')`,
    );
    await queryRunner.query(
      `DELETE FROM "dashboard_xp"."HoKinhDoanh" WHERE "TenHoKD" IN ('Quán ăn Ngon', 'Tạp hóa Bình An', 'Salon tóc Thời Trang', 'Xưởng may Đức Thành', 'Cửa hàng điện tử ABC', 'Tiệm sửa xe Phát')`,
    );
    await queryRunner.query(
      `DELETE FROM "dashboard_xp"."ChoDiemKinhDoanh" WHERE "TenCho" IN ('Chợ Trung tâm Xã', 'Chợ Phường 2', 'Chợ đêm Phường 3', 'Khu kinh doanh tự do')`,
    );
    await queryRunner.query(
      `DELETE FROM "dashboard_xp"."GiaoDucTongHop" WHERE "TenTruong" IN ('Trường Tiểu học Phường 1', 'Trường Mầm non Phường 2')`,
    );
    await queryRunner.query(
      `DELETE FROM "dashboard_xp"."LopHoc" WHERE "TenLop" IN ('1A', '2B', '3C', 'Lá', 'Chồi', '6A')`,
    );
    await queryRunner.query(
      `DELETE FROM "dashboard_xp"."CoSoGiaoDuc" WHERE "TenCoSo" LIKE 'Trường%'`,
    );
    await queryRunner.query(
      `DELETE FROM "dashboard_xp"."DichBenh" WHERE "TenDich" IN ('Sốt xuất huyết', 'Cúm A', 'Tay chân miệng', 'COVID-19')`,
    );
    await queryRunner.query(
      `DELETE FROM "dashboard_xp"."BaoTriThietBi" WHERE "MaThietBi" IN (1, 2, 3, 4)`,
    );
    await queryRunner.query(
      `DELETE FROM "dashboard_xp"."ThietBiYTe" WHERE "TenThietBi" LIKE 'Máy%'`,
    );
    await queryRunner.query(
      `DELETE FROM "dashboard_xp"."LuotKham" WHERE "MaTram" = 1`,
    );
    await queryRunner.query(
      `DELETE FROM "dashboard_xp"."NhanVienYTe" WHERE "HoTen" LIKE 'Bác sĩ%' OR "HoTen" LIKE 'Y tá%' OR "HoTen" LIKE 'Y sĩ%' OR "HoTen" LIKE 'Dược sĩ%'`,
    );
    await queryRunner.query(
      `DELETE FROM "dashboard_xp"."VanBan" WHERE "SoKyHieu" LIKE '%/QĐ-UBND' OR "SoKyHieu" LIKE '%/CV-UBND'`,
    );
    await queryRunner.query(
      `DELETE FROM "dashboard_xp"."HoTich" WHERE "so_ho_tich" LIKE 'HT-2024-%'`,
    );
  }
}
