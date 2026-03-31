import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaoCaoONhiem } from './bao-cao-onhiem.entity';
import { User } from '../users/user.entity';
import { BaoCaoONhiemService } from './bao-cao-onhiem.service';
import { BaoCaoONhiemController } from './bao-cao-onhiem.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BaoCaoONhiem, User])],
  providers: [BaoCaoONhiemService],
  controllers: [BaoCaoONhiemController],
  exports: [BaoCaoONhiemService],
})
export class BaoCaoONhiemModule {}
