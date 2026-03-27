$ErrorActionPreference = 'Stop'
$base = 'http://localhost:3006/api'
$results = @()

function Get-ErrorMessage($err) {
  if ($err.ErrorDetails -and $err.ErrorDetails.Message) {
    return $err.ErrorDetails.Message
  }
  if ($err.Exception -and $err.Exception.Message) {
    return $err.Exception.Message
  }
  return 'Unknown error'
}

$tests = @(
  @{
    name = 'ho-so-cap-phep-xay-dung'
    id = 'MaHoSo'
    create = @{
      LoaiCongTrinh = 'Nha o rieng le'
      LoaiGiayPhep = 'Xay dung moi'
      ChuDauTu = 'Nguyen Van A'
      CCCD = '079123456789'
      SoDienThoai = '0901001001'
      DiaChi = 'KP1, Phuong Test'
      DiaChiCongTrinh = 'Thua 12 To 8 KP1'
      MaThua = '12'
      SoTo = '8'
      DienTichXayDung = 80.5
      DienTichSan = 160.75
      SoTang = 2
      ChieuCao = 9.5
      NgayNop = '2026-03-27'
      NgayHenTra = '2026-04-10'
      TrangThai = 'Cho xu ly'
      CanBoTiepNhan = 'Can bo 1'
      CanBoThamDinh = 'Can bo 2'
      SoGiayPhep = 'GPXD-001'
      NgayCapPhep = '2026-04-12'
      ThoiHanPhep = '12 thang'
      GhiChu = 'Smoke full fields create'
    }
    update = @{
      LoaiCongTrinh = 'Nha pho'
      LoaiGiayPhep = 'Sua chua cai tao'
      ChuDauTu = 'Tran Thi B'
      CCCD = '079987654321'
      SoDienThoai = '0902002002'
      DiaChi = 'KP2, Phuong Test'
      DiaChiCongTrinh = 'Thua 15 To 9 KP2'
      MaThua = '15'
      SoTo = '9'
      DienTichXayDung = 95.0
      DienTichSan = 190.0
      SoTang = 3
      ChieuCao = 11.2
      NgayNop = '2026-04-01'
      NgayHenTra = '2026-04-20'
      TrangThai = 'Dang tham dinh'
      CanBoTiepNhan = 'Can bo 3'
      CanBoThamDinh = 'Can bo 4'
      SoGiayPhep = 'GPXD-001-UPD'
      NgayCapPhep = '2026-04-22'
      ThoiHanPhep = '24 thang'
      GhiChu = 'Smoke full fields update'
    }
  },
  @{
    name = 'theo-doi-trat-tu-xay-dung'
    id = 'MaTheoDoi'
    create = @{
      MaKiemTra = 'KT-001'
      DiaChi = 'KP1, Phuong Test'
      MaThua = '21'
      SoTo = '4'
      LoaiCongTrinh = 'Nha o'
      ChuDauTu = 'Nguyen Van C'
      CCCD = '079111111111'
      SoDienThoai = '0903003003'
      SoGiayPhep = 'GPXD-TT-001'
      NgayCapPhep = '2026-01-15'
      TinhTrangGiayPhep = 'Con hieu luc'
      NoiDungKiemTra = 'Kiem tra dinh ky'
      NgayKiemTra = '2026-03-27'
      CanBoKiemTra = 'Can bo TTXD'
      KetQuaKiemTra = 'Dung noi dung giay phep'
      LoaiViPham = 'Khong'
      MucDo = 'Nhe'
      BienPhapXuLy = 'Nhac nho'
      ThoiHanKhacPhuc = '2026-04-05'
      TrangThaiXuLy = 'Dang xu ly'
      GhiChu = 'Smoke full fields create'
    }
    update = @{
      MaKiemTra = 'KT-001-UPD'
      DiaChi = 'KP3, Phuong Test'
      MaThua = '22'
      SoTo = '5'
      LoaiCongTrinh = 'Nha pho'
      ChuDauTu = 'Le Thi D'
      CCCD = '079222222222'
      SoDienThoai = '0904004004'
      SoGiayPhep = 'GPXD-TT-002'
      NgayCapPhep = '2026-02-20'
      TinhTrangGiayPhep = 'Sap het han'
      NoiDungKiemTra = 'Kiem tra dot xuat'
      NgayKiemTra = '2026-04-10'
      CanBoKiemTra = 'Can bo TTXD 2'
      KetQuaKiemTra = 'Can khac phuc mot phan'
      LoaiViPham = 'Sai noi dung'
      MucDo = 'Trung binh'
      BienPhapXuLy = 'Lap bien ban'
      ThoiHanKhacPhuc = '2026-04-20'
      TrangThaiXuLy = 'Da khac phuc'
      GhiChu = 'Smoke full fields update'
    }
  },
  @{
    name = 'ha-tang-do-thi'
    id = 'MaHaTang'
    create = @{
      TenHangMuc = 'Tuyen duong A'
      LoaiHaTang = 'Duong giao thong'
      ViTri = 'Truc chinh KP1'
      TinhTrang = 'Tot'
      ChieuDai = 1250.5
      KichThuoc = 'Rong 7m'
      NamXayDung = 2020
      LanSuaChua = '2025-10-01'
      GhiChu = 'Smoke full fields create'
    }
    update = @{
      TenHangMuc = 'Tuyen duong A1'
      LoaiHaTang = 'Duong giao thong'
      ViTri = 'Truc chinh KP2'
      TinhTrang = 'Can bao tri'
      ChieuDai = 1300.0
      KichThuoc = 'Rong 7.5m'
      NamXayDung = 2021
      LanSuaChua = '2026-01-15'
      GhiChu = 'Smoke full fields update'
    }
  },
  @{
    name = 'xay-dung-trai-phep'
    id = 'MaViPham'
    create = @{
      MaVuViec = 'VVP-001'
      DiaChi = 'KP4, Phuong Test'
      MaThua = '35'
      SoTo = '11'
      ChuCongTrinh = 'Pham Van E'
      CCCD = '079333333333'
      SoDienThoai = '0905005005'
      LoaiViPham = 'Xay dung khong phep'
      MoTaViPham = 'Xay vuot so tang cho phep'
      DienTichViPham = 45.5
      NgayPhatHien = '2026-03-27'
      NguoiPhatHien = 'To quan ly do thi'
      TrangThai = 'Moi phat hien'
      BienPhapXuLy = 'Dung thi cong'
      SoTien = 25000000
      SoQuyetDinhXP = 'QDXP-001'
      NgayQD = '2026-03-30'
      ThoiHanThaoGo = '2026-04-30'
      DaCuongChe = $false
      NgayCuongChe = $null
      KetQuaXuLy = 'Dang theo doi'
      GhiChu = 'Smoke full fields create'
    }
    update = @{
      MaVuViec = 'VVP-001-UPD'
      DiaChi = 'KP5, Phuong Test'
      MaThua = '36'
      SoTo = '12'
      ChuCongTrinh = 'Hoang Thi F'
      CCCD = '079444444444'
      SoDienThoai = '0906006006'
      LoaiViPham = 'Xay sai phep'
      MoTaViPham = 'Lan chiem hanh lang'
      DienTichViPham = 52.25
      NgayPhatHien = '2026-04-01'
      NguoiPhatHien = 'Thanh tra xay dung'
      TrangThai = 'Dang xu ly'
      BienPhapXuLy = 'Buoc thao do'
      SoTien = 30000000
      SoQuyetDinhXP = 'QDXP-002'
      NgayQD = '2026-04-02'
      ThoiHanThaoGo = '2026-05-01'
      DaCuongChe = $true
      NgayCuongChe = '2026-04-25'
      KetQuaXuLy = 'Da cuong che mot phan'
      GhiChu = 'Smoke full fields update'
    }
  },
  @{
    name = 'nha-o-cong-trinh'
    id = 'MaCongTrinh'
    create = @{
      TenCongTrinh = 'Nha ong 3 tang'
      LoaiCongTrinh = 'Nha o rieng le'
      PhanLoai = 'Cap 3'
      DiaChi = 'KP1, Phuong Test'
      MaThua = '41'
      SoTo = '6'
      DienTichSan = 210.5
      SoTang = 3
      NamXayDung = 2024
      ChuSoHuu = 'Bui Van G'
      CCCD = '079555555555'
      SoDienThoai = '0907007007'
      TinhTrangKienTruc = 'Tot'
      TinhTrangPhapLy = 'Day du giay to'
      SoGiayPhepXD = 'GP-CT-001'
      NgayKiemTra = '2026-03-27'
      NguoiKiemTra = 'Can bo dia chinh'
      KetQuaKiemTra = 'Dat'
      GhiChu = 'Smoke full fields create'
    }
    update = @{
      TenCongTrinh = 'Nha ong 4 tang'
      LoaiCongTrinh = 'Nha pho'
      PhanLoai = 'Cap 2'
      DiaChi = 'KP2, Phuong Test'
      MaThua = '42'
      SoTo = '7'
      DienTichSan = 260.0
      SoTang = 4
      NamXayDung = 2025
      ChuSoHuu = 'Dang Thi H'
      CCCD = '079666666666'
      SoDienThoai = '0908008008'
      TinhTrangKienTruc = 'Kha'
      TinhTrangPhapLy = 'Can bo sung ho so'
      SoGiayPhepXD = 'GP-CT-002'
      NgayKiemTra = '2026-04-12'
      NguoiKiemTra = 'Can bo xay dung'
      KetQuaKiemTra = 'Can khac phuc'
      GhiChu = 'Smoke full fields update'
    }
  },
  @{
    name = 'ho-ngheo'
    id = 'MaHoNgheo'
    create = @{
      SoHoKhau = 'HK-001'
      ChuHo = 'Vo Van I'
      CCCD = '079777777777'
      NgaySinh = '1982-05-11'
      GioiTinh = 'Nam'
      DiaChi = 'KP6, Phuong Test'
      SoThanhVien = 5
      ThuNhapBinhQuan = 1800000
      MucDoNgheo = 'Ngheo'
      NamDanhGia = 2026
      LyDoNgheo = 'Thieu viec lam on dinh'
      DangHuongChinhSach = $true
      ChinhSachHuong = 'Ho tro BHYT, hoc bong'
      GhiChu = 'Smoke full fields create'
    }
    update = @{
      SoHoKhau = 'HK-001-UPD'
      ChuHo = 'Vo Van I UPD'
      CCCD = '079777777778'
      NgaySinh = '1982-05-12'
      GioiTinh = 'Nam'
      DiaChi = 'KP7, Phuong Test'
      SoThanhVien = 4
      ThuNhapBinhQuan = 2200000
      MucDoNgheo = 'Can ngheo'
      NamDanhGia = 2027
      LyDoNgheo = 'Mat viec tam thoi'
      DangHuongChinhSach = $false
      ChinhSachHuong = 'Ho tro vay von'
      GhiChu = 'Smoke full fields update'
    }
  },
  @{
    name = 'bao-tro-xa-hoi'
    id = 'MaDoiTuong'
    create = @{
      CCCD = '079888888888'
      HoTen = 'Le Thi K'
      NgaySinh = '1950-09-20'
      GioiTinh = 'Nu'
      DiaChi = 'KP8, Phuong Test'
      LoaiDoiTuong = 'Nguoi cao tuoi co don'
      MucTroCap = 750000
      NgayBatDau = '2026-03-01'
      TinhTrang = 'Dang huong'
      NguoiGiamHo = 'Nguyen Van L'
      GhiChu = 'Smoke full fields create'
    }
    update = @{
      CCCD = '079888888889'
      HoTen = 'Le Thi K UPD'
      NgaySinh = '1950-09-21'
      GioiTinh = 'Nu'
      DiaChi = 'KP9, Phuong Test'
      LoaiDoiTuong = 'Nguoi khuyet tat'
      MucTroCap = 900000
      NgayBatDau = '2026-04-01'
      TinhTrang = 'Tam dung'
      NguoiGiamHo = 'Tran Van M'
      GhiChu = 'Smoke full fields update'
    }
  },
  @{
    name = 'nguoi-co-cong'
    id = 'MaNCC'
    create = @{
      CCCD = '079999999999'
      HoTen = 'Pham Van N'
      NgaySinh = '1948-01-15'
      GioiTinh = 'Nam'
      DiaChi = 'KP10, Phuong Test'
      LoaiDoiTuong = 'Thuong binh'
      HangThuongBinh = '3/4'
      TyLeMatSucLaoDong = 61.5
      DanhHieu = 'Huong dan vien'
      MucHuongHangThang = 2200000
      NgayHuong = '2026-02-15'
      TinhTrang = 'Dang huong'
      GhiChu = 'Smoke full fields create'
    }
    update = @{
      CCCD = '079999999990'
      HoTen = 'Pham Van N UPD'
      NgaySinh = '1948-01-16'
      GioiTinh = 'Nam'
      DiaChi = 'KP11, Phuong Test'
      LoaiDoiTuong = 'Benh binh'
      HangThuongBinh = '2/4'
      TyLeMatSucLaoDong = 71.0
      DanhHieu = 'Nguoi hoat dong khang chien'
      MucHuongHangThang = 2500000
      NgayHuong = '2026-03-01'
      TinhTrang = 'Tam dung'
      GhiChu = 'Smoke full fields update'
    }
  },
  @{
    name = 'viec-lam'
    id = 'MaViecLam'
    create = @{
      HoTen = 'Do Thi P'
      NgaySinh = '1996-07-12'
      GioiTinh = 'Nu'
      CCCD = '079121212121'
      DiaChi = 'KP12, Phuong Test'
      NgheNghiep = 'Cong nhan may'
      TrinhDo = 'THPT'
      KinhNghiem = '5 nam'
      NgheNghiepMongMuon = 'Nhan vien van phong'
      MucLuongMongMuon = 9000000
      LyDoThatNghiep = 'Cong ty giai the'
      DangKyBHTN = $true
      SoThangHuongBHTN = 6
      MucHuongBHTN = 3200000
      TrangThai = 'Dang tim viec'
      GhiChu = 'Smoke full fields create'
    }
    update = @{
      HoTen = 'Do Thi P UPD'
      NgaySinh = '1996-07-13'
      GioiTinh = 'Nu'
      CCCD = '079121212122'
      DiaChi = 'KP13, Phuong Test'
      NgheNghiep = 'Ke toan'
      TrinhDo = 'Dai hoc'
      KinhNghiem = '6 nam'
      NgheNghiepMongMuon = 'Chuyen vien ke toan'
      MucLuongMongMuon = 12000000
      LyDoThatNghiep = 'Muon doi moi truong'
      DangKyBHTN = $false
      SoThangHuongBHTN = 0
      MucHuongBHTN = 0
      TrangThai = 'Da tim duoc viec'
      GhiChu = 'Smoke full fields update'
    }
  }
)

