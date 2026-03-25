import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaoCao } from './bao-cao.entity';
import { BaoCaoService } from './bao-cao.service';
import { BaoCaoController } from './bao-cao.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BaoCao])],
  providers: [BaoCaoService],
  controllers: [BaoCaoController],
  exports: [BaoCaoService],
})
export class BaoCaoModule {}
