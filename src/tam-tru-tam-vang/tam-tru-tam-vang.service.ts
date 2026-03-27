import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TamTruTamVang } from './tam-tru-tam-vang.entity';

@Injectable()
export class TamTruTamVangService {
  constructor(
    @InjectRepository(TamTruTamVang)
    private tamTruTamVangRepository: Repository<TamTruTamVang>,
  ) {}

  private normalizeDateValue(value: unknown): Date | null | undefined {
    if (value === undefined) {
      return undefined;
    }

    if (value === null || value === '') {
      return null;
    }

    if (value instanceof Date) {
      return value;
    }

    if (typeof value === 'string') {
      const trimmed = value.trim();
      if (!trimmed) {
        return null;
      }
      return new Date(trimmed);
    }

    return value as Date;
  }

  private normalizePayload(data: Partial<TamTruTamVang>): Partial<TamTruTamVang> {
    const input = data as any;
    const normalizedNgaySinh = this.normalizeDateValue(input.NgaySinh ?? data.NgaySinh);
    const normalizedNgayDangKy = this.normalizeDateValue(input.NgayDangKy ?? data.NgayDangKy);
    const normalizedNgayHetHan = this.normalizeDateValue(input.NgayHetHan ?? data.NgayHetHan);
    const normalizedTuNgay = this.normalizeDateValue(data.TuNgay ?? input.NgayDangKy);
    const normalizedDenNgay = this.normalizeDateValue(data.DenNgay ?? input.NgayHetHan);
    const normalizedNgayKhaiBao = this.normalizeDateValue(data.NgayKhaiBao ?? input.NgayDangKy);

    return {
      ...data,
      HoTenNguoiKhaiBao: data.HoTenNguoiKhaiBao ?? input.HoTen,
      HoTen: input.HoTen ?? data.HoTenNguoiKhaiBao,
      NgaySinh: normalizedNgaySinh,
      TuNgay: normalizedTuNgay,
      DenNgay: normalizedDenNgay,
      TinhTrangHoSo: data.TinhTrangHoSo ?? input.TrangThai,
      NgayKhaiBao: normalizedNgayKhaiBao,
      NgayDangKy: normalizedNgayDangKy,
      NgayHetHan: normalizedNgayHetHan,
      TrangThai: input.TrangThai ?? data.TinhTrangHoSo,
    };
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await this.tamTruTamVangRepository.findAndCount({
      skip,
      take: limit,
      order: { NgayKhaiBao: 'DESC' },
    });

    return {
      data,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    return this.tamTruTamVangRepository.findOne({
      where: { MaHoSo: id },
    });
  }

  async create(data: Partial<TamTruTamVang>) {
    const hoSo = this.tamTruTamVangRepository.create(this.normalizePayload(data));
    return this.tamTruTamVangRepository.save(hoSo);
  }

  async update(id: number, data: Partial<TamTruTamVang>) {
    await this.tamTruTamVangRepository.update(id, this.normalizePayload(data));
    return this.findOne(id);
  }

  async delete(id: number) {
    await this.tamTruTamVangRepository.delete(id);
    return { deleted: true };
  }

  async getStats() {
    const total = await this.tamTruTamVangRepository.count();
    
    const choDuyet = await this.tamTruTamVangRepository.count({
      where: { TinhTrangHoSo: 'Chờ duyệt' },
    });

    const daDuyet = await this.tamTruTamVangRepository.count({
      where: { TinhTrangHoSo: 'Đã duyệt' },
    });

    const tamTru = await this.tamTruTamVangRepository.count({
      where: { LoaiDangKy: 'Tạm trú' },
    });

    const tamVang = await this.tamTruTamVangRepository.count({
      where: { LoaiDangKy: 'Tạm vắng' },
    });

    return {
      total,
      choDuyet,
      daDuyet,
      tamTru,
      tamVang,
    };
  }
}
