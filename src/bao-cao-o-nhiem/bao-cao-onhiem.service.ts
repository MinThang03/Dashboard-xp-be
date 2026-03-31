import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaoCaoONhiem } from './bao-cao-onhiem.entity';
import { User } from '../users/user.entity';

@Injectable()
export class BaoCaoONhiemService {
  constructor(
    @InjectRepository(BaoCaoONhiem)
    private repository: Repository<BaoCaoONhiem>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  private async ensureNguoiDungExists(id: number) {
    return this.usersRepository.findOne({ where: { id } as any });
  }

  async findAll(page: number = 1, limit: number = 10) {
    const [items, total] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { MaBaoCao: 'DESC' },
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
    const item = await this.repository.findOne({ where: { MaBaoCao: id } as any });
    if (!item) {
      return { success: false, message: 'Không tìm thấy bản ghi' };
    }
    return { success: true, data: item };
  }

  async getStats() {
    const total = await this.repository.count();
    const choXuLy = await this.repository.count({ where: { TrangThai: 'Chờ xử lý' } as any });
    const daXuLy = await this.repository.count({ where: { TrangThai: 'Đã xử lý' } as any });
    
    return {
      success: true,
      data: { total, choXuLy, daXuLy },
    };
  }

  async create(data: Partial<BaoCaoONhiem>) {
    if (data.NguoiBaoCao !== undefined) {
      const raw = data.NguoiBaoCao;
      if (raw === null || String(raw).trim() === '') {
        data = { ...data, NguoiBaoCao: null };
      } else {
        const nguoiBaoCao = Number(raw);
        if (!Number.isFinite(nguoiBaoCao)) {
          return { success: false, message: 'NguoiBaoCao không hợp lệ' };
        }
        const nguoiDung = await this.ensureNguoiDungExists(nguoiBaoCao);
        if (!nguoiDung) {
          return { success: false, message: `Không tìm thấy người dùng MaNguoiDung=${nguoiBaoCao}` };
        }
        data = { ...data, NguoiBaoCao: nguoiBaoCao };
      }
    }

    const item = this.repository.create(data);
    await this.repository.save(item);
    return { success: true, data: item, message: 'Tạo mới thành công' };
  }

  async update(id: number, data: Partial<BaoCaoONhiem>) {
    if (data.NguoiBaoCao !== undefined) {
      const raw = data.NguoiBaoCao;
      if (raw === null || String(raw).trim() === '') {
        data = { ...data, NguoiBaoCao: null };
      } else {
        const nguoiBaoCao = Number(raw);
        if (!Number.isFinite(nguoiBaoCao)) {
          return { success: false, message: 'NguoiBaoCao không hợp lệ' };
        }
        const nguoiDung = await this.ensureNguoiDungExists(nguoiBaoCao);
        if (!nguoiDung) {
          return { success: false, message: `Không tìm thấy người dùng MaNguoiDung=${nguoiBaoCao}` };
        }
        data = { ...data, NguoiBaoCao: nguoiBaoCao };
      }
    }
    await this.repository.update({ MaBaoCao: id } as any, data);
    const updated = await this.repository.findOne({ where: { MaBaoCao: id } as any });
    return { success: true, data: updated, message: 'Cập nhật thành công' };
  }

  async delete(id: number) {
    await this.repository.delete({ MaBaoCao: id } as any);
    return { success: true, message: 'Xóa thành công' };
  }
}
