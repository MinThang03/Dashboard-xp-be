import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThuPhi } from './thu-phi.entity';
import { ThuPhiService } from './thu-phi.service';
import { ThuPhiController } from './thu-phi.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ThuPhi])],
  providers: [ThuPhiService],
  controllers: [ThuPhiController],
  exports: [ThuPhiService],
})
export class ThuPhiModule {}
