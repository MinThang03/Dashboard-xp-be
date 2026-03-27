import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PhanAnh } from './phan-anh.entity';

@Injectable()
export class PhanAnhService {
  constructor(
    @InjectRepository(PhanAnh)
    private readonly repository: Repository<PhanAnh>,
  ) {}

  private normalizePayload(payload: Partial<PhanAnh>): Partial<PhanAnh> {
    const statusMap: Record<string, string> = {
      Moi: 'Mới',
      'Mới': 'Mới',
      'Dang xu ly': 'Đang xử lý',
      'Đang xử lý': 'Đang xử lý',
      'Da xu ly': 'Đã xử lý',
      'Đã xử lý': 'Đã xử lý',
      'Da dong': 'Đã đóng',
      'Đã đóng': 'Đã đóng',
      'Tu choi': 'Từ chối',
      'Từ chối': 'Từ chối',
    };

    const priorityMap: Record<string, string> = {
      Thuong: 'Thường',
      'Thường': 'Thường',
      'Khan cap': 'Khẩn cấp',
      'Khẩn cấp': 'Khẩn cấp',
      Cao: 'Cao',
    };

    const allowedStatus = ['Mới', 'Đang xử lý', 'Đã xử lý', 'Đã đóng', 'Từ chối'];
    const allowedPriority = ['Thường', 'Khẩn cấp', 'Cao'];

    const mappedStatus = statusMap[payload.TrangThai || ''] ?? payload.TrangThai;
    const mappedPriority = priorityMap[payload.MucDoUuTien || ''] ?? payload.MucDoUuTien;

    const normalizedStatus = allowedStatus.includes(mappedStatus || '')
      ? mappedStatus
      : 'Mới';
    const normalizedPriority = allowedPriority.includes(mappedPriority || '')
      ? mappedPriority
      : 'Thường';

    return {
      ...payload,
      MaCongDan: payload.MaCongDan ?? null,
      MaLinhVuc: payload.MaLinhVuc ?? null,
      TrangThai: normalizedStatus,
      MucDoUuTien: normalizedPriority,
    };
  }

  async findAll(page: number = 1, limit: number = 20) {
    const [data, total] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { MaPhanAnh: 'DESC' },
    });
    return { success: true, data, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async getStats() {
    const total = await this.repository.count();
    const choXuLy = await this.repository.count({ where: [{ TrangThai: 'Mới' }, { TrangThai: 'Đang xử lý' }] as any });
    const daXuLy = await this.repository.count({ where: { TrangThai: 'Đã xử lý' } as any });
    return { success: true, data: { total, choXuLy, daXuLy } };
  }

  async findOne(id: number) {
    const data = await this.repository.findOne({ where: { MaPhanAnh: id } as any });
    return { success: true, data };
  }

  async create(payload: Partial<PhanAnh>) {
    const data = await this.repository.save(this.repository.create(this.normalizePayload(payload)));
    return { success: true, data, message: 'Tạo mới thành công' };
  }

  async update(id: number, payload: Partial<PhanAnh>) {
    await this.repository.update({ MaPhanAnh: id } as any, this.normalizePayload(payload));
    const data = await this.repository.findOne({ where: { MaPhanAnh: id } as any });
    return { success: true, data, message: 'Cập nhật thành công' };
  }

  async delete(id: number) {
    await this.repository.delete({ MaPhanAnh: id } as any);
    return { success: true, message: 'Xóa thành công' };
  }
}
