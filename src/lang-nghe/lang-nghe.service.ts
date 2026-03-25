import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LangNghe } from './lang-nghe.entity';

@Injectable()
export class LangNgheService {
  constructor(
    @InjectRepository(LangNghe)
    private repository: Repository<LangNghe>,
  ) {}

  async findAll(page: number = 1, limit: number = 10) {
    const [items, total] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { MaLangNghe: 'DESC' },
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
    const item = await this.repository.findOne({ where: { MaLangNghe: id } as any });
    if (!item) {
      return { success: false, message: 'Không tìm thấy bản ghi' };
    }
    return { success: true, data: item };
  }

  async getStats() {
    const total = await this.repository.count();
    const hoatDong = await this.repository.count({ where: { TrangThai: true } as any });
    const result = await this.repository
      .createQueryBuilder('ln')
      .select('SUM(ln.SoHoNghe)', 'totalHoNghe')
      .getRawOne();
    
    return {
      success: true,
      data: { 
        total, 
        hoatDong,
        totalHoNghe: parseInt(result.totalHoNghe) || 0
      },
    };
  }

  async create(data: Partial<LangNghe>) {
    const item = this.repository.create(data);
    await this.repository.save(item);
    return { success: true, data: item, message: 'Tạo mới thành công' };
  }

  async update(id: number, data: Partial<LangNghe>) {
    await this.repository.update({ MaLangNghe: id } as any, data);
    const updated = await this.repository.findOne({ where: { MaLangNghe: id } as any });
    return { success: true, data: updated, message: 'Cập nhật thành công' };
  }

  async delete(id: number) {
    await this.repository.delete({ MaLangNghe: id } as any);
    return { success: true, message: 'Xóa thành công' };
  }
}
