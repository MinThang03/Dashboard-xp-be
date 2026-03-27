import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { HoSoCapPhepXayDungService } from './ho-so-cap-phep-xay-dung.service';
import { HoSoCapPhepXayDung } from './ho-so-cap-phep-xay-dung.entity';

@Controller('ho-so-cap-phep-xay-dung')
export class HoSoCapPhepXayDungController {
  constructor(private readonly service: HoSoCapPhepXayDungService) {}

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
  create(@Body() payload: Partial<HoSoCapPhepXayDung>) {
    return this.service.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: Partial<HoSoCapPhepXayDung>) {
    return this.service.update(+id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(+id);
  }
}
