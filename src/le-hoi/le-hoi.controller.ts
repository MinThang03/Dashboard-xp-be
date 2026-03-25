import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { LeHoiService } from './le-hoi.service';
import { LeHoi } from './le-hoi.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('le-hoi')
// @UseGuards(JwtAuthGuard) // Temporarily disabled
export class LeHoiController {
  constructor(private readonly service: LeHoiService) {}

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
  async create(@Body() data: Partial<LeHoi>) {
    return this.service.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: Partial<LeHoi>) {
    return this.service.update(+id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.service.delete(+id);
  }
}
