import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '../database/database.module';
import { USER_MODEL } from './constants';
import { UserDocument, UserSchema } from './schemas/user.schema';
import { DATABASE_CONNECTION } from '../database/constants';
import { Mongoose } from 'mongoose';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: USER_MODEL,
      useFactory: (mongoose: Mongoose) =>
        mongoose.model(UserDocument.name, UserSchema),
      inject: [DATABASE_CONNECTION],
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
