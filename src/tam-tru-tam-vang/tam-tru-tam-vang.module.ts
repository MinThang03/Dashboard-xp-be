import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TamTruTamVang } from './tam-tru-tam-vang.entity';
import { TamTruTamVangService } from './tam-tru-tam-vang.service';
import { TamTruTamVangController } from './tam-tru-tam-vang.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TamTruTamVang])],
  providers: [TamTruTamVangService],
  controllers: [TamTruTamVangController],
  exports: [TamTruTamVangService],
})
export class TamTruTamVangModule {}
