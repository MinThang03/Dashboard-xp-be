import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoSoKinhDoanhDuLich } from './co-so-kinh-doanh-du-lich.entity';
import { CoSoKinhDoanhDuLichService } from './co-so-kinh-doanh-du-lich.service';
import { CoSoKinhDoanhDuLichController } from './co-so-kinh-doanh-du-lich.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CoSoKinhDoanhDuLich])],
  providers: [CoSoKinhDoanhDuLichService],
  controllers: [CoSoKinhDoanhDuLichController],
  exports: [CoSoKinhDoanhDuLichService],
})
export class CoSoKinhDoanhDuLichModule {}
