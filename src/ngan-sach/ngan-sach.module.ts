import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NganSach } from './ngan-sach.entity';
import { NganSachService } from './ngan-sach.service';
import { NganSachController } from './ngan-sach.controller';

@Module({
  imports: [TypeOrmModule.forFeature([NganSach])],
  providers: [NganSachService],
  controllers: [NganSachController],
  exports: [NganSachService],
})
export class NganSachModule {}
