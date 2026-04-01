import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { XaPhuong } from './xa-phuong.entity';
import { QuanHuyen } from '../quan-huyen/quan-huyen.entity';
import { DonViHanhChinh } from '../don-vi-hanh-chinh/don-vi-hanh-chinh.entity';
import { XaPhuongService } from './xa-phuong.service';
import { XaPhuongController } from './xa-phuong.controller';

@Module({
  imports: [TypeOrmModule.forFeature([XaPhuong, QuanHuyen, DonViHanhChinh])],
  providers: [XaPhuongService],
  controllers: [XaPhuongController],
  exports: [XaPhuongService, TypeOrmModule],
})
export class XaPhuongModule {}
