import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PhieuKham } from './phieu-kham.entity';

@Injectable()
export class PhieuKhamService {
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

  private sanitizePayload(data: Partial<PhieuKham>): Partial<PhieuKham> {
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

    const aliasChanDoan = (data as any).ChuanDoan;
    const chanDoanValue = data.ChanDoan !== undefined ? data.ChanDoan : aliasChanDoan;

    return {
      MaCongDan: data.MaCongDan,
      HoTenBenhNhan: normalize(data.HoTenBenhNhan, 150, 'Họ tên bệnh nhân'),
      NgayKham: normalizeDate<Date>(data.NgayKham),
      TrieuChung: data.TrieuChung,
      ChanDoan: chanDoanValue,
      DonThuoc: data.DonThuoc,
      ChiPhi: data.ChiPhi,
      MaTram: data.MaTram,
      BacSiXuLy: data.BacSiXuLy,
      TrangThai: normalize(data.TrangThai, 50, 'Trạng thái'),
      GhiChu: data.GhiChu,
      MaPhieu: normalize(data.MaPhieu, 50, 'Mã phiếu'),
      TenBenhNhan: normalize(data.TenBenhNhan, 150, 'Tên bệnh nhân'),
      NgaySinh: normalizeDate<Date>(data.NgaySinh),
      GioiTinh: normalize(data.GioiTinh, 10, 'Giới tính'),
      CCCD: normalize(data.CCCD, 20, 'CCCD'),
      SoDienThoai: normalize(data.SoDienThoai, 20, 'Số điện thoại'),
      DiaChi: normalize(data.DiaChi, 255, 'Địa chỉ'),
      MaBHYT: normalize(data.MaBHYT, 30, 'Mã BHYT'),
      NhietDo: data.NhietDo,
      HuyetAp: normalize(data.HuyetAp, 20, 'Huyết áp'),
      NhipTim: data.NhipTim,
      CanNang: data.CanNang,
      ChieuCao: data.ChieuCao,
      PhuongPhapDieuTri: data.PhuongPhapDieuTri,
      BacSiKham: normalize(data.BacSiKham, 150, 'Bác sĩ khám'),
      MaTrangThai: normalize(data.MaTrangThai, 30, 'Mã trạng thái'),
      NgayTaiKham: normalizeDate<Date>(data.NgayTaiKham),
      PhiKham: data.PhiKham,
      BHYTChiTra: data.BHYTChiTra,
    };
  }

  constructor(
    @InjectRepository(PhieuKham)
    private repository: Repository<PhieuKham>,
  ) {}

  async findAll(page: number = 1, limit: number = 100) {
    const [items, total] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { MaPhieuKham: 'DESC' },
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
    const item = await this.repository.findOne({ where: { MaPhieuKham: id } as any });
    if (!item) {
      return { success: false, message: 'Không tìm thấy bản ghi' };
    }
    return { success: true, data: item };
  }

  async getStats() {
    const total = await this.repository.count();
    const waiting = await this.repository.count({ where: { MaTrangThai: 'CHO_KHAM' } as any });
    const processing = await this.repository.count({ where: { MaTrangThai: 'DANG_XU_LY' } as any });
    const completed = await this.repository.count({ where: { MaTrangThai: 'HOAN_THANH' } as any });
    const transferred = await this.repository.count({ where: { MaTrangThai: 'CHUYEN_VIEN' } as any });

    return {
      success: true,
      data: { total, waiting, processing, completed, transferred },
    };
  }

  async create(data: Partial<PhieuKham>) {
    const sanitized = this.sanitizePayload(data);
    const item = this.repository.create(sanitized);
    await this.repository.save(item);
    return { success: true, data: item, message: 'Tạo mới thành công' };
  }

  async update(id: number, data: Partial<PhieuKham>) {
    const sanitized = this.sanitizePayload(data);
    await this.repository.update({ MaPhieuKham: id } as any, sanitized);
    const updated = await this.repository.findOne({ where: { MaPhieuKham: id } as any });
    return { success: true, data: updated, message: 'Cập nhật thành công' };
  }

  async delete(id: number) {
    await this.repository.delete({ MaPhieuKham: id } as any);
    return { success: true, message: 'Xóa thành công' };
  }
}
