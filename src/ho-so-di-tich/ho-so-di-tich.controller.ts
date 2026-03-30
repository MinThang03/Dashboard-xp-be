import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { HoSoDiTichService } from './ho-so-di-tich.service';
import { HoSoDiTich } from './ho-so-di-tich.entity';

@Controller('ho-so-di-tich')
export class HoSoDiTichController {
  constructor(private readonly service: HoSoDiTichService) {}

  @Get()
  async findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.service.findAll(page ? +page : 1, limit ? +limit : 1000);
  }

  @Get('stats')
  async getStats() {
    return this.service.getStats();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.service.findOne(+id);
  }

  @Post()
  async create(@Body() data: Partial<HoSoDiTich>) {
    return this.service.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: Partial<HoSoDiTich>) {
    return this.service.update(+id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.service.delete(+id);
  }
}
