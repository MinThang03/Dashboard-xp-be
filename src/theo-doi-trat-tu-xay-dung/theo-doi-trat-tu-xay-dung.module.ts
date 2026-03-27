import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TheoDoiTratTuXayDung } from './theo-doi-trat-tu-xay-dung.entity';
import { TheoDoiTratTuXayDungService } from './theo-doi-trat-tu-xay-dung.service';
import { TheoDoiTratTuXayDungController } from './theo-doi-trat-tu-xay-dung.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TheoDoiTratTuXayDung])],
  providers: [TheoDoiTratTuXayDungService],
  controllers: [TheoDoiTratTuXayDungController],
  exports: [TheoDoiTratTuXayDungService],
})
export class TheoDoiTratTuXayDungModule {}
