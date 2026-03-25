import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NganSach } from './ngan-sach.entity';

@Injectable()
export class NganSachService {
  constructor(
    @InjectRepository(NganSach)
    private repository: Repository<NganSach>,
  ) {}

  async findAll(page: number = 1, limit: number = 10) {
    const [items, total] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { MaNganSach: 'DESC' },
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
    const item = await this.repository.findOne({ where: { MaNganSach: id } as any });
    if (!item) {
      return { success: false, message: 'Không tìm thấy bản ghi' };
    }
    return { success: true, data: item };
  }

  async getStats() {
    const total = await this.repository.count();
    const dangThucHien = await this.repository.count({ where: { TrangThai: 'Đang thực hiện' } as any });
    const result = await this.repository
      .createQueryBuilder('ns')
      .select('SUM(ns.TongDuToan)', 'totalDuToan')
      .addSelect('SUM(ns.DaGiaiNgan)', 'totalGiaiNgan')
      .getRawOne();
    
    return {
      success: true,
      data: { 
        total, 
        dangThucHien,
        totalDuToan: parseFloat(result.totalDuToan) || 0,
        totalGiaiNgan: parseFloat(result.totalGiaiNgan) || 0
      },
    };
  }

  async create(data: Partial<NganSach>) {
    const item = this.repository.create(data);
    await this.repository.save(item);
    return { success: true, data: item, message: 'Tạo mới thành công' };
  }

  async update(id: number, data: Partial<NganSach>) {
    await this.repository.update({ MaNganSach: id } as any, data);
    const updated = await this.repository.findOne({ where: { MaNganSach: id } as any });
    return { success: true, data: updated, message: 'Cập nhật thành công' };
  }

  async delete(id: number) {
    await this.repository.delete({ MaNganSach: id } as any);
    return { success: true, message: 'Xóa thành công' };
  }
}
