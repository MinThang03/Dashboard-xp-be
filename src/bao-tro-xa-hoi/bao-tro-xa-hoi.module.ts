import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaoTroXaHoi } from './bao-tro-xa-hoi.entity';
import { BaoTroXaHoiService } from './bao-tro-xa-hoi.service';
import { BaoTroXaHoiController } from './bao-tro-xa-hoi.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BaoTroXaHoi])],
  providers: [BaoTroXaHoiService],
  controllers: [BaoTroXaHoiController],
  exports: [BaoTroXaHoiService],
})
export class BaoTroXaHoiModule {}
