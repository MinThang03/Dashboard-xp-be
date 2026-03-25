import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { NganSachService } from './ngan-sach.service';
import { NganSach } from './ngan-sach.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('ngan-sach')
// @UseGuards(JwtAuthGuard) // Temporarily disabled
export class NganSachController {
  constructor(private readonly service: NganSachService) {}

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
  async create(@Body() data: Partial<NganSach>) {
    return this.service.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: Partial<NganSach>) {
    return this.service.update(+id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.service.delete(+id);
  }
}
