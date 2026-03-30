import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RuiRoQuyHoach } from './rui-ro-quy-hoach.entity';

@Injectable()
export class RuiRoQuyHoachService {
  constructor(
    @InjectRepository(RuiRoQuyHoach)
    private repository: Repository<RuiRoQuyHoach>,
  ) {}

  private normalizePayload(data: Partial<RuiRoQuyHoach>) {
    const payload: Partial<RuiRoQuyHoach> = {};
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
      order: { MaRuiRo: 'DESC' },
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
    const item = await this.repository.findOne({ where: { MaRuiRo: id } as any });
    if (!item) {
      return { success: false, message: 'Không tìm thấy bản ghi' };
    }
    return { success: true, data: item };
  }

  async getStats() {
    const total = await this.repository.count();
    const ruiRoCao = await this.repository.count({
      where: [
        { MucDoRuiRo: 'Cao' } as any,
        { MucDoRuiRo: 'Rất cao' } as any,
      ],
    });
    const ruiRoTB = await this.repository.count({ where: { MucDoRuiRo: 'Trung bình' } as any });
    const canXuLy = await this.repository.count({ where: { TrangThai: 'Cần xử lý' } as any });
    const daXuLy = await this.repository.count({ where: { TrangThai: 'Đã xử lý' } as any });

    const avg = await this.repository
      .createQueryBuilder('rr')
      .select('COALESCE(AVG(rr."DoTinCayAI"), 0)', 'avgDoTinCayAI')
      .getRawOne();

    return {
      success: true,
      data: {
        total,
        ruiRoCao,
        ruiRoTB,
        canXuLy,
        daXuLy,
        doTinCayTB: Math.round(Number(avg.avgDoTinCayAI || 0)),
      },
    };
  }

  async create(data: Partial<RuiRoQuyHoach>) {
    const item = this.repository.create(this.normalizePayload(data));
    await this.repository.save(item);
    return { success: true, data: item, message: 'Tạo mới thành công' };
  }

  async update(id: number, data: Partial<RuiRoQuyHoach>) {
    await this.repository.update({ MaRuiRo: id } as any, this.normalizePayload(data));
    const updated = await this.repository.findOne({ where: { MaRuiRo: id } as any });
    return { success: true, data: updated, message: 'Cập nhật thành công' };
  }

  async delete(id: number) {
    await this.repository.delete({ MaRuiRo: id } as any);
    return { success: true, message: 'Xóa thành công' };
  }
}
