import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HoNgheo } from './ho-ngheo.entity';
import { HoNgheoService } from './ho-ngheo.service';
import { HoNgheoController } from './ho-ngheo.controller';

@Module({
  imports: [TypeOrmModule.forFeature([HoNgheo])],
  providers: [HoNgheoService],
  controllers: [HoNgheoController],
  exports: [HoNgheoService],
})
export class HoNgheoModule {}
