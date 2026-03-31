import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { HoTichService } from './ho-tich.service';
import { HoTich } from './ho-tich.entity';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('ho-tich')
// @UseGuards(JwtAuthGuard) // Temporarily disabled for testing
export class HoTichController {
  constructor(private readonly hoTichService: HoTichService) {}

  @Get()
  async findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    const parsedPage = page ? Number(page) : 1;
    const parsedLimit = limit ? Number(limit) : 10;
    const result = await this.hoTichService.findAll({ page: parsedPage, limit: parsedLimit });
    return {
      success: true,
      data: result.data,
      total: result.total,
      page: parsedPage,
      limit: parsedLimit,
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
  async findOne(@Param('id') id: string) {
    const data = await this.hoTichService.findOne(Number(id));
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
  async update(@Param('id') id: string, @Body() data: Partial<HoTich>) {
    const result = await this.hoTichService.update(Number(id), data);
    return {
      success: true,
      data: result,
      message: 'Cập nhật hồ sơ hộ tịch thành công',
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.hoTichService.remove(Number(id));
    return {
      success: true,
      message: 'Xóa hồ sơ hộ tịch thành công',
    };
  }
}
