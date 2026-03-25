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
    const hoSo = this.tamTruTamVangRepository.create(data);
    return this.tamTruTamVangRepository.save(hoSo);
  }

  async update(id: number, data: Partial<TamTruTamVang>) {
    await this.tamTruTamVangRepository.update(id, data);
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
