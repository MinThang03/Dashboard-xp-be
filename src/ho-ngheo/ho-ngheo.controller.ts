import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { HoNgheoService } from './ho-ngheo.service';
import { HoNgheo } from './ho-ngheo.entity';

@Controller('ho-ngheo')
export class HoNgheoController {
  constructor(private readonly service: HoNgheoService) {}

  @Get()
  findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.service.findAll(page ? +page : 1, limit ? +limit : 20);
  }

  @Get('stats')
  getStats() {
    return this.service.getStats();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Post()
  create(@Body() payload: Partial<HoNgheo>) {
    return this.service.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: Partial<HoNgheo>) {
    return this.service.update(+id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(+id);
  }
}
