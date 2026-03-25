import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { BaoCaoONhiemService } from './bao-cao-onhiem.service';
import { BaoCaoONhiem } from './bao-cao-onhiem.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('bao-cao-o-nhiem')
// @UseGuards(JwtAuthGuard) // Temporarily disabled
export class BaoCaoONhiemController {
  constructor(private readonly service: BaoCaoONhiemService) {}

  @Get()
  async findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.service.findAll(page ? +page : 1, limit ? +limit : 10);
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
  async create(@Body() data: Partial<BaoCaoONhiem>) {
    return this.service.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: Partial<BaoCaoONhiem>) {
    return this.service.update(+id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.service.delete(+id);
  }
}
