import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { XaPhuong } from './xa-phuong.entity';
import { QuanHuyen } from '../quan-huyen/quan-huyen.entity';
import { DonViHanhChinh } from '../don-vi-hanh-chinh/don-vi-hanh-chinh.entity';

@Injectable()
export class XaPhuongService {
  constructor(
    @InjectRepository(XaPhuong)
    private readonly repository: Repository<XaPhuong>,
    @InjectRepository(QuanHuyen)
    private readonly quanHuyenRepository: Repository<QuanHuyen>,
    @InjectRepository(DonViHanhChinh)
    private readonly dvhcRepository: Repository<DonViHanhChinh>,
  ) {}

  async findAll() {
    const [communes, districts, dvhcs] = await Promise.all([
      this.repository.find({ order: { id: 'ASC' } }),
      this.quanHuyenRepository.find(),
      this.dvhcRepository.find(),
    ]);

    const districtMap = new Map(districts.map((item) => [item.id, item.name]));
    const dvhcMap = new Map(dvhcs.map((item) => [item.code, item.name]));

    return communes.map((commune) => ({
      ...commune,
      districtName: commune.districtId ? districtMap.get(commune.districtId) || null : null,
      dvhcName: commune.dvhcCode ? dvhcMap.get(commune.dvhcCode) || null : null,
    }));
  }

  async findOne(id: number) {
    const data = await this.repository.findOne({ where: { id } });
    if (!data) {
      throw new NotFoundException('Không tìm thấy xã/phường');
    }
    return data;
  }

  async create(payload: Partial<XaPhuong>) {
    const name = String(payload.name || payload['TenXaPhuong'] || '').trim();
    if (!name) {
      throw new BadRequestException('Tên xã/phường không được để trống');
    }

    const entity = this.repository.create({
      name,
      districtId: payload.districtId ?? payload['MaQuanHuyen'] ?? null,
      population: Number(payload.population ?? payload['DanSo'] ?? 0),
      area: payload.area ?? payload['DienTich'] ?? null,
      dvhcCode: payload.dvhcCode ?? payload['MaDVHC'] ?? null,
      address: payload.address ?? payload['DiaChi'] ?? null,
      phone: payload.phone ?? payload['SoDienThoai'] ?? null,
      email: payload.email ?? payload['Email'] ?? null,
      mayor: payload.mayor ?? payload['ChuTich'] ?? null,
      isActive: payload.isActive ?? payload['TrangThai'] ?? true,
    });

    return this.repository.save(entity);
  }

  async update(id: number, payload: Partial<XaPhuong>) {
    const commune = await this.findOne(id);
    if (payload.name !== undefined || payload['TenXaPhuong'] !== undefined) {
      const name = String(payload.name ?? payload['TenXaPhuong'] ?? '').trim();
      if (!name) {
        throw new BadRequestException('Tên xã/phường không được để trống');
      }
      commune.name = name;
    }

    if (payload.districtId !== undefined || payload['MaQuanHuyen'] !== undefined) {
      commune.districtId = payload.districtId ?? payload['MaQuanHuyen'] ?? null;
    }

    if (payload.population !== undefined || payload['DanSo'] !== undefined) {
      commune.population = Number(payload.population ?? payload['DanSo'] ?? 0);
    }

    if (payload.area !== undefined || payload['DienTich'] !== undefined) {
      commune.area = payload.area ?? payload['DienTich'] ?? null;
    }

    if (payload.dvhcCode !== undefined || payload['MaDVHC'] !== undefined) {
      commune.dvhcCode = payload.dvhcCode ?? payload['MaDVHC'] ?? null;
    }

    if (payload.address !== undefined || payload['DiaChi'] !== undefined) {
      commune.address = payload.address ?? payload['DiaChi'] ?? null;
    }

    if (payload.phone !== undefined || payload['SoDienThoai'] !== undefined) {
      commune.phone = payload.phone ?? payload['SoDienThoai'] ?? null;
    }

    if (payload.email !== undefined || payload['Email'] !== undefined) {
      commune.email = payload.email ?? payload['Email'] ?? null;
    }

    if (payload.mayor !== undefined || payload['ChuTich'] !== undefined) {
      commune.mayor = payload.mayor ?? payload['ChuTich'] ?? null;
    }

    if (payload.isActive !== undefined || payload['TrangThai'] !== undefined) {
      commune.isActive = Boolean(payload.isActive ?? payload['TrangThai']);
    }

    return this.repository.save(commune);
  }

  async remove(id: number) {
    await this.repository.delete({ id } as any);
    return { deleted: true };
  }
}
