import * as mongoose from 'mongoose';
import configuration from '../common/configuration';
import { DATABASE_CONNECTION } from './constants';

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect(configuration().MONDO_DB_URL),
  },
];
