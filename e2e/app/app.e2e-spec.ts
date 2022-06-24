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
    it('should get a 401 when trying to login with incorrect credentials', async () => {
      return request(app.getHttpServer())
        .post('/login')
        .send({ email: 'admin@amind.io', password: 'password' })
        .expect(401);
    });
  });

  describe('users', () => {
    it('should get 401 when trying to get users without credentials', async () => {
      return request(app.getHttpServer()).get('/users').expect(401);
    });
  });

  describe('customers', () => {
    it('should get 401 when trying to get customers without credentials', async () => {
      return request(app.getHttpServer()).get('/customers').expect(401);
    });
    it('should get 401 when trying to get customer without credentials', async () => {
      return request(app.getHttpServer()).get('/customers/1').expect(401);
    });
  });

  describe('identity', () => {
    it('should get 401 when trying to process identity without credentials', async () => {
      return request(app.getHttpServer()).post('/identity/process').expect(401);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
