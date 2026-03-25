import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/user.entity';
import { UserSession } from '../auth/user-session.entity';
import { HoTich } from '../ho-tich/ho-tich.entity';
import { VanBan } from '../van-ban/van-ban.entity';
import { ChungThuc } from '../chung-thuc/chung-thuc.entity';
import { HoKhau } from '../ho-khau/ho-khau.entity';
import { ThanhVienHoKhau } from '../ho-khau/thanh-vien-ho-khau.entity';
import { HoSoTTHC } from '../ho-so-tthc/ho-so-tthc.entity';
import { LoaiThuTuc } from '../ho-so-tthc/loai-thu-tuc.entity';
import { BaoCao } from '../bao-cao/bao-cao.entity';
import { TramYTe } from '../tram-y-te/tram-yte.entity';
import { DichBenh } from '../dich-benh/dich-benh.entity';
import { CoSoGiaoDuc } from '../co-so-giao-duc/co-so-giao-duc.entity';
import { TiemChung } from '../tiem-chung/tiem-chung.entity';
import { PhieuKham } from '../phieu-kham/phieu-kham.entity';
import { LopHoc } from '../lop-hoc/lop-hoc.entity';
import { NganSach } from '../ngan-sach/ngan-sach.entity';
import { ThuaDat } from '../thua-dat/thua-dat.entity';
import { BienDongDat } from '../bien-dong-dat/bien-dong-dat.entity';
import { RacThai } from '../rac-thai/rac-thai.entity';
import { BaoCaoONhiem } from '../bao-cao-o-nhiem/bao-cao-onhiem.entity';
import { DiTich } from '../di-tich/di-tich.entity';
import { LangNghe } from '../lang-nghe/lang-nghe.entity';
import { LeHoi } from '../le-hoi/le-hoi.entity';
import { ViPham } from '../vi-pham/vi-pham.entity';
import { DiemNongAnNinh } from '../diem-nong-an-ninh/diem-nong-an-ninh.entity';

export const typeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
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
  ],
  synchronize: false,
  ssl: {
    rejectUnauthorized: false,
  },
  logging: false,
});
