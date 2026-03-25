import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DichBenh } from './dich-benh.entity';
import { DichBenhService } from './dich-benh.service';
import { DichBenhController } from './dich-benh.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DichBenh])],
  providers: [DichBenhService],
  controllers: [DichBenhController],
  exports: [DichBenhService],
})
export class DichBenhModule {}
