import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ViPham } from './vi-pham.entity';
import { ViPhamService } from './vi-pham.service';
import { ViPhamController } from './vi-pham.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ViPham])],
  providers: [ViPhamService],
  controllers: [ViPhamController],
  exports: [ViPhamService],
})
export class ViPhamModule {}
