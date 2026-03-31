import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HoKhau } from './ho-khau.entity';
import { ThanhVienHoKhau } from './thanh-vien-ho-khau.entity';

@Injectable()
export class HoKhauService {
  constructor(
    @InjectRepository(HoKhau)
    private hoKhauRepository: Repository<HoKhau>,
    @InjectRepository(ThanhVienHoKhau)
    private thanhVienRepository: Repository<ThanhVienHoKhau>,
  ) {}

  private normalizeText(value: unknown, maxLength: number): string | null {
    if (value === null || value === undefined) {
      return null;
    }
    const normalized = String(value).trim();
    if (!normalized) {
      return null;
    }
    return normalized.length > maxLength ? normalized.slice(0, maxLength) : normalized;
  }

  private async syncMemberCount(maHoKhau: string) {
    const soThanhVien = await this.thanhVienRepository.count({ where: { MaHoKhau: maHoKhau } });
    await this.hoKhauRepository.update({ MaHoKhau: maHoKhau } as any, { SoThanhVien: soThanhVien } as any);
  }

  private async upsertChuHoAsMember(maHoKhau: string) {
    const hoKhau = await this.hoKhauRepository.findOne({ where: { MaHoKhau: maHoKhau } });
    if (!hoKhau) {
      return;
    }

    const chuHoName = this.normalizeText(hoKhau.ChuHo, 150);
    if (!chuHoName) {
      return;
    }

    const existingChuHo = await this.thanhVienRepository.findOne({
      where: { MaHoKhau: maHoKhau, QuanHeChuHo: 'Chủ hộ' } as any,
      order: { MaThanhVien: 'ASC' },
    });

    const payload = {
      MaHoKhau: maHoKhau,
      HoTen: chuHoName,
      NgaySinh: hoKhau.NgaySinhChuHo || null,
      GioiTinh: this.normalizeText(hoKhau.GioiTinhChuHo, 10),
      CCCD: this.normalizeText(hoKhau.CCCDChuHo, 20),
      QuanHeChuHo: 'Chủ hộ',
      SoDienThoai: this.normalizeText(hoKhau.SoDienThoaiChuHo, 20),
    };

    if (existingChuHo) {
      await this.thanhVienRepository.update({ MaThanhVien: existingChuHo.MaThanhVien } as any, payload as any);
      return;
    }

    const created = this.thanhVienRepository.create(payload as any);
    await this.thanhVienRepository.save(created);
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await this.hoKhauRepository.findAndCount({
      skip,
      take: limit,
      order: { NgayDangKy: 'DESC' },
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

  async findOne(id: string) {
    const hoKhau = await this.hoKhauRepository.findOne({
      where: { MaHoKhau: id },
    });

    if (hoKhau) {
      const thanhVien = await this.thanhVienRepository.find({
        where: { MaHoKhau: id },
      });
      return { ...hoKhau, thanhVien };
    }

    return hoKhau;
  }

  async create(data: Partial<HoKhau>) {
    const hoKhau = this.hoKhauRepository.create(data);
    const saved = await this.hoKhauRepository.save(hoKhau);
    await this.upsertChuHoAsMember(saved.MaHoKhau);
    await this.syncMemberCount(saved.MaHoKhau);
    return this.findOne(saved.MaHoKhau);
  }

  async update(id: string, data: Partial<HoKhau>) {
    await this.hoKhauRepository.update(id, data);
    await this.upsertChuHoAsMember(id);
    await this.syncMemberCount(id);
    return this.findOne(id);
  }

  async delete(id: string) {
    await this.thanhVienRepository.delete({ MaHoKhau: id });
    await this.hoKhauRepository.delete(id);
    return { deleted: true };
  }

  async getStats() {
    const total = await this.hoKhauRepository.count();
    
    const hoatDong = await this.hoKhauRepository.count({
      where: { TrangThai: 'Hoạt động' },
    });

    const thuongTru = await this.hoKhauRepository.count({
      where: { LoaiHoKhau: 'Thường trú' },
    });

    const result = await this.hoKhauRepository
      .createQueryBuilder('hk')
      .select('SUM(hk.SoThanhVien)', 'tongThanhVien')
      .getRawOne();

    return {
      total,
      hoatDong,
      thuongTru,
      tongThanhVien: parseInt(result?.tongThanhVien || 0),
    };
  }

  // Methods for ThanhVienHoKhau
  async findThanhVien(maHoKhau: string) {
    return this.thanhVienRepository.find({
      where: { MaHoKhau: maHoKhau },
    });
  }

  async createThanhVien(data: Partial<ThanhVienHoKhau>) {
    const thanhVien = this.thanhVienRepository.create(data);
    const saved = await this.thanhVienRepository.save(thanhVien);
    await this.syncMemberCount(saved.MaHoKhau);
    return saved;
  }

  async updateThanhVien(id: number, data: Partial<ThanhVienHoKhau>) {
    const existing = await this.thanhVienRepository.findOne({ where: { MaThanhVien: id } as any });
    if (!existing) {
      return null;
    }

    await this.thanhVienRepository.update({ MaThanhVien: id } as any, data as any);
    const updated = await this.thanhVienRepository.findOne({ where: { MaThanhVien: id } as any });
    if (existing.MaHoKhau) {
      await this.syncMemberCount(existing.MaHoKhau);
    }
    if (updated?.MaHoKhau && updated.MaHoKhau !== existing.MaHoKhau) {
      await this.syncMemberCount(updated.MaHoKhau);
    }
    return updated;
  }

  async deleteThanhVien(id: number) {
    const existing = await this.thanhVienRepository.findOne({ where: { MaThanhVien: id } as any });
    await this.thanhVienRepository.delete(id);
    if (existing?.MaHoKhau) {
      await this.syncMemberCount(existing.MaHoKhau);
    }
    return { deleted: true };
  }
}
