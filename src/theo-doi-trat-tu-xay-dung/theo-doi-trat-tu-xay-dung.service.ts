import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TheoDoiTratTuXayDung } from './theo-doi-trat-tu-xay-dung.entity';

@Injectable()
export class TheoDoiTratTuXayDungService {
  constructor(
    @InjectRepository(TheoDoiTratTuXayDung)
    private readonly repository: Repository<TheoDoiTratTuXayDung>,
  ) {}

  async findAll(page = 1, limit = 20) {
    const [data, total] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { MaTheoDoi: 'DESC' },
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
    const data = await this.repository.findOne({ where: { MaTheoDoi: id } as any });
    return { success: true, data };
  }

  async create(payload: Partial<TheoDoiTratTuXayDung>) {
    const data = await this.repository.save(this.repository.create(payload));
    return { success: true, data, message: 'Tạo mới thành công' };
  }

  async update(id: number, payload: Partial<TheoDoiTratTuXayDung>) {
    await this.repository.update({ MaTheoDoi: id } as any, payload);
    const data = await this.repository.findOne({ where: { MaTheoDoi: id } as any });
    return { success: true, data, message: 'Cập nhật thành công' };
  }

  async delete(id: number) {
    await this.repository.delete({ MaTheoDoi: id } as any);
    return { success: true, message: 'Xóa thành công' };
  }
}
