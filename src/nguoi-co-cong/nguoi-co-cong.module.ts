import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NguoiCoCong } from './nguoi-co-cong.entity';
import { NguoiCoCongService } from './nguoi-co-cong.service';
import { NguoiCoCongController } from './nguoi-co-cong.controller';

@Module({
  imports: [TypeOrmModule.forFeature([NguoiCoCong])],
  providers: [NguoiCoCongService],
  controllers: [NguoiCoCongController],
  exports: [NguoiCoCongService],
})
export class NguoiCoCongModule {}
