# FIELD MAPPING - DIA CHINH & VAN HOA DU LICH

Tai lieu nay doi chieu field form frontend voi cot DB backend cho cac chuc nang con thuoc:
- Dia chinh
- Van hoa du lich

Trang thai:
- `OK`: cot da ton tai va da map API
- `MIG-177480`: cot duoc bo sung boi migration `1774800000000-AddMissingColumnsDiaChinhVanHoaForms.ts`
- `READ-ONLY`: trang bao cao/tra cuu, khong co CRUD form

## 1) DIA CHINH

### 1.1 Quan ly dia chinh (`/dashboard/dia-chinh`) -> `dashboard_xp.ThuaDat`
| Form field | DB column | Status |
|---|---|---|
| MaThua | MaThua | OK |
| MaHoSo | MaHoSo | OK |
| SoTo | SoTo / SoToBanDo | OK |
| DienTich | DienTich | OK |
| LoaiDat | LoaiDat | OK |
| MucDichSuDung | MucDichSuDung | OK |
| ChuSoHuu | ChuSoHuu | OK |
| CCCD | CCCD | OK |
| DiaChiThuaDat | DiaChiThuaDat | OK |
| ToaDoX | ToaDoX | OK |
| ToaDoY | ToaDoY | OK |
| NguonGocSuDung | NguonGocSuDung | OK |
| ThoiHanSuDung | ThoiHanSuDung | OK |
| SoSoDo | SoSoDo | OK |
| NgayCapSoDo | NgayCapSoDo | OK |
| NgayNhapLieu | NgayNhapLieu | OK |
| CanBoNhapLieu | CanBoNhapLieu | OK |
| TrangThai | TrangThai | OK |
| GhiChu | GhiChu | OK |
| LoaiBanGhi (phan loai chuc nang) | LoaiBanGhi | OK |

### 1.2 Bien dong dat (`/dashboard/bien-dong-dat`) -> `dashboard_xp.BienDongDat`
| Form field | DB column | Status |
|---|---|---|
| MaBienDong | MaBienDong | OK |
| MaThua | MaThua | OK |
| LoaiBienDong | LoaiBienDong | OK |
| NgayBienDong | NgayBienDong | OK |
| LoaiDatCu | LoaiDatCu | OK |
| LoaiDatMoi | LoaiDatMoi | OK |
| DienTichCu | DienTichCu | OK |
| DienTichMoi | DienTichMoi | OK |
| ChuSoHuuCu | ChuSoHuuCu | OK |
| ChuSoHuuMoi | ChuSoHuuMoi | OK |
| LyDoBienDong | LyDoBienDong | OK |
| NguoiThucHien | NguoiThucHien | OK |
| TaiLieuDinhKem | TaiLieuDinhKem | OK |
| TrangThai | TrangThai | OK |
| GhiChu | GhiChu | OK |
| LoaiBanGhi (tham dinh/tranh chap/...) | LoaiBanGhi | OK |

### 1.3 Cap so do (`/dashboard/cap-so-do`) -> `dashboard_xp.ThuaDat`
| Form field | DB column | Status |
|---|---|---|
| MaHoSo | MaHoSo | OK |
| MaThua | MaThua | OK |
| SoSoDo | SoSoDo | OK |
| NgayCapSoDo | NgayCapSoDo | OK |
| NguoiNopHoSo | NguoiNopHoSo | OK |
| SoDienThoai | SoDienThoai | OK |
| DiaChiThuongTru | DiaChiThuongTru | OK |
| NgayHenTra | NgayHenTra | OK |
| CanBoXuLy | CanBoXuLy | OK |
| MucDoUuTien | MucDoUuTien | OK |
| TienDoPhanTram | TienDoPhanTram | OK |
| LoaiBanGhi=CAP_SO_DO | LoaiBanGhi | OK |

### 1.4 Tham dinh thuc dia (`/dashboard/tham-dinh-thuc-dia`) -> `dashboard_xp.BienDongDat`
| Form field | DB column | Status |
|---|---|---|
| MaHoSo | MaHoSo | OK |
| MaThua | MaThua | OK |
| NgayThamDinh | NgayThamDinh | OK |
| NguoiThamDinh | NguoiThamDinh | OK |
| KetQuaThamDinh | KetQuaThamDinh | OK |
| GhiChuThamDinh | GhiChuThamDinh | OK |
| LoaiBanGhi=THAM_DINH_THUC_DIA | LoaiBanGhi | OK |

