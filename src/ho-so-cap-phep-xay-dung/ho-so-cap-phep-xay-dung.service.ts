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
    const input = payload as any;
    const normalizeIntValue = (value: unknown): number | null | undefined => {
      if (value === undefined) return undefined;
      if (value === null || value === '') return null;
      const parsed = Number.parseInt(String(value), 10);
      return Number.isFinite(parsed) ? parsed : null;
    };

    const normalizeNumberValue = (value: unknown): number | null | undefined => {
      if (value === undefined) return undefined;
      if (value === null || value === '') return null;
      const parsed = Number(value);
      return Number.isFinite(parsed) ? parsed : null;
    };

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
      MaHoSo: normalizeIntValue(payload.MaHoSo),
      TenCongTrinh:
        payload.TenCongTrinh ??
        payload.DiaChiCongTrinh ??
        payload.LoaiCongTrinh ??
        payload.ChuDauTu ??
        'Công trình',
      LoaiCongTrinh: payload.LoaiCongTrinh,
      LoaiGiayPhep: payload.LoaiGiayPhep,
      ChuDauTu: payload.ChuDauTu,
      CCCD: payload.CCCD,
      SoDienThoai: payload.SoDienThoai,
      DiaChi: payload.DiaChi,
      DiaChiCongTrinh: payload.DiaChiCongTrinh,
      DiaDiem: payload.DiaDiem ?? payload.DiaChiCongTrinh ?? payload.DiaChi,
      MaThua: payload.MaThua,
      SoTo: payload.SoTo,
      DienTich: normalizeNumberValue(payload.DienTich ?? payload.DienTichXayDung),
      DienTichXayDung: normalizeNumberValue(payload.DienTichXayDung),
      DienTichSan: normalizeNumberValue(payload.DienTichSan),
      SoTang: normalizeIntValue(payload.SoTang),
      ChieuCao: normalizeNumberValue(payload.ChieuCao),
      NgayNopHoSo: normalizeDateValue(payload.NgayNopHoSo ?? payload.NgayNop),
      NgayNop: normalizeDateValue(payload.NgayNop),
      NgayHenTra: normalizeDateValue(payload.NgayHenTra),
      TrangThai: payload.TrangThai,
      MaCanBo: normalizeIntValue(payload.MaCanBo),
      CanBoTiepNhan: payload.CanBoTiepNhan,
      CanBoThamDinh: payload.CanBoThamDinh,
      SoGiayPhep: payload.SoGiayPhep,
      NgayCapPhep: normalizeDateValue(payload.NgayCapPhep),
      ThoiHanPhep: payload.ThoiHanPhep,
      GhiChu: payload.GhiChu,
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
