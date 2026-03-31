import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HoSoTTHC } from './ho-so-tthc.entity';
import { LoaiThuTuc } from './loai-thu-tuc.entity';
import { User } from '../users/user.entity';

@Injectable()
export class HoSoTTHCService {
  constructor(
    @InjectRepository(HoSoTTHC)
    private hoSoRepository: Repository<HoSoTTHC>,
    @InjectRepository(LoaiThuTuc)
    private loaiThuTucRepository: Repository<LoaiThuTuc>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  private normalizeString(value: unknown, maxLength: number): string | null {
    if (value === null || value === undefined) {
      return null;
    }

    const normalized = String(value).trim();
    if (!normalized) {
      return null;
    }

    return normalized.length > maxLength ? null : normalized;
  }

  private async sanitizePayload(data: Partial<HoSoTTHC>): Promise<Partial<HoSoTTHC>> {
    const allowedTrangThai = new Set([
      'Đã tiếp nhận',
      'Đang xử lý',
      'Chờ bổ sung',
      'Hoàn thành',
      'Từ chối',
    ]);

    const maHoSo = this.normalizeString(data.MaHoSo, 20);
    const soHoSo = this.normalizeString(data.SoHoSo, 50);
    const tenThuTuc = this.normalizeString(data.TenThuTuc, 200);
    const nguoiNop = this.normalizeString(data.NguoiNop, 150);
    const cccd = this.normalizeString(data.CCCD, 20);
    const soDienThoai = this.normalizeString(data.SoDienThoai, 20);
    const email = this.normalizeString(data.Email, 100);
    const diaChiLienHe = this.normalizeString(data.DiaChiLienHe, 255);
    const linhVuc = this.normalizeString(data.LinhVuc, 100);

    if (data.CCCD && !cccd) {
      throw new BadRequestException('CCCD không được vượt quá 20 ký tự');
    }

    if (data.SoDienThoai && !soDienThoai) {
      throw new BadRequestException('Số điện thoại không được vượt quá 20 ký tự');
    }

    if (data.Email && !email) {
      throw new BadRequestException('Email không được vượt quá 100 ký tự');
    }

    const payload: Partial<HoSoTTHC> = {
      MaHoSo: maHoSo || undefined,
      SoHoSo: soHoSo || undefined,
      MaLoaiThuTuc: data.MaLoaiThuTuc,
      TenThuTuc: tenThuTuc,
      NguoiNop: nguoiNop || undefined,
      CCCD: cccd,
      SoDienThoai: soDienThoai,
      Email: email,
      DiaChiLienHe: diaChiLienHe,
      LinhVuc: linhVuc,
      NgayNop: data.NgayNop,
      NgayHenTra: data.NgayHenTra,
      NgayHoanThanh: data.NgayHoanThanh,
      TrangThai: allowedTrangThai.has(String(data.TrangThai || ''))
        ? String(data.TrangThai)
        : 'Đã tiếp nhận',
      PhiLePhi: data.PhiLePhi,
      KetQua: data.KetQua,
      GhiChu: data.GhiChu,
    };

    if (data.CanBoXuLy === null || data.CanBoXuLy === undefined) {
      payload.CanBoXuLy = null;
      return payload;
    }

    const userId = Number(data.CanBoXuLy);
    if (!Number.isInteger(userId) || userId <= 0) {
      payload.CanBoXuLy = null;
      return payload;
    }

    const existed = await this.userRepository.exist({ where: { id: userId } });
    payload.CanBoXuLy = existed ? userId : null;

    return payload;
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await this.hoSoRepository.findAndCount({
      skip,
      take: limit,
      order: { NgayNop: 'DESC' },
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
    return this.hoSoRepository.findOne({
      where: { MaHoSo: id },
    });
  }

  async create(data: Partial<HoSoTTHC>) {
    const sanitized = await this.sanitizePayload(data);
    const hoSo = this.hoSoRepository.create(sanitized);
    return this.hoSoRepository.save(hoSo);
  }

  async update(id: string, data: Partial<HoSoTTHC>) {
    const sanitized = await this.sanitizePayload(data);
    delete sanitized.MaHoSo;
    await this.hoSoRepository.update(id, sanitized);
    return this.findOne(id);
  }

  async delete(id: string) {
    await this.hoSoRepository.delete(id);
    return { deleted: true };
  }

  async getStats() {
    const total = await this.hoSoRepository.count();
    
    const daTiepNhan = await this.hoSoRepository.count({
      where: { TrangThai: 'Đã tiếp nhận' },
    });

    const dangXuLy = await this.hoSoRepository.count({
      where: { TrangThai: 'Đang xử lý' },
    });

    const hoanThanh = await this.hoSoRepository.count({
      where: { TrangThai: 'Hoàn thành' },
    });

    const choBoSung = await this.hoSoRepository.count({
      where: { TrangThai: 'Chờ bổ sung' },
    });

    const tuChoi = await this.hoSoRepository.count({
      where: { TrangThai: 'Từ chối' },
    });

    const quaHan = await this.hoSoRepository
      .createQueryBuilder('hoSo')
      .where('hoSo."NgayHenTra" IS NOT NULL')
      .andWhere('hoSo."NgayHenTra" < CURRENT_DATE')
      .andWhere('hoSo."TrangThai" NOT IN (:...doneStatuses)', {
        doneStatuses: ['Hoàn thành', 'Từ chối'],
      })
      .getCount();

    return {
      total,
      daTiepNhan,
      dangXuLy,
      hoanThanh,
      choBoSung,
      tuChoi,
      quaHan,
    };
  }

  // LoaiThuTuc methods
  async findAllLoaiThuTuc() {
    return this.loaiThuTucRepository.find();
  }

  async findOneLoaiThuTuc(id: number) {
    return this.loaiThuTucRepository.findOne({
      where: { MaLoaiThuTuc: id },
    });
  }

  async createLoaiThuTuc(data: Partial<LoaiThuTuc>) {
    const loaiThuTuc = this.loaiThuTucRepository.create(data);
    return this.loaiThuTucRepository.save(loaiThuTuc);
  }
}
