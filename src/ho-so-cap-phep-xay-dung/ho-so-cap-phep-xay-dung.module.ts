import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HoSoCapPhepXayDung } from './ho-so-cap-phep-xay-dung.entity';
import { HoSoCapPhepXayDungService } from './ho-so-cap-phep-xay-dung.service';
import { HoSoCapPhepXayDungController } from './ho-so-cap-phep-xay-dung.controller';

@Module({
  imports: [TypeOrmModule.forFeature([HoSoCapPhepXayDung])],
  providers: [HoSoCapPhepXayDungService],
  controllers: [HoSoCapPhepXayDungController],
  exports: [HoSoCapPhepXayDungService],
})
export class HoSoCapPhepXayDungModule {}
