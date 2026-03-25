import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HoKinhDoanh } from './ho-kinh-doanh.entity';

@Injectable()
export class HoKinhDoanhService {
  constructor(
    @InjectRepository(HoKinhDoanh)
    private readonly repository: Repository<HoKinhDoanh>,
  ) {}

  async findAll(page: number = 1, limit: number = 20) {
    const [data, total] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { MaHoKD: 'DESC' },
    });

    return {
      success: true,
      data,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async getStats() {
    const total = await this.repository.count();
    const active = await this.repository.count({ where: { TrangThai: 'Hoạt động' } as any });
    return { success: true, data: { total, active } };
  }

  async findOne(id: number) {
    const data = await this.repository.findOne({ where: { MaHoKD: id } as any });
    return { success: true, data };
  }

  async create(payload: Partial<HoKinhDoanh>) {
    const entity = this.repository.create(payload);
    const data = await this.repository.save(entity);
    return { success: true, data, message: 'Tạo mới thành công' };
  }

  async update(id: number, payload: Partial<HoKinhDoanh>) {
    await this.repository.update({ MaHoKD: id } as any, payload);
    const data = await this.repository.findOne({ where: { MaHoKD: id } as any });
    return { success: true, data, message: 'Cập nhật thành công' };
  }

  async delete(id: number) {
    await this.repository.delete({ MaHoKD: id } as any);
    return { success: true, message: 'Xóa thành công' };
  }
}
