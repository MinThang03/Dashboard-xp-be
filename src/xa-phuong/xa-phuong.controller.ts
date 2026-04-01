import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { XaPhuongService } from './xa-phuong.service';

@Controller('xa-phuong')
export class XaPhuongController {
  constructor(private readonly service: XaPhuongService) {}

  @Get()
  async findAll() {
    const data = await this.service.findAll();
    return { success: true, data };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.service.findOne(Number(id));
    return { success: true, data };
  }

  @Post()
  async create(@Body() payload: any) {
    const data = await this.service.create(payload);
    return { success: true, data };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() payload: any) {
    const data = await this.service.update(Number(id), payload);
    return { success: true, data };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.service.remove(Number(id));
    return { success: true, data };
  }
}
