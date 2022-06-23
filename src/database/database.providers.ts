import * as mongoose from 'mongoose';
import { DATABASE_CONNECTION } from './constants';

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: async (): Promise<typeof mongoose> =>
      // TODO: set mongodb connection from config
      await mongoose.connect(
        'mongodb://root:example@localhost:27017/test?authSource=admin&readPreference=primary&ssl=false&directConnection=true',
      ),
  },
];
