$ErrorActionPreference = 'Stop'
$base = 'http://localhost:3006/api'

function Invoke-Api {
  param(
    [Parameter(Mandatory = $true)][string]$Method,
    [Parameter(Mandatory = $true)][string]$Url,
    [object]$Body
  )

  if ($null -ne $Body) {
    return Invoke-RestMethod -Method $Method -Uri $Url -ContentType 'application/json' -Body ($Body | ConvertTo-Json -Depth 20)
  }

  return Invoke-RestMethod -Method $Method -Uri $Url
}

function Get-ActualId {
  param(
    [Parameter(Mandatory = $true)]$CreateResponse,
    [Parameter(Mandatory = $true)][string[]]$IdCandidates
  )

  foreach ($candidate in $IdCandidates) {
    $value = $CreateResponse.data.$candidate
    if ($null -ne $value -and "$value" -ne '') {
      return [int]$value
    }
  }

  throw "Missing id. Candidates: $($IdCandidates -join ', ')"
}

function Assert-UpdatedFields {
  param(
    [Parameter(Mandatory = $true)]$UpdatedData,
    [Parameter(Mandatory = $true)]$ExpectedMap
  )

  foreach ($entry in $ExpectedMap.GetEnumerator()) {
    $fieldName = $entry.Key
    $expectedValue = $entry.Value
    $actualValue = $UpdatedData.$fieldName

    if ("$actualValue" -ne "$expectedValue") {
      throw "Field '$fieldName' not updated. Expected=$expectedValue Actual=$actualValue"
    }
  }
}

