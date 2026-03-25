import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HoKinhDoanh } from './ho-kinh-doanh.entity';
import { HoKinhDoanhService } from './ho-kinh-doanh.service';
import { HoKinhDoanhController } from './ho-kinh-doanh.controller';

@Module({
  imports: [TypeOrmModule.forFeature([HoKinhDoanh])],
  providers: [HoKinhDoanhService],
  controllers: [HoKinhDoanhController],
  exports: [HoKinhDoanhService],
})
export class HoKinhDoanhModule {}
