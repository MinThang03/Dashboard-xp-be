# Doi Chieu Field Form <-> DB (7 danh muc Y te - Giao duc)

## 1) Tram Y Te (`dashboard_xp.TramYTe`)

| Form field | DB column | Trang thai |
|---|---|---|
| MaTram | MaTram | Da co |
| TenTram | TenTram | Da co |
| DiaChi | DiaChi | Da co |
| SoDienThoai | SoDienThoai | Da co |
| SoNhanVien | SoNhanVien | Da co |
| SoLuotKhamThang | SoLuotKhamThang | Da co |
| TrangThai | TrangThai | Da co |
| GhiChu | GhiChu | Da co |
| NgayTao | NgayTao | Da co |

## 2) Dich Benh (`dashboard_xp.DichBenh`)

| Form field | DB column | Trang thai |
|---|---|---|
| MaCa | MaCa | Moi bo sung |
| TenBenh | TenDich + TenBenh | `TenDich` da co, `TenBenh` luu qua map |
| LoaiBenh | LoaiBenh | Moi bo sung |
| MaDonViBenh | MaDonViBenh | Moi bo sung |
| MaBenhNhan | MaBenhNhan | Moi bo sung |
| TenBenhNhan | TenBenhNhan | Moi bo sung |
| GioiTinh | GioiTinh | Moi bo sung |
| NamSinh | NamSinh | Moi bo sung |
| DiaChi | DiaChi | Moi bo sung |
| SoDienThoai | SoDienThoai | Moi bo sung |
| NgayKhoiPhat | NgayKhoiPhat | Moi bo sung |
| NgayPhatHien | NgayPhatHien | Moi bo sung |
| NgayBaoCao | NgayBaoCao | Moi bo sung |
| TrieuChung | TrieuChung | Moi bo sung |
| MucDoBenh | MucDo + MucDoBenh | `MucDo` da co, `MucDoBenh` map |
| TrangThaiDieuTri | TrangThai + TrangThaiDieuTri | `TrangThai` da co, `TrangThaiDieuTri` moi bo sung |
| NoiDieuTri | NoiDieuTri | Moi bo sung |
| NguoiTiepXuc | NguoiTiepXuc | Moi bo sung |
| KhuVucPhatHien | KhuVuc + KhuVucPhatHien | `KhuVuc` da co, `KhuVucPhatHien` moi bo sung |
| ToaDo | ToaDo | Moi bo sung |
| BienPhapXuLy | BienPhapXuLy | Moi bo sung |
| NguoiBaoCao | NguoiBaoCao | Moi bo sung |
| GhiChu | GhiChu | Da co |

## 3) Tiem Chung (`dashboard_xp.TiemChung`)

| Form field | DB column | Trang thai |
|---|---|---|
| MaTiemChung | MaTiemChung | Da co |
| MaPhieu | MaPhieu | Moi bo sung |
| MaDoiTuong | MaDoiTuong | Moi bo sung |
| TenDoiTuong | TenDoiTuong | Moi bo sung |
| NgaySinh | NgaySinh | Moi bo sung |
| GioiTinh | GioiTinh | Moi bo sung |
| TenChaMeBaoHo | TenChaMeBaoHo | Moi bo sung |
| SoDienThoai | SoDienThoai | Moi bo sung |
| DiaChi | DiaChi | Moi bo sung |
| LoaiDoiTuong | LoaiDoiTuong | Moi bo sung |
| TenVacXin | TenVacXin | Moi bo sung |
| LoaiVacXin | LoaiVacXin + LoaiVacxin | Moi bo sung (`LoaiVacxin` da co tu bang cu) |
| MuiThu | MuiThu | Moi bo sung |
| TongSoMui | TongSoMui | Moi bo sung |
| NgayTiem | NgayTiem | Moi bo sung |
| ViTriTiem | ViTriTiem | Moi bo sung |
| SoLo | SoLo | Moi bo sung |
| NguoiTiem | NguoiTiem | Moi bo sung |
| MaTrangThai | MaTrangThai | Moi bo sung |
| TrangThai | TrangThai | Da co |
| PhanUngSauTiem | PhanUngSauTiem | Moi bo sung |
| NgayHenTiemKe | NgayHenTiemKe | Moi bo sung |
| GhiChu | GhiChu | Da co |

## 4) Kham Benh (`dashboard_xp.PhieuKham`)

