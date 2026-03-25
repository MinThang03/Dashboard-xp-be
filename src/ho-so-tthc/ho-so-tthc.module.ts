import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HoSoTTHC } from './ho-so-tthc.entity';
import { LoaiThuTuc } from './loai-thu-tuc.entity';
import { User } from '../users/user.entity';
import { HoSoTTHCService } from './ho-so-tthc.service';
import { HoSoTTHCController } from './ho-so-tthc.controller';

@Module({
  imports: [TypeOrmModule.forFeature([HoSoTTHC, LoaiThuTuc, User])],
  providers: [HoSoTTHCService],
  controllers: [HoSoTTHCController],
  exports: [HoSoTTHCService],
})
export class HoSoTTHCModule {}
