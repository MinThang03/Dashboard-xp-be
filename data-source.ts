import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { User } from './src/users/user.entity';
import { UserSession } from './src/auth/user-session.entity';
import { HoTich } from './src/ho-tich/ho-tich.entity';
import { VanBan } from './src/van-ban/van-ban.entity';
import { ChungThuc } from './src/chung-thuc/chung-thuc.entity';
import { HoKhau } from './src/ho-khau/ho-khau.entity';
import { ThanhVienHoKhau } from './src/ho-khau/thanh-vien-ho-khau.entity';
import { HoSoTTHC } from './src/ho-so-tthc/ho-so-tthc.entity';
import { LoaiThuTuc } from './src/ho-so-tthc/loai-thu-tuc.entity';
import { BaoCao } from './src/bao-cao/bao-cao.entity';
import { TramYTe } from './src/tram-y-te/tram-yte.entity';
import { DichBenh } from './src/dich-benh/dich-benh.entity';
import { CoSoGiaoDuc } from './src/co-so-giao-duc/co-so-giao-duc.entity';
import { TiemChung } from './src/tiem-chung/tiem-chung.entity';
import { PhieuKham } from './src/phieu-kham/phieu-kham.entity';
import { LopHoc } from './src/lop-hoc/lop-hoc.entity';
import { NganSach } from './src/ngan-sach/ngan-sach.entity';
import { ThuaDat } from './src/thua-dat/thua-dat.entity';
import { BienDongDat } from './src/bien-dong-dat/bien-dong-dat.entity';
import { RacThai } from './src/rac-thai/rac-thai.entity';
import { BaoCaoONhiem } from './src/bao-cao-o-nhiem/bao-cao-onhiem.entity';
import { DiTich } from './src/di-tich/di-tich.entity';
import { LangNghe } from './src/lang-nghe/lang-nghe.entity';
import { LeHoi } from './src/le-hoi/le-hoi.entity';
import { ViPham } from './src/vi-pham/vi-pham.entity';
import { DiemNongAnNinh } from './src/diem-nong-an-ninh/diem-nong-an-ninh.entity';
import { TamTruTamVang } from './src/tam-tru-tam-vang/tam-tru-tam-vang.entity';
import { HoKinhDoanh } from './src/ho-kinh-doanh/ho-kinh-doanh.entity';
import { ChoDiemKinhDoanh } from './src/cho-diem-kinh-doanh/cho-diem-kinh-doanh.entity';
import { ThuPhi } from './src/thu-phi/thu-phi.entity';
import { HoTroDoanhNghiep } from './src/ho-tro-doanh-nghiep/ho-tro-doanh-nghiep.entity';
import { ThongKeKinhTe } from './src/thong-ke-kinh-te/thong-ke-kinh-te.entity';
import { PhanAnh } from './src/phan-anh/phan-anh.entity';
import { AnNinhTratTu } from './src/an-ninh-trat-tu/an-ninh-trat-tu.entity';

// Load environment variables
config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    User,
    UserSession,
    HoTich,
    VanBan,
    ChungThuc,
    HoKhau,
    ThanhVienHoKhau,
    HoSoTTHC,
    LoaiThuTuc,
    BaoCao,
    TramYTe,
    DichBenh,
    CoSoGiaoDuc,
    TiemChung,
    PhieuKham,
    LopHoc,
    NganSach,
    ThuaDat,
    BienDongDat,
    RacThai,
    BaoCaoONhiem,
    DiTich,
    LangNghe,
    LeHoi,
    ViPham,
    DiemNongAnNinh,
    TamTruTamVang,
    HoKinhDoanh,
    ChoDiemKinhDoanh,
    ThuPhi,
    HoTroDoanhNghiep,
    ThongKeKinhTe,
    PhanAnh,
    AnNinhTratTu,
  ],
  migrations: ['./migrations/*.ts'],
  ssl: {
    rejectUnauthorized: false,
  },
  logging: false,
});
