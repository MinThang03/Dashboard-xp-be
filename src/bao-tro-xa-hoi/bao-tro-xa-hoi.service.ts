import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaoTroXaHoi } from './bao-tro-xa-hoi.entity';

@Injectable()
export class BaoTroXaHoiService {
  constructor(
    @InjectRepository(BaoTroXaHoi)
    private readonly repository: Repository<BaoTroXaHoi>,
  ) {}

  private normalizePayload(payload: Partial<BaoTroXaHoi>): Partial<BaoTroXaHoi> {
    return {
      ...payload,
      MucTroCapThang: payload.MucTroCapThang ?? payload.MucTroCap,
      TuNgay: payload.TuNgay ?? payload.NgayBatDau,
      TrangThai: payload.TrangThai ?? payload.TinhTrang ?? 'Đang hỗ trợ',
    };
  }

  async findAll(page = 1, limit = 20) {
    const [data, total] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { MaDoiTuong: 'DESC' },
    });
    return { success: true, data, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async getStats() {
    const total = await this.repository.count();
    return { success: true, data: { total } };
  }

  async findOne(id: number) {
    const data = await this.repository.findOne({ where: { MaDoiTuong: id } as any });
    return { success: true, data };
  }

  async create(payload: Partial<BaoTroXaHoi>) {
    const data = await this.repository.save(this.repository.create(this.normalizePayload(payload)));
    return { success: true, data, message: 'Tạo mới thành công' };
  }

  async update(id: number, payload: Partial<BaoTroXaHoi>) {
    await this.repository.update({ MaDoiTuong: id } as any, this.normalizePayload(payload));
    const data = await this.repository.findOne({ where: { MaDoiTuong: id } as any });
    return { success: true, data, message: 'Cập nhật thành công' };
  }

  async delete(id: number) {
    await this.repository.delete({ MaDoiTuong: id } as any);
    return { success: true, message: 'Xóa thành công' };
  }
}