$tests = @(
  @{
    name = 'ho-kinh-doanh'
    idCandidates = @('MaHoKD')
    create = @{
      SoGCN = 'GCN-SMOKE-001'
      LoaiHinhKD = 'Ho ca the'
      TenHoKD = 'HKD Smoke Test'
      ChuHo = 'Nguyen Van Smoke'
      CCCD = '079001234567'
      NgaySinh = '1988-01-01'
      DiaChi = 'Khu pho 1'
      DienThoai = '0911222333'
      Email = 'hkd-smoke@test.local'
      DiaChiKinhDoanh = 'Cho trung tam'
      VonKinhDoanh = 250000000
      DoanhThuNam = 900000000
      SoLaoDong = 6
      DienTichKD = 45
      LanCapPhep = 1
      TrangThai = 'Hoat dong'
      NganhNghe = 'Thuong mai'
      MaNganhNghe = 'TM01'
      NgayDangKy = '2025-01-10'
      NgayHetHan = '2028-01-10'
      GhiChu = 'Create smoke'
    }
    update = @{
      TenHoKD = 'HKD Smoke Updated'
      TrangThai = 'Tam ngung'
      DoanhThuNam = 950000000
      GhiChu = 'Update smoke'
    }
    assert = @{
      TenHoKD = 'HKD Smoke Updated'
      TrangThai = 'Tam ngung'
      GhiChu = 'Update smoke'
    }
  }
  @{
    name = 'cho-diem-kinh-doanh'
    idCandidates = @('MaCho')
    create = @{
      MaDiemKD = 'KD-CHO-001'
      LoaiHinh = 'Cho dan sinh'
      TenDiemKD = 'Cho Smoke Test'
      DiaChi = 'Khu pho 2'
      NgayThanhLap = '2020-05-20'
      DienTich = 1200
      SoGianHang = 200
      SoGianDangKinhDoanh = 160
      SoGianTrong = 40
      DoanhThuThang = 1800000000
      ThuPhiThang = 150000000
      TrangThai = 'Hoat dong'
      BanQuanLy = 'BQL Cho Smoke'
      SoDienThoai = '0909444555'
      GiayPhep = 'GP-CHO-01'
      NgayCapPhep = '2022-01-01'
      NgayHetHan = '2027-01-01'
      CoSoHaTang = 'Tot'
      AnNinhTratTu = 'An toan'
      VeSinhMoiTruong = 'Dat chuan'
      GhiChu = 'Create smoke'
    }
    update = @{
      TenDiemKD = 'Cho Smoke Updated'
      ThuPhiThang = 175000000
      TrangThai = 'Dang cai tao'
      GhiChu = 'Update smoke'
    }
    assert = @{
      TenDiemKD = 'Cho Smoke Updated'
      TrangThai = 'Dang cai tao'
      GhiChu = 'Update smoke'
    }
  }
  @{
    name = 'thu-phi'
    idCandidates = @('MaThuPhi')
    create = @{
      MaPhieuThu = 'PT-001'
      LoaiPhi = 'Phi cho'
      NgayThu = '2026-03-27'
      MoTa = 'Thu phi ve sinh'
      DonGia = 120000
      SoLuong = 2
      ThanhTien = 240000
      TenNguoiNop = 'Tran Thi Thu'
      CCCDNguoiNop = '079009998888'
      DiaChiNguoiNop = 'Khu pho 3'
      NguoiThu = 'Can bo A'
      TrangThai = 'Da thu'
      GhiChu = 'Create smoke'
    }
    update = @{
      TrangThai = 'Mien giam'
      ThanhTien = 120000
      GhiChu = 'Update smoke'
    }
    assert = @{
      TrangThai = 'Mien giam'
      GhiChu = 'Update smoke'
    }
  }
  @{
    name = 'ho-tro-doanh-nghiep'
    idCandidates = @('MaHoTro')
    create = @{
      MaYC = 'YC-HT-001'
      TenDoanhNghiep = 'Cong ty Smoke'
      LoaiDoanhNghiep = 'TNHH'
      LinhVuc = 'San xuat'
      NguoiDaiDien = 'Pham Van B'
      DienThoai = '0988777666'
      Email = 'dn-smoke@test.local'
      DiaChi = 'KCN so 1'
      LoaiHoTro = 'Von vay uu dai'
      NoiDungYeuCau = 'De nghi ho tro von'
      NgayTiepNhan = '2026-03-01'
      NgayHenTra = '2026-04-01'
      NgayHoanThanh = '2026-03-25'
      CanBoXuLy = 'Can bo Kinh te'
      TrangThai = 'Hoan thanh'
      GiaTriHoTro = 50000000
      DanhGia = 5
      KetQuaXuLy = 'Da ho tro thanh cong'
      GhiChu = 'Create smoke'
    }
    update = @{
      TrangThai = 'Dang xu ly'
      DanhGia = 4
      GhiChu = 'Update smoke'
    }
    assert = @{
      TrangThai = 'Dang xu ly'
      GhiChu = 'Update smoke'
    }
  }
  @{
    name = 'thong-ke-kinh-te'
    idCandidates = @('MaBaoCao')
    create = @{
      MaBC = 'TK-SMOKE-001'
      KyBaoCao = 'Thang 03/2026'
      LoaiKy = 'Thang'
      NgayBaoCao = '2026-03-31'
      NguoiLap = 'Can bo thong ke'
      TongHoKinhDoanh = 188
      TongDoanhThu = 25600000000
      TongThuNganSach = 1900000000
      TangTruong = 7.35
      SoLuongLaoDong = 3210
      SoHoMoi = 8
      SoHoNgung = 2
      TrangThai = 'Cho duyet'
    }
    update = @{
      TrangThai = 'Da duyet'
      TangTruong = 8.1
      SoHoMoi = 9
    }
    assert = @{
      TrangThai = 'Da duyet'
      SoHoMoi = 9
    }
  }
  @{
    name = 'tam-tru-tam-vang'
    idCandidates = @('MaHoSo')
    create = @{
      MaDangKy = 'TV-SMOKE-001'
      LoaiDangKy = 'Tam tru'
      HoTen = 'Le Van C'
      HoTenNguoiKhaiBao = 'Le Van C'
      CCCD = '079006667777'
      NgaySinh = '1993-10-10'
      GioiTinh = 'Nam'
      SoDienThoai = '0977888999'
      QueQuan = 'Ha Noi'
      DiaChiThuongTru = 'So 1 duong A'
      DiaChiTamTru = 'So 2 duong B'
      ChuHo = 'Nguyen Van D'
      QuanHeVoiChuHo = 'Chau'
      NgayDangKy = '2026-03-20'
      NgayHetHan = '2026-09-20'
      CanBoXuLy = 'Cong an xa'
      TrangThai = 'Cho duyet'
      LyDo = 'Tam tru di lam'
      GhiChu = 'Create smoke'
    }
    update = @{
      TrangThai = 'Da duyet'
      NgaySinh = ''
      GhiChu = 'Update smoke'
    }
    assert = @{
      TrangThai = 'Da duyet'
      GhiChu = 'Update smoke'
    }
  }
  @{
    name = 'vi-pham'
    idCandidates = @('MaViPham')
    create = @{
      SoBienBan = 'BB-SMOKE-001'
      LoaiViPham = 'Trat tu cong cong'
      TrangThai = 'Dang xu ly'
      NgayLap = '2026-03-25'
      ThoiHanKhacPhuc = '2026-04-05'
      NgayXuLy = '2026-03-26'
      MucPhat = 2500000
      BieuMauXuLy = 'Mau A'
      CanCuPhapLy = 'Nghi dinh 144'
      DoiTuong = 'Nguyen Van E'
      NguoiViPham = 'Nguyen Van E'
      TenViPham = 'Gay roi trat tu'
      NoiDungViPham = 'Mo ta chi tiet'
      DiaDiem = 'Cho dem'
      DiaChiViPham = 'Khu pho 4'
      CanBoLap = 'Can bo ANTT'
      NguoiKy = 'Truong CA'
      DaNopPhat = $true
      NgayNopPhat = '2026-03-27'
      TaiPham = $false
      GhiChu = 'Create smoke'
    }
    update = @{
      TrangThai = 'Da xu ly'
      TaiPham = $true
      GhiChu = 'Update smoke'
    }
    assert = @{
      TrangThai = 'Da xu ly'
      TaiPham = $true
      GhiChu = 'Update smoke'
    }
  }
  @{
    name = 'an-ninh-trat-tu'
    idCandidates = @('MaSuKien')
    create = @{
      MaSK = 'SK-SMOKE-001'
      NoiDung = 'Su kien ANTT smoke'
      KhuVuc = 'Khu pho 5'
      MucDo = 'Trung binh'
      LoaiViPham = 'Mau thuan dan su'
      NgayPhatSinh = '2026-03-27'
      TrangThai = 'Dang xu ly'
      CanBo = 'Can bo F'
    }
    update = @{
      TrangThai = 'Da giai quyet'
      MucDo = 'Thap'
      NoiDung = 'Su kien ANTT smoke updated'
    }
    assert = @{
      TrangThai = 'Da giai quyet'
      MucDo = 'Thap'
      NoiDung = 'Su kien ANTT smoke updated'
    }
  }
  @{
    name = 'phan-anh'
    idCandidates = @('MaPhanAnh')
    create = @{
      TieuDe = 'Phan anh smoke'
      NoiDung = 'Noi dung phan anh smoke'
      TenNguoiPhanAnh = 'Cong dan G'
      SoDienThoai = '0966555444'
      DiaChi = 'Khu pho 6'
      TenLinhVuc = 'An ninh trat tu'
      MucDoUuTien = 'Cao'
      ToaDo = '10.75,106.67'
      TrangThai = 'Moi'
      TenCanBoXuLy = 'Can bo tiep nhan'
      KetQuaXuLy = 'Dang tiep nhan'
      DiemDanhGia = 4
    }
    update = @{
      TrangThai = 'Dang xu ly'
      KetQuaXuLy = 'Da chuyen xu ly'
      DiemDanhGia = 5
    }
    assert = @{
      KetQuaXuLy = 'Da chuyen xu ly'
      DiemDanhGia = 5
    }
  }
  @{
    name = 'diem-nong-an-ninh'
    idCandidates = @('MaDiem')
    create = @{
      MaDN = 'DN-SMOKE-001'
      LoaiDiaDiem = 'Khu dan cu'
      TenDiaDiem = 'Diem nong smoke'
      TenDiem = 'Diem nong smoke'
      DiaChi = 'Khu pho 7'
      DiaDiem = 'Khu pho 7'
      NgayPhatHien = '2026-03-24'
      NgayCapNhat = '2026-03-27'
      ToaDoLat = 10.123456
      ToaDoLng = 106.123456
      LoaiViPham = 'Tu tap dong nguoi'
      LoaiRuiRo = 'Tu tap dong nguoi'
      MucDo = 'Cao'
      MucDoNghiemTrong = 'Cao'
      MoTa = 'Mo ta diem nong'
      SoDoiTuong = 12
      TrangThai = 'Dang theo doi'
      TinhTrang = 'Dang theo doi'
      CanBoTheoDoi = 'Can bo H'
      SoDienThoai = '0933444555'
      BienPhapXuLy = 'Tang cuong tuan tra'
      GhiChu = 'Create smoke'
    }
    update = @{
      TrangThai = 'Da on dinh'
      MucDo = 'Thap'
      GhiChu = 'Update smoke'
    }
    assert = @{
      TrangThai = 'Da on dinh'
      MucDo = 'Thap'
      GhiChu = 'Update smoke'
    }
  }
)

