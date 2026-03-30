import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { TramQuanTracMT } from './tram-quan-trac-m-t.entity';
import { TramQuanTracMTService } from './tram-quan-trac-m-t.service';

@Controller('tram-quan-trac-m-t')
export class TramQuanTracMTController {
  constructor(private readonly service: TramQuanTracMTService) {}

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
  async create(@Body() data: Partial<TramQuanTracMT>) {
    return this.service.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: Partial<TramQuanTracMT>) {
    return this.service.update(+id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.service.delete(+id);
  }
}
