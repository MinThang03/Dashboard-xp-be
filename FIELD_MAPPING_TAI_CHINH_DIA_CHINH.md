# DOI CHIEU FIELD FORM - DB (TAI CHINH + DIA CHINH)

Tai lieu nay tong hop mapping field form frontend sang cot DB backend cho toan bo chuc nang con thuoc 2 nhom:
- Quan ly tai chinh
- Dia chinh

Can cu schema hien tai:
- `dashboard_xp.NganSach`
- `dashboard_xp.ThuaDat`
- `dashboard_xp.BienDongDat`

Can cu migration bo sung cot:
- `1774800000000-AddFinanceAndLandFormColumns.ts`

## 1) Quy uoc luu du lieu

### 1.1 Bang `dashboard_xp.NganSach`
- Dung cho cac chuc nang: Thu ngan sach, Chi ngan sach, Giai ngan, Bao cao tai chinh.
- Phan loai bang cot `LoaiBanGhi`:
  - `THU_NGAN_SACH`
  - `CHI_NGAN_SACH`
  - `GIAI_NGAN`
  - `BAO_CAO_TAI_CHINH`

### 1.2 Bang `dashboard_xp.ThuaDat`
- Dung cho cac chuc nang: Dia chinh, Cap so do, Tra cuu dat, Bao cao dat dai, Ho so ton dong.
- Phan loai bang cot `LoaiBanGhi`:
  - `DIA_CHINH`
  - `CAP_SO_DO`

### 1.3 Bang `dashboard_xp.BienDongDat`
- Dung cho cac chuc nang: Bien dong dat, Tham dinh thuc dia, Tranh chap dat.
- Phan loai bang cot `LoaiBanGhi`:
  - `BIEN_DONG_DAT`
  - `THAM_DINH_THUC_DIA`
  - `TRANH_CHAP_DAT`

## 2) Mapping chi tiet - Quan ly tai chinh

## 2.1 Theo doi thu ngan sach (`/dashboard/thu-ngan-sach`)

| Field form FE | Payload key | Cot DB | Ghi chu |
|---|---|---|---|
| Ma thu | `MaThu` | `NganSach.MaThu` | Them moi boi migration |
| Loai thu | `LoaiThu` | `NganSach.LoaiThu` | Them moi boi migration |
| Nguon thu | `NguonThu` | `NganSach.NguonThu` | Them moi boi migration |
| So tien | `SoTien` | `NganSach.SoTien` | Them moi boi migration |
| So tien ke hoach | `SoTienKeHoach` | `NganSach.SoTienKeHoach` | Them moi boi migration |
| Nguoi nop | `NguoiNop` | `NganSach.NguoiNop` | Them moi boi migration |
| Dia chi | `DiaChi` | `NganSach.DiaChi` | Them moi boi migration |
| Ngay thu | `NgayThu` | `NganSach.NgayThu` | Them moi boi migration |
| Nguoi thu | `NguoiThu` | `NganSach.NguoiThu` | Them moi boi migration |
| Trang thai | `TrangThai` | `NganSach.TrangThai` | Da co san |
| Phuong thuc | `PhuongThuc` | `NganSach.PhuongThuc` | Them moi boi migration |
| So bien lai | `SoBienLai` | `NganSach.SoBienLai` | Them moi boi migration |
| Mo ta | `MoTa` | `NganSach.MoTa` | Them moi boi migration |
| Ghi chu | `GhiChu` | `NganSach.GhiChu` | Da co/mo rong |
| Loai ban ghi | `LoaiBanGhi` | `NganSach.LoaiBanGhi` | Gia tri: `THU_NGAN_SACH` |

## 2.2 Theo doi chi ngan sach (`/dashboard/chi-ngan-sach`)

