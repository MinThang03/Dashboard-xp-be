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
import { HoKhauService } from './ho-khau.service';

@Controller('ho-khau')
// @UseGuards(JwtAuthGuard) // Temporarily disabled
export class HoKhauController {
  constructor(private readonly hoKhauService: HoKhauService) {}

  @Get()
  async findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    const result = await this.hoKhauService.findAll(
      parseInt(page),
      parseInt(limit),
    );
    return { success: true, ...result };
  }

  @Get('stats')
  async getStats() {
    const stats = await this.hoKhauService.getStats();
    return { success: true, data: stats };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.hoKhauService.findOne(id);
    return { success: true, data };
  }

  @Post()
  async create(@Body() data: any) {
    const result = await this.hoKhauService.create(data);
    return { success: true, data: result };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    const result = await this.hoKhauService.update(id, data);
    return { success: true, data: result };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.hoKhauService.delete(id);
    return { success: true, message: 'Xóa thành công' };
  }

  // Routes for ThanhVienHoKhau
  @Get(':id/thanh-vien')
  async findThanhVien(@Param('id') id: string) {
    const data = await this.hoKhauService.findThanhVien(id);
    return { success: true, data };
  }

  @Post(':id/thanh-vien')
  async createThanhVien(@Param('id') maHoKhau: string, @Body() data: any) {
    const result = await this.hoKhauService.createThanhVien({
      ...data,
      MaHoKhau: maHoKhau,
    });
    return { success: true, data: result };
  }

  @Delete('thanh-vien/:id')
  async deleteThanhVien(@Param('id') id: string) {
    await this.hoKhauService.deleteThanhVien(parseInt(id));
    return { success: true, message: 'Xóa thành viên thành công' };
  }
}
