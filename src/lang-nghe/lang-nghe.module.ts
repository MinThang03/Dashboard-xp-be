import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LangNghe } from './lang-nghe.entity';
import { LangNgheService } from './lang-nghe.service';
import { LangNgheController } from './lang-nghe.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LangNghe])],
  providers: [LangNgheService],
  controllers: [LangNgheController],
  exports: [LangNgheService],
})
export class LangNgheModule {}
