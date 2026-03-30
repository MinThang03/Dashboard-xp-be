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
      MaCongTrinh: normalizeIntValue(payload.MaCongTrinh),
      TenCongTrinh: payload.TenCongTrinh ?? payload.LoaiCongTrinh ?? 'Công trình',
      LoaiCongTrinh: payload.LoaiCongTrinh,
      PhanLoai: payload.PhanLoai,
      DiaChi: payload.DiaChi,
      DiaDiem: payload.DiaDiem ?? payload.DiaChi,
      MaThua: payload.MaThua,
      SoTo: payload.SoTo,
      MaLoaiCT: normalizeIntValue(payload.MaLoaiCT),
      DienTichSan: normalizeNumberValue(payload.DienTichSan),
      SoTang: normalizeIntValue(payload.SoTang),
      NamXayDung: normalizeIntValue(payload.NamXayDung),
      ChuDauTu: payload.ChuDauTu ?? payload.ChuSoHuu,
      ChuSoHuu: payload.ChuSoHuu,
      CCCD: payload.CCCD,
      SoDienThoai: payload.SoDienThoai,
      DienTich: normalizeNumberValue(payload.DienTich ?? payload.DienTichSan),
      TongMucDauTu: normalizeNumberValue(payload.TongMucDauTu),
      NgayKhoiCong: normalizeDateValue(payload.NgayKhoiCong),
      NgayHoanThanh: normalizeDateValue(payload.NgayHoanThanh),
      TinhTrang: payload.TinhTrang,
      TinhTrangKienTruc: payload.TinhTrangKienTruc,
      TinhTrangPhapLy: payload.TinhTrangPhapLy,
      SoGiayPhepXD: payload.SoGiayPhepXD,
      NgayKiemTra: normalizeDateValue(payload.NgayKiemTra),
      NguoiKiemTra: payload.NguoiKiemTra,
      KetQuaKiemTra: payload.KetQuaKiemTra,
      MaXaPhuong: normalizeIntValue(payload.MaXaPhuong),
      GhiChu: payload.GhiChu,
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
