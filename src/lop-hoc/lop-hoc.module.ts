import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LopHoc } from './lop-hoc.entity';
import { LopHocService } from './lop-hoc.service';
import { LopHocController } from './lop-hoc.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LopHoc])],
  providers: [LopHocService],
  controllers: [LopHocController],
  exports: [LopHocService],
})
export class LopHocModule {}
