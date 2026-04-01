import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { VaiTroService } from './vai-tro.service';

@Controller('vai-tro')
export class VaiTroController {
  constructor(private readonly service: VaiTroService) {}

  @Get()
  async findAll() {
    const data = await this.service.findAll();
    return { success: true, data };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.service.findById(Number(id));
    return { success: true, data };
  }

  @Post()
  async create(@Body() payload: any) {
    const data = await this.service.create(payload);
    return { success: true, data };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() payload: any) {
    const data = await this.service.update(Number(id), payload);
    return { success: true, data };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.service.remove(Number(id));
    return { success: true, data };
  }
}
