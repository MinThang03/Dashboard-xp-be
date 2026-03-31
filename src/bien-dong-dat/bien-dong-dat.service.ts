import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BienDongDat } from './bien-dong-dat.entity';
import { ThuaDat } from '../thua-dat/thua-dat.entity';

@Injectable()
export class BienDongDatService {
  constructor(
    @InjectRepository(BienDongDat)
    private repository: Repository<BienDongDat>,
    @InjectRepository(ThuaDat)
    private thuaDatRepository: Repository<ThuaDat>,
  ) {}

  private normalizeMaThua(value?: string | null) {
    const text = String(value ?? '').trim();
    return text.length > 0 ? text : null;
  }

  private async ensureThuaDatExists(maThua: string) {
    return this.thuaDatRepository.findOne({ where: { MaThua: maThua } as any });
  }

  private normalizePayload(data: Partial<BienDongDat>) {
    const payload: Partial<BienDongDat> = {};
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
    const maThua = this.normalizeMaThua(data.MaThua);
    if (!maThua) {
      return { success: false, message: 'MaThua không hợp lệ' };
    }

    const thuaDat = await this.ensureThuaDatExists(maThua);
    if (!thuaDat) {
      return { success: false, message: `Không tìm thấy thửa đất MaThua=${maThua}` };
    }

    const item = this.repository.create(this.normalizePayload({ ...data, MaThua: maThua }));
    await this.repository.save(item);
    return { success: true, data: item, message: 'Tạo mới thành công' };
  }

  async update(id: number, data: Partial<BienDongDat>) {
    if (data.MaThua !== undefined) {
      const maThua = this.normalizeMaThua(data.MaThua);
      if (!maThua) {
        return { success: false, message: 'MaThua không hợp lệ' };
      }
      const thuaDat = await this.ensureThuaDatExists(maThua);
      if (!thuaDat) {
        return { success: false, message: `Không tìm thấy thửa đất MaThua=${maThua}` };
      }
      data = { ...data, MaThua: maThua };
    }
    await this.repository.update({ MaBienDong: id } as any, this.normalizePayload(data));
    const updated = await this.repository.findOne({ where: { MaBienDong: id } as any });
    return { success: true, data: updated, message: 'Cập nhật thành công' };
  }

  async delete(id: number) {
    await this.repository.delete({ MaBienDong: id } as any);
    return { success: true, message: 'Xóa thành công' };
  }
}
