import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { VanBan } from './van-ban.entity';

@Injectable()
export class VanBanService {
  constructor(
    @InjectRepository(VanBan)
    private vanBanRepository: Repository<VanBan>,
  ) {}

  async findAll(params?: { page?: number; limit?: number; search?: string }): Promise<{ data: VanBan[]; total: number }> {
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const skip = (page - 1) * limit;

    const where = params?.search
      ? [
          { TrichYeu: Like(`%${params.search}%`) },
          { SoKyHieu: Like(`%${params.search}%`) },
        ]
      : {};

    const [data, total] = await this.vanBanRepository.findAndCount({
      where,
      take: limit,
      skip: skip,
      order: { NgayBanHanh: 'DESC' },
    });

    return { data, total };
  }

  async findOne(id: number): Promise<VanBan> {
    return this.vanBanRepository.findOne({ where: { MaVanBan: id } });
  }

  async create(data: Partial<VanBan>): Promise<VanBan> {
    const vanBan = this.vanBanRepository.create(data);
    return this.vanBanRepository.save(vanBan);
  }

  async update(id: number, data: Partial<VanBan>): Promise<VanBan> {
    await this.vanBanRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.vanBanRepository.delete(id);
  }

  async getStats(): Promise<any> {
    const total = await this.vanBanRepository.count();
    const moi = await this.vanBanRepository.count({ where: { TrangThai: 'Mới' } });
    const dangXuLy = await this.vanBanRepository.count({ where: { TrangThai: 'Đang xử lý' } });
    const daXuLy = await this.vanBanRepository.count({ where: { TrangThai: 'Đã xử lý' } });

    return { total, moi, dangXuLy, daXuLy };
  }
}
