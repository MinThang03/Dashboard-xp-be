import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MessagesService } from './messages.service';

@Controller('messages')
@UseGuards(JwtAuthGuard)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  async getMessages(@Req() req: any) {
    const userId = Number(req.user.userId);
    const items = await this.messagesService.findByUser(userId);

    return {
      success: true,
      data: items.map((item) => ({
        id: item.id,
        from: item.fromName,
        title: item.title,
        preview: item.preview,
        body: item.body,
        unread: !item.isRead,
        createdAt: item.createdAt,
      })),
    };
  }

  @Post('mark-read')
  async markRead(@Req() req: any, @Body() body: { id: number }) {
    const userId = Number(req.user.userId);
    await this.messagesService.markRead(userId, Number(body.id));
    return { success: true };
  }

  @Post('mark-all-read')
  async markAllRead(@Req() req: any) {
    const userId = Number(req.user.userId);
    await this.messagesService.markAllRead(userId);
    return { success: true };
  }
}
