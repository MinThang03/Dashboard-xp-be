import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { LopHocService } from './lop-hoc.service';
import { LopHoc } from './lop-hoc.entity';

@Controller('lop-hoc')
export class LopHocController {
  constructor(private readonly service: LopHocService) {}

  @Get()
  async findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.service.findAll(page ? +page : 1, limit ? +limit : 200);
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
  async create(@Body() data: Partial<LopHoc>) {
    return this.service.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: Partial<LopHoc>) {
    return this.service.update(+id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.service.delete(+id);
  }
}