### 1.5 Tranh chap dat (`/dashboard/tranh-chap`) -> `dashboard_xp.BienDongDat`
| Form field | DB column | Status |
|---|---|---|
| MaHoSo | MaHoSo | OK |
| MaThua | MaThua | OK |
| BenA | BenA | OK |
| BenB | BenB | OK |
| NoiDungTranhChap | NoiDungTranhChap | OK |
| NgayTiepNhan | NgayTiepNhan | OK |
| HuongGiaiQuyet | HuongGiaiQuyet | OK |
| TrangThai | TrangThai | OK |
| LoaiBanGhi=TRANH_CHAP_DAT | LoaiBanGhi | OK |

### 1.6 Rui ro quy hoach (`/dashboard/rui-ro-quy-hoach`) -> `dashboard_xp.RuiRoQuyHoach`
| Form field | DB column | Status |
|---|---|---|
| MaPhanTich | MaPhanTich | MIG-177480 |
| KhuVuc | KhuVuc | MIG-177480 |
| DiaChi | DiaChi | MIG-177480 |
| MaThua | MaThua | MIG-177480 |
| SoTo | SoTo | MIG-177480 |
| LoaiRuiRo | LoaiRuiRo | MIG-177480 |
| MucDoRuiRo | MucDoNghiemTrong (entity alias) | OK |
| XacSuat | XacSuat | MIG-177480 |
| DoTinCayAI | DoTinCayAI | MIG-177480 |
| MoTaRuiRo | MoTaRuiRo | OK (mo rong nullability) |
| NguyenNhan | NguyenNhan | MIG-177480 |
| KhuyenNghiAI | BienPhapXuLy (entity alias) | OK |
| TrangThai | TrangThai | OK |
| NgayPhanTich | NgayPhatHien (entity alias) | OK |
| NgayCapNhat | NgayCapNhat | MIG-177480 |
| GhiChu | GhiChu | OK |

### 1.7 Cac trang read-only Dia chinh
| Page | Ghi chu |
|---|---|
| `/dashboard/tra-cuu-dat` | READ-ONLY |
| `/dashboard/ho-so-ton-dong` | READ-ONLY |
| `/dashboard/bao-cao-dat-dai` | READ-ONLY |

## 2) VAN HOA DU LICH

### 2.1 Di tich (`/dashboard/di-tich`) -> `dashboard_xp.DiTich`
| Form field | DB column | Status |
|---|---|---|
| TenDiTich | TenDiTich | OK |
| DiaChi | DiaChi | OK |
| CapDo | CapXepHang (map API) | OK |
| LoaiDiTich | LoaiDiTich | OK |
| NamXayDung | NamXayDung | MIG-177480 |
| TinhTrang | TinhTrang | OK |
| LuotKhachThang | LuotKhachThang | MIG-177480 |
| MoTa | MoTa | OK |
| NgayCapNhat | NgayCapNhat | MIG-177480 |
| KeHoachTuBo | KeHoachTuBo | OK |

### 2.2 Ho so di tich (`/dashboard/ho-so-di-tich`) -> `dashboard_xp.HoSoDiTich`
| Form field | DB column | Status |
|---|---|---|
| TenDiTich | TenDiTich | MIG-177480 |
| CapDo | CapDo | MIG-177480 |
| LoaiHoSo | LoaiHoSo | OK |
| TrangThai | TrangThai | MIG-177480 |
| NgayNop | NgayNop | MIG-177480 |
| NgayDuyet | NgayDuyet | MIG-177480 |
| NguoiNop | NguoiNop | MIG-177480 |
| TaiLieu | TaiLieu | MIG-177480 |
| GhiChu | GhiChu | MIG-177480 |
| MaDiTich | MaDiTich | OK (drop NOT NULL boi migration) |

