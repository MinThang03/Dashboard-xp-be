import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { RuiRoQuyHoachService } from './rui-ro-quy-hoach.service';
import { RuiRoQuyHoach } from './rui-ro-quy-hoach.entity';

@Controller('rui-ro-quy-hoach')
export class RuiRoQuyHoachController {
  constructor(private readonly service: RuiRoQuyHoachService) {}

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
  async create(@Body() data: Partial<RuiRoQuyHoach>) {
    return this.service.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: Partial<RuiRoQuyHoach>) {
    return this.service.update(+id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.service.delete(+id);
  }
}
