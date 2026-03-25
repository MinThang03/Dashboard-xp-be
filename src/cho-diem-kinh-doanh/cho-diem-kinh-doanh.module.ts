import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChoDiemKinhDoanh } from './cho-diem-kinh-doanh.entity';
import { ChoDiemKinhDoanhService } from './cho-diem-kinh-doanh.service';
import { ChoDiemKinhDoanhController } from './cho-diem-kinh-doanh.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ChoDiemKinhDoanh])],
  providers: [ChoDiemKinhDoanhService],
  controllers: [ChoDiemKinhDoanhController],
  exports: [ChoDiemKinhDoanhService],
})
export class ChoDiemKinhDoanhModule {}
