import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThongKeKinhTe } from './thong-ke-kinh-te.entity';
import { ThongKeKinhTeService } from './thong-ke-kinh-te.service';
import { ThongKeKinhTeController } from './thong-ke-kinh-te.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ThongKeKinhTe])],
  providers: [ThongKeKinhTeService],
  controllers: [ThongKeKinhTeController],
  exports: [ThongKeKinhTeService],
})
export class ThongKeKinhTeModule {}
