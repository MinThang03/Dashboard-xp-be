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
import { ChungThucService } from './chung-thuc.service';

@Controller('chung-thuc')
// @UseGuards(JwtAuthGuard) // Temporarily disabled
export class ChungThucController {
  constructor(private readonly chungThucService: ChungThucService) {}

  @Get()
  async findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    const result = await this.chungThucService.findAll(
      parseInt(page),
      parseInt(limit),
    );
    return { success: true, ...result };
  }

  @Get('stats')
  async getStats() {
    const stats = await this.chungThucService.getStats();
    return { success: true, data: stats };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.chungThucService.findOne(id);
    return { success: true, data };
  }

  @Post()
  async create(@Body() data: any) {
    const result = await this.chungThucService.create(data);
    return { success: true, data: result };
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    const result = await this.chungThucService.update(id, data);
    return { success: true, data: result };
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.chungThucService.delete(id);
    return { success: true, message: 'Xóa thành công' };
  }
}
