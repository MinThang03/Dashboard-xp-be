import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HoSoCapPhepXayDung } from './ho-so-cap-phep-xay-dung.entity';

@Injectable()
export class HoSoCapPhepXayDungService {
  constructor(
    @InjectRepository(HoSoCapPhepXayDung)
    private readonly repository: Repository<HoSoCapPhepXayDung>,
  ) {}

  private normalizePayload(payload: Partial<HoSoCapPhepXayDung>): Partial<HoSoCapPhepXayDung> {
    return {
      ...payload,
      TenCongTrinh:
        payload.TenCongTrinh ??
        payload.DiaChiCongTrinh ??
        payload.LoaiCongTrinh ??
        payload.ChuDauTu ??
        'Công trình',
      DiaDiem: payload.DiaDiem ?? payload.DiaChiCongTrinh ?? payload.DiaChi,
      DienTich: payload.DienTich ?? payload.DienTichXayDung,
      NgayNopHoSo: payload.NgayNopHoSo ?? payload.NgayNop,
    };
  }

  async findAll(page = 1, limit = 20) {
    const [data, total] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { MaHoSo: 'DESC' },
    });

    return {
      success: true,
      data,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async getStats() {
    const total = await this.repository.count();
    return { success: true, data: { total } };
  }

  async findOne(id: number) {
    const data = await this.repository.findOne({ where: { MaHoSo: id } as any });
    return { success: true, data };
  }

  async create(payload: Partial<HoSoCapPhepXayDung>) {
    const data = await this.repository.save(this.repository.create(this.normalizePayload(payload)));
    return { success: true, data, message: 'Tạo mới thành công' };
  }

  async update(id: number, payload: Partial<HoSoCapPhepXayDung>) {
    await this.repository.update({ MaHoSo: id } as any, this.normalizePayload(payload));
    const data = await this.repository.findOne({ where: { MaHoSo: id } as any });
    return { success: true, data, message: 'Cập nhật thành công' };
  }

  async delete(id: number) {
    await this.repository.delete({ MaHoSo: id } as any);
    return { success: true, message: 'Xóa thành công' };
  }
}