### 2.3 Kinh doanh du lich (`/dashboard/kinh-doanh-du-lich`) -> `dashboard_xp.CoSoKinhDoanhDuLich`
| Form field | DB column | Status |
|---|---|---|
| MaCoSo | MaCoSoCode | MIG-177480 |
| TenCoSo | TenCoSo | OK |
| LoaiHinh | LoaiHinh | OK |
| PhanLoai | PhanLoai | MIG-177480 |
| ChuSoHuu | ChuCoSo (map API) | OK |
| DienThoai | SoDienThoai (map API) | OK |
| Email | Email | MIG-177480 |
| DiaChi | DiaChi | OK |
| SoPhong | SoPhong | MIG-177480 |
| SucChua | SucChua | MIG-177480 |
| SaoXepHang | SaoXepHang | MIG-177480 |
| GiayCN | GiayCN | MIG-177480 |
| NgayCapPhep | NgayCapPhep | OK |
| NgayHetHan | NgayHetHan | MIG-177480 |
| DoanhThuThang | DoanhThuThang | MIG-177480 |
| LuotKhachThang | LuotKhachThang | MIG-177480 |
| DanhGiaTB | DanhGiaTB | MIG-177480 |
| TrangThai | TrangThai | OK |
| TienIch | TienIch | MIG-177480 |
| TinhTrangCapPhep | TinhTrangCapPhep | OK |
| DieuKienKinhDoanh | DieuKienKinhDoanh | OK |
| GhiChu | GhiChu | MIG-177480 |

### 2.4 Lang nghe (`/dashboard/lang-nghe`) -> `dashboard_xp.LangNghe`
| Form field | DB column | Status |
|---|---|---|
| MaLN | MaLN | MIG-177480 |
| TenLangNghe | TenLangNghe | OK |
| NgheNghiep | LoaiNghe (map API) | OK |
| LoaiNgheNghiep | LoaiNgheNghiep | MIG-177480 |
| DiaChi | DiaChi | OK |
| DienTich | DienTich | MIG-177480 |
| SoHoNghe | SoHoNghe | OK |
| SoNgheNhan | SoNgheNhan | MIG-177480 |
| SoLaoDong | SoLaoDong | MIG-177480 |
| DoanhThuNam | DoanhThuNam | MIG-177480 |
| NamThanhLap | NamThanhLap | MIG-177480 |
| DanhHieu | DanhHieu | MIG-177480 |
| NamCongNhan | NamCongNhan | MIG-177480 |
| TrangThai (UI) | TinhTrang (map API) | MIG-177480 |
| SanPhamChinh | SanPhamChinh | OK |
| ThiTruong | ThiTruong | MIG-177480 |
| HoTro | HoTro | MIG-177480 |
| MoTa | MoTa | MIG-177480 |
| LienHe | LienHe | MIG-177480 |
| DienThoai | DienThoai | MIG-177480 |
| GhiChu | GhiChu | MIG-177480 |
| SanLuongThang | SanLuongThang | OK |
| ChungNhan | ChungNhan | OK |

### 2.5 Le hoi su kien (`/dashboard/le-hoi`) -> `dashboard_xp.LeHoi`
| Form field | DB column | Status |
|---|---|---|
| TenLeHoi | TenLeHoi | OK |
| DiaDiem | DiaDiem | OK |
| ThoiGian | ThoiGianToChuc (map API) | OK |
| QuyMo | SoLuongKhach (map API) | OK |
| DuKien | SoLuongDuKien | MIG-177480 |
| TrangThai | TrangThai | OK |
| LoaiLeHoi | LoaiLeHoi | MIG-177480 |
| NguoiChuTri | NguoiChuTri | MIG-177480 |
| KinhPhi | ChiPhiToChuc (map API) | OK |
| MoTa | MoTa | OK |
| DanhGiaSauSuKien | DanhGiaSauSuKien | OK |

### 2.6 Cac trang read-only Van hoa du lich
| Page | Ghi chu |
|---|---|
| `/dashboard/bao-cao-van-hoa` | READ-ONLY |

## 3) Migration bo sung cot thieu

- Migration: `migrations/1774800000000-AddMissingColumnsDiaChinhVanHoaForms.ts`
- Muc tieu:
  - Bo sung cot thieu cho `DiTich`, `HoSoDiTich`, `LeHoi`, `LangNghe`, `CoSoKinhDoanhDuLich`, `RuiRoQuyHoach`
  - Nới rang buoc `NOT NULL` mot so cot de phu hop form frontend hien tai:
    - `HoSoDiTich.MaDiTich`
    - `RuiRoQuyHoach.MaQuyHoach`
    - `RuiRoQuyHoach.MoTaRuiRo`
