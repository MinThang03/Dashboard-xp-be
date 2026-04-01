import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserNotification } from './notification.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(UserNotification)
    private readonly notificationRepository: Repository<UserNotification>,
  ) {}

  async findByUser(userId: number): Promise<UserNotification[]> {
    return this.notificationRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async markRead(userId: number, id: number): Promise<UserNotification> {
    const notification = await this.notificationRepository.findOne({
      where: { id, userId },
    });

    if (!notification) {
      throw new NotFoundException('Không tìm thấy thông báo');
    }

    if (!notification.isRead) {
      notification.isRead = true;
      await this.notificationRepository.save(notification);
    }

    return notification;
  }

  async markAllRead(userId: number): Promise<void> {
    await this.notificationRepository.update({ userId }, { isRead: true });
  }

  async removeAll(userId: number): Promise<void> {
    await this.notificationRepository.delete({ userId });
  }
}
