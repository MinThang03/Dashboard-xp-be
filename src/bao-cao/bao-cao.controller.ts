import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { BaoCaoService } from './bao-cao.service';
import { BaoCao } from './bao-cao.entity';

@Controller('bao-cao')
export class BaoCaoController {
  constructor(private readonly baoCaoService: BaoCaoService) {}

  @Get()
  async findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
  ) {
    const parsedPage = page ? Number(page) : 1;
    const parsedLimit = limit ? Number(limit) : 10;
    const result = await this.baoCaoService.findAll({ page: parsedPage, limit: parsedLimit, search });
    return {
      success: true,
      data: result.data,
      total: result.total,
      page: result.page,
      limit: result.limit,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.baoCaoService.findOneById(Number(id));
    return { success: true, data };
  }

  @Post()
  async create(@Body() data: Partial<BaoCao>) {
    const result = await this.baoCaoService.create(data);
    return { success: true, data: result, message: 'Tạo báo cáo thành công' };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<BaoCao>) {
    const result = await this.baoCaoService.update(Number(id), data);
    return { success: true, data: result, message: 'Cập nhật báo cáo thành công' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.baoCaoService.remove(Number(id));
    return { success: true, message: 'Xóa báo cáo thành công' };
  }
}
