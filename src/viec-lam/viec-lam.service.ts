import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ViecLam } from './viec-lam.entity';

@Injectable()
export class ViecLamService {
  constructor(
    @InjectRepository(ViecLam)
    private readonly repository: Repository<ViecLam>,
  ) {}

  private normalizePayload(payload: Partial<ViecLam>): Partial<ViecLam> {
    const input = payload as any;
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
      TenCongViec: payload.TenCongViec ?? payload.NgheNghiepMongMuon ?? payload.NgheNghiep ?? payload.HoTen ?? 'Việc làm',
      NhaTuyenDung: payload.NhaTuyenDung ?? payload.HoTen,
      DiaDiem: payload.DiaDiem ?? input.DiaChi,
      SoLuongCanTuyen: payload.SoLuongCanTuyen,
      MucLuong: payload.MucLuong ?? payload.MucLuongMongMuon,
      YeuCau: payload.YeuCau ?? payload.KinhNghiem,
      NgayDangTin: normalizeDateValue(payload.NgayDangTin) ?? new Date(),
      NgayHetHan: normalizeDateValue(payload.NgayHetHan),
      TrangThai: payload.TrangThai,
      GhiChu: payload.GhiChu,
      HoTen: payload.HoTen,
      NgaySinh: normalizeDateValue(payload.NgaySinh),
      GioiTinh: payload.GioiTinh,
      CCCD: payload.CCCD,
      NgheNghiep: payload.NgheNghiep,
      TrinhDo: payload.TrinhDo,
      KinhNghiem: payload.KinhNghiem,
      NgheNghiepMongMuon: payload.NgheNghiepMongMuon,
      MucLuongMongMuon: payload.MucLuongMongMuon,
      LyDoThatNghiep: payload.LyDoThatNghiep,
      DangKyBHTN: payload.DangKyBHTN,
      SoThangHuongBHTN: payload.SoThangHuongBHTN,
      MucHuongBHTN: payload.MucHuongBHTN,
    };
  }

  async findAll(page = 1, limit = 20) {
    const [data, total] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { MaViecLam: 'DESC' },
    });
    return { success: true, data, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async getStats() {
    const total = await this.repository.count();
    return { success: true, data: { total } };
  }

  async findOne(id: number) {
    const data = await this.repository.findOne({ where: { MaViecLam: id } as any });
    return { success: true, data };
  }

  async create(payload: Partial<ViecLam>) {
    const data = await this.repository.save(this.repository.create(this.normalizePayload(payload)));
    return { success: true, data, message: 'Tạo mới thành công' };
  }

  async update(id: number, payload: Partial<ViecLam>) {
    await this.repository.update({ MaViecLam: id } as any, this.normalizePayload(payload));
    const data = await this.repository.findOne({ where: { MaViecLam: id } as any });
    return { success: true, data, message: 'Cập nhật thành công' };
  }

  async delete(id: number) {
    await this.repository.delete({ MaViecLam: id } as any);
    return { success: true, message: 'Xóa thành công' };
  }
}
