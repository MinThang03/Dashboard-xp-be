import { Controller, Get } from '@nestjs/common';
import { DonViHanhChinhService } from './don-vi-hanh-chinh.service';

@Controller('don-vi-hanh-chinh')
export class DonViHanhChinhController {
  constructor(private readonly service: DonViHanhChinhService) {}

  @Get()
  async findAll() {
    const data = await this.service.findAll();
    return { success: true, data };
  }
}
