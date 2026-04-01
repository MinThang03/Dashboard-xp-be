import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DonViHanhChinh } from './don-vi-hanh-chinh.entity';

@Injectable()
export class DonViHanhChinhService {
  constructor(
    @InjectRepository(DonViHanhChinh)
    private readonly repository: Repository<DonViHanhChinh>,
  ) {}

  async findAll() {
    return this.repository.find({ order: { level: 'ASC', code: 'ASC' } });
  }
}
