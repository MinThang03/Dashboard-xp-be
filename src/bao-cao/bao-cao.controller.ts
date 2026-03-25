import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { BaoCaoService } from './bao-cao.service';
import { BaoCao } from './bao-cao.entity';

@Controller('bao-cao')
export class BaoCaoController {
  constructor(private readonly baoCaoService: BaoCaoService) {}

  @Get()
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
  ) {
    const result = await this.baoCaoService.findAll({ page, limit, search });
    return {
      success: true,
      data: result.data,
      total: result.total,
      page: result.page,
      limit: result.limit,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const data = await this.baoCaoService.findOne(id);
    return { success: true, data };
  }

  @Post()
  async create(@Body() data: Partial<BaoCao>) {
    const result = await this.baoCaoService.create(data);
    return { success: true, data: result, message: 'Tạo báo cáo thành công' };
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: Partial<BaoCao>) {
    const result = await this.baoCaoService.update(id, data);
    return { success: true, data: result, message: 'Cập nhật báo cáo thành công' };
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.baoCaoService.remove(id);
    return { success: true, message: 'Xóa báo cáo thành công' };
  }
}
