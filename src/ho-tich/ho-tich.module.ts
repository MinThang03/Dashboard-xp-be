import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HoTich } from './ho-tich.entity';
import { HoTichService } from './ho-tich.service';
import { HoTichController } from './ho-tich.controller';

@Module({
  imports: [TypeOrmModule.forFeature([HoTich])],
  providers: [HoTichService],
  controllers: [HoTichController],
  exports: [HoTichService],
})
export class HoTichModule {}