| Field form FE | Payload key | Cot DB | Ghi chu |
|---|---|---|---|
| Ma chi | `MaChi` | `NganSach.MaChi` | Them moi boi migration |
| Loai chi | `LoaiChi` | `NganSach.LoaiChi` | Them moi boi migration |
| Hang muc chi | `HangMucChi` | `NganSach.HangMucChi` | Them moi boi migration |
| Mo ta | `MoTa` | `NganSach.MoTa` | Them moi boi migration |
| So tien | `SoTien` | `NganSach.SoTien` | Them moi boi migration |
| Du toan | `DuToan` | `NganSach.DuToan` | Them moi boi migration |
| Nguoi nhan | `NguoiNhan` | `NganSach.NguoiNhan` | Them moi boi migration |
| Don vi nhan | `DonViNhan` | `NganSach.DonViNhan` | Them moi boi migration |
| Ngay chi | `NgayChi` | `NganSach.NgayChi` | Them moi boi migration |
| Nguoi duyet | `NguoiDuyetText` | `NganSach.NguoiDuyetText` | Them moi boi migration |
| Trang thai | `TrangThai` | `NganSach.TrangThai` | Da co san |
| Phuong thuc | `PhuongThuc` | `NganSach.PhuongThuc` | Them moi boi migration |
| So chung tu | `SoChungTu` | `NganSach.SoChungTu` | Them moi boi migration |
| Ghi chu | `GhiChu` | `NganSach.GhiChu` | Da co/mo rong |
| Loai ban ghi | `LoaiBanGhi` | `NganSach.LoaiBanGhi` | Gia tri: `CHI_NGAN_SACH` |

## 2.3 Giam sat tien do giai ngan (`/dashboard/giai-ngan`)

| Field form FE | Payload key | Cot DB | Ghi chu |
|---|---|---|---|
| Ma du an | `MaDuAn` | `NganSach.MaDuAn` | Them moi boi migration |
| Ten du an | `TenDuAn` | `NganSach.TenDuAn` | Them moi boi migration |
| Loai du an | `LoaiDuAn` | `NganSach.LoaiDuAn` | Them moi boi migration |
| Don vi thuc hien | `DonViThucHien` | `NganSach.DonViThucHien` | Them moi boi migration |
| Tong ke hoach | `TongKeHoach` | `NganSach.TongKeHoach` | Them moi boi migration |
| Da giai ngan | `DaGiaiNgan` | `NganSach.DaGiaiNgan` | Da co san |
| Tien do | `TienDo` | `NganSach.TienDo` | Them moi boi migration |
| Ngay bat dau | `NgayBatDau` | `NganSach.NgayBatDau` | Them moi boi migration |
| Ngay ket thuc | `NgayKetThuc` | `NganSach.NgayKetThuc` | Them moi boi migration |
| So dot giai ngan | `SoDotGiaiNgan` | `NganSach.SoDotGiaiNgan` | Them moi boi migration |
| Trang thai | `TrangThai` | `NganSach.TrangThai` | Da co san |
| Mo ta | `MoTa` | `NganSach.MoTa` | Them moi boi migration |
| Ghi chu | `GhiChu` | `NganSach.GhiChu` | Da co/mo rong |
| Loai ban ghi | `LoaiBanGhi` | `NganSach.LoaiBanGhi` | Gia tri: `GIAI_NGAN` |

## 2.4 Lap va xuat bao cao tai chinh (`/dashboard/bao-cao-tai-chinh`)

| Field form FE | Payload key | Cot DB | Ghi chu |
|---|---|---|---|
| Ten bao cao | `TenBaoCao` | `NganSach.TenBaoCao` | Them moi boi migration |
| Loai bao cao | `LoaiBaoCao` | `NganSach.LoaiBaoCao` | Them moi boi migration |
| Ky bao cao | `KyBaoCao` | `NganSach.KyBaoCao` | Them moi boi migration |
| Ngay lap | `NgayLap` | `NganSach.NgayLap` | Them moi boi migration |
| Nguoi lap | `NguoiLap` | `NganSach.NguoiLap` | Them moi boi migration |
| Trang thai | `TrangThai` | `NganSach.TrangThai` | Da co san |
| Tong thu | `TongThu` | `NganSach.TongThu` | Them moi boi migration |
| Tong chi | `TongChi` | `NganSach.TongChi` | Them moi boi migration |
| Ton quy | `TonQuy` | `NganSach.TonQuy` | Them moi boi migration |
| Ghi chu | `GhiChu` | `NganSach.GhiChu` | Da co/mo rong |
| Loai ban ghi | `LoaiBanGhi` | `NganSach.LoaiBanGhi` | Gia tri: `BAO_CAO_TAI_CHINH` |

