import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NhaOCongTrinh } from './nha-o-cong-trinh.entity';
import { NhaOCongTrinhService } from './nha-o-cong-trinh.service';
import { NhaOCongTrinhController } from './nha-o-cong-trinh.controller';

@Module({
  imports: [TypeOrmModule.forFeature([NhaOCongTrinh])],
  providers: [NhaOCongTrinhService],
  controllers: [NhaOCongTrinhController],
  exports: [NhaOCongTrinhService],
})
export class NhaOCongTrinhModule {}
