import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
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

  async createAdminUser(payload: Partial<User>) {
    const username = String(payload.username || '').trim();
    const fullName = String(payload.fullName || '').trim();

    if (!username) {
      throw new BadRequestException('Tên đăng nhập không được để trống');
    }

    if (!fullName) {
      throw new BadRequestException('Họ và tên không được để trống');
    }

    const existingUser = await this.findByUsernameAny(username);
    if (existingUser) {
      throw new ConflictException('Tên đăng nhập đã tồn tại');
    }

    if (payload.email) {
      const existingEmail = await this.findByEmailAny(String(payload.email));
      if (existingEmail) {
        throw new ConflictException('Email đã được đăng ký');
      }
    }

    const rawPassword = String(payload.password || '123456');
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    return this.create({
      username,
      fullName,
      email: payload.email ?? null,
      phone: payload.phone ?? null,
      department: payload.department ?? null,
      roleId: payload.roleId ?? 4,
      isActive: payload.isActive ?? true,
      password: hashedPassword,
      isDeleted: false,
    });
  }

  async updateAdminUser(id: number, payload: Partial<User>) {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }

    if (payload.username) {
      const username = String(payload.username).trim();
      if (!username) {
        throw new BadRequestException('Tên đăng nhập không hợp lệ');
      }

      const existingUser = await this.findByUsernameAny(username);
      if (existingUser && existingUser.id !== id) {
        throw new ConflictException('Tên đăng nhập đã tồn tại');
      }

      user.username = username;
    }

    if (payload.email !== undefined) {
      const email = payload.email ? String(payload.email).trim() : null;
      if (email) {
        const existingEmail = await this.findByEmailAny(email);
        if (existingEmail && existingEmail.id !== id) {
          throw new ConflictException('Email đã được đăng ký');
        }
      }
      user.email = email;
    }

    if (payload.fullName !== undefined) {
      const fullName = String(payload.fullName || '').trim();
      if (!fullName) {
        throw new BadRequestException('Họ và tên không được để trống');
      }
      user.fullName = fullName;
    }

    if (payload.password) {
      user.password = await bcrypt.hash(String(payload.password), 10);
    }

    if (payload.phone !== undefined) {
      user.phone = payload.phone ? String(payload.phone) : null;
    }

    if (payload.department !== undefined) {
      user.department = payload.department ? String(payload.department) : null;
    }

    if (payload.roleId !== undefined) {
      user.roleId = Number(payload.roleId);
    }

    if (payload.isActive !== undefined) {
      user.isActive = Boolean(payload.isActive);
    }

    await this.userRepository.save(user);
    return this.findById(id);
  }

  async softDeleteUser(id: number) {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }

    await this.userRepository.update(id, { isDeleted: true });
    return { deleted: true };
  }
}