## 2.5 Chuc nang phan tich tai chinh (khong CRUD)

### So sanh du toan (`/dashboard/so-sanh-du-toan`)
- Nguon du lieu: `NganSach` voi `LoaiBanGhi in (THU_NGAN_SACH, CHI_NGAN_SACH)`.
- Cot su dung: `SoTien`, `SoTienKeHoach`, `DuToan`, `LoaiThu`, `NguonThu`, `LoaiChi`, `HangMucChi`.

### Canh bao du toan (`/dashboard/canh-bao-du-toan`)
- Nguon du lieu: `NganSach` voi `LoaiBanGhi = CHI_NGAN_SACH`.
- Cot su dung: `DuToan`, `SoTien`, `HangMucChi`, `LoaiChi`.

### Xu huong tai chinh (`/dashboard/xu-huong-tai-chinh`)
- Nguon du lieu: `NganSach` voi `LoaiBanGhi in (THU_NGAN_SACH, CHI_NGAN_SACH)`.
- Cot su dung: `NgayThu`, `NgayChi`, `SoTien`, `NgayCapNhat`.

## 3) Mapping chi tiet - Dia chinh

## 3.1 Quan ly dia chinh (`/dashboard/dia-chinh`)

| Field form FE | Payload key | Cot DB | Ghi chu |
|---|---|---|---|
| Ma thua | `MaThua` | `ThuaDat.MaThua` | Khoa chinh |
| Ma ho so | `MaHoSo` | `ThuaDat.MaHoSo` | Them moi boi migration |
| So to | `SoTo` | `ThuaDat.SoTo` | Them moi boi migration |
| Dien tich | `DienTich` | `ThuaDat.DienTich` | Da co san |
| Loai dat | `LoaiDat` | `ThuaDat.LoaiDat` | Them moi boi migration |
| Muc dich su dung | `MucDichSuDung` | `ThuaDat.MucDichSuDung` | Them moi boi migration |
| Chu so huu | `ChuSoHuu` | `ThuaDat.ChuSoHuu` | Da co san |
| CCCD | `CCCD` | `ThuaDat.CCCD` | Them moi boi migration |
| Dia chi thua dat | `DiaChiThuaDat` | `ThuaDat.DiaChiThuaDat` | Them moi boi migration |
| Toa do X | `ToaDoX` | `ThuaDat.ToaDoX` | Them moi boi migration |
| Toa do Y | `ToaDoY` | `ThuaDat.ToaDoY` | Them moi boi migration |
| Nguon goc su dung | `NguonGocSuDung` | `ThuaDat.NguonGocSuDung` | Them moi boi migration |
| Thoi han su dung | `ThoiHanSuDung` | `ThuaDat.ThoiHanSuDung` | Them moi boi migration |
| So so do | `SoSoDo` | `ThuaDat.SoSoDo` | Them moi boi migration |
| Ngay cap so do | `NgayCapSoDo` | `ThuaDat.NgayCapSoDo` | Them moi boi migration |
| Ngay nhap lieu | `NgayNhapLieu` | `ThuaDat.NgayNhapLieu` | Them moi boi migration |
| Can bo nhap lieu | `CanBoNhapLieu` | `ThuaDat.CanBoNhapLieu` | Them moi boi migration |
| Trang thai | `TrangThai` | `ThuaDat.TrangThai` | Da co san |
| Ghi chu | `GhiChu` | `ThuaDat.GhiChu` | Da co san |
| Loai ban ghi | `LoaiBanGhi` | `ThuaDat.LoaiBanGhi` | Gia tri: `DIA_CHINH` |

