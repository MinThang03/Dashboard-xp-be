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

  private normalizePayload(data: Partial<NganSach>) {
    const payload: Partial<NganSach> = {};
    Object.entries(data || {}).forEach(([key, value]) => {
      if (value !== undefined) {
        (payload as any)[key] = value;
      }
    });

    const tongDuToan = Number((payload as any).TongDuToan ?? 0);
    const daGiaiNgan = Number((payload as any).DaGiaiNgan ?? 0);

    if ((payload as any).ConLai === undefined && !Number.isNaN(tongDuToan) && !Number.isNaN(daGiaiNgan)) {
      (payload as any).ConLai = tongDuToan - daGiaiNgan;
    }

    if (!(payload as any).NgayTao) {
      (payload as any).NgayTao = new Date();
    }

    return payload;
  }

  async findAll(page: number = 1, limit: number = 10, loaiBanGhi?: string) {
    const where = loaiBanGhi ? ({ LoaiBanGhi: loaiBanGhi } as any) : undefined;
    const [items, total] = await this.repository.findAndCount({
      where,
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
    const item = this.repository.create(this.normalizePayload(data));
    await this.repository.save(item);
    return { success: true, data: item, message: 'Tạo mới thành công' };
  }

  async update(id: number, data: Partial<NganSach>) {
    await this.repository.update({ MaNganSach: id } as any, this.normalizePayload(data));
    const updated = await this.repository.findOne({ where: { MaNganSach: id } as any });
    return { success: true, data: updated, message: 'Cập nhật thành công' };
  }

  async delete(id: number) {
    await this.repository.delete({ MaNganSach: id } as any);
    return { success: true, message: 'Xóa thành công' };
  }
}
