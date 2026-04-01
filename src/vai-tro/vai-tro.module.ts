import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VaiTro } from './vai-tro.entity';
import { VaiTroService } from './vai-tro.service';
import { VaiTroController } from './vai-tro.controller';

@Module({
  imports: [TypeOrmModule.forFeature([VaiTro])],
  providers: [VaiTroService],
  controllers: [VaiTroController],
  exports: [VaiTroService, TypeOrmModule],
})
export class VaiTroModule {}
