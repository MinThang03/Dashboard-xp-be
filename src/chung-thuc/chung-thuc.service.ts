import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChungThuc } from './chung-thuc.entity';

@Injectable()
export class ChungThucService {
  constructor(
    @InjectRepository(ChungThuc)
    private chungThucRepository: Repository<ChungThuc>,
  ) {}

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await this.chungThucRepository.findAndCount({
      skip,
      take: limit,
      order: { NgayYeuCau: 'DESC' },
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
    return this.chungThucRepository.findOne({
      where: { MaChungThuc: id },
    });
  }

  async create(data: Partial<ChungThuc>) {
    const chungThuc = this.chungThucRepository.create(data);
    return this.chungThucRepository.save(chungThuc);
  }

  async update(id: number, data: Partial<ChungThuc>) {
    await this.chungThucRepository.update(id, data);
    return this.findOne(id);
  }

  async delete(id: number) {
    await this.chungThucRepository.delete(id);
    return { deleted: true };
  }

  async getStats() {
    const total = await this.chungThucRepository.count();
    
    const dangXuLy = await this.chungThucRepository.count({
      where: { TrangThai: 'Đang xử lý' },
    });

    const hoanThanh = await this.chungThucRepository.count({
      where: { TrangThai: 'Hoàn thành' },
    });

    const result = await this.chungThucRepository
      .createQueryBuilder('ct')
      .select('SUM(CAST(ct.PhiDichVu AS DECIMAL))', 'tongPhiDichVu')
      .getRawOne();

    return {
      total,
      dangXuLy,
      hoanThanh,
      tongPhiDichVu: parseFloat(result?.tongPhiDichVu || 0),
    };
  }
}
