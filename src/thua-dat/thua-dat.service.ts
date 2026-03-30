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

  private normalizePayload(data: Partial<ThuaDat>) {
    const payload: Partial<ThuaDat> = {};
    Object.entries(data || {}).forEach(([key, value]) => {
      if (value !== undefined) {
        (payload as any)[key] = value;
      }
    });
    return payload;
  }

  async findAll(page: number = 1, limit: number = 10, loaiBanGhi?: string) {
    const where = loaiBanGhi ? ({ LoaiBanGhi: loaiBanGhi } as any) : undefined;
    const [items, total] = await this.repository.findAndCount({
      where,
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
    const item = this.repository.create(this.normalizePayload(data));
    await this.repository.save(item);
    return { success: true, data: item, message: 'Tạo mới thành công' };
  }

  async update(id: string, data: Partial<ThuaDat>) {
    await this.repository.update({ MaThua: id } as any, this.normalizePayload(data));
    const updated = await this.repository.findOne({ where: { MaThua: id } as any });
    return { success: true, data: updated, message: 'Cập nhật thành công' };
  }

  async delete(id: string) {
    await this.repository.delete({ MaThua: id } as any);
    return { success: true, message: 'Xóa thành công' };
  }
}
