import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VanBan } from './van-ban.entity';
import { VanBanService } from './van-ban.service';
import { VanBanController } from './van-ban.controller';

@Module({
  imports: [TypeOrmModule.forFeature([VanBan])],
  providers: [VanBanService],
  controllers: [VanBanController],
  exports: [VanBanService],
})
export class VanBanModule {}
