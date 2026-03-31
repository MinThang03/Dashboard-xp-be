import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NhanVienYTe } from './nhan-vien-y-te.entity';
import { TramYTe } from '../tram-y-te/tram-yte.entity';

@Injectable()
export class NhanVienYTeService {
  constructor(
    @InjectRepository(NhanVienYTe)
    private repository: Repository<NhanVienYTe>,
    @InjectRepository(TramYTe)
    private tramRepository: Repository<TramYTe>,
  ) {}

  async findAll(page: number = 1, limit: number = 10, maTram?: number) {
    const hasMaTramFilter = Number.isFinite(maTram);
    const [items, total] = await this.repository.findAndCount({
      where: hasMaTramFilter ? ({ MaTram: Number(maTram) } as any) : undefined,
      skip: (page - 1) * limit,
      take: limit,
      order: { MaNhanVien: 'DESC' },
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
    const item = await this.repository.findOne({ where: { MaNhanVien: id } as any });
    if (!item) {
      return { success: false, message: 'Không tìm thấy bản ghi' };
    }
    return { success: true, data: item };
  }

  async getStats() {
    const total = await this.repository.count();
    const dangLamViec = await this.repository.count({ where: { TrangThaiLamViec: 'Đang làm việc' } as any });

    const tramResult = await this.repository
      .createQueryBuilder('nv')
      .select('COUNT(DISTINCT nv.MaTram)', 'soTramCoNhanVien')
      .where('nv.MaTram IS NOT NULL')
      .getRawOne();

    return {
      success: true,
      data: {
        total,
        dangLamViec,
        soTramCoNhanVien: parseInt(tramResult?.soTramCoNhanVien || '0', 10),
      },
    };
  }

  async create(data: Partial<NhanVienYTe>) {
    const payload = this.normalizePayload(data);
    const item = this.repository.create(payload);
    await this.repository.save(item);
    await this.syncTramStaffCount(item.MaTram);
    return { success: true, data: item, message: 'Tạo mới thành công' };
  }

  async update(id: number, data: Partial<NhanVienYTe>) {
    const existing = await this.repository.findOne({ where: { MaNhanVien: id } as any });
    if (!existing) {
      return { success: false, message: 'Không tìm thấy bản ghi' };
    }

    const payload = this.normalizePayload(data);
    await this.repository.update({ MaNhanVien: id } as any, payload);
    const updated = await this.repository.findOne({ where: { MaNhanVien: id } as any });

    await this.syncTramStaffCount(existing.MaTram);
    await this.syncTramStaffCount(updated?.MaTram);

    return { success: true, data: updated, message: 'Cập nhật thành công' };
  }

  async delete(id: number) {
    const existing = await this.repository.findOne({ where: { MaNhanVien: id } as any });
    await this.repository.delete({ MaNhanVien: id } as any);
    await this.syncTramStaffCount(existing?.MaTram);
    return { success: true, message: 'Xóa thành công' };
  }

  private normalizePayload(data: Partial<NhanVienYTe>): Partial<NhanVienYTe> {
    const payload: Partial<NhanVienYTe> = { ...data };

    if (payload.HoTen !== undefined) {
      payload.HoTen = String(payload.HoTen || '').trim();
    }

    if (payload.MaTram !== undefined && payload.MaTram !== null) {
      const maTram = Number(payload.MaTram);
      payload.MaTram = Number.isFinite(maTram) ? maTram : null;
    }

    if (payload.GioiTinh !== undefined) {
      payload.GioiTinh = payload.GioiTinh ? String(payload.GioiTinh) : null;
    }

    if (payload.ChucDanh !== undefined) {
      payload.ChucDanh = payload.ChucDanh ? String(payload.ChucDanh) : null;
    }

    if (payload.ChuyenMon !== undefined) {
      payload.ChuyenMon = payload.ChuyenMon ? String(payload.ChuyenMon) : null;
    }

    if (payload.SoDienThoai !== undefined) {
      payload.SoDienThoai = payload.SoDienThoai ? String(payload.SoDienThoai) : null;
    }

    if (payload.TrangThaiLamViec !== undefined) {
      payload.TrangThaiLamViec = payload.TrangThaiLamViec ? String(payload.TrangThaiLamViec) : 'Đang làm việc';
    }

    if (payload.GhiChu !== undefined) {
      payload.GhiChu = payload.GhiChu ? String(payload.GhiChu) : null;
    }

    return payload;
  }

  private async syncTramStaffCount(maTram?: number | null) {
    const tramId = Number(maTram);
    if (!Number.isFinite(tramId) || tramId <= 0) {
      return;
    }

    const soNhanVien = await this.repository.count({ where: { MaTram: tramId } as any });
    await this.tramRepository.update({ MaTram: tramId } as any, { SoNhanVien: soNhanVien } as any);
  }
}
