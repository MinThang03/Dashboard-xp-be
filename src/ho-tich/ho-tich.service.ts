import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HoTich } from './ho-tich.entity';

@Injectable()
export class HoTichService {
  constructor(
    @InjectRepository(HoTich)
    private hoTichRepository: Repository<HoTich>,
  ) {}

  async findAll(params?: { page?: number; limit?: number }): Promise<{ data: HoTich[]; total: number }> {
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const skip = (page - 1) * limit;

    const [data, total] = await this.hoTichRepository.findAndCount({
      take: limit,
      skip: skip,
      order: { ngay_lap_ho_tich: 'DESC' },
    });

    return { data, total };
  }

  async findOne(id: number): Promise<HoTich> {
    return this.hoTichRepository.findOne({ where: { id } });
  }

  private sanitizePayload(data: Partial<HoTich>): Partial<HoTich> {
    return {
      so_ho_tich: data.so_ho_tich,
      ten_chu_ho: data.ten_chu_ho,
      ngay_sinh_chu_ho: data.ngay_sinh_chu_ho,
      gioi_tinh_chu_ho: data.gioi_tinh_chu_ho,
      dia_chi_ho_tich: data.dia_chi_ho_tich,
      so_thanh_vien_ho_tich: data.so_thanh_vien_ho_tich,
      ngay_lap_ho_tich: data.ngay_lap_ho_tich,
      ghi_chu: data.ghi_chu,
      trang_thai: data.trang_thai,
    };
  }

  async create(data: Partial<HoTich>): Promise<HoTich> {
    const hoTich = this.hoTichRepository.create(this.sanitizePayload(data));
    return this.hoTichRepository.save(hoTich);
  }

  async update(id: number, data: Partial<HoTich>): Promise<HoTich> {
    await this.hoTichRepository.update(id, this.sanitizePayload(data));
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.hoTichRepository.delete(id);
  }

  async getStats(): Promise<any> {
    const total = await this.hoTichRepository.count();
    const hoatDong = await this.hoTichRepository.count({ where: { trang_thai: true } });
    const khongHoatDong = await this.hoTichRepository.count({ where: { trang_thai: false } });
    const tongThanhVien = await this.hoTichRepository
      .createQueryBuilder('ht')
      .select('SUM(ht.so_thanh_vien_ho_tich)', 'sum')
      .getRawOne()
      .then(result => parseInt(result.sum) || 0);

    return { total, hoatDong, khongHoatDong, tongThanhVien };
  }
}
