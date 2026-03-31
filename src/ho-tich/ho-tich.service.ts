import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HoTich } from './ho-tich.entity';

@Injectable()
export class HoTichService {
  constructor(
    @InjectRepository(HoTich)
    private hoTichRepository: Repository<HoTich>,
  ) {}

  private normalizeText(value: unknown, maxLength: number): string | null {
    if (value === null || value === undefined) {
      return null;
    }

    const normalized = String(value).trim();
    if (!normalized) {
      return null;
    }

    if (normalized.length > maxLength) {
      return normalized.slice(0, maxLength);
    }

    return normalized;
  }

  private parseDate(value: unknown): Date | null {
    if (!value) {
      return null;
    }
    const parsed = new Date(String(value));
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  private mapToClientModel(entity: HoTich) {
    return {
      ...entity,
      ho_ten_ca_nhan: entity.ho_ten_ca_nhan || entity.ten_chu_ho,
      ngay_sinh: entity.ngay_sinh || entity.ngay_sinh_chu_ho,
      gioi_tinh: entity.gioi_tinh || entity.gioi_tinh_chu_ho,
      dia_chi_thuong_tru: entity.dia_chi_thuong_tru || entity.dia_chi_ho_tich,
      ngay_dang_ky: entity.ngay_dang_ky || entity.ngay_lap_ho_tich,
    };
  }

  async findAll(params?: { page?: number; limit?: number }): Promise<{ data: any[]; total: number }> {
    const page = Number.isFinite(params?.page as number) && (params?.page as number) > 0 ? Number(params?.page) : 1;
    const limit = Number.isFinite(params?.limit as number) && (params?.limit as number) > 0 ? Number(params?.limit) : 10;
    const skip = (page - 1) * limit;

    const [data, total] = await this.hoTichRepository.findAndCount({
      take: limit,
      skip: skip,
      order: { ngay_lap_ho_tich: 'DESC' },
    });

    return { data: data.map((item) => this.mapToClientModel(item)), total };
  }

  async findOne(id: number): Promise<any> {
    if (!Number.isFinite(id) || id <= 0) {
      throw new BadRequestException('Mã hộ tịch không hợp lệ');
    }

    const found = await this.hoTichRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException('Không tìm thấy hồ sơ hộ tịch');
    }

    return this.mapToClientModel(found);
  }

  private sanitizePayload(data: Partial<HoTich>): Partial<HoTich> {
    const hoTen = this.normalizeText((data as any).ho_ten_ca_nhan ?? data.ten_chu_ho, 150);
    const gioiTinh = this.normalizeText((data as any).gioi_tinh ?? data.gioi_tinh_chu_ho, 10);
    const diaChi = this.normalizeText((data as any).dia_chi_thuong_tru ?? data.dia_chi_ho_tich, 255);
    const soHoTich = this.normalizeText(data.so_ho_tich, 30);

    if (!soHoTich) {
      throw new BadRequestException('Số hộ tịch là bắt buộc');
    }

    if (!hoTen) {
      throw new BadRequestException('Họ tên cá nhân là bắt buộc');
    }

    if (!diaChi) {
      throw new BadRequestException('Địa chỉ thường trú là bắt buộc');
    }

    return {
      so_ho_tich: soHoTich,
      ho_ten_ca_nhan: hoTen,
      ngay_sinh: this.parseDate((data as any).ngay_sinh ?? data.ngay_sinh_chu_ho),
      gioi_tinh: gioiTinh,
      so_cccd: this.normalizeText((data as any).so_cccd, 20),
      dia_chi_thuong_tru: diaChi,
      loai_su_kien_ho_tich: this.normalizeText((data as any).loai_su_kien_ho_tich, 80),
      ngay_dang_ky: this.parseDate((data as any).ngay_dang_ky ?? data.ngay_lap_ho_tich),
      noi_dang_ky: this.normalizeText((data as any).noi_dang_ky, 255),
      ghi_chu: this.normalizeText(data.ghi_chu, 5000),
      trang_thai: (data as any).trang_thai === false || (data as any).trang_thai === 0 ? false : true,

      // Legacy columns kept in sync for compatibility with existing schema/data.
      ten_chu_ho: hoTen,
      ngay_sinh_chu_ho: this.parseDate((data as any).ngay_sinh ?? data.ngay_sinh_chu_ho),
      gioi_tinh_chu_ho: gioiTinh,
      dia_chi_ho_tich: diaChi,
      so_thanh_vien_ho_tich: 1,
      ngay_lap_ho_tich: this.parseDate((data as any).ngay_dang_ky ?? data.ngay_lap_ho_tich),
    };
  }

  async create(data: Partial<HoTich>): Promise<any> {
    const hoTich = this.hoTichRepository.create(this.sanitizePayload(data));
    const saved = await this.hoTichRepository.save(hoTich);
    return this.findOne(saved.id);
  }

  async update(id: number, data: Partial<HoTich>): Promise<any> {
    await this.findOne(id);
    const sanitized = this.sanitizePayload(data);
    await this.hoTichRepository.update(id, sanitized);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    if (!Number.isFinite(id) || id <= 0) {
      throw new BadRequestException('Mã hộ tịch không hợp lệ');
    }

    // Legacy clean-up to avoid delete failures on old DBs without ON DELETE CASCADE.
    await this.hoTichRepository.query(
      'DELETE FROM "dashboard_xp"."ThanhVienHoTich" WHERE "id_ho_tich" = $1',
      [id],
    ).catch(() => undefined);

    await this.hoTichRepository.delete(id);
  }

  async getStats(): Promise<any> {
    const total = await this.hoTichRepository.count();
    const hoatDong = await this.hoTichRepository.count({ where: { trang_thai: true } });
    const khongHoatDong = await this.hoTichRepository.count({ where: { trang_thai: false } });

    const khaisinh = await this.hoTichRepository.count({
      where: { loai_su_kien_ho_tich: 'Khai sinh' } as any,
    });
    const ketHon = await this.hoTichRepository.count({
      where: { loai_su_kien_ho_tich: 'Kết hôn' } as any,
    });
    const khaiTu = await this.hoTichRepository.count({
      where: { loai_su_kien_ho_tich: 'Khai tử' } as any,
    });

    return { total, hoatDong, khongHoatDong, khaisinh, ketHon, khaiTu };
  }
}
