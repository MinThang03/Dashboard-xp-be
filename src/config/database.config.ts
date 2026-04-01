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
import { NhanVienYTe } from '../nhan-vien-y-te/nhan-vien-y-te.entity';
import { DichBenh } from '../dich-benh/dich-benh.entity';
import { CoSoGiaoDuc } from '../co-so-giao-duc/co-so-giao-duc.entity';
import { TiemChung } from '../tiem-chung/tiem-chung.entity';
import { PhieuKham } from '../phieu-kham/phieu-kham.entity';
import { LopHoc } from '../lop-hoc/lop-hoc.entity';
import { NganSach } from '../ngan-sach/ngan-sach.entity';
import { ThuaDat } from '../thua-dat/thua-dat.entity';
import { BienDongDat } from '../bien-dong-dat/bien-dong-dat.entity';
import { TramQuanTracMT } from '../tram-quan-trac-m-t/tram-quan-trac-m-t.entity';
import { RacThai } from '../rac-thai/rac-thai.entity';
import { BaoCaoONhiem } from '../bao-cao-o-nhiem/bao-cao-onhiem.entity';
import { DiTich } from '../di-tich/di-tich.entity';
import { HoSoDiTich } from '../ho-so-di-tich/ho-so-di-tich.entity';
import { CoSoKinhDoanhDuLich } from '../co-so-kinh-doanh-du-lich/co-so-kinh-doanh-du-lich.entity';
import { LangNghe } from '../lang-nghe/lang-nghe.entity';
import { LeHoi } from '../le-hoi/le-hoi.entity';
import { RuiRoQuyHoach } from '../rui-ro-quy-hoach/rui-ro-quy-hoach.entity';
import { ViPham } from '../vi-pham/vi-pham.entity';
import { DiemNongAnNinh } from '../diem-nong-an-ninh/diem-nong-an-ninh.entity';
import { TamTruTamVang } from '../tam-tru-tam-vang/tam-tru-tam-vang.entity';
import { HoKinhDoanh } from '../ho-kinh-doanh/ho-kinh-doanh.entity';
import { ChoDiemKinhDoanh } from '../cho-diem-kinh-doanh/cho-diem-kinh-doanh.entity';
import { ThuPhi } from '../thu-phi/thu-phi.entity';
import { HoTroDoanhNghiep } from '../ho-tro-doanh-nghiep/ho-tro-doanh-nghiep.entity';
import { ThongKeKinhTe } from '../thong-ke-kinh-te/thong-ke-kinh-te.entity';
import { PhanAnh } from '../phan-anh/phan-anh.entity';
import { AnNinhTratTu } from '../an-ninh-trat-tu/an-ninh-trat-tu.entity';
import { HoSoCapPhepXayDung } from '../ho-so-cap-phep-xay-dung/ho-so-cap-phep-xay-dung.entity';
import { TheoDoiTratTuXayDung } from '../theo-doi-trat-tu-xay-dung/theo-doi-trat-tu-xay-dung.entity';
import { HaTangDoThi } from '../ha-tang-do-thi/ha-tang-do-thi.entity';
import { XayDungTraiPhep } from '../xay-dung-trai-phep/xay-dung-trai-phep.entity';
import { NhaOCongTrinh } from '../nha-o-cong-trinh/nha-o-cong-trinh.entity';
import { HoNgheo } from '../ho-ngheo/ho-ngheo.entity';
import { BaoTroXaHoi } from '../bao-tro-xa-hoi/bao-tro-xa-hoi.entity';
import { NguoiCoCong } from '../nguoi-co-cong/nguoi-co-cong.entity';
import { ViecLam } from '../viec-lam/viec-lam.entity';
import { VaiTro } from '../vai-tro/vai-tro.entity';
import { DonViHanhChinh } from '../don-vi-hanh-chinh/don-vi-hanh-chinh.entity';
import { QuanHuyen } from '../quan-huyen/quan-huyen.entity';
import { XaPhuong } from '../xa-phuong/xa-phuong.entity';
import { SystemSettings } from '../system-settings/system-settings.entity';
import { UserNotification } from '../notifications/notification.entity';
import { UserMessage } from '../messages/message.entity';

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
    NhanVienYTe,
    DichBenh,
    CoSoGiaoDuc,
    TiemChung,
    PhieuKham,
    LopHoc,
    NganSach,
    ThuaDat,
    BienDongDat,
    TramQuanTracMT,
    RacThai,
    BaoCaoONhiem,
    DiTich,
    HoSoDiTich,
    CoSoKinhDoanhDuLich,
    LangNghe,
    LeHoi,
    RuiRoQuyHoach,
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
    HoSoCapPhepXayDung,
    TheoDoiTratTuXayDung,
    HaTangDoThi,
    XayDungTraiPhep,
    NhaOCongTrinh,
    HoNgheo,
    BaoTroXaHoi,
    NguoiCoCong,
    ViecLam,
    VaiTro,
    DonViHanhChinh,
    QuanHuyen,
    XaPhuong,
    SystemSettings,
    UserNotification,
    UserMessage,
  ],
  synchronize: false,
  ssl: {
    rejectUnauthorized: false,
  },
  logging: false,
});
