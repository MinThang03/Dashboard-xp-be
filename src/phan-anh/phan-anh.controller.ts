import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { PhanAnhService } from './phan-anh.service';
import { PhanAnh } from './phan-anh.entity';

@Controller('phan-anh')
export class PhanAnhController {
  constructor(private readonly service: PhanAnhService) {}

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
  create(@Body() payload: Partial<PhanAnh>) {
    return this.service.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: Partial<PhanAnh>) {
    return this.service.update(+id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(+id);
  }
}
