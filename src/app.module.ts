import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CustomersModule } from './customers/customers.module';
import { IdentityModule } from './identity/identity.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './common/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    AuthModule,
    UsersModule,
    CustomersModule,
    IdentityModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
