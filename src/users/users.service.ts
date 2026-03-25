import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { username, isDeleted: false, isActive: true },
    });
  }

  async findByUsernameAny(username: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { username, isDeleted: false },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email, isDeleted: false, isActive: true },
    });
  }

  async findByEmailAny(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email, isDeleted: false },
    });
  }

  async findByIdentifier(identifier: string): Promise<User | null> {
    const trimmed = identifier.trim();
    if (!trimmed) {
      return null;
    }

    if (trimmed.includes('@')) {
      const byEmail = await this.findByEmail(trimmed);
      if (byEmail) {
        return byEmail;
      }
    }

    return this.findByUsername(trimmed);
  }

  async findByIdentifierAny(identifier: string): Promise<User | null> {
    const trimmed = identifier.trim();
    if (!trimmed) {
      return null;
    }

    if (trimmed.includes('@')) {
      const byEmail = await this.findByEmailAny(trimmed);
      if (byEmail) {
        return byEmail;
      }
    }

    return this.findByUsernameAny(trimmed);
  }

  async findById(id: number): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id, isDeleted: false },
    });
  }

  async create(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  async update(id: number, userData: Partial<User>): Promise<User> {
    await this.userRepository.update(id, userData);
    return this.findById(id);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      where: { isDeleted: false },
      order: { createdAt: 'DESC' },
    });
  }
}
