# Field Mapping FE <-> DB (Kinh te thuong mai va Quoc phong an ninh)

## 1) Ho kinh doanh
| FE form field | DB column | Ghi chu |
|---|---|---|
| MaHoKD | MaHoKD | PK |
| SoGCN | SoGCN | So giay chung nhan |
| TenHoKD | TenHoKD | Ten ho kinh doanh |
| ChuHo | ChuHo | Chu ho |
| CCCD | CCCD | CCCD chu ho |
| NgaySinh | NgaySinh | Date |
| DiaChi | DiaChi | Dia chi thuong tru |
| DiaChiKinhDoanh | DiaChiKinhDoanh | Dia chi co so KD |
| DienThoai | DienThoai | SDT |
| Email | Email | Email |
| NganhNghe | NganhNghe | Nganh nghe |
| MaNganhNghe | MaNganhNghe | Ma nganh |
| VonKinhDoanh | VonKinhDoanh | Decimal |
| DoanhThuNam | DoanhThuNam | Decimal |
| SoLaoDong | SoLaoDong | Int |
| NgayDangKy | NgayDangKy | Date |
| NgayHetHan | NgayHetHan | Date |
| TrangThai | TrangThai | Hoat dong/Tam ngung |
| LanCapPhep | LanCapPhep | Int |
| DienTichKD | DienTichKD | Decimal |
| LoaiHinhKD | LoaiHinhKD | Loai hinh |
| GhiChu | GhiChu | Text |

## 2) Cho / Diem kinh doanh
| FE form field | DB column |
|---|---|
| MaCho | MaCho |
| MaDiemKD | MaDiemKD |
| TenDiemKD | TenDiemKD |
| LoaiHinh | LoaiHinh |
| DiaChi | DiaChi |
| DienTich | DienTich |
| SoGianHang | SoGianHang |
| SoGianDangKinhDoanh | SoGianDangKinhDoanh |
| SoGianTrong | SoGianTrong |
| DoanhThuThang | DoanhThuThang |
| ThuPhiThang | ThuPhiThang |
| BanQuanLy | BanQuanLy |
| SoDienThoai | SoDienThoai |
| NgayThanhLap | NgayThanhLap |
| TrangThai | TrangThai |
| GiayPhep | GiayPhep |
| NgayCapPhep | NgayCapPhep |
| NgayHetHan | NgayHetHan |
| CoSoHaTang | CoSoHaTang |
| AnNinhTratTu | AnNinhTratTu |
| VeSinhMoiTruong | VeSinhMoiTruong |
| GhiChu | GhiChu |

## 3) Thu phi
| FE form field | DB column |
|---|---|
| MaThuPhi | MaThuPhi |
| MaPhieuThu | MaPhieuThu |
| LoaiPhi | LoaiPhi |
| MoTa | MoTa |
| DonGia | DonGia |
| SoLuong | SoLuong |
| ThanhTien | ThanhTien |
| TenNguoiNop | TenNguoiNop |
| CCCDNguoiNop | CCCDNguoiNop |
| DiaChiNguoiNop | DiaChiNguoiNop |
| NgayThu | NgayThu |
| NguoiThu | NguoiThu |
| TrangThai | TrangThai |
| GhiChu | GhiChu |

## 4) Ho tro doanh nghiep
| FE form field | DB column |
|---|---|
| MaHoTro | MaHoTro |
| MaYC | MaYC |
| TenDoanhNghiep | TenDoanhNghiep |
| LoaiDoanhNghiep | LoaiDoanhNghiep |
| LinhVuc | LinhVuc |
| NguoiDaiDien | NguoiDaiDien |
| DienThoai | DienThoai |
| Email | Email |
| DiaChi | DiaChi |
| LoaiHoTro | LoaiHoTro |
| NoiDungYeuCau | NoiDungYeuCau |
| NgayTiepNhan | NgayTiepNhan |
| NgayHenTra | NgayHenTra |
| NgayHoanThanh | NgayHoanThanh |
| CanBoXuLy | CanBoXuLy |
| TrangThai | TrangThai |
| KetQuaXuLy | KetQuaXuLy |
| GiaTriHoTro | GiaTriHoTro |
| DanhGia | DanhGia |
| GhiChu | GhiChu |

