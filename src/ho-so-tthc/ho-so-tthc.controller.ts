import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';
// import { UseGuards } from '@nestjs/common';
import { HoSoTTHCService } from './ho-so-tthc.service';

@Controller('ho-so-tthc')
// @UseGuards(JwtAuthGuard) // Temporarily disabled
export class HoSoTTHCController {
  constructor(private readonly hoSoTTHCService: HoSoTTHCService) {}

  @Get()
  async findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    const result = await this.hoSoTTHCService.findAll(
      parseInt(page),
      parseInt(limit),
    );
    return { success: true, ...result };
  }

  @Get('stats')
  async getStats() {
    const stats = await this.hoSoTTHCService.getStats();
    return { success: true, data: stats };
  }

  @Get('loai-thu-tuc')
  async findAllLoaiThuTuc() {
    const data = await this.hoSoTTHCService.findAllLoaiThuTuc();
    return { success: true, data };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.hoSoTTHCService.findOne(id);
    return { success: true, data };
  }

  @Post()
  async create(@Body() data: any) {
    const result = await this.hoSoTTHCService.create(data);
    return { success: true, data: result };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    const result = await this.hoSoTTHCService.update(id, data);
    return { success: true, data: result };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.hoSoTTHCService.delete(id);
    return { success: true, message: 'Xóa thành công' };
  }
}
