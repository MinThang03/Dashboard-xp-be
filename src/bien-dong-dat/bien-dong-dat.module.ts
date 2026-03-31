import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BienDongDat } from './bien-dong-dat.entity';
import { ThuaDat } from '../thua-dat/thua-dat.entity';
import { BienDongDatService } from './bien-dong-dat.service';
import { BienDongDatController } from './bien-dong-dat.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BienDongDat, ThuaDat])],
  providers: [BienDongDatService],
  controllers: [BienDongDatController],
  exports: [BienDongDatService],
})
export class BienDongDatModule {}
