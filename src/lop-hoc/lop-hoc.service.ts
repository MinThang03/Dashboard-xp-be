import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LopHoc } from './lop-hoc.entity';

@Injectable()
export class LopHocService {
  private normalizeString(value: unknown, maxLength: number): string | null | undefined {
    if (value === undefined) {
      return undefined;
    }

    if (value === null) {
      return null;
    }

    const normalized = String(value).trim();
    if (!normalized) {
      return null;
    }

    return normalized.length > maxLength ? null : normalized;
  }

  private sanitizePayload(data: Partial<LopHoc>): Partial<LopHoc> {
    const normalize = (value: unknown, maxLength: number, label: string): string | null => {
      const normalized = this.normalizeString(value, maxLength);
      if (value !== null && value !== undefined && !normalized) {
        throw new BadRequestException(`${label} không được để trống hoặc vượt quá ${maxLength} ký tự`);
      }
      return normalized;
    };

    const normalizeDate = <T>(value: unknown): T | null | undefined => {
      if (value === '') {
        return null;
      }
      return value as T | null | undefined;
    };

    return {
      ...data,
      TenLop: normalize(data.TenLop, 50, 'Tên lớp'),
      Khoi: normalize(data.Khoi, 20, 'Khối'),
      GiaoVienChuNhiem: normalize(data.GiaoVienChuNhiem, 150, 'Giáo viên chủ nhiệm'),
      MaLopCode: normalize(data.MaLopCode, 50, 'Mã lớp'),
      MaTruong: normalize(data.MaTruong, 50, 'Mã trường'),
      TenTruong: normalize(data.TenTruong, 200, 'Tên trường'),
      LoaiTruong: normalize(data.LoaiTruong, 50, 'Loại trường'),
      NamHoc: normalize(data.NamHoc, 20, 'Năm học'),
      NgayCapNhat: normalizeDate<Date>(data.NgayCapNhat),
    };
  }

  constructor(
    @InjectRepository(LopHoc)
    private repository: Repository<LopHoc>,
  ) {}

  async findAll(page: number = 1, limit: number = 200) {
    const [items, total] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { MaLop: 'DESC' },
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
    const item = await this.repository.findOne({ where: { MaLop: id } as any });
    if (!item) {
      return { success: false, message: 'Không tìm thấy bản ghi' };
    }
    return { success: true, data: item };
  }

  async getStats() {
    const totalClasses = await this.repository.count();
    const totals = await this.repository
      .createQueryBuilder('lop')
      .select('SUM(COALESCE(lop.SiSoHienTai, lop.SoHocSinh, 0))', 'totalStudents')
      .addSelect('SUM(COALESCE(lop.CoMatHomNay, 0))', 'present')
      .addSelect('SUM(COALESCE(lop.VangCoPhep, 0))', 'absentWithPermission')
      .addSelect('SUM(COALESCE(lop.VangKhongPhep, 0))', 'absentWithoutPermission')
      .addSelect('AVG(COALESCE(lop.TyLeDiHoc, 0))', 'avgRate')
      .getRawOne();

    return {
      success: true,
      data: {
        totalClasses,
        totalStudents: parseInt(totals?.totalStudents || '0'),
        present: parseInt(totals?.present || '0'),
        absentWithPermission: parseInt(totals?.absentWithPermission || '0'),
        absentWithoutPermission: parseInt(totals?.absentWithoutPermission || '0'),
        avgRate: parseFloat(totals?.avgRate || '0'),
      },
    };
  }

  async create(data: Partial<LopHoc>) {
    const sanitized = this.sanitizePayload(data);
    const item = this.repository.create(sanitized);
    await this.repository.save(item);
    return { success: true, data: item, message: 'Tạo mới thành công' };
  }

  async update(id: number, data: Partial<LopHoc>) {
    const sanitized = this.sanitizePayload(data);
    await this.repository.update({ MaLop: id } as any, sanitized);
    const updated = await this.repository.findOne({ where: { MaLop: id } as any });
    return { success: true, data: updated, message: 'Cập nhật thành công' };
  }

  async delete(id: number) {
    await this.repository.delete({ MaLop: id } as any);
    return { success: true, message: 'Xóa thành công' };
  }
}
