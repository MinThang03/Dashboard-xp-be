import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ThongKeKinhTe } from './thong-ke-kinh-te.entity';

@Injectable()
export class ThongKeKinhTeService {
  constructor(
    @InjectRepository(ThongKeKinhTe)
    private readonly repository: Repository<ThongKeKinhTe>,
  ) {}

  async findAll(page: number = 1, limit: number = 20) {
    const [data, total] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { MaBaoCao: 'DESC' },
    });
    return { success: true, data, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async getStats() {
    const total = await this.repository.count();
    return { success: true, data: { total } };
  }

  async findOne(id: number) {
    const data = await this.repository.findOne({ where: { MaBaoCao: id } as any });
    return { success: true, data };
  }

  async create(payload: Partial<ThongKeKinhTe>) {
    const data = await this.repository.save(this.repository.create(payload));
    return { success: true, data, message: 'Tạo mới thành công' };
  }

  async update(id: number, payload: Partial<ThongKeKinhTe>) {
    await this.repository.update({ MaBaoCao: id } as any, payload);
    const data = await this.repository.findOne({ where: { MaBaoCao: id } as any });
    return { success: true, data, message: 'Cập nhật thành công' };
  }

  async delete(id: number) {
    await this.repository.delete({ MaBaoCao: id } as any);
    return { success: true, message: 'Xóa thành công' };
  }
}
