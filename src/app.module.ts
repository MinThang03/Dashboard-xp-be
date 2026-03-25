import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { typeOrmConfig } from './config/database.config';

// Module 1: Hành chính tư pháp
import { HoTichModule } from './ho-tich/ho-tich.module';
import { VanBanModule } from './van-ban/van-ban.module';
import { ChungThucModule } from './chung-thuc/chung-thuc.module';
import { HoKhauModule } from './ho-khau/ho-khau.module';
import { TamTruTamVangModule } from './tam-tru-tam-vang/tam-tru-tam-vang.module';
import { HoSoTTHCModule } from './ho-so-tthc/ho-so-tthc.module';
import { BaoCaoModule } from './bao-cao/bao-cao.module';

// Module 2: Y tế - Giáo dục
import { TramYTeModule } from './tram-y-te/tram-yte.module';
import { DichBenhModule } from './dich-benh/dich-benh.module';
import { CoSoGiaoDucModule } from './co-so-giao-duc/co-so-giao-duc.module';
import { TiemChungModule } from './tiem-chung/tiem-chung.module';
import { PhieuKhamModule } from './phieu-kham/phieu-kham.module';
import { LopHocModule } from './lop-hoc/lop-hoc.module';
import { HoKinhDoanhModule } from './ho-kinh-doanh/ho-kinh-doanh.module';
import { ChoDiemKinhDoanhModule } from './cho-diem-kinh-doanh/cho-diem-kinh-doanh.module';
import { ThuPhiModule } from './thu-phi/thu-phi.module';
import { HoTroDoanhNghiepModule } from './ho-tro-doanh-nghiep/ho-tro-doanh-nghiep.module';
import { ThongKeKinhTeModule } from './thong-ke-kinh-te/thong-ke-kinh-te.module';
import { PhanAnhModule } from './phan-anh/phan-anh.module';
import { AnNinhTratTuModule } from './an-ninh-trat-tu/an-ninh-trat-tu.module';

// Module 3: Tài chính
import { NganSachModule } from './ngan-sach/ngan-sach.module';

// Module 4: Địa chính
import { ThuaDatModule } from './thua-dat/thua-dat.module';
import { BienDongDatModule } from './bien-dong-dat/bien-dong-dat.module';

// Module 5: Môi trường
import { RacThaiModule } from './rac-thai/rac-thai.module';
import { BaoCaoONhiemModule } from './bao-cao-o-nhiem/bao-cao-onhiem.module';

// Module 6: Văn hóa - Du lịch
import { DiTichModule } from './di-tich/di-tich.module';
import { LangNgheModule } from './lang-nghe/lang-nghe.module';
import { LeHoiModule } from './le-hoi/le-hoi.module';

// Module 7: An ninh - Trật tự
import { ViPhamModule } from './vi-pham/vi-pham.module';
import { DiemNongAnNinhModule } from './diem-nong-an-ninh/diem-nong-an-ninh.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: typeOrmConfig,
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    // Hành chính tư pháp
    HoTichModule,
    VanBanModule,
    ChungThucModule,
    HoKhauModule,
    TamTruTamVangModule,
    HoSoTTHCModule,
    BaoCaoModule,
    // Y tế - Giáo dục
    TramYTeModule,
    DichBenhModule,
    CoSoGiaoDucModule,
    TiemChungModule,
    PhieuKhamModule,
    LopHocModule,
    // Kinh tế - Thương mại
    HoKinhDoanhModule,
    ChoDiemKinhDoanhModule,
    ThuPhiModule,
    HoTroDoanhNghiepModule,
    ThongKeKinhTeModule,
    // Tài chính
    NganSachModule,
    // Địa chính
    ThuaDatModule,
    BienDongDatModule,
    // Môi trường
    RacThaiModule,
    BaoCaoONhiemModule,
    // Văn hóa - Du lịch
    DiTichModule,
    LangNgheModule,
    LeHoiModule,
    // An ninh - Trật tự
    ViPhamModule,
    DiemNongAnNinhModule,
    PhanAnhModule,
    AnNinhTratTuModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
