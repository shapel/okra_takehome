import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { User } from 'src/auth/decorators/user.decorator';
import { PublicAuthGuard } from 'src/auth/guards/public-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { User as UserInterface } from './interfaces/user.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @PublicAuthGuard()
  async create(@Body() createCatDto: CreateUserDto) {
    return this.usersService.create(createCatDto);
  }

  @Get()
  async findAll(@User() user: UserInterface): Promise<UserInterface[]> {
    // TODO: handle admin users in other way
    return this.usersService.findAll({ id: user.id });
  }
}
