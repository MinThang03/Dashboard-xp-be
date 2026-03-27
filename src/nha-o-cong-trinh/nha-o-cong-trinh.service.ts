import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NhaOCongTrinh } from './nha-o-cong-trinh.entity';

@Injectable()
export class NhaOCongTrinhService {
  constructor(
    @InjectRepository(NhaOCongTrinh)
    private readonly repository: Repository<NhaOCongTrinh>,
  ) {}

  private normalizePayload(payload: Partial<NhaOCongTrinh>): Partial<NhaOCongTrinh> {
    return {
      ...payload,
      TenCongTrinh: payload.TenCongTrinh ?? payload.LoaiCongTrinh ?? 'Công trình',
      DiaDiem: payload.DiaDiem ?? payload.DiaChi,
      ChuDauTu: payload.ChuDauTu ?? payload.ChuSoHuu,
      DienTich: payload.DienTich ?? payload.DienTichSan,
    };
  }

  async findAll(page = 1, limit = 20) {
    const [data, total] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { MaCongTrinh: 'DESC' },
    });
    return { success: true, data, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async getStats() {
    const total = await this.repository.count();
    return { success: true, data: { total } };
  }

  async findOne(id: number) {
    const data = await this.repository.findOne({ where: { MaCongTrinh: id } as any });
    return { success: true, data };
  }

  async create(payload: Partial<NhaOCongTrinh>) {
    const data = await this.repository.save(this.repository.create(this.normalizePayload(payload)));
    return { success: true, data, message: 'Tạo mới thành công' };
  }

  async update(id: number, payload: Partial<NhaOCongTrinh>) {
    await this.repository.update({ MaCongTrinh: id } as any, this.normalizePayload(payload));
    const data = await this.repository.findOne({ where: { MaCongTrinh: id } as any });
    return { success: true, data, message: 'Cập nhật thành công' };
  }

  async delete(id: number) {
    await this.repository.delete({ MaCongTrinh: id } as any);
    return { success: true, message: 'Xóa thành công' };
  }
}
