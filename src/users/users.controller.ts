import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';

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
