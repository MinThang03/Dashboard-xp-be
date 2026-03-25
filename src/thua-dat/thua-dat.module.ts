import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThuaDat } from './thua-dat.entity';
import { ThuaDatService } from './thua-dat.service';
import { ThuaDatController } from './thua-dat.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ThuaDat])],
  providers: [ThuaDatService],
  controllers: [ThuaDatController],
  exports: [ThuaDatService],
})
export class ThuaDatModule {}
