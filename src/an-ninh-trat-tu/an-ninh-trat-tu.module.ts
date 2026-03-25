import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnNinhTratTu } from './an-ninh-trat-tu.entity';
import { AnNinhTratTuService } from './an-ninh-trat-tu.service';
import { AnNinhTratTuController } from './an-ninh-trat-tu.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AnNinhTratTu])],
  providers: [AnNinhTratTuService],
  controllers: [AnNinhTratTuController],
  exports: [AnNinhTratTuService],
})
export class AnNinhTratTuModule {}
