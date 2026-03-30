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
      MaViPham: normalizeIntValue(payload.MaViPham),
      MaVuViec: payload.MaVuViec,
      DiaChi: payload.DiaChi,
      MaThua: payload.MaThua,
      SoTo: payload.SoTo,
      ChuCongTrinh: payload.ChuCongTrinh,
      CCCD: payload.CCCD,
      SoDienThoai: payload.SoDienThoai,
      LoaiViPham: payload.LoaiViPham,
      MoTaViPham: payload.MoTaViPham,
      DiaDiem: payload.DiaDiem ?? payload.DiaChi ?? 'Chưa cập nhật',
      ChuSoHuu: payload.ChuSoHuu ?? payload.ChuCongTrinh,
      DienTich: normalizeNumberValue(payload.DienTich ?? payload.DienTichViPham),
      DienTichViPham: normalizeNumberValue(payload.DienTichViPham),
      NgayPhatHien: normalizeDateValue(payload.NgayPhatHien),
      NguoiPhatHien: payload.NguoiPhatHien,
      TrangThai: payload.TrangThai ?? 'Đã phát hiện',
      BienPhapXuLy: payload.BienPhapXuLy,
      SoTien: normalizeNumberValue(payload.SoTien),
      SoQuyetDinhXP: payload.SoQuyetDinhXP,
      NgayQD: normalizeDateValue(payload.NgayQD),
      ThoiHanThaoGo: normalizeDateValue(payload.ThoiHanThaoGo),
      DaCuongChe: payload.DaCuongChe,
      NgayCuongChe: normalizeDateValue(payload.NgayCuongChe),
      KetQuaXuLy: payload.KetQuaXuLy,
      MaCanBo: normalizeIntValue(payload.MaCanBo),
      GhiChu: payload.GhiChu,
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
