import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuanHuyen } from './quan-huyen.entity';
import { QuanHuyenService } from './quan-huyen.service';
import { QuanHuyenController } from './quan-huyen.controller';

@Module({
  imports: [TypeOrmModule.forFeature([QuanHuyen])],
  providers: [QuanHuyenService],
  controllers: [QuanHuyenController],
  exports: [QuanHuyenService, TypeOrmModule],
})
export class QuanHuyenModule {}
