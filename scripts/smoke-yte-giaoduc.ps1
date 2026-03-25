$ErrorActionPreference = 'Stop'
$base = 'http://localhost:3006/api'
$stamp = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
$results = New-Object System.Collections.Generic.List[object]

function Invoke-Json {
  param(
    [string]$Method,
    [string]$Url,
    $Body
  )

  if ($null -ne $Body) {
    $json = $Body | ConvertTo-Json -Depth 10
    $response = Invoke-RestMethod -Method $Method -Uri $Url -ContentType 'application/json' -Body $json
    if ($response -is [string]) {
      return $response | ConvertFrom-Json
    }
    return $response
  }

  $response = Invoke-RestMethod -Method $Method -Uri $Url
  if ($response -is [string]) {
    return $response | ConvertFrom-Json
  }
  return $response
}

function Add-Result {
  param([string]$Screen, [string]$Status, [string]$Detail)
  $results.Add([pscustomobject]@{ Screen = $Screen; Status = $Status; Detail = $Detail })
}

function Run-CrudSmoke {
  param(
    [string]$Name,
    [string]$Path,
    $CreatePayload,
    $UpdatePayload,
    [string]$IdField
  )

  try {
    $created = Invoke-Json -Method 'POST' -Url "$base/$Path" -Body $CreatePayload
    if (-not $created.success) { throw "Create failed: $($created | ConvertTo-Json -Depth 6 -Compress)" }

    $id = $created.data.$IdField
    if (-not $id) { throw "Missing id field $IdField in create response" }

    $updated = Invoke-Json -Method 'PUT' -Url "$base/$Path/$id" -Body $UpdatePayload
    if (-not $updated.success) { throw "Update failed: $($updated | ConvertTo-Json -Depth 6 -Compress)" }

    $deleted = Invoke-Json -Method 'DELETE' -Url "$base/$Path/$id"
    if (-not $deleted.success) { throw "Delete failed: $($deleted | ConvertTo-Json -Depth 6 -Compress)" }

    Add-Result -Screen $Name -Status 'PASS' -Detail "CRUD OK (id=$id)"
  } catch {
    Add-Result -Screen $Name -Status 'FAIL' -Detail $_.Exception.Message
  }
}

Run-CrudSmoke -Name 'tram-y-te' -Path 'tram-y-te' -IdField 'MaTram' -CreatePayload @{
  TenTram = "Tram Smoke $stamp"; DiaChi = 'Khu pho smoke'; SoDienThoai = '0909000001'; SoNhanVien = 12; SoLuotKhamThang = 100; TrangThai = $true; NgayTao = (Get-Date).ToString('o'); GhiChu = 'Smoke create'
} -UpdatePayload @{
  TenTram = "Tram Smoke Updated $stamp"; DiaChi = 'Khu pho smoke update'; SoDienThoai = '0909000002'; SoNhanVien = 13; SoLuotKhamThang = 120; TrangThai = $true; GhiChu = 'Smoke update'
}

Run-CrudSmoke -Name 'dich-benh' -Path 'dich-benh' -IdField 'MaDich' -CreatePayload @{
  TenDich = 'Sot sieu vi smoke'; KhuVuc = 'Phuong Smoke'; SoCaNhiem = 1; SoCaKhoi = 0; MucDo = 'Nhe'; TrangThai = 'Dang theo doi'; MaCa = "DB-SMOKE-$stamp"; LoaiBenh = 'Truyen nhiem'; MaDonViBenh = 'SMK01'; TenBenhNhan = 'Benh Nhan Smoke'; GioiTinh = 'Nam'; NamSinh = 1995; DiaChi = 'Dia chi smoke'; SoDienThoai = '0909000003'; NgayKhoiPhat = (Get-Date).ToString('yyyy-MM-dd'); NgayPhatHien = (Get-Date).ToString('yyyy-MM-dd'); NgayBaoCao = (Get-Date).ToString('yyyy-MM-dd'); TrieuChung = 'Sot, met'; TrangThaiDieuTri = 'Dang dieu tri'; NoiDieuTri = 'Tram Y Te'; NguoiTiepXuc = 2; KhuVucPhatHien = 'Phuong Smoke'; BienPhapXuLy = 'Theo doi'; NguoiBaoCao = 'Nhan vien smoke'; GhiChu = 'Smoke create'
} -UpdatePayload @{
  TenDich = 'Sot sieu vi smoke update'; TrangThaiDieuTri = 'Da khoi'; SoCaKhoi = 1; GhiChu = 'Smoke update'
}

