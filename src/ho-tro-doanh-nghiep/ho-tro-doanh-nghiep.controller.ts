import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { HoTroDoanhNghiepService } from './ho-tro-doanh-nghiep.service';
import { HoTroDoanhNghiep } from './ho-tro-doanh-nghiep.entity';

@Controller('ho-tro-doanh-nghiep')
export class HoTroDoanhNghiepController {
  constructor(private readonly service: HoTroDoanhNghiepService) {}

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
  create(@Body() payload: Partial<HoTroDoanhNghiep>) {
    return this.service.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: Partial<HoTroDoanhNghiep>) {
    return this.service.update(+id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(+id);
  }
}
