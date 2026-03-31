import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NhanVienYTe } from './nhan-vien-y-te.entity';
import { TramYTe } from '../tram-y-te/tram-yte.entity';
import { NhanVienYTeService } from './nhan-vien-y-te.service';
import { NhanVienYTeController } from './nhan-vien-y-te.controller';

@Module({
  imports: [TypeOrmModule.forFeature([NhanVienYTe, TramYTe])],
  providers: [NhanVienYTeService],
  controllers: [NhanVienYTeController],
  exports: [NhanVienYTeService],
})
export class NhanVienYTeModule {}
