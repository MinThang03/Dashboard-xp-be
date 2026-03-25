import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiemChung } from './tiem-chung.entity';
import { TiemChungService } from './tiem-chung.service';
import { TiemChungController } from './tiem-chung.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TiemChung])],
  providers: [TiemChungService],
  controllers: [TiemChungController],
  exports: [TiemChungService],
})
export class TiemChungModule {}
