import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { HoTichService } from './ho-tich.service';
import { HoTich } from './ho-tich.entity';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('ho-tich')
// @UseGuards(JwtAuthGuard) // Temporarily disabled for testing
export class HoTichController {
  constructor(private readonly hoTichService: HoTichService) {}

  @Get()
  async findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    const result = await this.hoTichService.findAll({ page, limit });
    return {
      success: true,
      data: result.data,
      total: result.total,
      page: page || 1,
      limit: limit || 10,
    };
  }

  @Get('stats')
  async getStats() {
    const stats = await this.hoTichService.getStats();
    return {
      success: true,
      data: stats,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const data = await this.hoTichService.findOne(id);
    return {
      success: true,
      data,
    };
  }

  @Post()
  async create(@Body() data: Partial<HoTich>) {
    const result = await this.hoTichService.create(data);
    return {
      success: true,
      data: result,
      message: 'Tạo hồ sơ hộ tịch thành công',
    };
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: Partial<HoTich>) {
    const result = await this.hoTichService.update(id, data);
    return {
      success: true,
      data: result,
      message: 'Cập nhật hồ sơ hộ tịch thành công',
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.hoTichService.remove(id);
    return {
      success: true,
      message: 'Xóa hồ sơ hộ tịch thành công',
    };
  }
}
