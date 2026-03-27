import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HaTangDoThi } from './ha-tang-do-thi.entity';

@Injectable()
export class HaTangDoThiService {
  constructor(
    @InjectRepository(HaTangDoThi)
    private readonly repository: Repository<HaTangDoThi>,
  ) {}

  private normalizePayload(payload: Partial<HaTangDoThi>): Partial<HaTangDoThi> {
    return {
      ...payload,
      TenHaTang: payload.TenHaTang ?? payload.TenHangMuc ?? 'Hạ tầng',
      TinhTrang: payload.TinhTrang ?? 'Bình thường',
    };
  }

  async findAll(page = 1, limit = 20) {
    const [data, total] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { MaHaTang: 'DESC' },
    });

    return {
      success: true,
      data,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async getStats() {
    const total = await this.repository.count();
    return { success: true, data: { total } };
  }

  async findOne(id: number) {
    const data = await this.repository.findOne({ where: { MaHaTang: id } as any });
    return { success: true, data };
  }

  async create(payload: Partial<HaTangDoThi>) {
    const data = await this.repository.save(this.repository.create(this.normalizePayload(payload)));
    return { success: true, data, message: 'Tạo mới thành công' };
  }

  async update(id: number, payload: Partial<HaTangDoThi>) {
    await this.repository.update({ MaHaTang: id } as any, this.normalizePayload(payload));
    const data = await this.repository.findOne({ where: { MaHaTang: id } as any });
    return { success: true, data, message: 'Cập nhật thành công' };
  }

  async delete(id: number) {
    await this.repository.delete({ MaHaTang: id } as any);
    return { success: true, message: 'Xóa thành công' };
  }
}
