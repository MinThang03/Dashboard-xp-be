import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HoKhau } from './ho-khau.entity';
import { ThanhVienHoKhau } from './thanh-vien-ho-khau.entity';
import { HoKhauService } from './ho-khau.service';
import { HoKhauController } from './ho-khau.controller';

@Module({
  imports: [TypeOrmModule.forFeature([HoKhau, ThanhVienHoKhau])],
  providers: [HoKhauService],
  controllers: [HoKhauController],
  exports: [HoKhauService],
})
export class HoKhauModule {}