## 5) Thong ke kinh te
| FE field | DB column |
|---|---|
| MaBaoCao | MaBaoCao |
| MaBC | MaBC |
| KyBaoCao | KyBaoCao |
| LoaiKy | LoaiKy |
| NgayBaoCao | NgayBaoCao |
| NguoiLap | NguoiLap |
| TongHoKinhDoanh | TongHoKinhDoanh |
| TongDoanhThu | TongDoanhThu |
| TongThuNganSach | TongThuNganSach |
| TangTruong | TangTruong |
| SoLuongLaoDong | SoLuongLaoDong |
| SoHoMoi | SoHoMoi |
| SoHoNgung | SoHoNgung |
| TrangThai | TrangThai |

## 6) Tam tru - Tam vang
| FE form field | DB column |
|---|---|
| MaTT (UI) | MaHoSo |
| MaDangKy | MaDangKy |
| LoaiDangKy | LoaiDangKy |
| HoTen | HoTen / HoTenNguoiKhaiBao |
| CCCD | CCCD |
| NgaySinh | NgaySinh |
| GioiTinh | GioiTinh |
| QueQuan | QueQuan |
| DiaChiThuongTru | DiaChiThuongTru |
| DiaChiTamTru | DiaChiTamTru |
| ChuHo | ChuHo |
| QuanHeVoiChuHo | QuanHeVoiChuHo |
| SoDienThoai | SoDienThoai |
| NgayDangKy | NgayDangKy / TuNgay |
| NgayHetHan | NgayHetHan / DenNgay |
| LyDo | LyDo |
| TrangThai | TrangThai / TinhTrangHoSo |
| CanBoXuLy | CanBoXuLy |
| GhiChu | GhiChu |

## 7) Vi pham
| FE form field | DB column |
|---|---|
| MaViPham | MaViPham |
| SoBienBan | SoBienBan |
| LoaiViPham | LoaiViPham |
| NgayLap | NgayLap / NgayViPham |
| DoiTuong | DoiTuong / NguoiViPham |
| CCCD | CCCD |
| DiaChi | DiaChi |
| NoiDungViPham | NoiDungViPham / TenViPham |
| DiaChiViPham | DiaChiViPham / DiaDiem |
| CanCuPhapLy | CanCuPhapLy |
| MucPhat | MucPhat |
| BieuMauXuLy | BieuMauXuLy |
| ThoiHanKhacPhuc | ThoiHanKhacPhuc |
| CanBoLap | CanBoLap |
| NguoiKy | NguoiKy |
| TrangThai | TrangThai |
| NgayXuLy | NgayXuLy |
| DaNopPhat | DaNopPhat |
| NgayNopPhat | NgayNopPhat |
| TaiPham | TaiPham |
| GhiChu | GhiChu |

## 8) Phan anh kien nghi
| FE form field | DB column |
|---|---|
| MaPhanAnh | MaPhanAnh |
| TieuDe | TieuDe |
| NoiDung | NoiDung |
| TenNguoiPhanAnh | TenNguoiPhanAnh |
| SoDienThoai | SoDienThoai |
| DiaChi | DiaChi |
| TenLinhVuc | TenLinhVuc |
| ToaDo | ToaDo |
| MucDoUuTien | MucDoUuTien |
| TrangThai | TrangThai |
| TenCanBoXuLy | TenCanBoXuLy |
| NgayTao | NgayTao |
| KetQuaXuLy | KetQuaXuLy |
| DiemDanhGia | DiemDanhGia |

## 9) Diem nong ANTT
| FE form field | DB column |
|---|---|
| MaDiemNong (UI) | MaDiem |
| MaDN | MaDN |
| TenDiaDiem | TenDiaDiem / TenDiem |
| DiaChi | DiaChi / DiaDiem |
| LoaiDiaDiem | LoaiDiaDiem |
| LoaiViPham | LoaiViPham / LoaiRuiRo |
| MucDo | MucDo / MucDoNghiemTrong |
| SoDoiTuong | SoDoiTuong |
| NgayPhatHien | NgayPhatHien |
| NgayCapNhat | NgayCapNhat |
| CanBoTheoDoi | CanBoTheoDoi |
| SoDienThoai | SoDienThoai |
| MoTa | MoTa |
| BienPhapXuLy | BienPhapXuLy |
| TrangThai | TrangThai / TinhTrang |
| ToaDoLat | ToaDoLat |
| ToaDoLng | ToaDoLng |
| GhiChu | GhiChu |

## 10) An ninh trat tu (su kien)
| FE display field | DB column |
|---|---|
| MaSK | MaSK |
| NoiDung | NoiDung |
| KhuVuc | KhuVuc |
| MucDo | MucDo |
| LoaiViPham | LoaiViPham |
| NgayPhatSinh | NgayPhatSinh |
| TrangThai | TrangThai |
| CanBo | CanBo |
