import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HoTroDoanhNghiep } from './ho-tro-doanh-nghiep.entity';
import { HoTroDoanhNghiepService } from './ho-tro-doanh-nghiep.service';
import { HoTroDoanhNghiepController } from './ho-tro-doanh-nghiep.controller';

@Module({
  imports: [TypeOrmModule.forFeature([HoTroDoanhNghiep])],
  providers: [HoTroDoanhNghiepService],
  controllers: [HoTroDoanhNghiepController],
  exports: [HoTroDoanhNghiepService],
})
export class HoTroDoanhNghiepModule {}
