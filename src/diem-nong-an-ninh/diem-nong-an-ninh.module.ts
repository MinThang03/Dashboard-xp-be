import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiemNongAnNinh } from './diem-nong-an-ninh.entity';
import { DiemNongAnNinhService } from './diem-nong-an-ninh.service';
import { DiemNongAnNinhController } from './diem-nong-an-ninh.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DiemNongAnNinh])],
  providers: [DiemNongAnNinhService],
  controllers: [DiemNongAnNinhController],
  exports: [DiemNongAnNinhService],
})
export class DiemNongAnNinhModule {}
