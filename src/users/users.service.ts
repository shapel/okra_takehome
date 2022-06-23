import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  async create(user: CreateUserDto): Promise<User> {
    throw new Error('Not implemented');
  }

  async findOne(email: string): Promise<User | undefined> {
    throw new Error('Not implemented');
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<User | undefined> {
    throw new Error('Not implemented');
  }

  async findAll(): Promise<User[]> {
    throw new Error('Not implemented');
  }
}
