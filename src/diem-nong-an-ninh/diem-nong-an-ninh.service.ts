import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DiemNongAnNinh } from './diem-nong-an-ninh.entity';

@Injectable()
export class DiemNongAnNinhService {
  constructor(
    @InjectRepository(DiemNongAnNinh)
    private repository: Repository<DiemNongAnNinh>,
  ) {}

  private normalizePayload(data: Partial<DiemNongAnNinh>): Partial<DiemNongAnNinh> {
    const input = data as any;
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

    const normalizeNumberValue = (value: unknown): number | null | undefined => {
      if (value === undefined) return undefined;
      if (value === null || value === '') return null;
      const parsed = Number(value);
      return Number.isFinite(parsed) ? parsed : null;
    };

    const normalizedNgayPhatHien = normalizeDateValue(data.NgayPhatHien ?? input.NgayPhatHien);

    return {
      MaDN: data.MaDN,
      TenDiaDiem: input.TenDiaDiem ?? data.TenDiaDiem ?? data.TenDiem,
      TenDiem: data.TenDiem ?? input.TenDiaDiem,
      DiaDiem: data.DiaDiem ?? input.DiaChi,
      ToaDo: data.ToaDo,
      ToaDoLat: normalizeNumberValue(data.ToaDoLat ?? input.ToaDoLat),
      ToaDoLng: normalizeNumberValue(data.ToaDoLng ?? input.ToaDoLng),
      LoaiDiaDiem: data.LoaiDiaDiem,
      LoaiViPham: input.LoaiViPham ?? data.LoaiViPham ?? data.LoaiRuiRo,
      MucDo: input.MucDo ?? data.MucDo ?? data.MucDoNghiemTrong,
      SoDoiTuong: normalizeNumberValue(data.SoDoiTuong),
      NgayCapNhat: normalizeDateValue(data.NgayCapNhat ?? input.NgayCapNhat),
      CanBoTheoDoi: data.CanBoTheoDoi,
      SoDienThoai: data.SoDienThoai,
      MoTa: data.MoTa,
      LoaiRuiRo: data.LoaiRuiRo ?? input.LoaiViPham,
      MucDoNghiemTrong: data.MucDoNghiemTrong ?? input.MucDo,
      TinhTrang: data.TinhTrang ?? input.TrangThai,
      TrangThai: input.TrangThai ?? data.TrangThai ?? data.TinhTrang,
      NgayPhatHien: normalizedNgayPhatHien ?? new Date(),
      BienPhapXuLy: data.BienPhapXuLy,
      GhiChu: data.GhiChu,
    };
  }

  async findAll(page: number = 1, limit: number = 10) {
    const [items, total] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { MaDiem: 'DESC' },
    });

    return {
      success: true,
      data: items,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const item = await this.repository.findOne({ where: { MaDiem: id } as any });
    if (!item) {
      return { success: false, message: 'Không tìm thấy bản ghi' };
    }
    return { success: true, data: item };
  }

  async getStats() {
    const total = await this.repository.count();
    const dangTheoDoi = await this.repository.count({ where: { TinhTrang: 'Đang theo dõi' } as any });
    const nghiemTrong = await this.repository.count({ where: { MucDoNghiemTrong: 'Nghiêm trọng' } as any });
    
    return {
      success: true,
      data: { total, dangTheoDoi, nghiemTrong },
    };
  }

  async create(data: Partial<DiemNongAnNinh>) {
    const item = this.repository.create(this.normalizePayload(data));
    await this.repository.save(item);
    return { success: true, data: item, message: 'Tạo mới thành công' };
  }

  async update(id: number, data: Partial<DiemNongAnNinh>) {
    await this.repository.update({ MaDiem: id } as any, this.normalizePayload(data));
    const updated = await this.repository.findOne({ where: { MaDiem: id } as any });
    return { success: true, data: updated, message: 'Cập nhật thành công' };
  }

  async delete(id: number) {
    await this.repository.delete({ MaDiem: id } as any);
    return { success: true, message: 'Xóa thành công' };
  }
}
