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
    return this.hoKhauRepository.save(hoKhau);
  }

  async update(id: string, data: Partial<HoKhau>) {
    await this.hoKhauRepository.update(id, data);
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
    return this.thanhVienRepository.save(thanhVien);
  }

  async deleteThanhVien(id: number) {
    await this.thanhVienRepository.delete(id);
    return { deleted: true };
  }
}
