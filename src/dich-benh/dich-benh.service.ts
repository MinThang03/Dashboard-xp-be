import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DichBenh } from './dich-benh.entity';

@Injectable()
export class DichBenhService {
  constructor(
    @InjectRepository(DichBenh)
    private repository: Repository<DichBenh>,
  ) {}

  async findAll(page: number = 1, limit: number = 10) {
    const [items, total] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { MaDich: 'DESC' },
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
    const item = await this.repository.findOne({ where: { MaDich: id } as any });
    if (!item) {
      return { success: false, message: 'Không tìm thấy bản ghi' };
    }
    return { success: true, data: item };
  }

  async getStats() {
    const total = await this.repository.count();
    const dangTheoDoi = await this.repository.count({ where: { TrangThai: 'Đang theo dõi' } as any });
    const hoanThanh = await this.repository.count({ where: { TrangThai: 'Hoàn thành' } as any });
    
    const result = await this.repository
      .createQueryBuilder('dich')
      .select('SUM(dich.SoCaNhiem)', 'totalCaNhiem')
      .addSelect('SUM(dich.SoCaKhoi)', 'totalCaKhoi')
      .getRawOne();
    
    return {
      success: true,
      data: { 
        total, 
        dangTheoDoi,
        hoanThanh,
        totalCaNhiem: parseInt(result?.totalCaNhiem || '0'),
        totalCaKhoi: parseInt(result?.totalCaKhoi || '0')
      },
    };
  }

  async create(data: Partial<DichBenh>) {
    const item = this.repository.create(data);
    await this.repository.save(item);
    return { success: true, data: item, message: 'Tạo mới thành công' };
  }

  async update(id: number, data: Partial<DichBenh>) {
    await this.repository.update({ MaDich: id } as any, data);
    const updated = await this.repository.findOne({ where: { MaDich: id } as any });
    return { success: true, data: updated, message: 'Cập nhật thành công' };
  }

  async delete(id: number) {
    await this.repository.delete({ MaDich: id } as any);
    return { success: true, message: 'Xóa thành công' };
  }
}
