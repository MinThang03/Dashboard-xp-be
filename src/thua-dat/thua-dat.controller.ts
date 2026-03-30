import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ThuaDatService } from './thua-dat.service';
import { ThuaDat } from './thua-dat.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('thua-dat')
// @UseGuards(JwtAuthGuard) // Temporarily disabled
export class ThuaDatController {
  constructor(private readonly service: ThuaDatService) {}

  @Get()
  async findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('loaiBanGhi') loaiBanGhi?: string,
  ) {
    return this.service.findAll(page ? +page : 1, limit ? +limit : 10, loaiBanGhi);
  }

  @Get('stats')
  async getStats() {
    return this.service.getStats();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  async create(@Body() data: Partial<ThuaDat>) {
    return this.service.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<ThuaDat>) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