try {
  $createBody = (@{
    MaPhieu = "TC-SMOKE-$stamp"; MaDoiTuong = 1; TenDoiTuong = 'Doi tuong smoke'; NgaySinh = '2020-01-01'; GioiTinh = 'Nam'; TenChaMeBaoHo = 'Phu huynh smoke'; SoDienThoai = '0909000004'; DiaChi = 'Dia chi tiem'; LoaiDoiTuong = 'Tre em'; TenVacXin = 'Vacxin Smoke'; LoaiVacXin = 'Tiem chung mo rong'; MuiThu = 1; TongSoMui = 2; NgayTiem = (Get-Date).ToString('yyyy-MM-dd'); ViTriTiem = 'Canh tay trai'; SoLo = 'SMK-LO'; NguoiTiem = 'Y si smoke'; MaTrangThai = 'CHO_TIEM'; TenDot = 'Dot smoke'; TrangThai = 'CHO_TIEM'; GhiChu = 'Smoke create'
  } | ConvertTo-Json -Depth 8)
  $created = Invoke-WebRequest -Method 'POST' -Uri "$base/tiem-chung" -ContentType 'application/json' -Body $createBody
  if ($created.StatusCode -lt 200 -or $created.StatusCode -ge 300) {
    throw "Tao tiem-chung that bai, HTTP $($created.StatusCode)"
  }

  $idMatch = [regex]::Match($created.Content, '"MaTiemChung"\s*:\s*(\d+)')
  if (-not $idMatch.Success) {
    throw 'Khong lay duoc MaTiemChung tu response'
  }
  $createdId = [int]$idMatch.Groups[1].Value

  $updateBody = (@{ TenDoiTuong = 'Doi tuong smoke update'; MaTrangThai = 'DA_TIEM'; TrangThai = 'DA_TIEM'; GhiChu = 'Smoke update' } | ConvertTo-Json -Depth 8)
  $updated = Invoke-WebRequest -Method 'PUT' -Uri "$base/tiem-chung/$createdId" -ContentType 'application/json' -Body $updateBody
  if ($updated.StatusCode -lt 200 -or $updated.StatusCode -ge 300) {
    throw "Cap nhat tiem-chung that bai, HTTP $($updated.StatusCode)"
  }

  $deleted = Invoke-WebRequest -Method 'DELETE' -Uri "$base/tiem-chung/$createdId"
  if ($deleted.StatusCode -lt 200 -or $deleted.StatusCode -ge 300) {
    throw "Xoa tiem-chung that bai, HTTP $($deleted.StatusCode)"
  }

  Add-Result -Screen 'tiem-chung' -Status 'PASS' -Detail "CRUD OK (MaTiemChung=$createdId)"
} catch {
  Add-Result -Screen 'tiem-chung' -Status 'FAIL' -Detail $_.Exception.Message
}

