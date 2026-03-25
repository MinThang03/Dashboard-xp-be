import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';
// import { UseGuards } from '@nestjs/common';
import { TamTruTamVangService } from './tam-tru-tam-vang.service';

@Controller('api/tam-tru-tam-vang')
// @UseGuards(JwtAuthGuard) // Temporarily disabled
export class TamTruTamVangController {
  constructor(private readonly tamTruTamVangService: TamTruTamVangService) {}

  @Get()
  async findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    const result = await this.tamTruTamVangService.findAll(
      parseInt(page),
      parseInt(limit),
    );
    return { success: true, ...result };
  }

  @Get('stats')
  async getStats() {
    const stats = await this.tamTruTamVangService.getStats();
    return { success: true, data: stats };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.tamTruTamVangService.findOne(id);
    return { success: true, data };
  }

  @Post()
  async create(@Body() data: any) {
    const result = await this.tamTruTamVangService.create(data);
    return { success: true, data: result };
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    const result = await this.tamTruTamVangService.update(id, data);
    return { success: true, data: result };
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.tamTruTamVangService.delete(id);
    return { success: true, message: 'Xóa thành công' };
  }
}
