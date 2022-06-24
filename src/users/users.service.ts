import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PassportLocalModel } from 'mongoose';
import { UserDocument } from './schemas/user.schema';
import { User } from './interfaces/user.interface';
import { USER_MODEL } from './constants';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_MODEL)
    private userModel: PassportLocalModel<UserDocument>,
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    const { password, ...userWithoutPassword } = user;
    const result = await this.userModel.register(
      userWithoutPassword as any,
      password,
    );
    return result;
  }

  async findOne(email: string): Promise<User | undefined> {
    const user = await this.userModel.findByUsername(email, false);
    return user;
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<User | undefined> {
    const { user } = await this.userModel.authenticate()(email, password);
    return user;
  }

  async findAll(payload: Partial<User>): Promise<User[]> {
    return this.userModel.find(payload);
  }
}
