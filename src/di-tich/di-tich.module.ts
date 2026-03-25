import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiTich } from './di-tich.entity';
import { DiTichService } from './di-tich.service';
import { DiTichController } from './di-tich.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DiTich])],
  providers: [DiTichService],
  controllers: [DiTichController],
  exports: [DiTichService],
})
export class DiTichModule {}
