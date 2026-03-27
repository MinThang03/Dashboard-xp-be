import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ThuPhi } from './thu-phi.entity';

@Injectable()
export class ThuPhiService {
  constructor(
    @InjectRepository(ThuPhi)
    private readonly repository: Repository<ThuPhi>,
  ) {}

  private normalizeTextFields(record: ThuPhi | null) {
    if (!record) return record;
    return {
      ...record,
      LoaiPhi: record.LoaiPhi ?? '',
      MoTa: record.MoTa ?? '',
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

  private normalizeNumberValue(value: unknown): number | null | undefined {
    if (value === undefined) return undefined;
    if (value === null || value === '') return null;
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  private normalizePayload(payload: Partial<ThuPhi>): Partial<ThuPhi> {
    const input = payload as any;
    return {
      MaPhieuThu: payload.MaPhieuThu,
      LoaiPhi: payload.LoaiPhi,
      MoTa: payload.MoTa,
      DonGia: this.normalizeNumberValue(payload.DonGia),
      SoLuong: this.normalizeNumberValue(payload.SoLuong),
      ThanhTien: this.normalizeNumberValue(payload.ThanhTien),
      TenNguoiNop: payload.TenNguoiNop,
      CCCDNguoiNop: payload.CCCDNguoiNop,
      DiaChiNguoiNop: payload.DiaChiNguoiNop,
      NgayThu: this.normalizeDateValue(payload.NgayThu),
      NguoiThu: payload.NguoiThu,
      TrangThai: payload.TrangThai,
      GhiChu: payload.GhiChu,
      // Ignore legacy/non-entity fields from FE such as ThangNam, Nam, etc.
      ...(input?.ThangNam ? {} : {}),
    };
  }

  async findAll(page: number = 1, limit: number = 20) {
    const [rows, total] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { MaThuPhi: 'DESC' },
    });
    const data = rows.map((row) => this.normalizeTextFields(row));
    return { success: true, data, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async getStats() {
    const total = await this.repository.count();
    const paid = await this.repository.count({ where: { TrangThai: 'Đã thu' } as any });
    return { success: true, data: { total, paid } };
  }

  findOne(id: number) {
    return this.repository
      .findOne({ where: { MaThuPhi: id } as any })
      .then((row) => ({ success: true, data: this.normalizeTextFields(row) }));
  }

  async create(payload: Partial<ThuPhi>) {
    const row = await this.repository.save(this.repository.create(this.normalizePayload(payload)));
    return { success: true, data: this.normalizeTextFields(row), message: 'Tạo mới thành công' };
  }

  async update(id: number, payload: Partial<ThuPhi>) {
    await this.repository.update({ MaThuPhi: id } as any, this.normalizePayload(payload));
    const row = await this.repository.findOne({ where: { MaThuPhi: id } as any });
    return { success: true, data: this.normalizeTextFields(row), message: 'Cập nhật thành công' };
  }

  async delete(id: number) {
    await this.repository.delete({ MaThuPhi: id } as any);
    return { success: true, message: 'Xóa thành công' };
  }
}
