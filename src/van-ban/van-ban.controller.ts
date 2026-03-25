import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { VanBanService } from './van-ban.service';
import { VanBan } from './van-ban.entity';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('van-ban')
// @UseGuards(JwtAuthGuard) // Temporarily disabled
export class VanBanController {
  constructor(private readonly vanBanService: VanBanService) {}

  @Get()
  async findAll(@Query('page') page?: number, @Query('limit') limit?: number, @Query('search') search?: string) {
    const result = await this.vanBanService.findAll({ page, limit, search });
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
    const stats = await this.vanBanService.getStats();
    return {
      success: true,
      data: stats,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const data = await this.vanBanService.findOne(id);
    return {
      success: true,
      data,
    };
  }

  @Post()
  async create(@Body() data: Partial<VanBan>) {
    const result = await this.vanBanService.create(data);
    return {
      success: true,
      data: result,
      message: 'Tạo văn bản thành công',
    };
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: Partial<VanBan>) {
    const result = await this.vanBanService.update(id, data);
    return {
      success: true,
      data: result,
      message: 'Cập nhật văn bản thành công',
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.vanBanService.remove(id);
    return {
      success: true,
      message: 'Xóa văn bản thành công',
    };
  }
}
