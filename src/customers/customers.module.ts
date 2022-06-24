import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { CUSTOMER_MODEL } from './constants';
import { Mongoose } from 'mongoose';
import { CustomerDocument, CustomerSchema } from './schemas/customer.schema';
import { DATABASE_CONNECTION } from '../database/constants';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CustomersController],
  providers: [
    CustomersService,
    {
      provide: CUSTOMER_MODEL,
      useFactory: (mongoose: Mongoose) =>
        mongoose.model(CustomerDocument.name, CustomerSchema),
      inject: [DATABASE_CONNECTION],
    },
  ],
  exports: [CustomersService],
})
export class CustomersModule {}
