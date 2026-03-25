import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnNinhTratTu } from './an-ninh-trat-tu.entity';

@Injectable()
export class AnNinhTratTuService {
  constructor(
    @InjectRepository(AnNinhTratTu)
    private readonly repository: Repository<AnNinhTratTu>,
  ) {}

  async findAll(page: number = 1, limit: number = 20) {
    const [data, total] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { MaSuKien: 'DESC' },
    });
    return { success: true, data, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async getStats() {
    const total = await this.repository.count();
    const dangXuLy = await this.repository.count({ where: { TrangThai: 'Đang xử lý' } as any });
    return { success: true, data: { total, dangXuLy } };
  }

  async findOne(id: number) {
    const data = await this.repository.findOne({ where: { MaSuKien: id } as any });
    return { success: true, data };
  }

  async create(payload: Partial<AnNinhTratTu>) {
    const data = await this.repository.save(this.repository.create(payload));
    return { success: true, data, message: 'Tạo mới thành công' };
  }

  async update(id: number, payload: Partial<AnNinhTratTu>) {
    await this.repository.update({ MaSuKien: id } as any, payload);
    const data = await this.repository.findOne({ where: { MaSuKien: id } as any });
    return { success: true, data, message: 'Cập nhật thành công' };
  }

  async delete(id: number) {
    await this.repository.delete({ MaSuKien: id } as any);
    return { success: true, message: 'Xóa thành công' };
  }
}