Run-CrudSmoke -Name 'kham-benh' -Path 'phieu-kham' -IdField 'MaPhieuKham' -CreatePayload @{
  MaPhieu = "PK-SMOKE-$stamp"; HoTenBenhNhan = 'Benh nhan smoke'; TenBenhNhan = 'Benh nhan smoke'; NgaySinh = '1990-02-02'; GioiTinh = 'Nam'; CCCD = '079000000001'; SoDienThoai = '0909000005'; DiaChi = 'Dia chi kham'; MaBHYT = 'BHYT-SMOKE-01'; NgayKham = (Get-Date).ToString('yyyy-MM-dd'); TrieuChung = 'Dau dau'; ChanDoan = 'Theo doi'; DonThuoc = 'Paracetamol'; ChiPhi = 50000; HuyetAp = '120/80'; NhietDo = 37.2; NhipTim = 80; CanNang = 60; ChieuCao = 165; BacSiKham = 'Bac si smoke'; MaTrangThai = 'DANG_XU_LY'; TrangThai = 'DANG_XU_LY'; GhiChu = 'Smoke create'
} -UpdatePayload @{
  ChanDoan = 'Da on dinh'; MaTrangThai = 'HOAN_THANH'; TrangThai = 'HOAN_THANH'; GhiChu = 'Smoke update'
}

Run-CrudSmoke -Name 'co-so-giao-duc' -Path 'co-so-giao-duc' -IdField 'MaCoSo' -CreatePayload @{
  MaTruong = "SMK-$stamp"; TenTruong = "Truong Smoke $stamp"; LoaiTruong = 'Tieu hoc'; DiaChi = 'Dia chi truong'; SoDienThoai = '0909000006'; DienThoai = '0909000006'; Email = 'smoke@example.com'; HieuTruong = 'Hieu truong smoke'; NamThanhLap = 2010; DienTich = 1000; SoPhongHoc = 10; SoPhongChucNang = 2; SoGiaoVien = 20; SoHocSinh = 300; TrangThietBi = 'Day du'; TinhTrangCoSo = 'Tot'; DatChuan = $true; XepLoai = 'Dat chuan'; GhiChu = 'Smoke create'; LoaiHinh = 'Tieu hoc'; TenCoSo = "Truong Smoke $stamp"; TrangThai = $true
} -UpdatePayload @{
  TenTruong = "Truong Smoke Updated $stamp"; SoHocSinh = 320; GhiChu = 'Smoke update'
}

try {
  $list = Invoke-Json -Method 'GET' -Url "$base/lop-hoc?page=1&limit=1"
  $first = $list.data[0]
  if (-not $first -or -not $first.MaLop) {
    throw 'Khong tim thay lop hoc de thu nghiem cap nhat si so'
  }

  $total = [int]($first.SiSoHienTai)
  if ($total -le 0) { $total = [int]($first.SoHocSinh) }
  if ($total -le 0) { $total = 1 }
  $present = [Math]::Min($total, [Math]::Max(0, $total - 1))
  $rate = [Math]::Round(($present * 100.0) / $total, 2)

  $updated = Invoke-Json -Method 'PUT' -Url "$base/lop-hoc/$($first.MaLop)" -Body @{
    CoMatHomNay = $present
    VangCoPhep = 1
    VangKhongPhep = 0
    TyLeDiHoc = $rate
    NgayCapNhat = (Get-Date).ToString('yyyy-MM-dd')
    GhiChu = "Smoke update $stamp"
  }

  if (-not $updated.success) {
    throw 'Cap nhat si so that bai'
  }

  Add-Result -Screen 'si-so-hoc-sinh' -Status 'PASS' -Detail "Update OK (MaLop=$($first.MaLop))"
} catch {
  Add-Result -Screen 'si-so-hoc-sinh' -Status 'FAIL' -Detail $_.Exception.Message
}

try {
  $coSoStats = Invoke-Json -Method 'GET' -Url "$base/co-so-giao-duc/stats"
  $lopStats = Invoke-Json -Method 'GET' -Url "$base/lop-hoc/stats"
  if ($coSoStats.success -and $lopStats.success) {
    Add-Result -Screen 'giao-duc' -Status 'PASS' -Detail 'Aggregate stats endpoints OK'
  } else {
    throw 'Stats endpoint returned success=false'
  }
} catch {
  Add-Result -Screen 'giao-duc' -Status 'FAIL' -Detail $_.Exception.Message
}

$results | Format-List | Out-String -Width 500
