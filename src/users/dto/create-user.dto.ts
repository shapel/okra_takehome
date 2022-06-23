import { IsString, IsEmail, Length } from 'class-validator';
import { User } from '../interfaces/user.interface';

export class CreateUserDto implements Omit<User, 'id'> {
  @IsString()
  @Length(1)
  readonly firstName: string;

  @IsString()
  @Length(1)
  readonly lastName: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @Length(5)
  readonly password: string;
}
