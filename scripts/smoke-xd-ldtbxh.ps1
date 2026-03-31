$ErrorActionPreference = 'Stop'

$tests = @(
  @{ name='ha-tang-do-thi'; endpoint='ha-tang-do-thi'; id='MaHaTang'; create=@{ TenHaTang='SMOKE HT'; LoaiHaTang='Duong' }; update=@{ TenHaTang='SMOKE HT U' } },
  @{ name='ho-so-cap-phep-xay-dung'; endpoint='ho-so-cap-phep-xay-dung'; id='MaHoSo'; create=@{ TenCongTrinh='SMOKE HS'; ChuDauTu='Tester' }; update=@{ TenCongTrinh='SMOKE HS U' } },
  @{ name='theo-doi-trat-tu-xay-dung'; endpoint='theo-doi-trat-tu-xay-dung'; id='MaTheoDoi'; create=@{ MaKiemTra='SMK-TTXD' }; update=@{ MaKiemTra='SMK-TTXD-U' } },
  @{ name='xay-dung-trai-phep'; endpoint='xay-dung-trai-phep'; id='MaViPham'; create=@{ DiaDiem='SMOKE'; ChuSoHuu='Tester' }; update=@{ DiaDiem='SMOKE U' } },
  @{ name='nha-o-cong-trinh'; endpoint='nha-o-cong-trinh'; id='MaCongTrinh'; create=@{ TenCongTrinh='SMOKE CT'; ChuDauTu='Tester' }; update=@{ TenCongTrinh='SMOKE CT U' } },
  @{ name='ho-ngheo'; endpoint='ho-ngheo'; id='MaHoNgheo'; create=@{ ChuHo='Tester'; ThuNhapBinhQuan=1000000 }; update=@{ ChuHo='Tester U' } },
  @{ name='bao-tro-xa-hoi'; endpoint='bao-tro-xa-hoi'; id='MaDoiTuong'; create=@{ LoaiDoiTuong='Nguoi gia'; HoTen='Tester' }; update=@{ HoTen='Tester U' } },
  @{ name='nguoi-co-cong'; endpoint='nguoi-co-cong'; id='MaNCC'; create=@{ LoaiCongHien='Liet si'; HoTen='Tester' }; update=@{ HoTen='Tester U' } },
  @{ name='viec-lam'; endpoint='viec-lam'; id='MaViecLam'; create=@{ TenCongViec='SMOKE JOB'; HoTen='Tester' }; update=@{ TenCongViec='SMOKE JOB U' } }
)

$results = @()

foreach ($t in $tests) {
  $idVal = $null
  try {
    $createBody = $t.create | ConvertTo-Json -Depth 5
    $created = Invoke-RestMethod -Method Post -Uri ("http://localhost:3006/api/" + $t.endpoint) -ContentType 'application/json' -Body $createBody
    $idVal = $created.data.($t.id)
    if (-not $idVal) { throw "missing id field $($t.id)" }

    $updateBody = $t.update | ConvertTo-Json -Depth 5
    $updated = Invoke-RestMethod -Method Put -Uri ("http://localhost:3006/api/" + $t.endpoint + "/" + $idVal) -ContentType 'application/json' -Body $updateBody
    $deleted = Invoke-RestMethod -Method Delete -Uri ("http://localhost:3006/api/" + $t.endpoint + "/" + $idVal)

    $results += [pscustomobject]@{
      module = $t.name
      create = 'PASS'
      update = if ($updated.success) { 'PASS' } else { 'FAIL' }
      delete = if ($deleted.success) { 'PASS' } else { 'FAIL' }
      detail = "id=$idVal"
    }
  } catch {
    $results += [pscustomobject]@{
      module = $t.name
      create = 'FAIL'
      update = 'FAIL'
      delete = 'FAIL'
      detail = $_.Exception.Message
    }

    if ($idVal) {
      try {
        Invoke-RestMethod -Method Delete -Uri ("http://localhost:3006/api/" + $t.endpoint + "/" + $idVal) | Out-Null
      } catch {}
    }
  }
}

$results | Format-Table -AutoSize

$fails = @($results | Where-Object { $_.create -ne 'PASS' -or $_.update -ne 'PASS' -or $_.delete -ne 'PASS' })
if ($fails.Count -gt 0) {
  exit 1
}
