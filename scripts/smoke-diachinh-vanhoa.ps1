$ErrorActionPreference = 'Stop'
$base = 'http://localhost:3006/api'
$results = @()

function Invoke-Json([string]$method, [string]$url, $body = $null) {
  if ($null -eq $body) {
    return Invoke-RestMethod -Method $method -Uri $url -TimeoutSec 30
  }

  $json = $body | ConvertTo-Json -Depth 10
  return Invoke-RestMethod -Method $method -Uri $url -Body $json -ContentType 'application/json; charset=utf-8' -TimeoutSec 30
}

function Test-Crud([string]$name, [string]$endpoint, [string]$idField, $createBody, $updateBody) {
  $row = [ordered]@{
    module = $name
    create = 'FAIL'
    update = 'FAIL'
    delete = 'FAIL'
    id = ''
    message = ''
  }

  try {
    $created = Invoke-Json 'POST' "$base/$endpoint" $createBody
    if (-not $created.success) {
      throw 'create failed'
    }

    $id = $created.data.$idField
    if ($null -eq $id -or $id -eq '') {
      throw "missing id field $idField"
    }

    $row.id = [string]$id
    $row.create = 'PASS'

    $updated = Invoke-Json 'PUT' "$base/$endpoint/$id" $updateBody
    if (-not $updated.success) {
      throw 'update failed'
    }

    $row.update = 'PASS'

    $deleted = Invoke-Json 'DELETE' "$base/$endpoint/$id"
    if (-not $deleted.success) {
      throw 'delete failed'
    }

    $row.delete = 'PASS'
  }
  catch {
    if ($_.ErrorDetails -and $_.ErrorDetails.Message) {
      $row.message = $_.ErrorDetails.Message
    }
    elseif ($_.Exception -and $_.Exception.Message) {
      $row.message = $_.Exception.Message
    }
    else {
      $row.message = 'unknown error'
    }
  }

  $script:results += [pscustomobject]$row
}

Test-Crud 'di-tich' 'di-tich' 'MaDiTich' @{
  TenDiTich = 'Smoke Di Tich'
  DiaChi = 'KP1'
  CapXepHang = 'Huyen'
  LoaiDiTich = 'Lich su'
  NamXayDung = 1990
  TinhTrang = 'Tot'
  LuotKhachThang = 12
  MoTa = 'smoke create'
} @{
  TenDiTich = 'Smoke Di Tich Updated'
  LuotKhachThang = 22
  TinhTrang = 'Kha'
}

Test-Crud 'ho-so-di-tich' 'ho-so-di-tich' 'MaHoSo' @{
  TenDiTich = 'Smoke Ho So'
  CapDo = 'Huyen'
  LoaiHoSo = 'Xep hang'
  TrangThai = 'Da nop'
  NgayNop = '2026-03-30'
  NguoiNop = 'Tester'
} @{
  TrangThai = 'Dang xu ly'
  GhiChu = 'updated by smoke'
}

Test-Crud 'le-hoi' 'le-hoi' 'MaLeHoi' @{
  TenLeHoi = 'Smoke Le Hoi'
  DiaDiem = 'KP2'
  ThoiGianToChuc = '2026-04-15'
  SoLuongKhach = 100
  SoLuongDuKien = 120
  TrangThai = 'Dang chuan bi'
  LoaiLeHoi = 'Van hoa'
  NguoiChuTri = 'UBND'
  ChiPhiToChuc = 5000000
  MoTa = 'smoke create'
} @{
  SoLuongKhach = 150
  TrangThai = 'Dang dien ra'
  DanhGiaSauSuKien = 'ok'
}

Test-Crud 'lang-nghe' 'lang-nghe' 'MaLangNghe' @{
  TenLangNghe = 'Smoke Lang Nghe'
  MaLN = 'LN-SMOKE'
  LoaiNghe = 'Det'
  SoHoNghe = 15
  TrangThai = $true
  TinhTrang = 'Phat trien'
  DoanhThuNam = 1000000
} @{
  SoHoNghe = 20
  TinhTrang = 'On dinh'
  GhiChu = 'updated by smoke'
}

Test-Crud 'co-so-kinh-doanh-du-lich' 'co-so-kinh-doanh-du-lich' 'MaCoSo' @{
  MaCoSoCode = 'DL-SMOKE'
  TenCoSo = 'Smoke Du Lich'
  LoaiHinh = 'Khach san'
  ChuCoSo = 'Tester'
  SoDienThoai = '0900000000'
  DiaChi = 'KP3'
  SoPhong = 10
  SucChua = 30
  TrangThai = 'Hoat dong'
  DanhGiaTB = 4.2
} @{
  TenCoSo = 'Smoke Du Lich Updated'
  SoPhong = 12
  LuotKhachThang = 55
}

Test-Crud 'rui-ro-quy-hoach' 'rui-ro-quy-hoach' 'MaRuiRo' @{
  MaPhanTich = 'RRQH-SMOKE'
  KhuVuc = 'Khu A'
  DiaChi = 'KP4'
  MaThua = '12'
  SoTo = '8'
  LoaiRuiRo = 'Ngap lut'
  MucDoRuiRo = 'Trung binh'
  XacSuat = 40
  DoTinCayAI = 75
  MoTaRuiRo = 'smoke create'
  NguyenNhan = 'mua lon'
  KhuyenNghiAI = 'nang cap cong'
  TrangThai = 'Dang theo doi'
  NgayPhanTich = '2026-03-30'
  NgayCapNhat = '2026-03-30'
} @{
  TrangThai = 'Can xu ly'
  DoTinCayAI = 82
  GhiChu = 'updated by smoke'
}

$results | Format-Table -AutoSize

$fails = @($results | Where-Object {
  $_.create -ne 'PASS' -or $_.update -ne 'PASS' -or $_.delete -ne 'PASS'
})

if ($fails.Count -gt 0) {
  exit 1
}
