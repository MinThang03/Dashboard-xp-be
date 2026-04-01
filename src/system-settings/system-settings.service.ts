import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SystemSettings } from './system-settings.entity';

const DEFAULT_SETTINGS: Partial<SystemSettings> = {
  systemName: 'Dashboard Xa/Phuong Smart',
  adminEmail: 'admin@ubnd.vn',
  defaultExpiryDays: 15,
  overdueWarningDays: 3,
  notificationsEnabled: true,
  autoUpdateEnabled: true,
  autoUpdateInterval: 5,
};

@Injectable()
export class SystemSettingsService {
  constructor(
    @InjectRepository(SystemSettings)
    private readonly repository: Repository<SystemSettings>,
  ) {}

  async getSettings() {
    const current = await this.repository.findOne({ where: {} as any });
    if (current) {
      return current;
    }

    const created = this.repository.create(DEFAULT_SETTINGS);
    return this.repository.save(created);
  }

  async updateSettings(payload: Partial<SystemSettings>) {
    const current = await this.getSettings();

    const updated = this.repository.merge(current, {
      systemName: payload.systemName ?? payload['TenHeThong'] ?? current.systemName,
      adminEmail: payload.adminEmail ?? payload['EmailQuanTri'] ?? current.adminEmail,
      defaultExpiryDays: Number(payload.defaultExpiryDays ?? payload['HanXuLyMacDinh'] ?? current.defaultExpiryDays),
      overdueWarningDays: Number(payload.overdueWarningDays ?? payload['CanhBaoTreHan'] ?? current.overdueWarningDays),
      notificationsEnabled: payload.notificationsEnabled ?? payload['ThongBao'] ?? current.notificationsEnabled,
      autoUpdateEnabled: payload.autoUpdateEnabled ?? payload['TuDongCapNhat'] ?? current.autoUpdateEnabled,
      autoUpdateInterval: Number(payload.autoUpdateInterval ?? payload['ChuKyCapNhat'] ?? current.autoUpdateInterval),
      avatarUrl: payload.avatarUrl ?? payload['AvatarUrl'] ?? current.avatarUrl,
    });

    return this.repository.save(updated);
  }
}
