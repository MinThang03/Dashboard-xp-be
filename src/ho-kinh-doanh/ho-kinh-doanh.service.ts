import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HoKinhDoanh } from './ho-kinh-doanh.entity';

@Injectable()
export class HoKinhDoanhService {
  constructor(
    @InjectRepository(HoKinhDoanh)
    private readonly repository: Repository<HoKinhDoanh>,
  ) {}

  private normalizeTextFields(record: HoKinhDoanh | null) {
    if (!record) return record;
    return {
      ...record,
      SoGCN: record.SoGCN ?? '',
      TenHoKD: record.TenHoKD ?? '',
      ChuHo: record.ChuHo ?? '',
      NganhNghe: record.NganhNghe ?? '',
      TrangThai: record.TrangThai ?? '',
    };
  }

  private normalizeDateValue(value: unknown): Date | null | undefined {
    if (value === undefined) return undefined;
    if (value === null || value === '') return null;
    if (value instanceof Date) return value;
    if (typeof value === 'string') {
      const trimmed = value.trim();
      return trimmed ? new Date(trimmed) : null;
    }
    return value as Date;
  }

  private normalizePayload(payload: Partial<HoKinhDoanh>): Partial<HoKinhDoanh> {
    const input = payload as any;
    return {
      ...payload,
      NgaySinh: this.normalizeDateValue(payload.NgaySinh ?? input.NgaySinh),
      NgayDangKy: this.normalizeDateValue(payload.NgayDangKy ?? input.NgayDangKy),
      NgayHetHan: this.normalizeDateValue(payload.NgayHetHan ?? input.NgayHetHan),
    };
  }

  async findAll(page: number = 1, limit: number = 20) {
    const [rows, total] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { MaHoKD: 'DESC' },
    });
    const data = rows.map((row) => this.normalizeTextFields(row));

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
    const row = await this.repository.findOne({ where: { MaHoKD: id } as any });
    return { success: true, data: this.normalizeTextFields(row) };
  }

  async create(payload: Partial<HoKinhDoanh>) {
    const entity = this.repository.create(this.normalizePayload(payload));
    const row = await this.repository.save(entity);
    return { success: true, data: this.normalizeTextFields(row), message: 'Tạo mới thành công' };
  }

  async update(id: number, payload: Partial<HoKinhDoanh>) {
    await this.repository.update({ MaHoKD: id } as any, this.normalizePayload(payload));
    const row = await this.repository.findOne({ where: { MaHoKD: id } as any });
    return { success: true, data: this.normalizeTextFields(row), message: 'Cập nhật thành công' };
  }

  async delete(id: number) {
    await this.repository.delete({ MaHoKD: id } as any);
    return { success: true, message: 'Xóa thành công' };
  }
}
