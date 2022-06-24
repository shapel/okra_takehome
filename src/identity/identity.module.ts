import { Module } from '@nestjs/common';
import { IdentityController } from './identity.controller';
import { IdentityService } from './identity.service';
import { VerificationService } from './verification.service';
import { Mongoose } from 'mongoose';
import { DATABASE_CONNECTION } from '../database/constants';
import { IDENTITY_MODEL } from './constants';
import { IdentityDocument, IdentitySchema } from './schemas/identity.schema';
import { DatabaseModule } from '../database/database.module';
import { CustomersModule } from '../customers/customers.module';

@Module({
  imports: [DatabaseModule, CustomersModule],
  controllers: [IdentityController],
  providers: [
    IdentityService,
    VerificationService,
    {
      provide: IDENTITY_MODEL,
      useFactory: (mongoose: Mongoose) =>
        mongoose.model(IdentityDocument.name, IdentitySchema),
      inject: [DATABASE_CONNECTION],
    },
  ],
  exports: [IdentityService],
})
export class IdentityModule {}
