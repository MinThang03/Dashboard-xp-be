import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhanAnh } from './phan-anh.entity';
import { PhanAnhService } from './phan-anh.service';
import { PhanAnhController } from './phan-anh.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PhanAnh])],
  providers: [PhanAnhService],
  controllers: [PhanAnhController],
  exports: [PhanAnhService],
})
export class PhanAnhModule {}
