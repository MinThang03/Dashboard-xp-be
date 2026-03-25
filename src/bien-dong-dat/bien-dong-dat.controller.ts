import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { BienDongDatService } from './bien-dong-dat.service';
import { BienDongDat } from './bien-dong-dat.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('bien-dong-dat')
// @UseGuards(JwtAuthGuard) // Temporarily disabled
export class BienDongDatController {
  constructor(private readonly service: BienDongDatService) {}

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
  async create(@Body() data: Partial<BienDongDat>) {
    return this.service.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: Partial<BienDongDat>) {
    return this.service.update(+id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.service.delete(+id);
  }
}
