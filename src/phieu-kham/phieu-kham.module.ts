import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhieuKham } from './phieu-kham.entity';
import { PhieuKhamService } from './phieu-kham.service';
import { PhieuKhamController } from './phieu-kham.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PhieuKham])],
  providers: [PhieuKhamService],
  controllers: [PhieuKhamController],
  exports: [PhieuKhamService],
})
export class PhieuKhamModule {}
