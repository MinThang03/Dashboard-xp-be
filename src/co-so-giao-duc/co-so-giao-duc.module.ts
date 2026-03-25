import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoSoGiaoDuc } from './co-so-giao-duc.entity';
import { CoSoGiaoDucService } from './co-so-giao-duc.service';
import { CoSoGiaoDucController } from './co-so-giao-duc.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CoSoGiaoDuc])],
  providers: [CoSoGiaoDucService],
  controllers: [CoSoGiaoDucController],
  exports: [CoSoGiaoDucService],
})
export class CoSoGiaoDucModule {}
