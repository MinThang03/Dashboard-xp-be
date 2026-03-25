import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ViPham } from './vi-pham.entity';

@Injectable()
export class ViPhamService {
  constructor(
    @InjectRepository(ViPham)
    private repository: Repository<ViPham>,
  ) {}

  private normalizePayload(data: Partial<ViPham>): Partial<ViPham> {
    const input = data as any;
    return {
      ...data,
      TenViPham: data.TenViPham ?? input.NoiDungViPham,
      NgayViPham: data.NgayViPham ?? input.NgayLap,
      NguoiViPham: data.NguoiViPham ?? input.DoiTuong,
      DiaDiem: data.DiaDiem ?? input.DiaChiViPham,
      NgayLap: input.NgayLap ?? data.NgayViPham,
      DoiTuong: input.DoiTuong ?? data.NguoiViPham,
    };
  }

  async findAll(page: number = 1, limit: number = 10) {
    const [items, total] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { MaViPham: 'DESC' },
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
    const item = await this.repository.findOne({ where: { MaViPham: id } as any });
    if (!item) {
      return { success: false, message: 'Không tìm thấy bản ghi' };
    }
    return { success: true, data: item };
  }

  async getStats() {
    const total = await this.repository.count();
    const daXuLy = await this.repository.count({ where: { TrangThai: 'Đã xử lý' } as any });
    const dangXuLy = await this.repository.count({ where: { TrangThai: 'Đang xử lý' } as any });
    const result = await this.repository
      .createQueryBuilder('vp')
      .select('SUM(vp.MucPhat)', 'totalPhat')
      .getRawOne();
    
    return {
      success: true,
      data: { 
        total, 
        daXuLy,
        dangXuLy,
        totalPhat: parseFloat(result.totalPhat) || 0
      },
    };
  }

  async create(data: Partial<ViPham>) {
    const item = this.repository.create(this.normalizePayload(data));
    await this.repository.save(item);
    return { success: true, data: item, message: 'Tạo mới thành công' };
  }

  async update(id: number, data: Partial<ViPham>) {
    await this.repository.update({ MaViPham: id } as any, this.normalizePayload(data));
    const updated = await this.repository.findOne({ where: { MaViPham: id } as any });
    return { success: true, data: updated, message: 'Cập nhật thành công' };
  }

  async delete(id: number) {
    await this.repository.delete({ MaViPham: id } as any);
    return { success: true, message: 'Xóa thành công' };
  }
}
