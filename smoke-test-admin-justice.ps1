$ErrorActionPreference = 'Stop'
$base = 'http://localhost:3006/api'
$stamp = Get-Date -Format 'yyMMddHHmmss'
$results = @()

function Add-Result {
  param([string]$Module,[string]$Flow,[string]$Status,[string]$Detail)
  $script:results += [PSCustomObject]@{
    Module = $Module
    Flow = $Flow
    Status = $Status
    Detail = $Detail
  }
}

function To-JsonBody($obj) {
  return ($obj | ConvertTo-Json -Depth 10)
}

try {
  $createBody = @{ so_ho_tich = "HT-SMOKE-$stamp"; ten_chu_ho = 'Test Chu Ho'; dia_chi_ho_tich = 'Test Dia Chi'; so_thanh_vien_ho_tich = 3; trang_thai = $true }
  $created = Invoke-RestMethod -Uri "$base/ho-tich" -Method Post -ContentType 'application/json' -Body (To-JsonBody $createBody)
  $id = $created.data.id
  if (-not $id) { throw 'Create khong tra ve id' }

  $updateBody = @{ ten_chu_ho = 'Test Chu Ho Updated' }
  $updated = Invoke-RestMethod -Uri "$base/ho-tich/$id" -Method Put -ContentType 'application/json' -Body (To-JsonBody $updateBody)
  if ($updated.data.ten_chu_ho -ne 'Test Chu Ho Updated') { throw 'Update ten_chu_ho khong dung' }

  $deleted = Invoke-RestMethod -Uri "$base/ho-tich/$id" -Method Delete
  if (-not $deleted.success) { throw 'Delete that bai' }

  Add-Result -Module 'Ho tich' -Flow 'Add/Edit/Delete' -Status 'PASS' -Detail "id=$id"
}
catch {
  Add-Result -Module 'Ho tich' -Flow 'Add/Edit/Delete' -Status 'FAIL' -Detail $_.Exception.Message
}

try {
  $createBody = @{ SoKyHieu = "VB-SMOKE-$stamp"; TrichYeu = 'Van ban smoke test'; LoaiVanBan = 'Cong van'; TrangThai = 'Moi' }
  $created = Invoke-RestMethod -Uri "$base/van-ban" -Method Post -ContentType 'application/json' -Body (To-JsonBody $createBody)
  $id = $created.data.MaVanBan
  if (-not $id) { throw 'Create khong tra ve MaVanBan' }

  $updateBody = @{ TrichYeu = 'Van ban smoke test updated' }
  $updated = Invoke-RestMethod -Uri "$base/van-ban/$id" -Method Put -ContentType 'application/json' -Body (To-JsonBody $updateBody)
  if ($updated.data.TrichYeu -ne 'Van ban smoke test updated') { throw 'Update TrichYeu khong dung' }

  $deleted = Invoke-RestMethod -Uri "$base/van-ban/$id" -Method Delete
  if (-not $deleted.success) { throw 'Delete that bai' }

  Add-Result -Module 'Van ban' -Flow 'Add/Edit/Delete' -Status 'PASS' -Detail "MaVanBan=$id"
}
catch {
  Add-Result -Module 'Van ban' -Flow 'Add/Edit/Delete' -Status 'FAIL' -Detail $_.Exception.Message
}

try {
  $createBody = @{ SoChungThuc = "CT-SMOKE-$stamp"; LoaiGiayTo = 'CCCD'; NguoiYeuCau = 'Nguoi Test'; TrangThai = 'Dang xu ly'; PhiDichVu = 5000 }
  $created = Invoke-RestMethod -Uri "$base/chung-thuc" -Method Post -ContentType 'application/json' -Body (To-JsonBody $createBody)
  $id = $created.data.MaChungThuc
  if (-not $id) { throw 'Create khong tra ve MaChungThuc' }

  $updateBody = @{ TrangThai = 'Hoan thanh' }
  $updated = Invoke-RestMethod -Uri "$base/chung-thuc/$id" -Method Put -ContentType 'application/json' -Body (To-JsonBody $updateBody)
  if ($updated.data.TrangThai -ne 'Hoan thanh') { throw 'Update TrangThai khong dung' }

  $deleted = Invoke-RestMethod -Uri "$base/chung-thuc/$id" -Method Delete
  if (-not $deleted.success) { throw 'Delete that bai' }

  Add-Result -Module 'Chung thuc' -Flow 'Add/Edit/Delete' -Status 'PASS' -Detail "MaChungThuc=$id"
}
catch {
  Add-Result -Module 'Chung thuc' -Flow 'Add/Edit/Delete' -Status 'FAIL' -Detail $_.Exception.Message
}

