import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ViecLam } from './viec-lam.entity';
import { ViecLamService } from './viec-lam.service';
import { ViecLamController } from './viec-lam.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ViecLam])],
  providers: [ViecLamService],
  controllers: [ViecLamController],
  exports: [ViecLamService],
})
export class ViecLamModule {}
