import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserMessage } from './message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(UserMessage)
    private readonly messageRepository: Repository<UserMessage>,
  ) {}

  async findByUser(userId: number): Promise<UserMessage[]> {
    return this.messageRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async markRead(userId: number, id: number): Promise<UserMessage> {
    const message = await this.messageRepository.findOne({
      where: { id, userId },
    });

    if (!message) {
      throw new NotFoundException('Không tìm thấy tin nhắn');
    }

    if (!message.isRead) {
      message.isRead = true;
      await this.messageRepository.save(message);
    }

    return message;
  }

  async markAllRead(userId: number): Promise<void> {
    await this.messageRepository.update({ userId }, { isRead: true });
  }
}
