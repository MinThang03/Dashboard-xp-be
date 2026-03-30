import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CoSoKinhDoanhDuLich } from './co-so-kinh-doanh-du-lich.entity';

@Injectable()
export class CoSoKinhDoanhDuLichService {
  constructor(
    @InjectRepository(CoSoKinhDoanhDuLich)
    private repository: Repository<CoSoKinhDoanhDuLich>,
  ) {}

  private normalizePayload(data: Partial<CoSoKinhDoanhDuLich>) {
    const payload: Partial<CoSoKinhDoanhDuLich> = {};
    Object.entries(data || {}).forEach(([key, value]) => {
      if (value !== undefined) {
        (payload as any)[key] = value;
      }
    });
    return payload;
  }

  async findAll(page: number = 1, limit: number = 1000) {
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
    const active = await this.repository.count({ where: { TrangThai: 'Hoạt động' } as any });

    const totals = await this.repository
      .createQueryBuilder('dl')
      .select('COALESCE(SUM(dl."SoPhong"), 0)', 'totalRooms')
      .addSelect('COALESCE(SUM(dl."LuotKhachThang"), 0)', 'totalGuests')
      .addSelect('COALESCE(SUM(dl."DoanhThuThang"), 0)', 'totalRevenue')
      .addSelect('COALESCE(AVG(dl."DanhGiaTB"), 0)', 'avgRating')
      .getRawOne();

    return {
      success: true,
      data: {
        total,
        active,
        totalRooms: Number(totals.totalRooms || 0),
        totalGuests: Number(totals.totalGuests || 0),
        totalRevenue: Number(totals.totalRevenue || 0),
        avgRating: Number(totals.avgRating || 0),
      },
    };
  }

  async create(data: Partial<CoSoKinhDoanhDuLich>) {
    const item = this.repository.create(this.normalizePayload(data));
    await this.repository.save(item);
    return { success: true, data: item, message: 'Tạo mới thành công' };
  }

  async update(id: number, data: Partial<CoSoKinhDoanhDuLich>) {
    await this.repository.update({ MaCoSo: id } as any, this.normalizePayload(data));
    const updated = await this.repository.findOne({ where: { MaCoSo: id } as any });
    return { success: true, data: updated, message: 'Cập nhật thành công' };
  }

  async delete(id: number) {
    await this.repository.delete({ MaCoSo: id } as any);
    return { success: true, message: 'Xóa thành công' };
  }
}
