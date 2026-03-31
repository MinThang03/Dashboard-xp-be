import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { NhanVienYTeService } from './nhan-vien-y-te.service';
import { NhanVienYTe } from './nhan-vien-y-te.entity';

@Controller('nhan-vien-y-te')
export class NhanVienYTeController {
  constructor(private readonly service: NhanVienYTeService) {}

  @Get()
  async findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('maTram') maTram?: string,
  ) {
    return this.service.findAll(
      page ? +page : 1,
      limit ? +limit : 10,
      maTram !== undefined && maTram !== '' ? +maTram : undefined,
    );
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
  async create(@Body() data: Partial<NhanVienYTe>) {
    return this.service.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: Partial<NhanVienYTe>) {
    return this.service.update(+id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.service.delete(+id);
  }
}
