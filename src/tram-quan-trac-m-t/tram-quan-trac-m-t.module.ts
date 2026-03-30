import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TramQuanTracMTController } from './tram-quan-trac-m-t.controller';
import { TramQuanTracMT } from './tram-quan-trac-m-t.entity';
import { TramQuanTracMTService } from './tram-quan-trac-m-t.service';

@Module({
  imports: [TypeOrmModule.forFeature([TramQuanTracMT])],
  providers: [TramQuanTracMTService],
  controllers: [TramQuanTracMTController],
  exports: [TramQuanTracMTService],
})
export class TramQuanTracMTModule {}
