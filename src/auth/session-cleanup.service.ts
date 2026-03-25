import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AuthService } from './auth.service';

@Injectable()
export class SessionCleanupService {
  private readonly logger = new Logger(SessionCleanupService.name);

  constructor(private readonly authService: AuthService) {}

  @Cron(CronExpression.EVERY_DAY_AT_3AM)
  async handleCleanup() {
    this.logger.log('Starting expired sessions cleanup...');
    await this.authService.cleanupExpiredSessions();
    this.logger.log('Expired sessions cleanup completed');
  }
}
