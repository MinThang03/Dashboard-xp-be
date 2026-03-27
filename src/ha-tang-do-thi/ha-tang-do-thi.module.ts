import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HaTangDoThi } from './ha-tang-do-thi.entity';
import { HaTangDoThiService } from './ha-tang-do-thi.service';
import { HaTangDoThiController } from './ha-tang-do-thi.controller';

@Module({
  imports: [TypeOrmModule.forFeature([HaTangDoThi])],
  providers: [HaTangDoThiService],
  controllers: [HaTangDoThiController],
  exports: [HaTangDoThiService],
})
export class HaTangDoThiModule {}