## 3.2 Quan ly tinh trang cap so do (`/dashboard/cap-so-do`)

| Field form FE | Payload key | Cot DB | Ghi chu |
|---|---|---|---|
| Ma thua | `MaThua` | `ThuaDat.MaThua` | Khoa chinh |
| Ma ho so | `MaHoSo` | `ThuaDat.MaHoSo` | Them moi boi migration |
| Chu so huu | `ChuSoHuu` | `ThuaDat.ChuSoHuu` | Da co san |
| CCCD | `CCCD` | `ThuaDat.CCCD` | Them moi boi migration |
| So dien thoai | `SoDienThoai` | `ThuaDat.SoDienThoai` | Them moi boi migration |
| Dia chi thua dat | `DiaChiThuaDat` | `ThuaDat.DiaChiThuaDat` | Them moi boi migration |
| So to | `SoTo` | `ThuaDat.SoTo` | Them moi boi migration |
| Dien tich | `DienTich` | `ThuaDat.DienTich` | Da co san |
| Loai dat | `LoaiDat` | `ThuaDat.LoaiDat` | Them moi boi migration |
| Ngay nop | `NgayNop` | `ThuaDat.NgayNop` | Them moi boi migration |
| Ngay hen tra | `NgayHenTra` | `ThuaDat.NgayHenTra` | Them moi boi migration |
| Trang thai | `TrangThai` | `ThuaDat.TrangThai` | Da co san |
| Giai doan | `GiaiDoan` | `ThuaDat.GiaiDoan` | Them moi boi migration |
| Can bo tiep nhan | `CanBoTiepNhan` | `ThuaDat.CanBoTiepNhan` | Them moi boi migration |
| Can bo tham dinh | `CanBoThamDinh` | `ThuaDat.CanBoThamDinh` | Them moi boi migration |
| So so do | `SoSoDo` | `ThuaDat.SoSoDo` | Them moi boi migration |
| Ngay cap | `NgayCap` | `ThuaDat.NgayCap` | Them moi boi migration |
| Tien do | `TienDo` | `ThuaDat.TienDo` | Them moi boi migration |
| Ghi chu | `GhiChu` | `ThuaDat.GhiChu` | Da co san |
| Loai ban ghi | `LoaiBanGhi` | `ThuaDat.LoaiBanGhi` | Gia tri: `CAP_SO_DO` |

## 3.3 Theo doi bien dong dat (`/dashboard/bien-dong-dat`)

| Field form FE | Payload key | Cot DB | Ghi chu |
|---|---|---|---|
| Ma bien dong text | `MaBienDongText` | `BienDongDat.MaBienDongText` | Them moi boi migration |
| Loai bien dong | `LoaiBienDong` | `BienDongDat.LoaiBienDong` | Da co san |
| Ma thua | `MaThua` | `BienDongDat.MaThua` | Da co san |
| So to | `SoTo` | `BienDongDat.SoTo` | Them moi boi migration |
| Dien tich cu | `DienTichCu` | `BienDongDat.DienTichCu` | Da co san |
| Dien tich moi | `DienTichMoi` | `BienDongDat.DienTichMoi` | Da co san |
| Loai dat cu | `LoaiDatCu` | `BienDongDat.LoaiDatCu` | Them moi boi migration |
| Loai dat moi | `LoaiDatMoi` | `BienDongDat.LoaiDatMoi` | Them moi boi migration |
| Chu so huu cu | `ChuSoHuuCu` | `BienDongDat.ChuSoHuuCu` | Them moi boi migration |
| Chu so huu moi | `ChuSoHuuMoi` | `BienDongDat.ChuSoHuuMoi` | Them moi boi migration |
| CCCD cu | `CCCDCu` | `BienDongDat.CCCDCu` | Them moi boi migration |
| CCCD moi | `CCCDMoi` | `BienDongDat.CCCDMoi` | Them moi boi migration |
| Ngay de nghi | `NgayDeNghi` | `BienDongDat.NgayDeNghi` | Them moi boi migration |
| Ngay duyet | `NgayDuyet` | `BienDongDat.NgayDuyet` | Them moi boi migration |
| Trang thai | `TrangThai` | `BienDongDat.TrangThai` | Them moi boi migration |
| Can bo xu ly | `CanBoXuLy` | `BienDongDat.CanBoXuLy` | Them moi boi migration |
| Ly do | `LyDo` | `BienDongDat.LyDo` | Da co san |
| Ghi chu | `GhiChu` | `BienDongDat.GhiChu` | Them moi boi migration |
| Loai ban ghi | `LoaiBanGhi` | `BienDongDat.LoaiBanGhi` | Gia tri: `BIEN_DONG_DAT` |

