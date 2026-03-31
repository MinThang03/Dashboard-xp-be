import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TramYTe } from './tram-yte.entity';
import { NhanVienYTe } from '../nhan-vien-y-te/nhan-vien-y-te.entity';
import { TramYTeService } from './tram-yte.service';
import { TramYTeController } from './tram-yte.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TramYTe, NhanVienYTe])],
  providers: [TramYTeService],
  controllers: [TramYTeController],
  exports: [TramYTeService],
})
export class TramYTeModule {}
