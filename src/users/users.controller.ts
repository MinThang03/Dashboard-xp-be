import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return {
      success: true,
      data: users.map((user) => ({
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        roleId: user.roleId,
        isActive: user.isActive,
        department: user.department,
      })),
    };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@Req() req: any) {
    const user = await this.usersService.findById(Number(req.user.userId));
    if (!user) {
      return { success: false, message: 'Không tìm thấy người dùng' };
    }

    return {
      success: true,
      data: {
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        roleId: user.roleId,
        isActive: user.isActive,
        department: user.department,
        phone: user.phone,
        avatar: user.avatar,
        citizenId: user.citizenId,
        birthDate: user.birthDate,
        startDate: user.startDate,
        address: user.address,
        title: user.title,
      },
    };
  }

  @Put('me')
  @UseGuards(JwtAuthGuard)
  async updateMe(@Req() req: any, @Body() payload: any) {
    const user = await this.usersService.updateProfile(Number(req.user.userId), payload);
    return {
      success: true,
      data: {
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        roleId: user.roleId,
        isActive: user.isActive,
        department: user.department,
        phone: user.phone,
        avatar: user.avatar,
        citizenId: user.citizenId,
        birthDate: user.birthDate,
        startDate: user.startDate,
        address: user.address,
        title: user.title,
      },
    };
  }

  @Post()
  async create(@Body() payload: any) {
    const user = await this.usersService.createAdminUser(payload);
    return {
      success: true,
      data: {
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        roleId: user.roleId,
        isActive: user.isActive,
        department: user.department,
      },
    };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() payload: any) {
    const user = await this.usersService.updateAdminUser(Number(id), payload);
    return {
      success: true,
      data: {
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        roleId: user.roleId,
        isActive: user.isActive,
        department: user.department,
      },
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.usersService.softDeleteUser(Number(id));
    return { success: true, data };
  }
}
