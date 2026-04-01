import { Body, Controller, Delete, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  async getNotifications(@Req() req: any) {
    const userId = Number(req.user.userId);
    const items = await this.notificationsService.findByUser(userId);

    return {
      success: true,
      data: items.map((item) => ({
        id: item.id,
        type: item.type,
        title: item.title,
        content: item.content,
        detail: item.meta,
        unread: !item.isRead,
        createdAt: item.createdAt,
      })),
    };
  }

  @Post('mark-read')
  async markRead(@Req() req: any, @Body() body: { id: number }) {
    const userId = Number(req.user.userId);
    await this.notificationsService.markRead(userId, Number(body.id));
    return { success: true };
  }

  @Post('mark-all-read')
  async markAllRead(@Req() req: any) {
    const userId = Number(req.user.userId);
    await this.notificationsService.markAllRead(userId);
    return { success: true };
  }

  @Delete()
  async removeAll(@Req() req: any) {
    const userId = Number(req.user.userId);
    await this.notificationsService.removeAll(userId);
    return { success: true };
  }
}
