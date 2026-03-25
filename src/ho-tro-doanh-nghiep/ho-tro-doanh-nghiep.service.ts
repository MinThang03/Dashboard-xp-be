import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HoTroDoanhNghiep } from './ho-tro-doanh-nghiep.entity';

@Injectable()
export class HoTroDoanhNghiepService {
  constructor(
    @InjectRepository(HoTroDoanhNghiep)
    private readonly repository: Repository<HoTroDoanhNghiep>,
  ) {}

  async findAll(page: number = 1, limit: number = 20) {
    const [data, total] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { MaHoTro: 'DESC' },
    });
    return { success: true, data, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async getStats() {
    const total = await this.repository.count();
    const completed = await this.repository.count({ where: { TrangThai: 'Hoàn thành' } as any });
    return { success: true, data: { total, completed } };
  }

  async findOne(id: number) {
    const data = await this.repository.findOne({ where: { MaHoTro: id } as any });
    return { success: true, data };
  }

  async create(payload: Partial<HoTroDoanhNghiep>) {
    const data = await this.repository.save(this.repository.create(payload));
    return { success: true, data, message: 'Tạo mới thành công' };
  }

  async update(id: number, payload: Partial<HoTroDoanhNghiep>) {
    await this.repository.update({ MaHoTro: id } as any, payload);
    const data = await this.repository.findOne({ where: { MaHoTro: id } as any });
    return { success: true, data, message: 'Cập nhật thành công' };
  }

  async delete(id: number) {
    await this.repository.delete({ MaHoTro: id } as any);
    return { success: true, message: 'Xóa thành công' };
  }
}
