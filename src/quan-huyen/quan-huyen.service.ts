import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuanHuyen } from './quan-huyen.entity';

@Injectable()
export class QuanHuyenService {
  constructor(
    @InjectRepository(QuanHuyen)
    private readonly repository: Repository<QuanHuyen>,
  ) {}

  async findAll() {
    return this.repository.find({ order: { id: 'ASC' } });
  }
}