try {
  $maHoKhau = "HKSMOKE$stamp"
  $createBody = @{ MaHoKhau = $maHoKhau; SoHoKhau = "SHK-$stamp"; ChuHo = 'Chu Ho Smoke'; DiaChiThuongTru = 'Dia chi smoke'; LoaiHoKhau = 'Thuong tru'; SoThanhVien = 1; TrangThai = 'Hoat dong' }
  $created = Invoke-RestMethod -Uri "$base/ho-khau" -Method Post -ContentType 'application/json' -Body (To-JsonBody $createBody)
  $id = $created.data.MaHoKhau
  if (-not $id) { throw 'Create khong tra ve MaHoKhau' }

  $tvBody = @{ HoTen = 'Thanh vien smoke'; QuanHeChuHo = 'Con' }
  $tvCreated = Invoke-RestMethod -Uri "$base/ho-khau/$id/thanh-vien" -Method Post -ContentType 'application/json' -Body (To-JsonBody $tvBody)
  $tvId = $tvCreated.data.MaThanhVien
  if (-not $tvId) { throw 'Create thanh vien khong tra ve MaThanhVien' }

  $tvDeleted = Invoke-RestMethod -Uri "$base/ho-khau/thanh-vien/$tvId" -Method Delete
  if (-not $tvDeleted.success) { throw 'Delete thanh vien that bai' }

  $updateBody = @{ ChuHo = 'Chu Ho Smoke Updated' }
  $updated = Invoke-RestMethod -Uri "$base/ho-khau/$id" -Method Put -ContentType 'application/json' -Body (To-JsonBody $updateBody)
  if ($updated.data.ChuHo -ne 'Chu Ho Smoke Updated') { throw 'Update ChuHo khong dung' }

  $deleted = Invoke-RestMethod -Uri "$base/ho-khau/$id" -Method Delete
  if (-not $deleted.success) { throw 'Delete ho khau that bai' }

  Add-Result -Module 'Ho khau' -Flow 'Add/Edit/Delete (+ThanhVien add/delete)' -Status 'PASS' -Detail "MaHoKhau=$id; MaThanhVien=$tvId"
}
catch {
  Add-Result -Module 'Ho khau' -Flow 'Add/Edit/Delete (+ThanhVien add/delete)' -Status 'FAIL' -Detail $_.Exception.Message
}

try {
  $loai = Invoke-RestMethod -Uri "$base/ho-so-tthc/loai-thu-tuc" -Method Get
  $maLoai = $null
  if ($loai -and $loai.data -and $loai.data.Count -gt 0) { $maLoai = $loai.data[0].MaLoaiThuTuc }
  if (-not $maLoai) { throw 'Khong tim thay LoaiThuTuc de tao ho so' }

  $maHoSo = "HSSMOKE$stamp"
  $createBody = @{ MaHoSo = $maHoSo; SoHoSo = "HS-$stamp"; MaLoaiThuTuc = $maLoai; NguoiNop = 'Nguoi nop smoke'; TrangThai = 'Đã tiếp nhận' }
  $created = Invoke-RestMethod -Uri "$base/ho-so-tthc" -Method Post -ContentType 'application/json' -Body (To-JsonBody $createBody)
  $id = $created.data.MaHoSo
  if (-not $id) { throw 'Create khong tra ve MaHoSo' }
  $initialTrangThai = $created.data.TrangThai

  $updateBody = @{ TrangThai = 'Đang xử lý' }
  $updated = Invoke-RestMethod -Uri "$base/ho-so-tthc/$id" -Method Put -ContentType 'application/json' -Body (To-JsonBody $updateBody)
  $fetched = Invoke-RestMethod -Uri "$base/ho-so-tthc/$id" -Method Get
  if ($fetched.data.TrangThai -eq $initialTrangThai) { throw 'Update TrangThai khong dung' }

  $deleted = Invoke-RestMethod -Uri "$base/ho-so-tthc/$id" -Method Delete
  if (-not $deleted.success) { throw 'Delete that bai' }

  Add-Result -Module 'Ho so TTHC' -Flow 'Add/Edit/Delete' -Status 'PASS' -Detail "MaHoSo=$id; MaLoaiThuTuc=$maLoai"
}
catch {
  Add-Result -Module 'Ho so TTHC' -Flow 'Add/Edit/Delete' -Status 'FAIL' -Detail $_.Exception.Message
}

$results | ConvertTo-Json -Depth 10 | Set-Content -Path 'smoke-test-admin-justice-result.json' -Encoding UTF8
$results | Format-Table -AutoSize | Out-String | Write-Output
