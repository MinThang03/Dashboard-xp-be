import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RacThai } from './rac-thai.entity';
import { RacThaiService } from './rac-thai.service';
import { RacThaiController } from './rac-thai.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RacThai])],
  providers: [RacThaiService],
  controllers: [RacThaiController],
  exports: [RacThaiService],
})
export class RacThaiModule {}
