import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HoSoDiTich } from './ho-so-di-tich.entity';

@Injectable()
export class HoSoDiTichService {
  constructor(
    @InjectRepository(HoSoDiTich)
    private repository: Repository<HoSoDiTich>,
  ) {}

  private normalizePayload(data: Partial<HoSoDiTich>) {
    const payload: Partial<HoSoDiTich> = {};
    Object.entries(data || {}).forEach(([key, value]) => {
      if (value !== undefined) {
        (payload as any)[key] = value;
      }
    });
    return payload;
  }

  async findAll(page: number = 1, limit: number = 1000) {
    const [items, total] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { MaHoSo: 'DESC' },
    });

    return {
      success: true,
      data: items,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const item = await this.repository.findOne({ where: { MaHoSo: id } as any });
    if (!item) {
      return { success: false, message: 'Không tìm thấy bản ghi' };
    }
    return { success: true, data: item };
  }

  async getStats() {
    const total = await this.repository.count();
    const daNop = await this.repository.count({ where: { TrangThai: 'Đã nộp' } as any });
    const dangXuLy = await this.repository.count({ where: { TrangThai: 'Đang xử lý' } as any });
    const hoanThanh = await this.repository.count({ where: { TrangThai: 'Hoàn thành' } as any });
    const canBoSung = await this.repository.count({ where: { TrangThai: 'Cần bổ sung' } as any });

    return {
      success: true,
      data: { total, daNop, dangXuLy, hoanThanh, canBoSung },
    };
  }

  async create(data: Partial<HoSoDiTich>) {
    const item = this.repository.create(this.normalizePayload(data));
    await this.repository.save(item);
    return { success: true, data: item, message: 'Tạo mới thành công' };
  }

  async update(id: number, data: Partial<HoSoDiTich>) {
    await this.repository.update({ MaHoSo: id } as any, this.normalizePayload(data));
    const updated = await this.repository.findOne({ where: { MaHoSo: id } as any });
    return { success: true, data: updated, message: 'Cập nhật thành công' };
  }

  async delete(id: number) {
    await this.repository.delete({ MaHoSo: id } as any);
    return { success: true, message: 'Xóa thành công' };
  }
}