## 3.4 Tham dinh thuc dia (`/dashboard/tham-dinh-thuc-dia`)

| Field form FE | Payload key | Cot DB | Ghi chu |
|---|---|---|---|
| Ma tham dinh | `MaBienDongText` | `BienDongDat.MaBienDongText` | Dung chung ID text |
| Ma ho so | `MaHoSo` | `BienDongDat.MaHoSo` | Them moi boi migration |
| Dia chi | `DiaChiThuaDat` | `BienDongDat.DiaChiThuaDat` | Them moi boi migration |
| Ma thua | `MaThua` | `BienDongDat.MaThua` | Da co san |
| So to | `SoTo` | `BienDongDat.SoTo` | Them moi boi migration |
| Loai tham dinh | `LoaiThamDinh` | `BienDongDat.LoaiThamDinh` | Them moi boi migration |
| Ngay tham dinh | `NgayThamDinh` | `BienDongDat.NgayThamDinh` | Them moi boi migration |
| Can bo tham dinh | `CanBoThamDinh` | `BienDongDat.CanBoThamDinh` | Them moi boi migration |
| Don vi tham dinh | `DonViThamDinh` | `BienDongDat.DonViThamDinh` | Them moi boi migration |
| DT ho so | `DienTichHoSo` | `BienDongDat.DienTichHoSo` | Them moi boi migration |
| DT thuc te | `DienTichThucTe` | `BienDongDat.DienTichThucTe` | Them moi boi migration |
| Trang thai | `TrangThai` | `BienDongDat.TrangThai` | Them moi boi migration |
| Ket qua tham dinh | `KetQuaThamDinh` | `BienDongDat.KetQuaThamDinh` | Them moi boi migration |
| Mo ta sai lech | `MoTaSaiLech` | `BienDongDat.MoTaSaiLech` | Them moi boi migration |
| So anh chung cu | `HinhAnhChungCu` | `BienDongDat.HinhAnhChungCu` | Them moi boi migration |
| De xuat xu ly | `DeXuatXuLy` | `BienDongDat.DeXuatXuLy` | Them moi boi migration |
| Ghi chu | `GhiChu` | `BienDongDat.GhiChu` | Them moi boi migration |
| Loai ban ghi | `LoaiBanGhi` | `BienDongDat.LoaiBanGhi` | Gia tri: `THAM_DINH_THUC_DIA` |

## 3.5 Tranh chap dat (`/dashboard/tranh-chap`)

