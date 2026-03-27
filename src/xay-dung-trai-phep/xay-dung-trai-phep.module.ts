import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { XayDungTraiPhep } from './xay-dung-trai-phep.entity';
import { XayDungTraiPhepService } from './xay-dung-trai-phep.service';
import { XayDungTraiPhepController } from './xay-dung-trai-phep.controller';

@Module({
  imports: [TypeOrmModule.forFeature([XayDungTraiPhep])],
  providers: [XayDungTraiPhepService],
  controllers: [XayDungTraiPhepController],
  exports: [XayDungTraiPhepService],
})
export class XayDungTraiPhepModule {}
