import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ThongKeKinhTe } from './thong-ke-kinh-te.entity';

@Injectable()
export class ThongKeKinhTeService {
  constructor(
    @InjectRepository(ThongKeKinhTe)
    private readonly repository: Repository<ThongKeKinhTe>,
  ) {}

  private normalizeTextFields(record: ThongKeKinhTe | null) {
    if (!record) return record;
    return {
      ...record,
      MaBC: record.MaBC ?? '',
      KyBaoCao: record.KyBaoCao ?? '',
      LoaiKy: record.LoaiKy ?? '',
      TrangThai: record.TrangThai ?? '',
    };
  }

  async findAll(page: number = 1, limit: number = 20) {
    const [rows, total] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { MaBaoCao: 'DESC' },
    });
    const data = rows.map((row) => this.normalizeTextFields(row));
    return { success: true, data, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async getStats() {
    const total = await this.repository.count();
    return { success: true, data: { total } };
  }

  async findOne(id: number) {
    const row = await this.repository.findOne({ where: { MaBaoCao: id } as any });
    return { success: true, data: this.normalizeTextFields(row) };
  }

  async create(payload: Partial<ThongKeKinhTe>) {
    const row = await this.repository.save(this.repository.create(payload));
    return { success: true, data: this.normalizeTextFields(row), message: 'Tạo mới thành công' };
  }

  async update(id: number, payload: Partial<ThongKeKinhTe>) {
    await this.repository.update({ MaBaoCao: id } as any, payload);
    const row = await this.repository.findOne({ where: { MaBaoCao: id } as any });
    return { success: true, data: this.normalizeTextFields(row), message: 'Cập nhật thành công' };
  }

  async delete(id: number) {
    await this.repository.delete({ MaBaoCao: id } as any);
    return { success: true, message: 'Xóa thành công' };
  }
}
