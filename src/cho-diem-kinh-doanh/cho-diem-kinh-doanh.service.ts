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

  private normalizeTextFields(record: ChoDiemKinhDoanh | null) {
    if (!record) return record;
    return {
      ...record,
      MaDiemKD: record.MaDiemKD ?? '',
      TenDiemKD: record.TenDiemKD ?? '',
      DiaChi: record.DiaChi ?? '',
      LoaiHinh: record.LoaiHinh ?? '',
      TrangThai: record.TrangThai ?? '',
    };
  }

  private normalizePayload(payload: Partial<ChoDiemKinhDoanh>): Partial<ChoDiemKinhDoanh> {
    const normalizeDateValue = (value: unknown): Date | null | undefined => {
      if (value === undefined) return undefined;
      if (value === null || value === '') return null;
      if (value instanceof Date) return value;
      if (typeof value === 'string') {
        const trimmed = value.trim();
        return trimmed ? new Date(trimmed) : null;
      }
      return value as Date;
    };

    return {
      ...payload,
      TenCho: payload.TenCho ?? payload.TenDiemKD,
      TongDienTich: payload.TongDienTich ?? payload.DienTich,
      NguoiQuanLy: payload.NguoiQuanLy ?? payload.BanQuanLy,
      SoLo: payload.SoLo ?? payload.SoGianHang,
      NgayThanhLap: normalizeDateValue(payload.NgayThanhLap),
      NgayCapPhep: normalizeDateValue(payload.NgayCapPhep),
      NgayHetHan: normalizeDateValue(payload.NgayHetHan),
    };
  }

  async findAll(page: number = 1, limit: number = 20) {
    const [rows, total] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { MaCho: 'DESC' },
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
    const row = await this.repository.findOne({ where: { MaCho: id } as any });
    return { success: true, data: this.normalizeTextFields(row) };
  }

  async create(payload: Partial<ChoDiemKinhDoanh>) {
    const entity = this.repository.create(this.normalizePayload(payload));
    const row = await this.repository.save(entity);
    return { success: true, data: this.normalizeTextFields(row), message: 'Tạo mới thành công' };
  }

  async update(id: number, payload: Partial<ChoDiemKinhDoanh>) {
    await this.repository.update({ MaCho: id } as any, this.normalizePayload(payload));
    const row = await this.repository.findOne({ where: { MaCho: id } as any });
    return { success: true, data: this.normalizeTextFields(row), message: 'Cập nhật thành công' };
  }

  async delete(id: number) {
    await this.repository.delete({ MaCho: id } as any);
    return { success: true, message: 'Xóa thành công' };
  }
}
