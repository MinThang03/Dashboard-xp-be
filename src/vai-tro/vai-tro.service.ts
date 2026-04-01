import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VaiTro } from './vai-tro.entity';

@Injectable()
export class VaiTroService {
  constructor(
    @InjectRepository(VaiTro)
    private readonly vaiTroRepository: Repository<VaiTro>,
  ) {}

  private normalizeCode(input: string) {
    return input
      .trim()
      .toUpperCase()
      .replace(/\s+/g, '_')
      .replace(/[^A-Z0-9_]/g, '');
  }

  async findAll() {
    return this.vaiTroRepository.find({ order: { order: 'ASC', id: 'ASC' } });
  }

  async findById(id: number) {
    const role = await this.vaiTroRepository.findOne({ where: { id } });
    if (!role) {
      throw new NotFoundException('Không tìm thấy vai trò');
    }
    return role;
  }

  async create(payload: Partial<VaiTro>) {
    const name = String(payload.name || payload['TenVaiTro'] || '').trim();
    if (!name) {
      throw new BadRequestException('Tên vai trò không được để trống');
    }

    const rawCode = String(payload.code || payload['MaCode'] || name);
    const code = this.normalizeCode(rawCode);
    if (!code) {
      throw new BadRequestException('Mã vai trò không hợp lệ');
    }
    if (code.length > 20) {
      throw new BadRequestException('Mã vai trò vượt quá 20 ký tự');
    }

    const existed = await this.vaiTroRepository.findOne({ where: { code } });
    if (existed) {
      throw new BadRequestException(`Mã vai trò ${code} đã tồn tại`);
    }

    const role = this.vaiTroRepository.create({
      name,
      code,
      description: payload.description ?? payload['MoTa'] ?? null,
      order: Number(payload.order ?? payload['ThuTuHienThi'] ?? 0),
      isActive: payload.isActive ?? payload['TrangThai'] ?? true,
      permissions: Array.isArray(payload.permissions)
        ? payload.permissions
        : Array.isArray(payload['DanhSachQuyen'])
          ? payload['DanhSachQuyen']
          : [],
    });

    return this.vaiTroRepository.save(role);
  }

  async update(id: number, payload: Partial<VaiTro>) {
    const role = await this.findById(id);

    const nextName = payload.name ?? payload['TenVaiTro'];
    const rawCode = payload.code ?? payload['MaCode'];

    if (rawCode) {
      const code = this.normalizeCode(String(rawCode));
      if (!code) {
        throw new BadRequestException('Mã vai trò không hợp lệ');
      }
      if (code.length > 20) {
        throw new BadRequestException('Mã vai trò vượt quá 20 ký tự');
      }

      const existed = await this.vaiTroRepository.findOne({ where: { code } });
      if (existed && existed.id !== id) {
        throw new BadRequestException(`Mã vai trò ${code} đã tồn tại`);
      }

      role.code = code;
    }

    if (nextName !== undefined) {
      const trimmed = String(nextName || '').trim();
      if (!trimmed) {
        throw new BadRequestException('Tên vai trò không được để trống');
      }
      role.name = trimmed;
    }

    if (payload.description !== undefined || payload['MoTa'] !== undefined) {
      role.description = payload.description ?? payload['MoTa'] ?? null;
    }

    if (payload.order !== undefined || payload['ThuTuHienThi'] !== undefined) {
      role.order = Number(payload.order ?? payload['ThuTuHienThi'] ?? 0);
    }

    if (payload.isActive !== undefined || payload['TrangThai'] !== undefined) {
      role.isActive = Boolean(payload.isActive ?? payload['TrangThai']);
    }

    if (payload.permissions !== undefined || payload['DanhSachQuyen'] !== undefined) {
      const nextPermissions = Array.isArray(payload.permissions)
        ? payload.permissions
        : Array.isArray(payload['DanhSachQuyen'])
          ? payload['DanhSachQuyen']
          : [];
      role.permissions = nextPermissions;
    }

    return this.vaiTroRepository.save(role);
  }

  async remove(id: number) {
    await this.vaiTroRepository.delete({ id } as any);
    return { deleted: true };
  }
}
