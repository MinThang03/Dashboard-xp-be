import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ThuPhi } from './thu-phi.entity';

@Injectable()
export class ThuPhiService {
  constructor(
    @InjectRepository(ThuPhi)
    private readonly repository: Repository<ThuPhi>,
  ) {}

  async findAll(page: number = 1, limit: number = 20) {
    const [data, total] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { MaThuPhi: 'DESC' },
    });
    return { success: true, data, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async getStats() {
    const total = await this.repository.count();
    const paid = await this.repository.count({ where: { TrangThai: 'Đã thu' } as any });
    return { success: true, data: { total, paid } };
  }

  findOne(id: number) {
    return this.repository.findOne({ where: { MaThuPhi: id } as any }).then((data) => ({ success: true, data }));
  }

  async create(payload: Partial<ThuPhi>) {
    const data = await this.repository.save(this.repository.create(payload));
    return { success: true, data, message: 'Tạo mới thành công' };
  }

  async update(id: number, payload: Partial<ThuPhi>) {
    await this.repository.update({ MaThuPhi: id } as any, payload);
    const data = await this.repository.findOne({ where: { MaThuPhi: id } as any });
    return { success: true, data, message: 'Cập nhật thành công' };
  }

  async delete(id: number) {
    await this.repository.delete({ MaThuPhi: id } as any);
    return { success: true, message: 'Xóa thành công' };
  }
}
