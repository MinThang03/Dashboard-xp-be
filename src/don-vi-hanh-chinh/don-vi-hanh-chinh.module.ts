import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DonViHanhChinh } from './don-vi-hanh-chinh.entity';
import { DonViHanhChinhService } from './don-vi-hanh-chinh.service';
import { DonViHanhChinhController } from './don-vi-hanh-chinh.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DonViHanhChinh])],
  providers: [DonViHanhChinhService],
  controllers: [DonViHanhChinhController],
  exports: [DonViHanhChinhService, TypeOrmModule],
})
export class DonViHanhChinhModule {}
