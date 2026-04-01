import { Body, Controller, Get, Put } from '@nestjs/common';
import { SystemSettingsService } from './system-settings.service';

@Controller('system-settings')
export class SystemSettingsController {
  constructor(private readonly service: SystemSettingsService) {}

  @Get()
  async getSettings() {
    const data = await this.service.getSettings();
    return { success: true, data };
  }

  @Put()
  async updateSettings(@Body() payload: any) {
    const data = await this.service.updateSettings(payload);
    return { success: true, data };
  }
}