$results = @()

foreach ($t in $tests) {
  try {
    $createRes = Invoke-Api -Method 'POST' -Url "$base/$($t.name)" -Body $t.create
    $id = Get-ActualId -CreateResponse $createRes -IdCandidates $t.idCandidates

    $updateRes = Invoke-Api -Method 'PUT' -Url "$base/$($t.name)/$id" -Body $t.update
    $updatedData = $updateRes.data
    if ($null -eq $updatedData) {
      $getRes = Invoke-Api -Method 'GET' -Url "$base/$($t.name)/$id"
      $updatedData = $getRes.data
      if ($null -eq $updatedData -and $null -ne $getRes.MaHoSo) {
        $updatedData = $getRes
      }
    }

    Assert-UpdatedFields -UpdatedData $updatedData -ExpectedMap $t.assert

    $null = Invoke-Api -Method 'DELETE' -Url "$base/$($t.name)/$id"

    $results += [PSCustomObject]@{
      module = $t.name
      create = 'OK'
      update = 'OK'
      delete = 'OK'
      id = $id
      error = ''
    }
  }
  catch {
    $results += [PSCustomObject]@{
      module = $t.name
      create = 'FAIL'
      update = '-'
      delete = '-'
      id = ''
      error = $_.Exception.Message
    }
  }
}

$results | ConvertTo-Json -Depth 5