foreach ($t in $tests) {
  $id = $null
  $stage = 'create'
  try {
    $c = Invoke-RestMethod -Method Post -Uri "$base/$($t.name)" -ContentType 'application/json' -Body ($t.create | ConvertTo-Json -Depth 10)
    $id = $c.data.($t.id)
    if (-not $id) {
      throw "Missing id field $($t.id) in create response"
    }

    $stage = 'update'
    $null = Invoke-RestMethod -Method Put -Uri "$base/$($t.name)/$id" -ContentType 'application/json' -Body ($t.update | ConvertTo-Json -Depth 10)

    $stage = 'delete'
    $null = Invoke-RestMethod -Method Delete -Uri "$base/$($t.name)/$id"

    $results += [PSCustomObject]@{
      module = $t.name
      status = 'OK'
      failedStage = ''
      id = $id
      error = ''
    }
  } catch {
    $msg = Get-ErrorMessage $_

    if ($id) {
      try {
        $null = Invoke-RestMethod -Method Delete -Uri "$base/$($t.name)/$id"
      } catch {
      }
    }

    $results += [PSCustomObject]@{
      module = $t.name
      status = 'FAIL'
      failedStage = $stage
      id = if ($id) { $id } else { '' }
      error = $msg
    }
  }
}

$results | ConvertTo-Json -Depth 6
