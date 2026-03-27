import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NguoiCoCong } from './nguoi-co-cong.entity';

@Injectable()
export class NguoiCoCongService {
  constructor(
    @InjectRepository(NguoiCoCong)
    private readonly repository: Repository<NguoiCoCong>,
  ) {}

  private normalizePayload(payload: Partial<NguoiCoCong>): Partial<NguoiCoCong> {
    const normalizeLoaiCongHien = (value: unknown): string => {
      if (value === undefined || value === null) return 'Người có công khác';

      const raw = String(value).trim();
      if (!raw) return 'Người có công khác';

      const lowered = raw
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();

      if (lowered.includes('liet si')) return 'Liệt sĩ';
      if (lowered.includes('thuong binh')) return 'Thương binh';
      if (lowered.includes('benh binh')) return 'Bệnh binh';
      if (lowered.includes('nguoi co cong')) return 'Người có công khác';

      return 'Người có công khác';
    };

    return {
      ...payload,
      LoaiCongHien: normalizeLoaiCongHien(payload.LoaiCongHien ?? payload.LoaiDoiTuong),
      MucHuong: payload.MucHuong ?? payload.MucHuongHangThang,
      TrangThai: payload.TrangThai ?? payload.TinhTrang ?? 'Đang hưởng',
      NgayDangKy: payload.NgayDangKy ?? new Date(),
    };
  }

  async findAll(page = 1, limit = 20) {
    const [data, total] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { MaNCC: 'DESC' },
    });
    return { success: true, data, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async getStats() {
    const total = await this.repository.count();
    return { success: true, data: { total } };
  }

  async findOne(id: number) {
    const data = await this.repository.findOne({ where: { MaNCC: id } as any });
    return { success: true, data };
  }

  async create(payload: Partial<NguoiCoCong>) {
    const data = await this.repository.save(this.repository.create(this.normalizePayload(payload)));
    return { success: true, data, message: 'Tạo mới thành công' };
  }

  async update(id: number, payload: Partial<NguoiCoCong>) {
    await this.repository.update({ MaNCC: id } as any, this.normalizePayload(payload));
    const data = await this.repository.findOne({ where: { MaNCC: id } as any });
    return { success: true, data, message: 'Cập nhật thành công' };
  }

  async delete(id: number) {
    await this.repository.delete({ MaNCC: id } as any);
    return { success: true, message: 'Xóa thành công' };
  }
}
