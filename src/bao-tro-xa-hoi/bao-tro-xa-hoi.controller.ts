import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { BaoTroXaHoiService } from './bao-tro-xa-hoi.service';
import { BaoTroXaHoi } from './bao-tro-xa-hoi.entity';

@Controller('bao-tro-xa-hoi')
export class BaoTroXaHoiController {
  constructor(private readonly service: BaoTroXaHoiService) {}

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
  create(@Body() payload: Partial<BaoTroXaHoi>) {
    return this.service.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: Partial<BaoTroXaHoi>) {
    return this.service.update(+id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(+id);
  }
}
