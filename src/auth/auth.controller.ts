import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RegisterDto, ResendOtpDto, VerifyOtpDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('verify-otp')
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.authService.verifyOtp(verifyOtpDto);
  }

  @Post('resend-otp')
  async resendOtp(@Body() resendOtpDto: ResendOtpDto) {
    return this.authService.resendOtp(resendOtpDto.email);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() body: { identifier?: string; username?: string; email?: string; password: string },
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const identifier = body.identifier || body.username || body.email;
    if (!identifier) {
      throw new UnauthorizedException('Vui lòng nhập tên đăng nhập hoặc email');
    }

    const userAgent = req.headers['user-agent'];
    const ipAddress = req.ip;

    const result = await this.authService.login(
      identifier,
      body.password,
      userAgent,
      ipAddress,
    );

    if ('requiresVerification' in result && result.requiresVerification) {
      return result;
    }

    const loginResult = result as {
      accessToken: string;
      refreshToken: string;
      user: unknown;
    };

    res.cookie('refreshToken', loginResult.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return {
      accessToken: loginResult.accessToken,
      user: loginResult.user,
    };
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    const userAgent = req.headers['user-agent'];
    const ipAddress = req.ip;

    const result = await this.authService.refreshToken(refreshToken, userAgent, ipAddress);

    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return { accessToken: result.accessToken };
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: any, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies?.refreshToken;
    await this.authService.logout(req.user.userId, refreshToken);

    res.clearCookie('refreshToken');
    return { message: 'Logged out successfully' };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() req: any) {
    return req.user;
  }
}
