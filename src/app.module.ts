import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CustomersModule } from './customers/customers.module';
import { IdentityModule } from './identity/identity.module';

@Module({
  imports: [AuthModule, UsersModule, CustomersModule, IdentityModule],
  controllers: [AppController],
})
export class AppModule {}
