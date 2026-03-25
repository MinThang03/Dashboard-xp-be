import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChoDiemKinhDoanh } from './cho-diem-kinh-doanh.entity';

@Injectable()
export class ChoDiemKinhDoanhService {
  constructor(
    @InjectRepository(ChoDiemKinhDoanh)
    private readonly repository: Repository<ChoDiemKinhDoanh>,
  ) {}

  private normalizePayload(payload: Partial<ChoDiemKinhDoanh>): Partial<ChoDiemKinhDoanh> {
    return {
      ...payload,
      TenCho: payload.TenCho ?? payload.TenDiemKD,
      TongDienTich: payload.TongDienTich ?? payload.DienTich,
      NguoiQuanLy: payload.NguoiQuanLy ?? payload.BanQuanLy,
      SoLo: payload.SoLo ?? payload.SoGianHang,
    };
  }

  async findAll(page: number = 1, limit: number = 20) {
    const [data, total] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { MaCho: 'DESC' },
    });
    return {
      success: true,
      data,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async getStats() {
    const total = await this.repository.count();
    const active = await this.repository.count({ where: { TrangThai: 'Hoạt động' } as any });
    return { success: true, data: { total, active } };
  }

  async findOne(id: number) {
    const data = await this.repository.findOne({ where: { MaCho: id } as any });
    return { success: true, data };
  }

  async create(payload: Partial<ChoDiemKinhDoanh>) {
    const entity = this.repository.create(this.normalizePayload(payload));
    const data = await this.repository.save(entity);
    return { success: true, data, message: 'Tạo mới thành công' };
  }

  async update(id: number, payload: Partial<ChoDiemKinhDoanh>) {
    await this.repository.update({ MaCho: id } as any, this.normalizePayload(payload));
    const data = await this.repository.findOne({ where: { MaCho: id } as any });
    return { success: true, data, message: 'Cập nhật thành công' };
  }

  async delete(id: number) {
    await this.repository.delete({ MaCho: id } as any);
    return { success: true, message: 'Xóa thành công' };
  }
}
