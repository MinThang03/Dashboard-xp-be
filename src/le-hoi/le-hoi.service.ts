import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeHoi } from './le-hoi.entity';

@Injectable()
export class LeHoiService {
  constructor(
    @InjectRepository(LeHoi)
    private repository: Repository<LeHoi>,
  ) {}

  async findAll(page: number = 1, limit: number = 10) {
    const [items, total] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { MaLeHoi: 'DESC' },
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
    const item = await this.repository.findOne({ where: { MaLeHoi: id } as any });
    if (!item) {
      return { success: false, message: 'Không tìm thấy bản ghi' };
    }
    return { success: true, data: item };
  }

  async getStats() {
    const total = await this.repository.count();
    const daToChuc = await this.repository.count({ where: { TrangThai: 'Đã tổ chức' } as any });
    const sapToChuc = await this.repository.count({ where: { TrangThai: 'Sắp tổ chức' } as any });
    const result = await this.repository
      .createQueryBuilder('lh')
      .select('SUM(lh.SoLuongKhach)', 'totalKhach')
      .getRawOne();
    
    return {
      success: true,
      data: { 
        total, 
        daToChuc,
        sapToChuc,
        totalKhach: parseInt(result.totalKhach) || 0
      },
    };
  }

  async create(data: Partial<LeHoi>) {
    const item = this.repository.create(data);
    await this.repository.save(item);
    return { success: true, data: item, message: 'Tạo mới thành công' };
  }

  async update(id: number, data: Partial<LeHoi>) {
    await this.repository.update({ MaLeHoi: id } as any, data);
    const updated = await this.repository.findOne({ where: { MaLeHoi: id } as any });
    return { success: true, data: updated, message: 'Cập nhật thành công' };
  }

  async delete(id: number) {
    await this.repository.delete({ MaLeHoi: id } as any);
    return { success: true, message: 'Xóa thành công' };
  }
}