| Form field | DB column | Trang thai |
|---|---|---|
| MaPhieuKham | MaPhieuKham | Da co |
| MaPhieu | MaPhieu | Moi bo sung |
| TenBenhNhan | TenBenhNhan + HoTenBenhNhan | Moi bo sung + map voi cot cu |
| NgaySinh | NgaySinh | Moi bo sung |
| GioiTinh | GioiTinh | Moi bo sung |
| CCCD | CCCD | Moi bo sung |
| SoDienThoai | SoDienThoai | Moi bo sung |
| DiaChi | DiaChi | Moi bo sung |
| MaBHYT | MaBHYT | Moi bo sung |
| NgayKham | NgayKham | Da co |
| TrieuChung | TrieuChung | Da co |
| NhietDo | NhietDo | Moi bo sung |
| HuyetAp | HuyetAp | Moi bo sung |
| NhipTim | NhipTim | Moi bo sung |
| CanNang | CanNang | Moi bo sung |
| ChieuCao | ChieuCao | Moi bo sung |
| ChuanDoan | ChanDoan | Da co (map ten field) |
| PhuongPhapDieuTri | PhuongPhapDieuTri | Moi bo sung |
| DonThuoc | DonThuoc | Da co |
| BacSiKham | BacSiKham + BacSiXuLy | Moi bo sung + map voi cot cu |
| MaTrangThai | MaTrangThai | Moi bo sung |
| TrangThai | TrangThai | Da co |
| NgayTaiKham | NgayTaiKham | Moi bo sung |
| PhiKham | PhiKham + ChiPhi | Moi bo sung + map voi cot cu |
| BHYTChiTra | BHYTChiTra | Moi bo sung |
| GhiChu | GhiChu | Da co |

## 5) Co So Giao Duc (`dashboard_xp.CoSoGiaoDuc`)

| Form field | DB column | Trang thai |
|---|---|---|
| MaCoSo | MaCoSo | Da co |
| MaTruong | MaTruong | Moi bo sung |
| TenTruong | TenTruong + TenCoSo | Moi bo sung + map voi cot cu |
| LoaiTruong | LoaiTruong + LoaiHinh | Moi bo sung + map voi cot cu |
| DiaChi | DiaChi | Da co |
| DienThoai | DienThoai + SoDienThoai | Moi bo sung + map voi cot cu |
| Email | Email | Moi bo sung |
| HieuTruong | HieuTruong | Moi bo sung |
| NamThanhLap | NamThanhLap | Moi bo sung |
| DienTich | DienTich | Moi bo sung |
| SoPhongHoc | SoPhongHoc | Moi bo sung |
| SoPhongChucNang | SoPhongChucNang | Moi bo sung |
| SoGiaoVien | SoGiaoVien | Da co |
| SoHocSinh | SoHocSinh | Da co |
| TrangThietBi | TrangThietBi | Moi bo sung |
| TinhTrangCoSo | TinhTrangCoSo | Moi bo sung |
| DatChuan | DatChuan | Moi bo sung |
| XepLoai | XepLoai | Moi bo sung |
| NgayCapNhat | NgayCapNhat | Moi bo sung |
| GhiChu | GhiChu | Da co |

## 6) Si So Hoc Sinh (`dashboard_xp.LopHoc`)

| Form field | DB column | Trang thai |
|---|---|---|
| MaSiSo | MaLop | Map khoa chinh |
| MaLop | MaLopCode | Moi bo sung |
| TenLop | TenLop | Da co |
| TenTruong | TenTruong | Moi bo sung |
| MaTruong | MaTruong | Moi bo sung |
| LoaiTruong | LoaiTruong | Moi bo sung |
| GiaoVienChuNhiem | GiaoVienChuNhiem | Da co |
| NamHoc | NamHoc | Moi bo sung |
| HocKy | HocKy | Moi bo sung |
| SiSoDauNam | SiSoDauNam | Moi bo sung |
| SiSoHienTai | SiSoHienTai + SoHocSinh | Moi bo sung + map voi cot cu |
| Nam | Nam | Moi bo sung |
| Nu | Nu | Moi bo sung |
| CoMatHomNay | CoMatHomNay | Moi bo sung |
| VangCoPhep | VangCoPhep | Moi bo sung |
| VangKhongPhep | VangKhongPhep | Moi bo sung |
| TyLeDiHoc | TyLeDiHoc | Moi bo sung |
| NgayCapNhat | NgayCapNhat | Moi bo sung |
| GhiChu | GhiChu | Da co |

## 7) Tong Hop Giao Duc (Dashboard)

Nguon tong hop khong ghi truc tiep vao 1 bang rieng trong FE hien tai, ma duoc lay tu:
- `dashboard_xp.CoSoGiaoDuc`: so truong, so phong hoc, tong HS, tong GV, dat chuan
- `dashboard_xp.LopHoc`: ty le di hoc, si so theo loai truong

KPI dashboard hien duoc tinh tu dong tren FE tu du lieu 2 bang tren.
