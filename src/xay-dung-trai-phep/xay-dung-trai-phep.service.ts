import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { XayDungTraiPhep } from './xay-dung-trai-phep.entity';

@Injectable()
export class XayDungTraiPhepService {
  constructor(
    @InjectRepository(XayDungTraiPhep)
    private readonly repository: Repository<XayDungTraiPhep>,
  ) {}

  private normalizePayload(payload: Partial<XayDungTraiPhep>): Partial<XayDungTraiPhep> {
    return {
      ...payload,
      DiaDiem: payload.DiaDiem ?? payload.DiaChi ?? 'Chưa cập nhật',
      ChuSoHuu: payload.ChuSoHuu ?? payload.ChuCongTrinh,
      DienTich: payload.DienTich ?? payload.DienTichViPham,
      TrangThai: payload.TrangThai ?? 'Đã phát hiện',
    };
  }

  async findAll(page = 1, limit = 20) {
    const [data, total] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { MaViPham: 'DESC' },
    });
    return { success: true, data, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async getStats() {
    const total = await this.repository.count();
    return { success: true, data: { total } };
  }

  async findOne(id: number) {
    const data = await this.repository.findOne({ where: { MaViPham: id } as any });
    return { success: true, data };
  }

  async create(payload: Partial<XayDungTraiPhep>) {
    const data = await this.repository.save(this.repository.create(this.normalizePayload(payload)));
    return { success: true, data, message: 'Tạo mới thành công' };
  }

  async update(id: number, payload: Partial<XayDungTraiPhep>) {
    await this.repository.update({ MaViPham: id } as any, this.normalizePayload(payload));
    const data = await this.repository.findOne({ where: { MaViPham: id } as any });
    return { success: true, data, message: 'Cập nhật thành công' };
  }

  async delete(id: number) {
    await this.repository.delete({ MaViPham: id } as any);
    return { success: true, message: 'Xóa thành công' };
  }
}
