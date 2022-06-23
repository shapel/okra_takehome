import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('E2E', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const modRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = modRef.createNestApplication();
    await app.init();
  });

  describe('login', () => {
    it('should get a 401 when try to logging with incorrect credentials', async () => {
      return request(app.getHttpServer())
        .post('/login')
        .send({ email: 'admin@amind.io', password: 'password' })
        .expect(401);
    });
  });

  describe('users', () => {
    it('should get a 401 when try to get users without credentials', async () => {
      return request(app.getHttpServer()).get('/users').expect(401);
    });
  });

  describe('customers', () => {
    it('should get a 401 when try to get customer without credentials', async () => {
      return request(app.getHttpServer()).get('/customers').expect(401);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
