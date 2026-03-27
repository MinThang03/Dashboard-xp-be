$ErrorActionPreference = 'Stop'
$base='http://localhost:3006/api'
$tests=@(
  @{name='ho-so-cap-phep-xay-dung'; id='MaHoSo'; create=@{LoaiCongTrinh='Nha o rieng le'; LoaiGiayPhep='Xay dung moi'; ChuDauTu='Smoke Test'; DiaChiCongTrinh='Dia chi test'; TrangThai='Cho xu ly'; NgayNop='2026-03-27'}; update=@{TrangThai='Dang tham dinh'; GhiChu='updated'}},
  @{name='theo-doi-trat-tu-xay-dung'; id='MaTheoDoi'; create=@{DiaChi='Dia chi test'; ChuDauTu='Smoke Test'; KetQuaKiemTra='Hop le'; TrangThaiXuLy='Dang xu ly'; NgayKiemTra='2026-03-27'}; update=@{TrangThaiXuLy='Da khac phuc'; GhiChu='updated'}},
  @{name='ha-tang-do-thi'; id='MaHaTang'; create=@{TenHangMuc='Tuyen test'; LoaiHaTang='Duong'; TinhTrang='Tot'; ViTri='Khu test'}; update=@{TinhTrang='Trung binh'; GhiChu='updated'}},
  @{name='xay-dung-trai-phep'; id='MaViPham'; create=@{DiaChi='Dia chi test'; ChuCongTrinh='Smoke Test'; LoaiViPham='Xay dung khong phep'; TrangThai='Moi phat hien'; NgayPhatHien='2026-03-27'}; update=@{TrangThai='Dang xu ly'; GhiChu='updated'}},
  @{name='nha-o-cong-trinh'; id='MaCongTrinh'; create=@{TenCongTrinh='Cong trinh test'; LoaiCongTrinh='Nha o rieng le'; PhanLoai='Cap 4'; DiaChi='Dia chi test'; ChuSoHuu='Smoke Test'}; update=@{TinhTrang='Trung binh'; GhiChu='updated'}},
  @{name='ho-ngheo'; id='MaHoNgheo'; create=@{ChuHo='Smoke Test'; DiaChi='Dia chi test'; SoThanhVien=3; NamDanhGia=2026}; update=@{GhiChu='updated'}},
  @{name='bao-tro-xa-hoi'; id='MaDoiTuong'; create=@{LoaiDoiTuong='Nguoi cao tuoi co don'; HoTen='Smoke Test'; TinhTrang='Dang huong'; NgayBatDau='2026-03-27'}; update=@{TinhTrang='Tam dung'; GhiChu='updated'}},
  @{name='nguoi-co-cong'; id='MaNCC'; create=@{LoaiDoiTuong='Thương binh'; HoTen='Smoke Test'; TinhTrang='Dang huong'; NgayHuong='2026-03-27'}; update=@{TinhTrang='Tam dung'; GhiChu='updated'}},
  @{name='viec-lam'; id='MaViecLam'; create=@{HoTen='Smoke Test'; NgheNghiep='Tho xay'; TrinhDo='THPT'; TrangThai='Dang tim viec'}; update=@{TrangThai='Da tim duoc viec'; GhiChu='updated'}}
)
$results=@()
foreach($t in $tests){
  try {
    $c=Invoke-RestMethod -Method Post -Uri "$base/$($t.name)" -ContentType 'application/json' -Body ($t.create|ConvertTo-Json -Depth 10)
    $id=$c.data.($t.id)
    if(-not $id){ throw "Missing id $($t.id)" }
    $null=Invoke-RestMethod -Method Put -Uri "$base/$($t.name)/$id" -ContentType 'application/json' -Body ($t.update|ConvertTo-Json -Depth 10)
    $null=Invoke-RestMethod -Method Delete -Uri "$base/$($t.name)/$id"
    $results += [PSCustomObject]@{module=$t.name; create='OK'; update='OK'; delete='OK'; id=$id; error=''}
  } catch {
    $results += [PSCustomObject]@{module=$t.name; create='FAIL'; update='-'; delete='-'; id=''; error=$_.Exception.Message}
  }
}
$results | ConvertTo-Json -Depth 5