| Field form FE | Payload key | Cot DB | Ghi chu |
|---|---|---|---|
| Ma vu | `MaVu` | `BienDongDat.MaVu` | Them moi boi migration |
| Loai tranh chap | `LoaiTranhChap` | `BienDongDat.LoaiTranhChap` | Them moi boi migration |
| Ma thua | `MaThua` | `BienDongDat.MaThua` | Da co san |
| So to | `SoTo` | `BienDongDat.SoTo` | Them moi boi migration |
| Dia chi thua dat | `DiaChiThuaDat` | `BienDongDat.DiaChiThuaDat` | Them moi boi migration |
| Dien tich tranh chap | `DienTichTranhChap` | `BienDongDat.DienTichTranhChap` | Them moi boi migration |
| Ben khieu nai | `BenKhieuNai` | `BienDongDat.BenKhieuNai` | Them moi boi migration |
| CCCD khieu nai | `CCCDKhieuNai` | `BienDongDat.CCCDKhieuNai` | Them moi boi migration |
| SDT khieu nai | `SDTKhieuNai` | `BienDongDat.SDTKhieuNai` | Them moi boi migration |
| Ben bi khieu nai | `BenBiKhieuNai` | `BienDongDat.BenBiKhieuNai` | Them moi boi migration |
| CCCD bi khieu nai | `CCCDBiKhieuNai` | `BienDongDat.CCCDBiKhieuNai` | Them moi boi migration |
| Ngay khieu nai | `NgayKhieuNai` | `BienDongDat.NgayKhieuNai` | Them moi boi migration |
| Noi dung | `NoiDung` | `BienDongDat.NoiDung` | Them moi boi migration |
| Muc do | `MucDo` | `BienDongDat.MucDo` | Them moi boi migration |
| Trang thai | `TrangThai` | `BienDongDat.TrangThai` | Them moi boi migration |
| Can bo thu ly | `CanBoThuLy` | `BienDongDat.CanBoThuLy` | Them moi boi migration |
| Phuong an giai quyet | `PhuongAnGiaiQuyet` | `BienDongDat.PhuongAnGiaiQuyet` | Them moi boi migration |
| Ngay giai quyet | `NgayGiaiQuyet` | `BienDongDat.NgayGiaiQuyet` | Them moi boi migration |
| Ket qua giai quyet | `KetQuaGiaiQuyet` | `BienDongDat.KetQuaGiaiQuyet` | Them moi boi migration |
| Ghi chu | `GhiChu` | `BienDongDat.GhiChu` | Them moi boi migration |
| Loai ban ghi | `LoaiBanGhi` | `BienDongDat.LoaiBanGhi` | Gia tri: `TRANH_CHAP_DAT` |

## 3.6 Chuc nang bao cao/tra cuu dia chinh (khong CRUD)

### Tra cuu dat (`/dashboard/tra-cuu-dat`)
- Nguon du lieu: `ThuaDat` (tat ca loai ban ghi).
- Cot su dung: `MaThua`, `SoTo`, `DiaChiThuaDat`, `DienTich`, `LoaiDat`, `MucDichSuDung`, `ChuSoHuu`, `CCCD`, `SoSoDo`, `NgayCapSoDo`, `TrangThaiPhapLy`, `ToaDoX`, `ToaDoY`, `HanCheSuDung`.

### Ho so ton dong (`/dashboard/ho-so-ton-dong`)
- Nguon du lieu: `ThuaDat` voi `LoaiBanGhi = CAP_SO_DO`.
- Cot su dung: `MaHoSo`, `ChuSoHuu`, `NgayNop`, `NgayHenTra`, `TrangThai`, `CanBoThamDinh`, `CanBoTiepNhan`, `GhiChu`, `SoSoDo`.
- Chi so tinh toan: `SoNgayTonDong`, `MucDoQuaHan`.

### Bao cao dat dai (`/dashboard/bao-cao-dat-dai`)
- Nguon du lieu: `ThuaDat` (tat ca loai ban ghi).
- Cot su dung: `LoaiDat`, `DienTich`, `SoSoDo`, `TrangThai`, `LoaiBanGhi`, `NgayNhapLieu`.
- Chi so tinh toan: tong dien tich, da cap/chua cap, co cau theo loai dat.

## 4) Danh sach cot bo sung boi migration 1774800000000

- NganSach: bo sung day du cot cho 4 nhom form tai chinh (thu, chi, giai ngan, bao cao).
- ThuaDat: bo sung day du cot cho dia chinh/cap so do/tra cuu.
- BienDongDat: bo sung day du cot cho bien dong/tham dinh/tranh chap.

Ket luan: cac field form chinh cua nhom Tai chinh + Dia chinh da co cot DB tuong ung; frontend da map payload day du vao backend CRUD.
