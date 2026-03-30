import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RuiRoQuyHoach } from './rui-ro-quy-hoach.entity';
import { RuiRoQuyHoachService } from './rui-ro-quy-hoach.service';
import { RuiRoQuyHoachController } from './rui-ro-quy-hoach.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RuiRoQuyHoach])],
  providers: [RuiRoQuyHoachService],
  controllers: [RuiRoQuyHoachController],
  exports: [RuiRoQuyHoachService],
})
export class RuiRoQuyHoachModule {}
