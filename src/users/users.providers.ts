import { Mongoose } from 'mongoose';
import { DATABASE_CONNECTION } from '../database/constants';
import { USER_MODEL } from './constants';
import { UserDocument, UserSchema } from './schemas/user.schema';

export const usersProviders = [
  {
    provide: USER_MODEL,
    useFactory: (mongoose: Mongoose) =>
      mongoose.model(UserDocument.name, UserSchema),
    inject: [DATABASE_CONNECTION],
  },
];
