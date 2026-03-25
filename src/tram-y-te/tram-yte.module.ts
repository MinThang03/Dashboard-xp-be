import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TramYTe } from './tram-yte.entity';
import { TramYTeService } from './tram-yte.service';
import { TramYTeController } from './tram-yte.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TramYTe])],
  providers: [TramYTeService],
  controllers: [TramYTeController],
  exports: [TramYTeService],
})
export class TramYTeModule {}
