import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { TiemChungService } from './tiem-chung.service';
import { TiemChung } from './tiem-chung.entity';

@Controller('tiem-chung')
export class TiemChungController {
  constructor(private readonly service: TiemChungService) {}

  @Get()
  async findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.service.findAll(page ? +page : 1, limit ? +limit : 100);
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
  async create(@Body() data: Partial<TiemChung>) {
    return this.service.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: Partial<TiemChung>) {
    return this.service.update(+id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.service.delete(+id);
  }
}
