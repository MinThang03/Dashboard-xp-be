import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TiemChung } from './tiem-chung.entity';

@Injectable()
export class TiemChungService {
  private normalizeString(value: unknown, maxLength: number): string | null | undefined {
    if (value === undefined) {
      return undefined;
    }

    if (value === null) {
      return null;
    }

    const normalized = String(value).trim();
    if (!normalized) {
      return null;
    }

    return normalized.length > maxLength ? null : normalized;
  }

  private sanitizePayload(data: Partial<TiemChung>): Partial<TiemChung> {
    const normalize = (value: unknown, maxLength: number, label: string): string | null => {
      const normalized = this.normalizeString(value, maxLength);
      if (value !== null && value !== undefined && !normalized) {
        throw new BadRequestException(`${label} không được để trống hoặc vượt quá ${maxLength} ký tự`);
      }
      return normalized;
    };

    const normalizeDate = <T>(value: unknown): T | null | undefined => {
      if (value === '') {
        return null;
      }
      return value as T | null | undefined;
    };

    return {
      ...data,
      TenDot: normalize(data.TenDot, 150, 'Tên đợt'),
      LoaiVacxin: normalize(data.LoaiVacxin, 100, 'Loại vắc xin'),
      TrangThai: normalize(data.TrangThai, 50, 'Trạng thái'),
      MaPhieu: normalize(data.MaPhieu, 50, 'Mã phiếu'),
      TenDoiTuong: normalize(data.TenDoiTuong, 150, 'Tên đối tượng'),
      GioiTinh: normalize(data.GioiTinh, 10, 'Giới tính'),
      TenChaMeBaoHo: normalize(data.TenChaMeBaoHo, 150, 'Tên cha/mẹ/người bảo hộ'),
      SoDienThoai: normalize(data.SoDienThoai, 20, 'Số điện thoại'),
      DiaChi: normalize(data.DiaChi, 255, 'Địa chỉ'),
      LoaiDoiTuong: normalize(data.LoaiDoiTuong, 50, 'Loại đối tượng'),
      TenVacXin: normalize(data.TenVacXin, 150, 'Tên vắc xin'),
      LoaiVacXin: normalize(data.LoaiVacXin, 100, 'Loại vắc xin'),
      ViTriTiem: normalize(data.ViTriTiem, 100, 'Vị trí tiêm'),
      SoLo: normalize(data.SoLo, 50, 'Số lô'),
      NguoiTiem: normalize(data.NguoiTiem, 150, 'Người tiêm'),
      MaTrangThai: normalize(data.MaTrangThai, 30, 'Mã trạng thái'),
      NgayBatDau: normalizeDate<Date>(data.NgayBatDau),
      NgayKetThuc: normalizeDate<Date>(data.NgayKetThuc),
      NgaySinh: normalizeDate<Date>(data.NgaySinh),
      NgayTiem: normalizeDate<Date>(data.NgayTiem),
      NgayHenTiemKe: normalizeDate<Date>(data.NgayHenTiemKe),
    };
  }

  constructor(
    @InjectRepository(TiemChung)
    private repository: Repository<TiemChung>,
  ) {}

  async findAll(page: number = 1, limit: number = 100) {
    const [items, total] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { MaTiemChung: 'DESC' },
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
    const item = await this.repository.findOne({ where: { MaTiemChung: id } as any });
    if (!item) {
      return { success: false, message: 'Không tìm thấy bản ghi' };
    }
    return { success: true, data: item };
  }

  async getStats() {
    const total = await this.repository.count();
    const completed = await this.repository.count({ where: { MaTrangThai: 'DA_TIEM' } as any });
    const waiting = await this.repository.count({ where: { MaTrangThai: 'CHO_TIEM' } as any });

    return {
      success: true,
      data: {
        total,
        completed,
        waiting,
        rate: total > 0 ? Math.round((completed / total) * 100) : 0,
      },
    };
  }

  async create(data: Partial<TiemChung>) {
    const sanitized = this.sanitizePayload(data);
    const item = this.repository.create(sanitized);
    await this.repository.save(item);
    return { success: true, data: item, message: 'Tạo mới thành công' };
  }

  async update(id: number, data: Partial<TiemChung>) {
    const sanitized = this.sanitizePayload(data);
    await this.repository.update({ MaTiemChung: id } as any, sanitized);
    const updated = await this.repository.findOne({ where: { MaTiemChung: id } as any });
    return { success: true, data: updated, message: 'Cập nhật thành công' };
  }

  async delete(id: number) {
    await this.repository.delete({ MaTiemChung: id } as any);
    return { success: true, message: 'Xóa thành công' };
  }
}
