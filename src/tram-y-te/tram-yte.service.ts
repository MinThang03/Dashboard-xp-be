import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TramYTe } from './tram-yte.entity';
import { NhanVienYTe } from '../nhan-vien-y-te/nhan-vien-y-te.entity';

@Injectable()
export class TramYTeService {
  constructor(
    @InjectRepository(TramYTe)
    private repository: Repository<TramYTe>,
    @InjectRepository(NhanVienYTe)
    private nhanVienRepository: Repository<NhanVienYTe>,
  ) {}

  async findAll(page: number = 1, limit: number = 10) {
    const [items, total] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { MaTram: 'DESC' },
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
    const item = await this.repository.findOne({ where: { MaTram: id } as any });
    if (!item) {
      return { success: false, message: 'Không tìm thấy bản ghi' };
    }
    return { success: true, data: item };
  }

  async getStats() {
    const total = await this.repository.count();
    const hoatDong = await this.repository.count({ where: { TrangThai: true } as any });
    
    // Calculate sum of SoNhanVien and SoLuotKhamThang
    const result = await this.repository
      .createQueryBuilder('tram')
      .select('SUM(tram.SoNhanVien)', 'totalNhanVien')
      .addSelect('SUM(tram.SoLuotKhamThang)', 'totalLuotKham')
      .getRawOne();
    
    return {
      success: true,
      data: { 
        total, 
        hoatDong,
        totalNhanVien: parseInt(result?.totalNhanVien || '0'),
        totalLuotKham: parseInt(result?.totalLuotKham || '0')
      },
    };
  }

  async create(data: Partial<TramYTe>) {
    const item = this.repository.create(data);
    await this.repository.save(item);
    return { success: true, data: item, message: 'Tạo mới thành công' };
  }

  async update(id: number, data: Partial<TramYTe>) {
    await this.repository.update({ MaTram: id } as any, data);
    const updated = await this.repository.findOne({ where: { MaTram: id } as any });
    return { success: true, data: updated, message: 'Cập nhật thành công' };
  }

  async delete(id: number) {
    await this.nhanVienRepository.delete({ MaTram: id } as any);
    await this.repository.delete({ MaTram: id } as any);
    return { success: true, message: 'Xóa thành công' };
  }
}
