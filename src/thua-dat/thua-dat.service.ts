import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ThuaDat } from './thua-dat.entity';

@Injectable()
export class ThuaDatService {
  constructor(
    @InjectRepository(ThuaDat)
    private repository: Repository<ThuaDat>,
  ) {}

  async findAll(page: number = 1, limit: number = 10) {
    const [items, total] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { MaThua: 'DESC' },
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

  async findOne(id: string) {
    const item = await this.repository.findOne({ where: { MaThua: id } as any });
    if (!item) {
      return { success: false, message: 'Không tìm thấy bản ghi' };
    }
    return { success: true, data: item };
  }

  async getStats() {
    const total = await this.repository.count();
    const dangSuDung = await this.repository.count({ where: { TrangThai: 'Đang sử dụng' } as any });
    const result = await this.repository
      .createQueryBuilder('td')
      .select('SUM(td.DienTich)', 'totalDienTich')
      .getRawOne();
    
    return {
      success: true,
      data: { 
        total, 
        dangSuDung,
        totalDienTich: parseFloat(result.totalDienTich) || 0
      },
    };
  }

  async create(data: Partial<ThuaDat>) {
    const item = this.repository.create(data);
    await this.repository.save(item);
    return { success: true, data: item, message: 'Tạo mới thành công' };
  }

  async update(id: string, data: Partial<ThuaDat>) {
    await this.repository.update({ MaThua: id } as any, data);
    const updated = await this.repository.findOne({ where: { MaThua: id } as any });
    return { success: true, data: updated, message: 'Cập nhật thành công' };
  }

  async delete(id: string) {
    await this.repository.delete({ MaThua: id } as any);
    return { success: true, message: 'Xóa thành công' };
  }
}
