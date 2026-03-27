$ErrorActionPreference = 'Stop'
$base = 'http://localhost:3006/api'
$rows = @()

try {
  $c = Invoke-RestMethod -Method Post -Uri "$base/thu-phi" -ContentType 'application/json' -Body (@{ LoaiPhi = 'Phi test'; NgayThu = '2026-03-27' } | ConvertTo-Json)
  $id = $c.data.MaThuPhi
  Invoke-RestMethod -Method Put -Uri "$base/thu-phi/$id" -ContentType 'application/json' -Body (@{ LoaiPhi = 'Phi updated'; ThangNam = '2026-03'; Nam = 2026; TrangThai = 'Da thu' } | ConvertTo-Json) | Out-Null
  Invoke-RestMethod -Method Delete -Uri "$base/thu-phi/$id" | Out-Null
  $rows += [pscustomobject]@{ module = 'thu-phi'; result = 'OK' }
} catch {
  $rows += [pscustomobject]@{ module = 'thu-phi'; result = 'FAIL'; error = $_.Exception.Message }
}

try {
  $c = Invoke-RestMethod -Method Post -Uri "$base/vi-pham" -ContentType 'application/json' -Body (@{ LoaiViPham = 'VPHC'; NgayLap = '2026-03-27' } | ConvertTo-Json)
  $id = $c.data.MaViPham
  Invoke-RestMethod -Method Put -Uri "$base/vi-pham/$id" -ContentType 'application/json' -Body (@{ LoaiViPham = 'VPHC-KD'; CCCD = '079'; DiaChi = 'KP1'; TrangThai = 'Da xu ly' } | ConvertTo-Json) | Out-Null
  Invoke-RestMethod -Method Delete -Uri "$base/vi-pham/$id" | Out-Null
  $rows += [pscustomobject]@{ module = 'vi-pham'; result = 'OK' }
} catch {
  $rows += [pscustomobject]@{ module = 'vi-pham'; result = 'FAIL'; error = $_.Exception.Message }
}

try {
  $c = Invoke-RestMethod -Method Post -Uri "$base/diem-nong-an-ninh" -ContentType 'application/json' -Body (@{ TenDiaDiem = 'Test'; NgayPhatHien = '2026-03-27' } | ConvertTo-Json)
  $id = $c.data.MaDiem
  Invoke-RestMethod -Method Put -Uri "$base/diem-nong-an-ninh/$id" -ContentType 'application/json' -Body (@{ TenDiaDiem = 'Test2'; DiaChi = 'KP2'; TrangThai = 'Dang theo doi' } | ConvertTo-Json) | Out-Null
  Invoke-RestMethod -Method Delete -Uri "$base/diem-nong-an-ninh/$id" | Out-Null
  $rows += [pscustomobject]@{ module = 'diem-nong-an-ninh'; result = 'OK' }
} catch {
  $rows += [pscustomobject]@{ module = 'diem-nong-an-ninh'; result = 'FAIL'; error = $_.Exception.Message }
}

$rows | ConvertTo-Json -Depth 5
