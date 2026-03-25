import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { TramYTeService } from './tram-yte.service';
import { TramYTe } from './tram-yte.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tram-y-te')
// @UseGuards(JwtAuthGuard) // Temporarily disabled
export class TramYTeController {
  constructor(private readonly service: TramYTeService) {}

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
  async create(@Body() data: Partial<TramYTe>) {
    return this.service.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: Partial<TramYTe>) {
    return this.service.update(+id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.service.delete(+id);
  }
}
