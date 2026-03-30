import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HoSoDiTich } from './ho-so-di-tich.entity';
import { HoSoDiTichService } from './ho-so-di-tich.service';
import { HoSoDiTichController } from './ho-so-di-tich.controller';

@Module({
  imports: [TypeOrmModule.forFeature([HoSoDiTich])],
  providers: [HoSoDiTichService],
  controllers: [HoSoDiTichController],
  exports: [HoSoDiTichService],
})
export class HoSoDiTichModule {}
