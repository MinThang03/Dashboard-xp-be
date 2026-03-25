import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BienDongDat } from './bien-dong-dat.entity';

@Injectable()
export class BienDongDatService {
  constructor(
    @InjectRepository(BienDongDat)
    private repository: Repository<BienDongDat>,
  ) {}

  async findAll(page: number = 1, limit: number = 10) {
    const [items, total] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { MaBienDong: 'DESC' },
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
    const item = await this.repository.findOne({ where: { MaBienDong: id } as any });
    if (!item) {
      return { success: false, message: 'Không tìm thấy bản ghi' };
    }
    return { success: true, data: item };
  }

  async getStats() {
    const total = await this.repository.count();
    const chuyen = await this.repository.count({ where: { LoaiBienDong: 'Chuyển' } as any });
    const tach = await this.repository.count({ where: { LoaiBienDong: 'Tách' } as any });
    const nhan = await this.repository.count({ where: { LoaiBienDong: 'Nhận' } as any });
    const gop = await this.repository.count({ where: { LoaiBienDong: 'Gộp' } as any });
    
    return {
      success: true,
      data: { total, chuyen, tach, nhan, gop },
    };
  }

  async create(data: Partial<BienDongDat>) {
    const item = this.repository.create(data);
    await this.repository.save(item);
    return { success: true, data: item, message: 'Tạo mới thành công' };
  }

  async update(id: number, data: Partial<BienDongDat>) {
    await this.repository.update({ MaBienDong: id } as any, data);
    const updated = await this.repository.findOne({ where: { MaBienDong: id } as any });
    return { success: true, data: updated, message: 'Cập nhật thành công' };
  }

  async delete(id: number) {
    await this.repository.delete({ MaBienDong: id } as any);
    return { success: true, message: 'Xóa thành công' };
  }
}
