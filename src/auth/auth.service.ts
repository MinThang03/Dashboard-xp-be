import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { UserSession } from './user-session.entity';
import { User } from '../users/user.entity';
import { RegisterDto, VerifyOtpDto } from './dto/auth.dto';
import { EmailService } from './email.service';

export interface LoginSuccessResult {
  accessToken: string;
  refreshToken: string;
  user: Partial<User>;
}

export interface LoginNeedsVerificationResult {
  requiresVerification: true;
  email?: string;
  message: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
    @InjectRepository(UserSession)
    private readonly sessionRepository: Repository<UserSession>,
  ) {}

  async register(registerDto: RegisterDto): Promise<{ message: string; email: string; requiresVerification: true }> {
    const username = registerDto.username.trim();
    const fullName = registerDto.fullName.trim();
    const email = registerDto.email.trim().toLowerCase();

    const existingUserByUsername = await this.usersService.findByUsernameAny(username);
    if (existingUserByUsername) {
      throw new ConflictException('Tên đăng nhập đã tồn tại');
    }

    const existingUserByEmail = await this.usersService.findByEmailAny(email);
    if (existingUserByEmail) {
      throw new ConflictException('Email đã được đăng ký');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const otp = this.generateOtp();
    const otpExpiresAt = new Date();
    otpExpiresAt.setMinutes(otpExpiresAt.getMinutes() + 10);

    await this.usersService.create({
      username,
      password: hashedPassword,
      fullName,
      email,
      roleId: registerDto.roleId || 4,
      isActive: false,
      emailVerificationOtp: otp,
      otpExpiresAt,
    });

    await this.emailService.sendVerificationOtp(email, otp, fullName);

    return {
      message: 'Đăng ký thành công. Vui lòng kiểm tra email để nhập OTP.',
      email,
      requiresVerification: true,
    };
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<{ message: string; success: true }> {
    const email = verifyOtpDto.email.trim().toLowerCase();
    const otp = verifyOtpDto.otp.trim();

    const user = await this.usersService.findByEmailAny(email);
    if (!user) {
      throw new BadRequestException('Không tìm thấy tài khoản với email này');
    }

    if (user.isActive) {
      return {
        message: 'Tài khoản đã được xác thực trước đó',
        success: true,
      };
    }

    if (!user.emailVerificationOtp || user.emailVerificationOtp !== otp) {
      throw new BadRequestException('OTP không đúng');
    }

    if (!user.otpExpiresAt || new Date() > user.otpExpiresAt) {
      throw new BadRequestException('OTP đã hết hạn');
    }

    await this.usersService.update(user.id, {
      isActive: true,
      emailVerificationOtp: null,
      otpExpiresAt: null,
      emailVerifiedAt: new Date(),
    });

    return {
      message: 'Xác thực OTP thành công. Bạn có thể đăng nhập.',
      success: true,
    };
  }

  async resendOtp(emailInput: string): Promise<{ message: string; success: true }> {
    const email = emailInput.trim().toLowerCase();
    const user = await this.usersService.findByEmailAny(email);

    if (!user) {
      throw new BadRequestException('Không tìm thấy tài khoản với email này');
    }

    if (user.isActive) {
      throw new BadRequestException('Tài khoản đã xác thực, không cần gửi OTP');
    }

    await this.issueVerificationOtp(user);

    return {
      message: 'Đã gửi lại OTP vào email của bạn',
      success: true,
    };
  }

  async login(
    identifier: string,
    password: string,
    userAgent?: string,
    ipAddress?: string,
  ): Promise<LoginSuccessResult | LoginNeedsVerificationResult> {
    const user = await this.usersService.findByIdentifierAny(identifier);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isActive) {
      if (user.email) {
        await this.issueVerificationOtp(user);
      }

      return {
        requiresVerification: true,
        email: user.email,
        message: `Tài khoản chưa xác thực. OTP đã được gửi đến ${user.email}.`,
      };
    }

    const payload = { sub: user.id, username: user.username, role: user.roleId };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.generateRefreshToken(payload);

    const refreshTokenHash = await bcrypt.hash(refreshToken, 10);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    await this.sessionRepository.save({
      userId: user.id,
      refreshTokenHash,
      userAgent,
      ipAddress,
      expiresAt,
    });

    const { password: _, ...userWithoutPassword } = user;

    return {
      accessToken,
      refreshToken,
      user: userWithoutPassword,
    };
  }

  async refreshToken(
    refreshToken: string,
    userAgent?: string,
    ipAddress?: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const secret = this.configService.get<string>('JWT_REFRESH_SECRET');
      const payload = this.jwtService.verify(refreshToken, {
        secret,
      } as any);

      const sessions = await this.sessionRepository.find({
        where: { userId: payload.sub },
      });

      let validSession = null;
      for (const session of sessions) {
        if (await bcrypt.compare(refreshToken, session.refreshTokenHash)) {
          validSession = session;
          break;
        }
      }

      if (!validSession) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      await this.sessionRepository.delete(validSession.id);

      const newAccessToken = this.jwtService.sign({
        sub: payload.sub,
        username: payload.username,
        role: payload.role,
      });

      const newRefreshToken = this.generateRefreshToken({
        sub: payload.sub,
        username: payload.username,
        role: payload.role,
      });

      const newRefreshTokenHash = await bcrypt.hash(newRefreshToken, 10);
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 30);

      await this.sessionRepository.save({
        userId: payload.sub,
        refreshTokenHash: newRefreshTokenHash,
        userAgent,
        ipAddress,
        expiresAt,
      });

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(userId: number, refreshToken?: string): Promise<void> {
    if (refreshToken) {
      const sessions = await this.sessionRepository.find({ where: { userId } });
      for (const session of sessions) {
        if (await bcrypt.compare(refreshToken, session.refreshTokenHash)) {
          await this.sessionRepository.delete(session.id);
          break;
        }
      }
    } else {
      await this.sessionRepository.delete({ userId });
    }
  }

  private generateRefreshToken(payload: any): string {
    const secret = this.configService.get<string>('JWT_REFRESH_SECRET');
    const expiresIn = this.configService.get<string>('JWT_REFRESH_EXPIRATION') || '30d';
    return this.jwtService.sign(payload, {
      secret,
      expiresIn,
    } as any);
  }

  private generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  private async issueVerificationOtp(user: User): Promise<void> {
    if (!user.email) {
      throw new BadRequestException('Tài khoản không có email để gửi OTP');
    }

    const otp = this.generateOtp();
    const otpExpiresAt = new Date();
    otpExpiresAt.setMinutes(otpExpiresAt.getMinutes() + 10);

    await this.usersService.update(user.id, {
      emailVerificationOtp: otp,
      otpExpiresAt,
    });

    await this.emailService.sendVerificationOtp(user.email, otp, user.fullName);
  }

  async cleanupExpiredSessions(): Promise<void> {
    await this.sessionRepository.delete({
      expiresAt: LessThan(new Date()),
    });
  }
}
