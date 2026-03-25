import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DiTich } from './di-tich.entity';

@Injectable()
export class DiTichService {
  constructor(
    @InjectRepository(DiTich)
    private repository: Repository<DiTich>,
  ) {}

  async findAll(page: number = 1, limit: number = 10) {
    const [items, total] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { MaDiTich: 'DESC' },
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
    const item = await this.repository.findOne({ where: { MaDiTich: id } as any });
    if (!item) {
      return { success: false, message: 'Không tìm thấy bản ghi' };
    }
    return { success: true, data: item };
  }

  async getStats() {
    const total = await this.repository.count();
    const tot = await this.repository.count({ where: { TinhTrang: 'Tốt' } as any });
    const capQuocGia = await this.repository.count({ where: { CapXepHang: 'Quốc gia' } as any });
    const capTinh = await this.repository.count({ where: { CapXepHang: 'Tỉnh' } as any });
    
    return {
      success: true,
      data: { total, tot, capQuocGia, capTinh },
    };
  }

  async create(data: Partial<DiTich>) {
    const item = this.repository.create(data);
    await this.repository.save(item);
    return { success: true, data: item, message: 'Tạo mới thành công' };
  }

  async update(id: number, data: Partial<DiTich>) {
    await this.repository.update({ MaDiTich: id } as any, data);
    const updated = await this.repository.findOne({ where: { MaDiTich: id } as any });
    return { success: true, data: updated, message: 'Cập nhật thành công' };
  }

  async delete(id: number) {
    await this.repository.delete({ MaDiTich: id } as any);
    return { success: true, message: 'Xóa thành công' };
  }
}
