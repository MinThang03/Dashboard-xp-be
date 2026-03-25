import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RacThai } from './rac-thai.entity';

@Injectable()
export class RacThaiService {
  constructor(
    @InjectRepository(RacThai)
    private repository: Repository<RacThai>,
  ) {}

  async findAll(page: number = 1, limit: number = 10) {
    const [items, total] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { MaDiem: 'DESC' },
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
    const item = await this.repository.findOne({ where: { MaDiem: id } as any });
    if (!item) {
      return { success: false, message: 'Không tìm thấy bản ghi' };
    }
    return { success: true, data: item };
  }

  async getStats() {
    const total = await this.repository.count();
    const binhThuong = await this.repository.count({ where: { TinhTrang: 'Bình thường' } as any });
    const result = await this.repository
      .createQueryBuilder('rt')
      .select('SUM(rt.KhoiLuongThang)', 'totalKhoiLuong')
      .getRawOne();
    
    return {
      success: true,
      data: { 
        total, 
        binhThuong,
        totalKhoiLuong: parseFloat(result.totalKhoiLuong) || 0
      },
    };
  }

  async create(data: Partial<RacThai>) {
    const item = this.repository.create(data);
    await this.repository.save(item);
    return { success: true, data: item, message: 'Tạo mới thành công' };
  }

  async update(id: number, data: Partial<RacThai>) {
    await this.repository.update({ MaDiem: id } as any, data);
    const updated = await this.repository.findOne({ where: { MaDiem: id } as any });
    return { success: true, data: updated, message: 'Cập nhật thành công' };
  }

  async delete(id: number) {
    await this.repository.delete({ MaDiem: id } as any);
    return { success: true, message: 'Xóa thành công' };
  }
}
