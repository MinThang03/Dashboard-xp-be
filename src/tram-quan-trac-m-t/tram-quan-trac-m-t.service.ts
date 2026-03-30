import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TramQuanTracMT } from './tram-quan-trac-m-t.entity';

@Injectable()
export class TramQuanTracMTService {
  constructor(
    @InjectRepository(TramQuanTracMT)
    private repository: Repository<TramQuanTracMT>,
  ) {}

  private normalizePayload(data: Partial<TramQuanTracMT>) {
    const payload: Partial<TramQuanTracMT> = {};
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
      order: { MaTram: 'DESC' },
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
    const item = await this.repository.findOne({ where: { MaTram: id } as any });
    if (!item) {
      return { success: false, message: 'Không tìm thấy bản ghi' };
    }
    return { success: true, data: item };
  }

  async getStats() {
    const total = await this.repository.count();
    const hoatDong = await this.repository.count({ where: { TrangThai: 'Hoạt động' } as any });

    return {
      success: true,
      data: {
        total,
        hoatDong,
      },
    };
  }

  async create(data: Partial<TramQuanTracMT>) {
    const item = this.repository.create(this.normalizePayload(data));
    await this.repository.save(item);
    return { success: true, data: item, message: 'Tạo mới thành công' };
  }

  async update(id: number, data: Partial<TramQuanTracMT>) {
    await this.repository.update({ MaTram: id } as any, this.normalizePayload(data));
    const updated = await this.repository.findOne({ where: { MaTram: id } as any });
    return { success: true, data: updated, message: 'Cập nhật thành công' };
  }

  async delete(id: number) {
    await this.repository.delete({ MaTram: id } as any);
    return { success: true, message: 'Xóa thành công' };
  }
}
