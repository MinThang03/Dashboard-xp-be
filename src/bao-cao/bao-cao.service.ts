import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { BaoCao } from './bao-cao.entity';

@Injectable()
export class BaoCaoService {
    private normalizeString(value: unknown, maxLength: number): string | null {
      if (value === null || value === undefined) {
        return null;
      }

      const normalized = String(value).trim();
      if (!normalized) {
        return null;
      }

      if (normalized.length > maxLength) {
        return null;
      }

      return normalized;
    }

    private sanitizePayload(data: Partial<BaoCao>): Partial<BaoCao> {
      const tieuDe = this.normalizeString(data.TieuDe, 200);
      const loaiBaoCao = this.normalizeString(data.LoaiBaoCao, 100);
      const thangNam = this.normalizeString(data.ThangNam, 7);
      const nguoiLapText = this.normalizeString(data.NguoiLapText, 150);

      if (data.TieuDe && !tieuDe) {
        throw new BadRequestException('Tiêu đề báo cáo không được để trống hoặc vượt quá 200 ký tự');
      }

      if (data.ThangNam && !thangNam) {
        throw new BadRequestException('Tháng/Năm báo cáo tối đa 7 ký tự (ví dụ: 2026-03 hoặc Q1/2026)');
      }

      if (data.NguoiLapText && !nguoiLapText) {
        throw new BadRequestException('Người lập tối đa 150 ký tự');
      }

      return {
        ...data,
        TieuDe: tieuDe || undefined,
        LoaiBaoCao: loaiBaoCao || null,
        ThangNam: thangNam || null,
        NguoiLapText: nguoiLapText || null,
      };
    }

  constructor(
    @InjectRepository(BaoCao)
    private readonly baoCaoRepository: Repository<BaoCao>,
  ) {}

  async findAll(params?: { page?: number; limit?: number; search?: string }) {
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const skip = (page - 1) * limit;

    const where = params?.search
      ? [{ TieuDe: Like(`%${params.search}%`) }, { ThangNam: Like(`%${params.search}%`) }]
      : {};

    const [data, total] = await this.baoCaoRepository.findAndCount({
      where,
      take: limit,
      skip,
      order: { NgayLap: 'DESC', MaBaoCao: 'DESC' },
    });

    return { data, total, page, limit };
  }

  async findOne(id: number) {
    return this.baoCaoRepository.findOne({ where: { MaBaoCao: id } });
  }

  async create(data: Partial<BaoCao>) {
    const sanitized = this.sanitizePayload(data);
    const entity = this.baoCaoRepository.create(sanitized);
    return this.baoCaoRepository.save(entity);
  }

  async update(id: number, data: Partial<BaoCao>) {
    const sanitized = this.sanitizePayload(data);
    await this.baoCaoRepository.update(id, sanitized);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.baoCaoRepository.delete(id);
  }
}
