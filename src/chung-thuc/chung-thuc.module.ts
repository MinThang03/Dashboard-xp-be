import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChungThuc } from './chung-thuc.entity';
import { ChungThucService } from './chung-thuc.service';
import { ChungThucController } from './chung-thuc.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ChungThuc])],
  providers: [ChungThucService],
  controllers: [ChungThucController],
  exports: [ChungThucService],
})
export class ChungThucModule {}
