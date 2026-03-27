import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HoNgheo } from './ho-ngheo.entity';

@Injectable()
export class HoNgheoService {
  constructor(
    @InjectRepository(HoNgheo)
    private readonly repository: Repository<HoNgheo>,
  ) {}

  private normalizePayload(payload: Partial<HoNgheo>): Partial<HoNgheo> {
    const normalizeCapDoNgheo = (value: unknown): string | null | undefined => {
      if (value === undefined) return undefined;
      if (value === null) return null;

      const raw = String(value).trim();
      if (!raw) return null;

      const lowered = raw
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();

      if (lowered.includes('can ngheo')) return 'Cận nghèo';
      if (lowered.includes('ho ngheo') || lowered === 'ngheo') return 'Hộ nghèo';

      return 'Hộ nghèo';
    };

    const normalizedCapDo = normalizeCapDoNgheo(payload.CapDoNgheo ?? payload.MucDoNgheo);

    return {
      ...payload,
      CapDoNgheo: normalizedCapDo,
      MucDoNgheo: payload.MucDoNgheo ?? normalizedCapDo,
      NamXetDuyet: payload.NamXetDuyet ?? payload.NamDanhGia,
      LyDo: payload.LyDo ?? payload.LyDoNgheo,
      NgayCapNhat: new Date(),
    };
  }

  async findAll(page = 1, limit = 20) {
    const [data, total] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { MaHoNgheo: 'DESC' },
    });
    return { success: true, data, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async getStats() {
    const total = await this.repository.count();
    return { success: true, data: { total } };
  }

  async findOne(id: number) {
    const data = await this.repository.findOne({ where: { MaHoNgheo: id } as any });
    return { success: true, data };
  }

  async create(payload: Partial<HoNgheo>) {
    const data = await this.repository.save(this.repository.create(this.normalizePayload(payload)));
    return { success: true, data, message: 'Tạo mới thành công' };
  }

  async update(id: number, payload: Partial<HoNgheo>) {
    await this.repository.update({ MaHoNgheo: id } as any, this.normalizePayload(payload));
    const data = await this.repository.findOne({ where: { MaHoNgheo: id } as any });
    return { success: true, data, message: 'Cập nhật thành công' };
  }

  async delete(id: number) {
    await this.repository.delete({ MaHoNgheo: id } as any);
    return { success: true, message: 'Xóa thành công' };
  }
}
