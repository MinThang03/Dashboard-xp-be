import { Controller, Get } from '@nestjs/common';
import { QuanHuyenService } from './quan-huyen.service';

@Controller('quan-huyen')
export class QuanHuyenController {
  constructor(private readonly service: QuanHuyenService) {}

  @Get()
  async findAll() {
    const data = await this.service.findAll();
    return { success: true, data };
  }
}
