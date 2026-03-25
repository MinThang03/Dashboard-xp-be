import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { DiemNongAnNinhService } from './diem-nong-an-ninh.service';
import { DiemNongAnNinh } from './diem-nong-an-ninh.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('diem-nong-an-ninh')
// @UseGuards(JwtAuthGuard) // Temporarily disabled
export class DiemNongAnNinhController {
  constructor(private readonly service: DiemNongAnNinhService) {}

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
  async create(@Body() data: Partial<DiemNongAnNinh>) {
    return this.service.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: Partial<DiemNongAnNinh>) {
    return this.service.update(+id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.service.delete(+id);
  }
}
