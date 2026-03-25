import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CoSoGiaoDuc } from './co-so-giao-duc.entity';

@Injectable()
export class CoSoGiaoDucService {
  constructor(
    @InjectRepository(CoSoGiaoDuc)
    private repository: Repository<CoSoGiaoDuc>,
  ) {}

  async findAll(page: number = 1, limit: number = 10) {
    const [items, total] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { MaCoSo: 'DESC' },
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
    const item = await this.repository.findOne({ where: { MaCoSo: id } as any });
    if (!item) {
      return { success: false, message: 'Không tìm thấy bản ghi' };
    }
    return { success: true, data: item };
  }

  async getStats() {
    const total = await this.repository.count();
    const hoatDong = await this.repository.count({ where: { TrangThai: true } as any });
    const result = await this.repository
      .createQueryBuilder('cs')
      .select('SUM(cs.SoHocSinh)', 'totalHocSinh')
      .addSelect('SUM(cs.SoGiaoVien)', 'totalGiaoVien')
      .getRawOne();
    
    return {
      success: true,
      data: { 
        total, 
        hoatDong,
        totalHocSinh: parseInt(result.totalHocSinh) || 0,
        totalGiaoVien: parseInt(result.totalGiaoVien) || 0
      },
    };
  }

  async create(data: Partial<CoSoGiaoDuc>) {
    const item = this.repository.create(data);
    await this.repository.save(item);
    return { success: true, data: item, message: 'Tạo mới thành công' };
  }

  async update(id: number, data: Partial<CoSoGiaoDuc>) {
    await this.repository.update({ MaCoSo: id } as any, data);
    const updated = await this.repository.findOne({ where: { MaCoSo: id } as any });
    return { success: true, data: updated, message: 'Cập nhật thành công' };
  }

  async delete(id: number) {
    await this.repository.delete({ MaCoSo: id } as any);
    return { success: true, message: 'Xóa thành công' };
  }
}
