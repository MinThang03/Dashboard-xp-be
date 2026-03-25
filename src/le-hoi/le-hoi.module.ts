import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeHoi } from './le-hoi.entity';
import { LeHoiService } from './le-hoi.service';
import { LeHoiController } from './le-hoi.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LeHoi])],
  providers: [LeHoiService],
  controllers: [LeHoiController],
  exports: [LeHoiService],
})
export class LeHoiModule {}
