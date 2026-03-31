import { Controller, Get } from '@nestjs/common';
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
      })),
    };
  }
}
